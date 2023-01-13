import { SerializedError } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AuthBody, AuthResponse, FileDownloadQuery, FileInfo, FileUpdate } from './models';

const { FILES_API_PORT } = process.env;
const FILES_API_ROOT = `http://${window.location.hostname}:${FILES_API_PORT}`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: FILES_API_ROOT,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as { auth: { token: string } }).auth;
      if (token !== '') {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authenticate: builder.mutation<AuthResponse, AuthBody>({
      query: (auth) => ({
        url: '/auth',
        method: 'POST',
        body: auth,
      }),
    }),
    listFiles: builder.query<FileInfo[], void>({
      query: () => ({ url: '/' }),
    }),
    getFile: builder.query<null, FileDownloadQuery>({
      queryFn: async ({ id: fileId, filename }, _, __, baseQuery) => {
        // Download file
        const result = await baseQuery({
          url: `/${fileId}`,
          responseHandler: ((response) => response.blob()),
        });
        if (result.error) {
          return result;
        }

        // Open it from memory
        const url = window.URL.createObjectURL(new Blob([result.data as Blob]));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        return { data: null };
      },
    }),
    addFile: builder.mutation<FileInfo, Blob>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: '/new',
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
    updateFile: builder.mutation<FileInfo, FileUpdate>({
      query: ({ id: fileId, ...update }) => ({
        url: `/${fileId}`,
        method: 'PATCH',
        body: update,
      }),
    }),
    deleteFile: builder.mutation<null, string>({
      query: (fileId) => ({
        url: `/${fileId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if (!('status' in error)) {
    return error.message;
  }

  if ('error' in error) {
    return error.error;
  }

  const { detail } = error.data as { detail?: string };

  return detail || JSON.stringify(error.data);
};

export const {
  useAuthenticateMutation,
  useListFilesQuery,
  useLazyGetFileQuery,
  useAddFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
} = apiSlice;
