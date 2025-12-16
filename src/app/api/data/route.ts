import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    console.log('🌐 API /data called with slug:', slug);

    if (!slug) {
      console.log('❌ No slug provided');
      return NextResponse.json(
        { error: 'slug parameter is required' },
        { status: 400 }
      );
    }

    const dataDir = join(process.cwd(), 'data', slug);
    console.log('📁 Checking directory:', dataDir);

    if (!existsSync(dataDir)) {
      console.log('❌ Directory not found');
      return NextResponse.json(
        { error: 'Slug not found' },
        { status: 404 }
      );
    }

    const hasContent = searchParams.has('content');
    const hasMetadata = searchParams.has('metadata');
    const imageName = searchParams.get('image');

    console.log('📋 Request type:', { hasContent, hasMetadata, imageName });

    if (imageName) {
      const imagePath = join(dataDir, imageName);

      if (!existsSync(imagePath)) {
        return NextResponse.json(
          { error: 'Image not found' },
          { status: 404 }
        );
      }

      const imageBuffer = await readFile(imagePath);

      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': 'image/webp',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    if (hasContent) {
      const contentPath = join(dataDir, 'content.md');

      if (!existsSync(contentPath)) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        );
      }

      const content = await readFile(contentPath, 'utf-8');

      return new NextResponse(content, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
        },
      });
    }

    if (hasMetadata) {
      const metadataPath = join(dataDir, 'metadata.json');

      if (!existsSync(metadataPath)) {
        return NextResponse.json(
          { error: 'Metadata not found' },
          { status: 404 }
        );
      }

      const metadata = await readFile(metadataPath, 'utf-8');
      const metadataObj = JSON.parse(metadata);

      return NextResponse.json(metadataObj, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Please specify content, metadata, or image parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Data API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
