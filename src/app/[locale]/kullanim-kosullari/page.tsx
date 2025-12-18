import { MarkdownPreview } from '@/components/blog/markdown-preview';
import { LEGAL_CONTENT } from '@/constants/legal';
import { replacePlaceholders } from '@/lib/utils/replace-placeholders';
import { generateMeta } from '@/constants/seo';
import type { Metadata } from 'next';

type TermsOfServicePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: TermsOfServicePageProps): Promise<Metadata> {
  const { locale } = await params;

  return generateMeta({
    title: locale === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service',
    description:
      locale === 'tr'
        ? 'Kutup Akademi kullanım koşulları. Hizmetlerimizi kullanırken uymanız gereken kurallar ve sorumluluklarınız hakkında bilgi edinin.'
        : 'Kutup Akademi terms of service. Learn about the rules and responsibilities when using our services.',
    locale: locale as 'tr' | 'en',
    path: '/kullanim-kosullari',
  });
}

export default async function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'en' ? 'en' : 'tr') as 'tr' | 'en';

  const content = replacePlaceholders(
    LEGAL_CONTENT.termsOfService[localeKey],
    localeKey
  );

  return (
    <div className="min-h-screen bg-background">
      <MarkdownPreview content={content} slug="terms-of-service" />
    </div>
  );
}
