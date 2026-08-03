import { MetadataRoute } from 'next';
import { ROUTES, RouteItem } from '@/constants/routes';
import { db } from '@/db';
import { blogs } from '@/db/schema';
import { eq } from 'drizzle-orm';

// These live database posts are intentionally outside the current revision scope.
// Keep their existing discovery behavior unchanged until they are reviewed separately.
const PROTECTED_BLOG_SLUGS = new Set([
  'aracilik-etkisi-analizi-yaptirma',
  'biyoistatistik-odevi-yapma',
  'duzenleyici-degisken-analizi',
  'ingilizce-odev-yaptirma',
  'norolojik-rehabilitasyon-arastirmalarinda-spss-analizi-yaptirmak',
  'ortopedi-arastirmalarinda-spss-analizi-yaptirmak',
  'piyasa-arastirmasi-icin-spss-analizi',
  'seminer-odevi-yaptirma',
  'spss-analiz-ucretleri',
  'spss-analizi-yaptirma',
  'spss-anket-verisi-analizi',
  'spss-ile-duygularin-analizi',
  'spss-ile-egitimde-ogrenme-duzeylerini-analiz-etme',
  'spss-ile-firmanizin-verimlilik-analizleri',
  'spss-ile-isletmeniz-uzerine-analizler',
  'spss-ile-kaygi-duzeyi-analizi',
  'spss-ile-psikolojide-benlik-algisi-testi-veri-analizi',
  'spss-ile-psikolojik-motivasyon-testi-veri-analizi-nasil-yapilir',
  'spss-ile-rakip-firma-analizleri',
  'spss-ile-saglik-psikolojisi-testleri-analizleri',
  'spss-ile-sosyal-beceriler-ve-etkilesim-analizi',
  'spss-ile-stres-ve-basa-cikma-stratejileri-analizi',
  'spss-ile-zeka-ve-yetenek-testleri-arastirmalarinda-veri-analizi-nasil-yapilir',
  'spss-odevi-yapanlar',
  'spss-process-makro-odev',
  'tuketici-arastirmalari-icin-spss-analizi',
  'yapay-zeka-ile-odev-yaptirma',
  'yuksek-lisans-odev-yaptirma',
]);

function getAllRoutes(items: RouteItem[]): string[] {
  const routes: string[] = [];

  for (const item of items) {
    routes.push(item.href);

    if (item.children) {
      routes.push(...getAllRoutes(item.children));
    }
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kutupakademi.com';

  const routes = getAllRoutes(ROUTES);
  const publishedBlogs = await db
    .select({ slug: blogs.slug, updatedAt: blogs.updatedAt })
    .from(blogs)
    .where(eq(blogs.published, true));

  const turkishUrls = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
    alternates: {
      languages: {
        tr: `${baseUrl}${route}`,
        en: `${baseUrl}/en${route}`,
      },
    },
  }));

  const englishUrls = routes.map((route) => ({
    url: `${baseUrl}/en${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
    alternates: {
      languages: {
        tr: `${baseUrl}${route}`,
        en: `${baseUrl}/en${route}`,
      },
    },
  }));

  const blogUrls = publishedBlogs
    .filter((post) => !PROTECTED_BLOG_SLUGS.has(post.slug))
    .flatMap((post) => [
      {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            tr: `${baseUrl}/blog/${post.slug}`,
            en: `${baseUrl}/en/blog/${post.slug}`,
          },
        },
      },
      {
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            tr: `${baseUrl}/blog/${post.slug}`,
            en: `${baseUrl}/en/blog/${post.slug}`,
          },
        },
      },
    ]);

  return [...turkishUrls, ...englishUrls, ...blogUrls];
}
