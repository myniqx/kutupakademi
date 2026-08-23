import { MetadataRoute } from 'next';
import { ROUTES, RouteItem } from '@/constants/routes';
import { db } from '@/db';
import { blogs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getGuidanceBlogRevision } from '@/constants/guidance-blog-revisions';
import { SITE_CONFIG } from '@/constants/site';

function getAllRoutes(items: RouteItem[]): string[] {
  const routes: string[] = [];

  for (const item of items) {
    // Grouping-only entries have no page of their own; skip them.
    if (item.href) {
      routes.push(item.href);
    }

    if (item.children) {
      routes.push(...getAllRoutes(item.children));
    }
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

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
    .flatMap((post) => {
      const revision = getGuidanceBlogRevision(post.slug);
      const lastModified = revision ? new Date(revision.lastModified) : post.updatedAt;

      return [
        {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified,
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
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
          alternates: {
            languages: {
              tr: `${baseUrl}/blog/${post.slug}`,
              en: `${baseUrl}/en/blog/${post.slug}`,
            },
          },
        },
      ];
    });

  return [...turkishUrls, ...englishUrls, ...blogUrls];
}
