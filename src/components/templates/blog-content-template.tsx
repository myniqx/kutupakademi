import { BlogPreviewTemplate } from '@/components/blog/blog-preview-template';
import { BlogGrid } from '@/components/blog/blog-grid';
import { CTASection } from '@/components/sections/cta-section';
import Image from 'next/image';
import { Clock, Calendar, User } from 'lucide-react';
import { ContentMetaData } from './types';
import type { Blog } from '@/db/schema';

type BlogContentTemplateProps = {
  metadata: ContentMetaData;
  content: string;
  locale: 'tr' | 'en';
  author?: string | null;
  relatedBlogs?: Blog[];
};

function calculateReadingTime(content: string, locale: 'tr' | 'en'): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return locale === 'tr' ? `${minutes} dk okuma` : `${minutes} min read`;
}

function getCoverImagePath(metadata: ContentMetaData): string {
  // If cover is a full URL (starts with http/https), use it directly
  if (metadata.cover && (metadata.cover.startsWith('http://') || metadata.cover.startsWith('https://'))) {
    return metadata.cover;
  }

  // If cover is a relative path, prepend with /blogs/{slug}/
  const slug = metadata?.slug;
  if (metadata.cover && slug) {
    return `/blogs/${slug}/${metadata.cover}`;
  }

  return '/blogs/blog-cover.webp';
}

export async function BlogContentTemplate({
  metadata,
  content,
  locale,
  author,
  relatedBlogs = [],
}: BlogContentTemplateProps) {
  const coverImage = getCoverImagePath(metadata);
  const readingTime = calculateReadingTime(content, locale);
  const title = metadata[locale]?.title || (locale === 'tr' ? 'Blog' : 'Blog');
  const description = metadata[locale]?.description || '';
  const authorName = author || 'KutupAkademi';

  const formattedDate = metadata.date
    ? new Date(metadata.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : null;

  const relatedPostsTitle = locale === 'tr' ? 'İlgili Blog Yazıları' : 'Related Posts';
  const authorLabel = locale === 'tr' ? 'Yazar:' : 'Author:';

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </section>

      {/* Title and Meta Information */}
      <section className="relative -mt-32 md:-mt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground leading-tight">
              {title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted-foreground mb-8">
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formattedDate}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{readingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{authorLabel} {authorName}</span>
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-12">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <BlogPreviewTemplate content={content} />

      {/* Premium CTA Section */}
      <CTASection locale={locale} />

      {/* Related Blog Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {relatedPostsTitle}
            </h2>
            <BlogGrid blogs={relatedBlogs} locale={locale} max={3} />
          </div>
        </section>
      )}
    </div>
  );
}
