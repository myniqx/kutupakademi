import { ContactForm } from '@/components/forms/contact-form';
import { HeroMiddle } from '@/components/sections/hero-middle';
import { SITE_CONFIG } from '@/constants/site';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations('contact');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroMiddle
        imageAlt={t('heroTitle')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">{t('contactInfo')}</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">{t('emailLabel')}</p>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">{t('phoneLabel')}</p>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">{t('addressLabel')}</p>
                    <p className="text-muted-foreground">
                      {SITE_CONFIG.contact.address[locale as 'tr' | 'en'] || SITE_CONFIG.contact.address.tr}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">{t('sendMessage')}</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
