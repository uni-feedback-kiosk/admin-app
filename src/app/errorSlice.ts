import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: '',
  reducers: {
    setError: (_state, { payload }: PayloadAction<string>) => (payload),
    clearError: (_state) => (''),
  },
});

export const { setError, clearError } = errorSlice.actions;
