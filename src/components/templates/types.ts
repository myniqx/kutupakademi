export interface ContentMetaData {
  date: string;
  lastModified: string;
  slug: string;
  cover?: string;
  tr: {
    title: string;
    "description": string;
  };
  en: {
    title: string;
    "description": string;
  };
}
