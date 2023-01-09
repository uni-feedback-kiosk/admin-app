export interface FileInfo {
  id: string;
  filename: string;
  content_type: string
  description: {
    ru: string;
    en: string;
  }
}

export interface FileDescriptionUpdate {
  ru?: string,
  en?: string;
}

export interface FileUpdate {
  description?: FileDescriptionUpdate;
  name?: string;
}

export type EmptyResponse = '';
