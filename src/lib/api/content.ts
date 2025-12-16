import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export interface ContentMetadata {
  title: string;
  slug: string;
  date: string;
  lastModified?: string;
  description?: string;
  url: string;
}

export async function getContentMetadata(slug: string): Promise<ContentMetadata | null> {
  try {
    console.log('📖 Reading metadata for slug:', slug);
    const metadataPath = join(process.cwd(), 'data', slug, 'metadata.json');

    if (!existsSync(metadataPath)) {
      console.log('❌ Metadata file not found:', metadataPath);
      return null;
    }

    const content = await readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(content);
    console.log('✅ Metadata loaded:', metadata.title);
    return metadata;
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
    return null;
  }
}

export async function getContentMarkdown(slug: string): Promise<string | null> {
  try {
    console.log('📖 Reading content for slug:', slug);
    const contentPath = join(process.cwd(), 'data', slug, 'content.md');

    if (!existsSync(contentPath)) {
      console.log('❌ Content file not found:', contentPath);
      return null;
    }

    const content = await readFile(contentPath, 'utf-8');
    console.log('✅ Content loaded, length:', content.length);
    return content;
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return null;
  }
}

export function getImageUrl(slug: string, imageName: string): string {
  return `/api/data?slug=${slug}&image=${imageName}`;
}
