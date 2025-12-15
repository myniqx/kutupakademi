import { getAllPosts } from '@/lib/mdx/utils';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const t = useTranslations('common');

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">
            {locale === 'tr' ? 'Henüz blog yazısı yok.' : 'No blog posts yet.'}
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-6 bg-card border border-border rounded-lg hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-semibold mb-2 text-card-foreground">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(locale)}
                  </time>
                  <span className="text-primary">{t('readMore')} →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
