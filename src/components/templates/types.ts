import type { Heading } from '@/lib/markdown/extract-headings'

export interface ContentMetaData {
  date: string;
  lastModified: string;
  slug: string;
  cover?: string;
  readingTime: string;
  headings: Heading[];
  tr: {
    title: string;
    "description": string;
  };
  en: {
    title: string;
    "description": string;
  };
}
