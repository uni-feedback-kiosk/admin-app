import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authFailed, authLogout, authRestored } from './actions';
import { AuthResponse } from './models';
import { apiSlice } from './apiSlice';

export const initialState: Partial<AuthResponse> = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(isAnyOf(authFailed, authLogout), (state) => ({
        ...state,
        access_token: undefined,
      }))
      .addMatcher(
        isAnyOf(apiSlice.endpoints.authenticate.matchFulfilled, authRestored),
        (state, { payload }) => ({
          ...state,
          ...payload,
        }),
      ),
});
