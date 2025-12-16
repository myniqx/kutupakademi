import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { createWriteStream, existsSync } from 'fs';
import { join } from 'path';
import { pipeline } from 'stream/promises';
import sharp from 'sharp';

interface Metadata {
  title: string;
  slug: string;
  date: string;
  lastModified?: string;
  description?: string;
  url: string;
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

async function scrapeContent(url: string): Promise<void> {
  console.log(`Scraping: ${url}`);

  const slug = extractSlugFromUrl(url);
  const dataDir = join(process.cwd(), 'data', slug);

  await mkdir(dataDir, { recursive: true });
  console.log(`Created directory: ${dataDir}`);

  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const title = $('meta[property="og:title"]').attr('content') ||
                $('h1').first().text().trim() ||
                $('title').text().split('-')[0].trim();

  const lastModified = $('meta[property="article:modified_time"]').attr('content') || '';
  const description = $('meta[property="og:description"]').attr('content') ||
                      $('meta[name="description"]').attr('content') || '';

  const date = lastModified;

  const metadata: Metadata = {
    title,
    slug,
    date,
    lastModified,
    description,
    url
  };

  $('header').remove();
  $('footer').remove();
  $('nav').remove();
  $('[role="navigation"]').remove();
  $('a[href="#content"]').closest('.e-con').remove();
  $('a:contains("İçeriğe atla")').closest('.e-con').remove();
  $('a:contains("Ücretsiz Bilgi Alın")').closest('.e-con').remove();

  const article = $('article').first();
  const $mainContent = cheerio.load(article.html() || $('main').html() || $('body').html() || '');

  $mainContent('[class*="breadcrumb"]').remove();
  $mainContent('a[href*="tel:"]').closest('.e-con').remove();
  $mainContent('a[href*="mailto:"]').closest('.e-con').remove();
  $mainContent('a[href="#content"]').remove();
  $mainContent('a:contains("İçeriğe atla")').remove();

  const images: { url: string; filename: string }[] = [];
  let imageIndex = 0;

  $mainContent('img').each((_, element) => {
    const imgUrl = $mainContent(element).attr('src');
    if (imgUrl && imgUrl.startsWith('http')) {
      const filename = imageIndex === 0 ? 'featured-image.webp' : `image-${imageIndex}.webp`;
      images.push({ url: imgUrl, filename });
      $mainContent(element).attr('src', `./${filename}`);
      imageIndex++;
    }
  });

  for (const image of images) {
    const imagePath = join(dataDir, image.filename);
    try {
      await downloadAndConvertImage(image.url, imagePath);
      console.log(`Downloaded & converted: ${image.filename}`);
    } catch (error) {
      console.error(`Failed to download ${image.url}:`, error);
    }
  }

  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });

  turndownService.remove(['script', 'style', 'noscript', 'iframe']);

  const markdown = turndownService.turndown($mainContent.html() || '');

  await writeFile(join(dataDir, 'content.md'), markdown, 'utf-8');
  console.log('Saved: content.md');

  await writeFile(join(dataDir, 'metadata.json'), JSON.stringify(metadata, null, 2), 'utf-8');
  console.log('Saved: metadata.json');

  console.log(`\nSuccessfully scraped: ${title}`);
  console.log(`Data saved to: ${dataDir}`);
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
