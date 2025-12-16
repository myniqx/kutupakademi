import { PriceRequestForm } from '@/components/forms/price-request-form';
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
    path: '/fiyat-talebi',
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
      form: {
        title: 'Teklif Formu',
        description:
          'Aşağıdaki formu doldurarak projenizhakkında bilgi verin. Ekibimiz en kısa sürede size özel bir fiyat teklifi ile geri dönüş yapacaktır.',
      },
    },
    en: {
      hero: {
        title: 'Free Price Quote',
        subtitle: 'Fill out the form to get a personalized quote for our academic services',
      },
      form: {
        title: 'Quote Form',
        description:
          'Fill out the form below to provide information about your project. Our team will get back to you with a personalized quote as soon as possible.',
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.tr;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              {t.form.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t.form.description}
            </p>
          </div>

          <PriceRequestForm locale={locale as 'tr' | 'en'} />
        </div>
      </section>
    </div>
  );
}
