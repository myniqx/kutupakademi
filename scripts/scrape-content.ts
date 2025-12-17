import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { createWriteStream, existsSync } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import sharp from 'sharp';

interface BlogData {
  slug: string;
  author: string | null;
  keywords: string | null;
  title_tr: string;
  title_en: string | null;
  description_tr: string | null;
  description_en: string | null;
  summary_tr: string | null;
  summary_en: string | null;
  content_tr: string;
  content_en: string | null;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SchemaData {
  author?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  wordCount?: number;
}

async function downloadAndConvertImage(url: string, outputPath: string): Promise<void> {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'arraybuffer'
  });

  await sharp(response.data)
    .webp({ quality: 80 })
    .toFile(outputPath);
}

function extractSlugFromUrl(url: string): string {
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/').filter(Boolean);
  return pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
}

function extractSchemaData($: cheerio.CheerioAPI): SchemaData {
  const schemaData: SchemaData = {};

  try {
    const schemaScript = $('script[type="application/ld+json"]').first().html();
    if (schemaScript) {
      const schema = JSON.parse(schemaScript);
      const article = schema['@graph']?.find((item: { '@type': string }) => item['@type'] === 'Article');

      if (article) {
        schemaData.author = article.author?.name || null;
        schemaData.datePublished = article.datePublished || null;
        schemaData.dateModified = article.dateModified || null;
        schemaData.wordCount = article.wordCount || null;
        schemaData.keywords = article.keywords || [];
      }
    }
  } catch (error) {
    console.warn('Failed to parse schema.org data:', error);
  }

  return schemaData;
}

async function scrapeContent(url: string): Promise<void> {
  console.log(`Scraping: ${url}`);

  const slug = extractSlugFromUrl(url);
  const dataDir = join(process.cwd(), 'data', slug);

  await mkdir(dataDir, { recursive: true });
  console.log(`Created directory: ${dataDir}`);

  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  // Extract schema.org data
  const schemaData = extractSchemaData($);

  // Extract basic metadata
  const title = $('meta[property="og:title"]').attr('content') ||
                $('h1').first().text().trim() ||
                $('title').text().split('-')[0].trim();

  const description = $('meta[property="og:description"]').attr('content') ||
                      $('meta[name="description"]').attr('content') || '';

  // Remove unwanted elements before content extraction
  $('header').remove();
  $('footer').remove();
  $('nav').remove();
  $('[role="navigation"]').remove();
  $('script').remove();
  $('style').remove();
  $('noscript').remove();

  // Remove specific Elementor/WordPress elements
  $('a[href="#content"]').closest('.e-con').remove();
  $('a:contains("İçeriğe atla")').closest('.e-con').remove();
  $('a:contains("Ücretsiz Bilgi Alın")').closest('.e-con').remove();
  $('a[href*="tel:"]').closest('.e-con').remove();
  $('a[href*="mailto:"]').closest('.e-con').remove();
  $('[class*="breadcrumb"]').remove();

  // Remove Related Post section and everything after it
  $('h3:contains("Related Post")').parent().nextAll().remove();
  $('h3:contains("Related Post")').parent().remove();
  $('.elementor-widget-posts').closest('.e-con').remove();

  // Remove WhatsApp and floating buttons
  $('[class*="whatsapp"]').remove();
  $('[class*="floating"]').remove();
  $('.elementor-button').each((_, el) => {
    const text = $(el).text().toLowerCase();
    if (text.includes('iletişim') || text.includes('whatsapp') || text.includes('bilgi')) {
      $(el).closest('.e-con').remove();
    }
  });

  // Get main content - find the main content area (usually in main tag or specific elementor container)
  let mainContentHtml = $('main').html() || $('body').html() || '';
  const $mainContent = cheerio.load(mainContentHtml);

  // Additional cleanup in main content
  $mainContent('header').remove();
  $mainContent('footer').remove();
  $mainContent('nav').remove();
  $mainContent('[role="navigation"]').remove();
  $mainContent('script').remove();
  $mainContent('style').remove();
  $mainContent('[class*="breadcrumb"]').remove();
  $mainContent('a[href="#content"]').remove();
  $mainContent('.elementor-widget-posts').remove();

  // Unwrap blockquote - Elementor wraps content in blockquote
  // Extract content from blockquote and replace it with its inner HTML
  $mainContent('blockquote').each((_, element) => {
    const content = $mainContent(element).html();
    $mainContent(element).replaceWith(content || '');
  });

  // Process images
  const images: { url: string; filename: string }[] = [];
  let imageIndex = 0;

  $mainContent('img').each((_, element) => {
    let imgUrl = $mainContent(element).attr('src');

    // Handle srcset for better quality - get the highest resolution
    const srcset = $mainContent(element).attr('srcset');
    if (srcset) {
      // Parse srcset: "url1 300w, url2 768w, url3 150w"
      const sources = srcset.split(',').map(s => {
        const parts = s.trim().split(/\s+/);
        const url = parts[0];
        const widthMatch = parts[1]?.match(/(\d+)w/);
        const width = widthMatch ? parseInt(widthMatch[1]) : 0;
        return { url, width };
      });

      // Get the URL with the largest width
      const largest = sources.reduce((max, current) =>
        current.width > max.width ? current : max
      );

      imgUrl = largest.url || imgUrl;
    }

    if (imgUrl && imgUrl.startsWith('http')) {
      const filename = imageIndex === 0 ? 'featured-image.webp' : `image-${imageIndex}.webp`;
      images.push({ url: imgUrl, filename });
      $mainContent(element).attr('src', `./${filename}`);
      $mainContent(element).removeAttr('srcset');
      $mainContent(element).removeAttr('sizes');
      imageIndex++;
    }
  });

  // Download images
  for (const image of images) {
    const imagePath = join(dataDir, image.filename);
    try {
      await downloadAndConvertImage(image.url, imagePath);
      console.log(`Downloaded & converted: ${image.filename}`);
    } catch (error) {
      console.error(`Failed to download ${image.url}:`, error);
    }
  }

  // Convert tables to markdown manually before turndown
  $mainContent('table').each((_, tableEl) => {
    const rows: string[][] = [];

    // Process all rows
    $mainContent(tableEl).find('tr').each((_, tr) => {
      const cells: string[] = [];
      $mainContent(tr).find('th, td').each((_, cell) => {
        cells.push($mainContent(cell).text().trim());
      });
      if (cells.length > 0) {
        rows.push(cells);
      }
    });

    if (rows.length > 0) {
      // Build markdown table
      const colCount = Math.max(...rows.map(r => r.length));
      let markdownTable = '\n\n';

      // Header row (first row)
      markdownTable += '| ' + rows[0].map(cell => cell || ' ').join(' | ') + ' |\n';

      // Separator
      markdownTable += '| ' + Array(colCount).fill('---').join(' | ') + ' |\n';

      // Body rows
      for (let i = 1; i < rows.length; i++) {
        markdownTable += '| ' + rows[i].map(cell => cell || ' ').join(' | ') + ' |\n';
      }

      markdownTable += '\n';

      // Replace table with markdown
      $mainContent(tableEl).replaceWith(markdownTable);
    }
  });

  // Convert to markdown
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '_',
    strongDelimiter: '**',
    bulletListMarker: '-',
  });

  turndownService.remove(['script', 'style', 'noscript', 'iframe']);

  let markdown = turndownService.turndown($mainContent.html() || '');

  // Clean up markdown content
  markdown = markdown
    .replace(/\[İçeriğe atla\]\(#content\)\s*/g, '')
    .replace(/Hızlı İletişim Hattı\s*$/g, '')
    .replace(/^\s*[\r\n]/gm, '\n') // Remove empty lines at start
    .trim();

  // Generate summary from first paragraph or description
  const firstParagraph = $mainContent('p').first().text().trim();
  const summary = firstParagraph.length > 200
    ? firstParagraph.substring(0, 200) + '...'
    : firstParagraph || description;

  // Save content.md separately
  await writeFile(join(dataDir, 'content.md'), markdown, 'utf-8');
  console.log('Saved: content.md');

  // Build blog data according to schema
  const blogData: BlogData = {
    slug,
    author: schemaData.author || 'Kutup Akademi',
    keywords: schemaData.keywords?.join(', ') || null,
    title_tr: title,
    title_en: null,
    description_tr: description || null,
    description_en: null,
    summary_tr: summary || null,
    summary_en: null,
    content_tr: markdown,
    content_en: null,
    coverImage: null,
    published: false,
    createdAt: schemaData.datePublished || new Date().toISOString(),
    updatedAt: schemaData.dateModified || new Date().toISOString(),
  };

  // Save metadata
  await writeFile(join(dataDir, 'blog-data.json'), JSON.stringify(blogData, null, 2), 'utf-8');
  console.log('Saved: blog-data.json');

  console.log(`\nSuccessfully scraped: ${title}`);
  console.log(`Data saved to: ${dataDir}`);
  console.log(`Images downloaded: ${images.length}`);
  if (schemaData.wordCount) {
    console.log(`Word count: ${schemaData.wordCount}`);
  }
}

const url = process.argv[2];

if (!url) {
  console.error('Usage: pnpm scrape <url>');
  process.exit(1);
}

scrapeContent(url).catch(error => {
  console.error('Scraping failed:', error);
  process.exit(1);
});
