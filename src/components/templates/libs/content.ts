import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { ContentMetaData } from '../types';


export async function getContentMetadata(slug: string): Promise<ContentMetaData | null> {
  try {
    const metadataPath = join(process.cwd(), 'src', 'components', 'templates', 'data', slug, 'metadata.json');

    if (!existsSync(metadataPath)) {
      return null;
    }

    const content = await readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(content);
    return metadata;
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
    return null;
  }
}

export async function getContentMarkdown(slug: string, locale: 'tr' | 'en'): Promise<string | null> {
  try {
    const filename = locale === 'tr' ? 'content.md' : 'content.en.md';
    const contentPath = join(process.cwd(), 'src', 'components', 'templates', 'data', slug, filename);

    if (!existsSync(contentPath)) {
      return null;
    }

    const content = await readFile(contentPath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return null;
  }
}
