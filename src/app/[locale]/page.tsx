import { useTranslations } from 'next-intl';
import { HeroSection } from '@/components/home/hero-section';
import { TechnologyPartners } from '@/components/home/technology-partners';
import { ServiceCard } from '@/components/home/service-card';
import { ProcessSteps } from '@/components/home/process-steps';
import { StatsSection } from '@/components/home/stats-section';
import { Testimonials } from '@/components/home/testimonials';
import { HOMEPAGE } from '@/constants/homepage';
import { GlowCard } from '@/components/ui/glow-card';
import { CardContent } from '@/components/ui/card';
import { Book } from '@phosphor-icons/react/dist/ssr';

export default function Home() {
  const t = useTranslations('home');

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
      <section className="min-h-screen flex flex-col bg-muted/30">
        {/* Technology Partners - 50% height */}
        <TechnologyPartners className="min-h-[50vh]" />

        {/* About Section - 50% height */}
        <div className="min-h-[50vh] flex items-center py-16 md:py-24">
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
      <section className="min-h-screen flex items-center py-16 md:py-24">
        <div className="container mx-auto px-4 w-full">
          <div className="text-center mb-16">
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
      <ProcessSteps className="bg-muted/30" />

      {/* Stats Section - Section 6 */}
      <StatsSection />

      {/* Testimonials - Section 7 */}
      <Testimonials className="bg-muted/30" />

      {/* Blog Section Stub (TODO) - Section 8 */}
      <section className="min-h-screen flex items-center py-16 md:py-24">
        <div className="container mx-auto px-4 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('blog.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <GlowCard mode="border" intensity="low" className="text-center">
              <CardContent className="py-12">
                <Book size={64} weight="duotone" className="mx-auto mb-4 text-primary/40" />
                <p className="text-lg text-muted-foreground">
                  {t('blog.comingSoon')}
                </p>
              </CardContent>
            </GlowCard>
          </div>
        </div>
      </section>
    </div>
  );
}
