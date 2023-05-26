import { createAction } from '@reduxjs/toolkit';
import { AuthResponse, FileInfo, Language } from './models';

export const authLogout = createAction('auth/logout');
export const authFailed = createAction('auth/failed');
export const authRestored = createAction<AuthResponse>('auth/restored');

export const fileNew = createAction<FileInfo>('file/new');
export const fileEdited = createAction<FileInfo>('file/edited');
export const fileDeleted = createAction<string>('file/deleted');
export const fileDrop = createAction<FileInfo>('file/drop');
export const fileDropHandled = createAction('file/drop/handled');

export const filesLanguageSwitched = createAction<Language>('files/language/switch');
