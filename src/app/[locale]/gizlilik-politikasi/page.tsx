import { MarkdownPreview } from '@/components/blog/markdown-preview';
import { LEGAL_CONTENT } from '@/constants/legal';
import { replacePlaceholders } from '@/lib/utils/replace-placeholders';
import { generateMeta } from '@/constants/seo';
import type { Metadata } from 'next';

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;

  return generateMeta({
    title: locale === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy',
    description:
      locale === 'tr'
        ? 'Kutup Akademi gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi edinin.'
        : 'Kutup Akademi privacy policy. Learn about how your personal data is collected, used, and protected.',
    locale: locale as 'tr' | 'en',
    path: '/gizlilik-politikasi',
  });
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  const localeKey = (locale === 'en' ? 'en' : 'tr') as 'tr' | 'en';

  const content = replacePlaceholders(
    LEGAL_CONTENT.privacyPolicy[localeKey],
    localeKey
  );

  return (
    <div className="min-h-screen bg-background">
      <MarkdownPreview content={content} slug="privacy-policy" />
    </div>
  );
}
