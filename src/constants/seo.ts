import { Metadata } from 'next';
import { SITE_CONFIG } from './site';

type MetadataParams = {
  title?: string | null;
  description?: string | null;
  keywords?: string[];
  locale?: 'tr' | 'en';
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  // Article-specific fields
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export const DEFAULT_SEO = {
  title: {
    tr: 'Kutup Akademi - Akademik Çalışma Desteği ve SPSS Analizi',
    en: 'Kutup Akademi - Academic Study Support and SPSS Analysis',
  },
  description: {
    tr: 'Tez, makale, proje danışmanlığı, SPSS veri analizi, akademik İngilizce ve araştırma metodolojisi konularında profesyonel destek hizmetleri.',
    en: 'Professional support services in thesis, article, project consulting, SPSS data analysis, academic English, and research methodology.',
  },
  keywords: {
    tr: [
      'SPSS analizi',
      'tez danışmanlığı',
      'akademik danışmanlık',
      'veri analizi',
      'yapısal eşitlik modellemesi',
      'meta analiz',
      'akademik İngilizce',
      'MAXQDA',
      'bibliyometrik analiz',
    ],
    en: [
      'SPSS analysis',
      'thesis consulting',
      'academic consulting',
      'data analysis',
      'structural equation modeling',
      'meta analysis',
      'academic English',
      'MAXQDA',
      'bibliometric analysis',
    ],
  },
} as const;

export function generateMeta({
  title = null,
  description = null,
  keywords = [],
  locale = 'tr',
  path = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: MetadataParams = {}): Metadata {
  const siteTitle = title || DEFAULT_SEO.title[locale];
  const siteDescription = description || DEFAULT_SEO.description[locale];
  const siteKeywords = keywords.length > 0 ? keywords : [...DEFAULT_SEO.keywords[locale]];
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || `${SITE_CONFIG.url}/og-image.jpg`;

  const openGraphBase = {
    title: siteTitle,
    description: siteDescription,
    url,
    siteName: SITE_CONFIG.name[locale],
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
    locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    type,
  };

  // Article-specific Open Graph fields ekle
  const openGraph = type === 'article' && (publishedTime || modifiedTime || authors)
    ? {
        ...openGraphBase,
        ...(publishedTime && { publishedTime }),
        ...(modifiedTime && { modifiedTime }),
        ...(authors && { authors }),
      }
    : openGraphBase;

  return {
    title: siteTitle,
    description: siteDescription,
    keywords: siteKeywords,
    authors: authors?.map(name => ({ name })) || [{ name: SITE_CONFIG.name[locale] }],
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
      languages: {
        'tr': locale === 'tr' ? url : `${SITE_CONFIG.url}${path}`,
        'en': locale === 'en' ? url : `${SITE_CONFIG.url}/en${path}`,
        'x-default': `${SITE_CONFIG.url}${path}`,
      },
    },
  };
}
