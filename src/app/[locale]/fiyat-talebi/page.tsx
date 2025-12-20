import { PriceRequestForm } from '@/components/forms/price-request-form';
import { HeroMiddle } from '@/components/sections/hero-middle';
import { CheckCircle2, Clock, Shield, Zap } from 'lucide-react';
import { generateMeta } from '@/constants/seo';
import type { Metadata } from 'next';

type PriceRequestPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PriceRequestPageProps): Promise<Metadata> {
  const { locale } = await params;

  return generateMeta({
    title: locale === 'tr' ? 'Fiyat Talebi' : 'Price Request',
    description:
      locale === 'tr'
        ? 'Akademik hizmetlerimiz için ücretsiz fiyat teklifi alın. Veri analizi, tez danışmanlığı ve istatistik analizi hizmetleri.'
        : 'Get a free quote for our academic services. Data analysis, thesis consultancy, and statistical analysis services.',
    locale: locale as 'tr' | 'en',
    path: locale === 'en' ? '/en/fiyat-talebi' : '/fiyat-talebi',
  });
}

export default async function PriceRequestPage({ params }: PriceRequestPageProps) {
  const { locale } = await params;

  const content = {
    tr: {
      hero: {
        title: 'Ücretsiz Fiyat Teklifi',
        subtitle: 'Akademik hizmetlerimiz için size özel fiyat teklifi almak üzere formu doldurun',
      },
      benefits: {
        title: 'Neden Bizi Tercih Etmelisiniz?',
        items: [
          {
            icon: 'Zap',
            title: 'Hızlı Yanıt',
            description: '24 saat içinde size özel fiyat teklifi ile geri dönüş yapıyoruz.',
          },
          {
            icon: 'Shield',
            title: 'Güvenilir Hizmet',
            description: '10+ yıllık deneyim ve yüzlerce başarılı proje.',
          },
          {
            icon: 'CheckCircle2',
            title: 'Ücretsiz Danışmanlık',
            description: 'İlk görüşme ve proje değerlendirmesi tamamen ücretsiz.',
          },
          {
            icon: 'Clock',
            title: 'Esnek Çalışma',
            description: 'Projenizin ihtiyaçlarına göre özelleştirilmiş çözümler.',
          },
        ],
      },
    },
    en: {
      hero: {
        title: 'Free Price Quote',
        subtitle: 'Fill out the form to get a personalized quote for our academic services',
      },
      benefits: {
        title: 'Why Choose Us?',
        items: [
          {
            icon: 'Zap',
            title: 'Fast Response',
            description: 'We get back to you with a personalized quote within 24 hours.',
          },
          {
            icon: 'Shield',
            title: 'Reliable Service',
            description: '10+ years of experience and hundreds of successful projects.',
          },
          {
            icon: 'CheckCircle2',
            title: 'Free Consultation',
            description: 'Initial meeting and project evaluation completely free.',
          },
          {
            icon: 'Clock',
            title: 'Flexible Working',
            description: 'Customized solutions according to your project needs.',
          },
        ],
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.tr;

  const iconMap = {
    Zap,
    Shield,
    CheckCircle2,
    Clock,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroMiddle
        title={t.hero.title}
        subtitle={t.hero.subtitle}
      />

      {/* Form Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent)/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.03),transparent_50%)]" />

        <div className="container relative mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                <PriceRequestForm locale={locale as 'tr' | 'en'} />
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="lg:col-span-1 space-y-6">
              <div className="sticky top-24">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  {t.benefits.title}
                </h3>

                <div className="space-y-4">
                  {t.benefits.items.map((item, index) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap];
                    return (
                      <div
                        key={index}
                        className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
