import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../../store/apiSlice';
import { FileInfo } from '../../store/models';

export type Language = 'ru' | 'en';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    language: <Language>'ru',
    error: '',
    highlightedFile: '',
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
    highlightFile: (state, { payload }: PayloadAction<FileInfo>) => (
      { ...state, highlightedFile: payload.id }
    ),
    clearHighlight: (state) => (
      { ...state, highlightedFile: '' }
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
  ).addMatcher(
    apiSlice.endpoints.updateFile.matchFulfilled,
    (state, { payload }) => (
      { ...state, highlightedFile: payload.id }
    ),
  ),
});

export const {
  setLanguage,
  setError,
  clearError,
  highlightFile,
  clearHighlight,
} = filesSlice.actions;
