import { createSlice } from '@reduxjs/toolkit';
import { fileDrop, fileDropHandled, filesLanguageSwitched } from './actions';
import { FileInfo, Language } from './models';

type FilesState = { language: Language; droppedFile?: FileInfo };
export const initialState: FilesState = { language: 'en' };

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(filesLanguageSwitched, (state, { payload: language }) => ({
        ...state,
        language,
      }))
      .addCase(fileDrop, (state, { payload: droppedFile }) => ({
        ...state,
        droppedFile,
      }))
      .addCase(fileDropHandled, (state) => ({
        ...state,
        droppedFile: undefined,
      })),
});
