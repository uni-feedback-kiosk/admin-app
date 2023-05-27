import { Language } from '../../store/models';

export const languages: Record<Language, string> = {
  en: 'English',
  ru: 'Russian',
};

export const languageNames = Object.entries(languages);
