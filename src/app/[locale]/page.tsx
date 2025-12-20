import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/home/hero-section';
import { TechnologyPartners } from '@/components/home/technology-partners';
import { ServiceCard } from '@/components/home/service-card';
import { ProcessSteps } from '@/components/home/process-steps';
import { StatsSection } from '@/components/home/stats-section';
import { Testimonials } from '@/components/home/testimonials';
import { HOMEPAGE } from '@/constants/homepage';
import { LogoPlaceholder } from '@/components/ui/logo-placeholder';
import { BlogGrid } from '@/components/blog/blog-grid';
import { getBlogCards } from '@/lib/query/blog';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

type HomeProps = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  const recentBlogs = await getBlogCards({ locale, max: 3 });

  return (
    <div className="flex min-h-screen flex-col bg-background">

      {/* Hero Section */}
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        primaryCta={{
          label: t('hero.cta.primary'),
          href: '/iletisim',
        }}
        secondaryCta={{
          label: t('hero.cta.secondary'),
          href: '/hizmetler',
        }}
      />

      {/* Combined Section 2 & 3 */}
      <section className="min-h-screen flex flex-col bg-muted/30 relative z-10">
        <LogoPlaceholder id="partners-logo" w={240} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Technology Partners - 50% height */}
        <TechnologyPartners className="min-h-[50vh] relative z-50" />

        {/* About Section - 50% height */}
        <div className="min-h-[50vh] flex items-center py-16 md:py-24 relative z-50">
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                {t('about.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Section 4 */}
      <section className="min-h-screen flex items-center py-16 md:py-24 relative z-10">

        <div className="container mx-auto px-4 w-full relative z-50">

          <div className="text-center mb-16 relative z-50 ">
            <LogoPlaceholder id="services-logo" w={220} className="absolute -top-20 right-1/3 -translate-x-1/2" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('services.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {HOMEPAGE.services.list.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon as keyof typeof import('@phosphor-icons/react')}
                title={service.title.tr}
                description={service.description.tr}
                details={service.details.tr}
                href="/hizmetler"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps - Section 5 */}
      <div className="relative z-10">
        <LogoPlaceholder id="process-logo" w={75} className="absolute top-[15%] right-[10%] md:right-[15%]" />
        <ProcessSteps className="bg-muted/30 relative z-50" />
      </div>

      {/* Stats Section - Section 6 */}
      <div className="relative z-10">
        <LogoPlaceholder id="stats-logo" w={100} className="absolute top-[25%] left-[5%] md:left-[10%]" />
        <StatsSection className="relative z-50" />
      </div>

      {/* Testimonials - Section 7 */}
      <div className="relative z-10">
        <LogoPlaceholder id="testimonials-logo" w={85} className="absolute top-[20%] right-[8%] md:right-[12%]" />
        <Testimonials className="bg-muted/30 relative z-50" />
      </div>

      {/* Blog Section - Section 8 */}
      {recentBlogs.length > 0 && (
        <section className="min-h-screen flex items-center py-16 md:py-24 relative z-10">
          <LogoPlaceholder id="blog-logo" w={110} className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="container mx-auto px-4 w-full relative z-50">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('blog.title')}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('blog.subtitle')}
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              <BlogGrid blogs={recentBlogs} locale={locale as 'tr' | 'en'} max={3} />

              <div className="text-center mt-12">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <span>{tCommon('viewAll')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
