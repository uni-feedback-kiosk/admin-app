import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../../store/apiSlice';

export type Language = 'ru' | 'en';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    language: <Language>'ru',
    error: '',
  },
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<Language>) => (
      { ...state, language: payload }
    ),
    setError: (state, { payload }: PayloadAction<string>) => (
      { ...state, error: payload }
    ),
    clearError: (state) => (
      { ...state, error: '' }
    ),
  },
  extraReducers: (builder) => builder.addMatcher(
    isAnyOf(
      apiSlice.endpoints.listFiles.matchPending,
      apiSlice.endpoints.getFile.matchPending,
      apiSlice.endpoints.updateFile.matchPending,
      apiSlice.endpoints.deleteFile.matchPending,
      apiSlice.endpoints.addFile.matchPending,
    ),
    (state) => (
      { ...state, error: '' }
    ),
  ),
});

export const { setLanguage, setError, clearError } = filesSlice.actions;
