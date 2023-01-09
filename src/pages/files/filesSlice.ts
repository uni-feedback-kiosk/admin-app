import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileInfo } from '../../data/api/types';

export const filesSlice = createSlice({
  name: 'files',
  initialState: {
    files: <FileInfo[]>[],
  },
  reducers: {
    load: (state, { payload }: PayloadAction<FileInfo[]>) => (
      { ...state, files: payload }
    ),
    deleteFile: (state, { payload }: PayloadAction<FileInfo>) => (
      {
        ...state,
        files: state.files.filter(
          ({ id }) => id !== payload.id,
        ),
      }
    ),
    update: (state, { payload }: PayloadAction<FileInfo>) => (
      {
        ...state,
        files: state.files.map(
          (file) => file.id === payload.id ? payload : file,
        ),
      }
    ),
  },
});

export const { load, deleteFile, update } = filesSlice.actions;
