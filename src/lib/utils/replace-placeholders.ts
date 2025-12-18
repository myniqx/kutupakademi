import { SITE_CONFIG } from '@/constants/site';

export function replacePlaceholders(content: string, locale: 'tr' | 'en'): string {
  return content
    .replace(/\{\{companyName\}\}/g, SITE_CONFIG.name[locale])
    .replace(/\{\{email\}\}/g, SITE_CONFIG.contact.email)
    .replace(/\{\{phone\}\}/g, SITE_CONFIG.contact.phone)
    .replace(/\{\{address\}\}/g, SITE_CONFIG.contact.address[locale]);
}
