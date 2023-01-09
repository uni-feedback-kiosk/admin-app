import { configureStore } from '@reduxjs/toolkit';
import { filesSlice } from '../pages/files/filesSlice';
import { authSlice } from './authSlice';
import { errorSlice } from './errorSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    files: filesSlice.reducer,
    error: errorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
