import { createEntityAdapter, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fileNew, fileEdited, fileDeleted } from './actions';
import { FileInfo } from './models';
import type { RootState } from './store';
import { apiSlice } from './apiSlice';

const filesAdapter = createEntityAdapter<FileInfo>();

export const filesSlice = createSlice({
  name: 'files',
  initialState: filesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fileDeleted, filesAdapter.removeOne)
      .addMatcher(isAnyOf(fileNew, fileEdited), filesAdapter.upsertOne)
      .addMatcher(apiSlice.endpoints.listFiles.matchFulfilled, (state, { payload }) =>
        filesAdapter.upsertMany(state, payload),
      ),
});

export const filesSelectors = filesAdapter.getSelectors<RootState>((state) => state.files);
