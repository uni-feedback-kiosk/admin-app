import { createSlice } from '@reduxjs/toolkit';
import { filesLanguageSwitched } from './actions';
import { Language } from './models';

type FilesState = { language: Language };
export const initialState: FilesState = { language: 'en' };

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(filesLanguageSwitched, (state, { payload: language }) => ({
      ...state,
      language,
    })),
});
