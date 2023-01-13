import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../../store/apiSlice';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
  },
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => (
      { ...state, token: payload }
    ),
    clearToken: (state) => (
      { ...state, token: '' }
    ),
  },
  extraReducers: (builder) => builder.addMatcher(
    apiSlice.endpoints.authenticate.matchFulfilled,
    (state, { payload }) => (
      { ...state, token: payload.access_token }
    ),
  ).addMatcher(
    isAnyOf(
      apiSlice.endpoints.authenticate.matchRejected,
      apiSlice.endpoints.listFiles.matchRejected,
      apiSlice.endpoints.getFile.matchRejected,
      apiSlice.endpoints.updateFile.matchRejected,
      apiSlice.endpoints.deleteFile.matchRejected,
      apiSlice.endpoints.addFile.matchRejected,
    ),
    (state, { payload }) => {
      if (!payload) {
        return state;
      }
      if (payload.status === 401 || payload.status === 403) {
        return { ...state, token: '' };
      }
      return state;
    },
  ),
});

export const { setToken, clearToken } = authSlice.actions;
