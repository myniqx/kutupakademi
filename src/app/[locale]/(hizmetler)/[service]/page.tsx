import { notFound } from 'next/navigation';
import { generateMeta } from '@/constants/seo';
import { ServiceContentTemplate } from '@/components/templates/service-content-template';
import { getContentMetadata, getContentMarkdown } from '@/components/templates/libs/content';
import type { Metadata } from 'next';

type ServicePageProps = {
  params: Promise<{ locale: 'tr' | 'en'; service: string }>;
};

const SERVICE_SLUGS = [
  'yapisal-esitlik-modellemesi-analizi',
  'spss-veri-analizi-yaptirma-2',
  'spss-odevi-yaptirma',
  'spss-egitimi-ile-veri-analizi',
  'spss-ile-olcek-gelistirme-ve-uyarlama-hizmeti',
  'maxqda-ile-tematik-analiz-hizmeti',
  'vosviewer-ile-bibliyometrik-analiz-yaptirma',
  'g-power-ile-orneklem-buyuklugu-hesaplama-analizi',
  'meta-analiz-yaptirma',
  'tez-danismanligi',
  'tez-duzenleme-hizmetleri',
];

export async function generateStaticParams() {
  const params: { locale: string; service: string }[] = [];

  for (const locale of ['tr', 'en'] as const) {
    for (const service of SERVICE_SLUGS) {
      params.push({ locale, service });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { locale, service } = await params;
  const metadata = await getContentMetadata(service);

  if (!metadata) {
    return {};
  }

  return generateMeta({
    title: metadata[locale].title,
    description: metadata[locale].description || '',
    locale: locale as 'tr' | 'en',
    path: locale === 'en' ? `/en/${service}` : `/${service}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, service } = await params;

  const [metadata, content] = await Promise.all([
    getContentMetadata(service),
    getContentMarkdown(service, locale),
  ]);

  if (!metadata || !content) {
    notFound();
  }

  return (
    <ServiceContentTemplate
      metadata={metadata}
      content={content}
      locale={locale as 'tr' | 'en'}
    />
  );
}
