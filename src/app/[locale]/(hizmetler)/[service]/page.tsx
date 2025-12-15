import { notFound } from 'next/navigation';
import { getService, SERVICE_SLUGS, type ServiceSlug } from '@/constants/services';
import { generateMeta } from '@/constants/seo';
import { ServiceTemplate } from '@/components/templates/service-template';
import type { Metadata } from 'next';

type ServicePageProps = {
  params: Promise<{ locale: string; service: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; service: ServiceSlug }[] = [];

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
  const serviceData = getService(service);

  if (!serviceData) {
    return {};
  }

  return generateMeta({
    title: serviceData.title[locale as 'tr' | 'en'],
    description: serviceData.description[locale as 'tr' | 'en'],
    locale: locale as 'tr' | 'en',
    path: `/${service}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, service } = await params;
  const serviceData = getService(service);

  if (!serviceData) {
    notFound();
  }

  return <ServiceTemplate service={serviceData} locale={locale as 'tr' | 'en'} />;
}
