import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXImage } from '@/components/mdx/mdx-image';
import { H2, H3 } from '@/components/mdx/mdx-headings';
import { TableOfContents } from '@/components/ui/table-of-contents';
import { CTASection } from '@/components/sections/cta-section';
import { extractHeadings } from '@/lib/markdown/extract-headings';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { ContentMetaData } from './types';
import remarkGfm from 'remark-gfm';

type ServiceContentTemplateProps = {
  metadata: ContentMetaData;
  content: string;
  locale: 'tr' | 'en';
};

function calculateReadingTime(content: string, locale: 'tr' | 'en'): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return locale === 'tr' ? `${minutes} dk okuma` : `${minutes} min read`;
}

function getCoverImagePath(metadata: ContentMetaData): string {
  const slug = metadata?.slug;
  if (metadata.cover && slug) {
    return `/blogs/${slug}/${metadata.cover}`;
  }
  return '/blogs/blog-cover.webp';
}

export async function ServiceContentTemplate({
  metadata,
  content,
  locale,
}: ServiceContentTemplateProps) {
  const headings = extractHeadings(content);
  const coverImage = getCoverImagePath(metadata);
  const readingTime = calculateReadingTime(content, locale);
  const title = metadata[locale]?.title || (locale === 'tr' ? 'Blog' : 'Blog');
  const description = metadata[locale]?.description || '';

  const components = {
    img: (props: object) => <MDXImage {...props} slug={metadata.slug} />,
    h2: H2,
    h3: H3,
    table: (props: object) => (
      <div className="overflow-x-auto my-8">
        <table className="min-w-full divide-y divide-border border border-border rounded-lg" {...props} />
      </div>
    ),
    thead: (props: object) => <thead className="bg-muted/50" {...props} />,
    tbody: (props: object) => <tbody className="divide-y divide-border bg-background" {...props} />,
    tr: (props: object) => <tr className="hover:bg-muted/30 transition-colors" {...props} />,
    th: (props: object) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
    ),
    td: (props: object) => (
      <td className="px-4 py-3 text-sm text-foreground/80" {...props} />
    ),
  };

  const formattedDate = metadata.date
    ? new Date(metadata.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : null;

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

      {/* Premium Content Section */}
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Table of Contents - Left Sidebar */}
            <aside className="lg:col-span-3 mt-20">
              <TableOfContents headings={headings} />
            </aside>

            {/* Main Article Content */}
            <article className="lg:col-span-9">
              {/* Custom Premium Prose Styling */}
              <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none
            prose-headings:scroll-mt-20
            prose-headings:font-bold
            prose-headings:tracking-tight

            prose-h1:text-5xl prose-h1:mb-8 prose-h1:mt-16
            prose-h1:bg-linear-to-br prose-h1:from-foreground prose-h1:to-foreground/70
            prose-h1:bg-clip-text prose-h1:text-transparent

            prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-16
            prose-h2:bg-linear-to-br prose-h2:from-foreground prose-h2:to-foreground/80
            prose-h2:bg-clip-text prose-h2:text-transparent
            prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-4

            prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-12
            prose-h3:text-foreground/90

            prose-p:text-lg prose-p:leading-relaxed prose-p:text-foreground/80
            prose-p:mb-6

            prose-a:text-primary prose-a:font-medium prose-a:no-underline
            prose-a:underline-offset-4 hover:prose-a:underline
            prose-a:transition-all

            prose-strong:text-foreground prose-strong:font-semibold

            prose-ul:my-8 prose-ul:space-y-3
            prose-li:text-foreground/80 prose-li:leading-relaxed

            prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12
            prose-img:border prose-img:border-border/50

            prose-blockquote:border-l-4 prose-blockquote:border-primary/50
            prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6
            prose-blockquote:rounded-r-lg prose-blockquote:italic
            prose-blockquote:text-foreground/70

            prose-table:my-8 prose-table:border-collapse
            prose-th:bg-muted/50 prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold
            prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3
            prose-thead:border-b-2 prose-thead:border-border
            prose-tr:hover:bg-muted/30 prose-tr:transition-colors">
                <MDXRemote
                  source={content}
                  components={components}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                    },
                  }}
                />
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Premium CTA Section */}
      <CTASection locale={locale} />
    </div>
  );
}
