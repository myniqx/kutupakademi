import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXImage } from '@/components/mdx/mdx-image';
import { H2, H3 } from '@/components/mdx/mdx-headings';
import { TableOfContents } from '@/components/ui/table-of-contents';
import { GlowButton } from '@/components/ui/glow-button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { ContentMetadata } from '@/lib/api/content';
import { extractHeadings } from '@/lib/markdown/extract-headings';

type ServiceContentTemplateProps = {
  metadata: ContentMetadata;
  content: string;
  locale: 'tr' | 'en';
};

export async function ServiceContentTemplate({
  metadata,
  content,
  locale,
}: ServiceContentTemplateProps) {
  const headings = extractHeadings(content);

  const components = {
    img: (props: any) => <MDXImage {...props} slug={metadata.slug} />,
    h2: H2,
    h3: H3,
  };

  const formattedDate = metadata.date
    ? new Date(metadata.date).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />

        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium Title with Gradient */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              {metadata.title}
            </h1>

            {/* Elegant Description */}
            {metadata.description && (
              <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto font-light leading-relaxed">
                {metadata.description}
              </p>
            )}

            {/* Metadata Pills */}
            {formattedDate && (
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{formattedDate}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Premium Content Section */}
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Table of Contents - Left Sidebar */}
            <aside className="lg:col-span-3">
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
            prose-h1:bg-gradient-to-br prose-h1:from-foreground prose-h1:to-foreground/70
            prose-h1:bg-clip-text prose-h1:text-transparent

            prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-16
            prose-h2:bg-gradient-to-br prose-h2:from-foreground prose-h2:to-foreground/80
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
            prose-blockquote:text-foreground/70">
                <MDXRemote source={content} components={components} />
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Premium CTA Section */}
      <section className="relative overflow-hidden border-t border-border/50">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.1),transparent_50%)]" />

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Premium Heading */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {locale === 'tr' ? 'Profesyonel Destek' : 'Professional Support'}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {locale === 'tr'
                ? 'Projeniz İçin Hemen Başlayın'
                : 'Get Started on Your Project'}
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              {locale === 'tr'
                ? 'Uzman ekibimiz size özel çözümler sunmak için hazır. Detaylı bilgi ve fiyat teklifi için iletişime geçin.'
                : 'Our expert team is ready to provide customized solutions. Contact us for detailed information and quotes.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton asChild mode="border" intensity="high" size="lg" className="text-base">
                <Link href="/fiyat-talebi">
                  {locale === 'tr' ? 'Ücretsiz Teklif Alın' : 'Get Free Quote'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GlowButton>
              <GlowButton asChild mode="background" intensity="medium" size="lg" variant="outline" className="text-base">
                <Link href="/iletisim">
                  {locale === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}
                </Link>
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Bar - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg p-4 z-50">
        <div className="container mx-auto">
          <GlowButton asChild mode="border" intensity="medium" size="lg" className="w-full">
            <Link href="/fiyat-talebi">
              {locale === 'tr' ? 'Teklif Al' : 'Get Quote'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </GlowButton>
        </div>
      </div>
    </div>
  );
}
