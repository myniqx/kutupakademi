import { MDXRemote } from 'next-mdx-remote/rsc';
import { MDXImage } from '@/components/mdx/mdx-image';
import { GlowButton } from '@/components/ui/glow-button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { ContentMetadata } from '@/lib/api/content';

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
  const components = {
    img: (props: any) => <MDXImage {...props} slug={metadata.slug} />,
  };

  const formattedDate = metadata.date
    ? new Date(metadata.date).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : null;

  const formattedModified = metadata.lastModified
    ? new Date(metadata.lastModified).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-linear-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              {metadata.title}
            </h1>

            {metadata.description && (
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {metadata.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
              )}
              {formattedModified && formattedModified !== formattedDate && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Güncelleme: {formattedModified}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <GlowButton asChild mode="border" intensity="medium" size="lg">
                <Link href="/fiyat-talebi">
                  {locale === 'tr' ? 'Fiyat Teklifi Al' : 'Get Quote'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </GlowButton>
              <GlowButton asChild mode="background" intensity="low" size="lg" variant="outline">
                <Link href="/iletisim">
                  {locale === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                </Link>
              </GlowButton>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto prose prose-lg prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-base prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg">
          <MDXRemote source={content} components={components} />
        </article>
      </div>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {locale === 'tr'
                ? 'Hizmetimiz hakkında daha fazla bilgi almak ister misiniz?'
                : 'Would you like more information about our service?'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {locale === 'tr'
                ? 'Size özel fiyat teklifi almak ve detaylı bilgi için bizimle iletişime geçin.'
                : 'Contact us for a personalized quote and detailed information.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton asChild mode="border" intensity="medium" size="lg">
                <Link href="/fiyat-talebi">
                  {locale === 'tr' ? 'Fiyat Teklifi Al' : 'Get Quote'}
                </Link>
              </GlowButton>
              <GlowButton asChild mode="background" intensity="low" size="lg" variant="outline">
                <Link href="/iletisim">
                  {locale === 'tr' ? 'İletişime Geç' : 'Contact Us'}
                </Link>
              </GlowButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
