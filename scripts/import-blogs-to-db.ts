import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { blogs, images } from '../src/db/schema';
import sharp from 'sharp';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const databaseUrl = process.env.POSTGRES_URL!;

// Supabase client with service role (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database client
const client = postgres(databaseUrl);
const db = drizzle(client);

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

async function uploadImage(slug: string, filename: string, filePath: string): Promise<string | null> {
  try {
    // Read the image file
    const fileBuffer = await readFile(filePath);
    const fileSize = fileBuffer.length;

    // Get image dimensions using sharp
    const metadata = await sharp(fileBuffer).metadata();
    const width = metadata.width;
    const height = metadata.height;

    // Create storage filename: {slug}-{image-name}.webp
    const storageFilename = `${slug}-${filename}`;

    // Upload to Supabase Storage (images bucket)
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(storageFilename, fileBuffer, {
        contentType: 'image/webp',
        upsert: true // Overwrite if exists
      });

    if (uploadError) {
      console.error(`  ✗ Failed to upload ${filename}:`, uploadError.message);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(storageFilename);

    // Save to images table (insert or skip if exists)
    try {
      await db.insert(images).values({
        filename: storageFilename,
        url: publicUrl,
        alt: `${slug} - ${filename}`,
        width: width?.toString() || null,
        height: height?.toString() || null,
        size: fileSize.toString(),
        mimeType: 'image/webp',
      });
    } catch (dbError: any) {
      // If duplicate, that's okay - image already exists in DB
      if (dbError.code !== '23505') {
        console.warn(`  ⚠ DB insert warning for ${storageFilename}: ${dbError.message}`);
      }
    }

    console.log(`  ✓ Uploaded: ${storageFilename} (${width}x${height})`);
    return publicUrl;
  } catch (error) {
    console.error(`  ✗ Error uploading ${filename}:`, error);
    return null;
  }
}

async function importBlog(slug: string) {
  console.log(`\nProcessing: ${slug}`);

  const dataDir = join(process.cwd(), 'data', slug);

  try {
    // Read blog-data.json
    const blogDataPath = join(dataDir, 'blog-data.json');
    const blogDataContent = await readFile(blogDataPath, 'utf-8');
    const blogData: BlogData = JSON.parse(blogDataContent);

    // Read content.md
    const contentPath = join(dataDir, 'content.md');
    let content = await readFile(contentPath, 'utf-8');

    // Find all images in the directory
    const files = await readdir(dataDir);
    const imageFiles = files.filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));

    console.log(`  Found ${imageFiles.length} image(s)`);

    // Upload images and build replacement map
    const imageMap: Record<string, string> = {};
    let featuredImageUrl: string | null = null;

    for (const imageFile of imageFiles) {
      const imagePath = join(dataDir, imageFile);
      const publicUrl = await uploadImage(slug, imageFile, imagePath);

      if (publicUrl) {
        imageMap[`./${imageFile}`] = publicUrl;

        // Save featured image URL
        if (imageFile === 'featured-image.webp') {
          featuredImageUrl = publicUrl;
        }
      }
    }

    // Replace image paths in content
    for (const [localPath, publicUrl] of Object.entries(imageMap)) {
      content = content.replace(new RegExp(localPath.replace(/\./g, '\\.'), 'g'), publicUrl);
    }

    // Insert into database
    console.log(`  Inserting blog: ${blogData.slug}`);
    console.log(`    - Title: ${blogData.title_tr.substring(0, 40)}...`);
    console.log(`    - Cover: ${featuredImageUrl ? 'SET' : 'NULL'}`);
    console.log(`    - Content length: ${content.length} chars`);

    await db.insert(blogs).values({
      slug: blogData.slug,
      author: blogData.author,
      keywords: blogData.keywords,
      title_tr: blogData.title_tr,
      title_en: blogData.title_en,
      description_tr: blogData.description_tr,
      description_en: blogData.description_en,
      summary_tr: blogData.summary_tr,
      summary_en: blogData.summary_en,
      content_tr: content, // Updated content with real URLs
      content_en: blogData.content_en,
      coverImage: featuredImageUrl, // Featured image URL
      published: false, // Keep as draft
      createdAt: new Date(blogData.createdAt),
      updatedAt: new Date(blogData.updatedAt),
    });

    console.log(`  ✓ Imported to database`);
    return { success: true, slug };
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string; detail?: string; column?: string };
    const errorObj = error as { cause?: { code?: string; message?: string; detail?: string } };

    // Check both error.code and error.cause.code for duplicate
    const errorCode = err.code || errorObj.cause?.code;

    if (errorCode === '23505') { // Unique constraint violation
      console.log(`  ⊙ Already exists (skipping)`);
      return { success: false, slug, reason: 'exists' };
    }

    // Get error message from cause or direct error
    let errorMsg = 'Unknown error';

    if (errorObj.cause?.message) {
      errorMsg = errorObj.cause.message.substring(0, 150);
    } else if (err.message) {
      errorMsg = err.message.substring(0, 150);
    }

    console.error(`  ✗ ${errorMsg}`);

    return { success: false, slug, reason: errorMsg };
  }
}

async function main() {
  console.log('🚀 Starting blog import process...\n');

  const dataDir = join(process.cwd(), 'data');
  const allItems = await readdir(dataDir, { withFileTypes: true });

  // Filter only directories, exclude 'completed' folder
  const slugs = allItems
    .filter(item => item.isDirectory() && item.name !== 'completed')
    .map(item => item.name);

  console.log(`Found ${slugs.length} blog(s) to import\n`);

  const results = {
    success: [] as string[],
    failed: [] as { slug: string; reason: string }[],
    skipped: [] as string[]
  };

  for (const slug of slugs) {
    const result = await importBlog(slug);
    if (result.success) {
      results.success.push(slug);
    } else if (result.reason === 'exists') {
      results.skipped.push(slug);
    } else {
      results.failed.push({ slug, reason: result.reason || 'Unknown error' });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Import Summary:');
  console.log(`  ✓ Successfully imported: ${results.success.length}`);
  console.log(`  ⊙ Skipped (already exists): ${results.skipped.length}`);
  console.log(`  ✗ Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\n❌ Failed Blogs:');
    results.failed.forEach(({ slug, reason }) => {
      console.log(`  - ${slug}`);
      console.log(`    Reason: ${reason}`);
    });
  }

  console.log('='.repeat(60));

  await client.end();
}

main().catch(console.error);
