import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setLanguage, setError, clearError } = filesSlice.actions;
