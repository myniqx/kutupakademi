import { slugify } from '@/lib/utils/slugify'

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);

      headings.push({ id, text: text.replace(/(^|\s)\*\*|\*\*($|\s)/g, '$1').trim(), level });
    }
  }

  return headings;
}
