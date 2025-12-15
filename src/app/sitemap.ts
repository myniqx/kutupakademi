import { MetadataRoute } from 'next';
import { ROUTES, RouteItem } from '@/constants/routes';

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

  // TODO: Add dynamic blog post URLs from your blog content source
  // Example:
  // const blogPosts = await getBlogPosts();
  // const blogUrls = blogPosts.flatMap(post => [
  //   {
  //     url: `${baseUrl}/blog/${post.slug}`,
  //     lastModified: post.updatedAt,
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.6,
  //     alternates: {
  //       languages: {
  //         tr: `${baseUrl}/blog/${post.slug}`,
  //         en: `${baseUrl}/en/blog/${post.slug}`,
  //       },
  //     },
  //   },
  // ]);

  return [...turkishUrls, ...englishUrls];
}
