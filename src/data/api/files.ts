import axios from 'axios';
import { EmptyResponse, FileInfo, FileUpdate } from './types';

const { FILES_API_PORT } = process.env;
const FILES_API_ROOT = `http://${window.location.hostname}:${FILES_API_PORT}`;

export const listFiles = async (token: string) =>
  axios.get<FileInfo[]>(`${FILES_API_ROOT}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getFile = async (token: string, id: string) =>
  axios.get<Blob>(`${FILES_API_ROOT}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });

export const updateFile = async (token: string, id: string, update: FileUpdate) =>
  axios.patch<FileInfo>(`${FILES_API_ROOT}/${id}`, update, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFile = async (token: string, id: string) =>
  axios.delete<EmptyResponse>(`${FILES_API_ROOT}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addFile = async (token: string, file: Blob) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post<FileInfo>(`${FILES_API_ROOT}/new`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};
