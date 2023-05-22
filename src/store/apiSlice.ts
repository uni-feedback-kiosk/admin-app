import { SerializedError } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { AuthBody, AuthResponse, FileDownloadQuery, FileInfo, FileUpdate } from './models';
import type { RootState } from './store';
import { authFailed } from './actions';

const { VITE_FILES_API_PORT } = import.meta.env;
const API_ROOT = `http://${window.location.hostname}:${VITE_FILES_API_PORT}`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const queryWithAuth = fetchBaseQuery({
      baseUrl: API_ROOT,
      prepareHeaders: (headers) => {
        const {
          auth: { access_token },
        } = api.getState() as RootState;
        if (access_token) {
          headers.set('Authorization', `Bearer ${access_token}`);
        }
        return headers;
      },
    });

    const originalQuery = async () => queryWithAuth(args, api, extraOptions);
    const response = await originalQuery();
    if (response.error?.status === 401 || response.error?.status === 403) {
      api.dispatch(authFailed());
    }
    return response;
  },
  tagTypes: ['file'],
  endpoints: (builder) => ({
    authenticate: builder.mutation<AuthResponse, AuthBody>({
      query: (auth) => ({
        url: '/auth',
        method: 'POST',
        body: auth,
      }),
      invalidatesTags: ['file'],
    }),
    listFiles: builder.query<FileInfo[], void>({
      query: () => ({ url: '/' }),
      providesTags: (result) => (result ? result.map(({ id }) => ({ type: 'file', id })) : []),
    }),
    getFile: builder.query<null, FileDownloadQuery>({
      queryFn: async ({ id: fileId, filename }, _, __, baseQuery) => {
        // Download file
        const result = await baseQuery({
          url: `/${fileId}`,
          responseHandler: (response) => response.blob(),
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
        };
      },
      invalidatesTags: ['file'],
    }),
    updateFile: builder.mutation<FileInfo, FileUpdate>({
      query: ({ id: fileId, ...update }) => ({
        url: `/${fileId}`,
        method: 'PATCH',
        body: update,
      }),
      invalidatesTags: (result) => (result ? [{ type: 'file', id: result.id }] : []),
    }),
    deleteFile: builder.mutation<null, string>({
      query: (fileId) => ({
        url: `/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'file', id }],
    }),
  }),
});

const getFetchErrorMessage = (error: FetchBaseQueryError) => {
  if ('error' in error) {
    return error.error;
  }

  const { detail } = error.data as { detail?: string };

  return detail || JSON.stringify(error.data);
};

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ('status' in error) {
    return getFetchErrorMessage(error);
  }

  const message = error.message || 'Unknown error';

  if (error.code === undefined) {
    return message;
  }

  return `${message} (code ${error.code})`;
};

export const {
  useAuthenticateMutation,
  useListFilesQuery,
  useLazyGetFileQuery,
  useAddFileMutation,
  useUpdateFileMutation,
  useDeleteFileMutation,
} = apiSlice;
