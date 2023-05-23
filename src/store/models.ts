export interface AuthBody {
  username: string;
  password: string;
}

export type Language = 'ru' | 'en';

export interface AuthResponse {
  access_token: string;
}

export interface FileInfo {
  id: string;
  filename: string;
  content_type: string;
  description: FileDescription;
}

export type FileDescription = {
  [x in Language]: string;
};

export type FileDownloadQuery = Pick<FileInfo, 'id' | 'filename'>;

export type FileUpdate = Pick<FileInfo, 'id'> &
  Partial<Omit<FileInfo, 'id'>> & { description: Partial<FileDescription> };
