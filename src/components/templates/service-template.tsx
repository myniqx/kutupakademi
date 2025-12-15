import { type ServiceData } from '@/constants/services';
import { GlowCard } from '@/components/ui/glow-card';
import { GlowButton } from '@/components/ui/glow-button';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight } from 'lucide-react';

type ServiceTemplateProps = {
  service: ServiceData;
  locale: 'tr' | 'en';
};

export function ServiceTemplate({ service, locale }: ServiceTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-linear-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              {service.title[locale]}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {service.description[locale]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Features Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              {locale === 'tr' ? 'Hizmet Özellikleri' : 'Service Features'}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {service.features[locale].map((feature, index) => (
                <GlowCard key={index} mode="border" intensity="low" className="p-6">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="text-base text-foreground">{feature}</p>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </section>

          {/* Process Section */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              {service.process.title[locale]}
            </h2>
            <div className="space-y-8">
              {service.process.steps.map((step, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l-2 border-border last:border-0 last:pb-0">
                  <div className="absolute left-0 top-0 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title[locale]}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description[locale]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section (if available) */}
          {service.faq && service.faq.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {locale === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-4">
                {service.faq.map((item, index) => (
                  <GlowCard key={index} mode="background" intensity="low" className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.question[locale]}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.answer[locale]}
                    </p>
                  </GlowCard>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="bg-muted/50 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {locale === 'tr'
                ? 'Hizmetimiz hakkında daha fazla bilgi almak ister misiniz?'
                : 'Would you like more information about our service?'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
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
          </section>
        </div>
      </div>
    </div>
  );
}
