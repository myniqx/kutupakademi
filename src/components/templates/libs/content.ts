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

export async function getContentMarkdown(slug: string): Promise<string | null> {
  try {
    const contentPath = join(process.cwd(), 'src', 'components', 'templates', 'data', slug, 'content.md');

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
