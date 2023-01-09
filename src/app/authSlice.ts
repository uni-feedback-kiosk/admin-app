import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setToken, clearToken } = authSlice.actions;
