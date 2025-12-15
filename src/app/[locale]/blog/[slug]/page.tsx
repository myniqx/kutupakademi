import { getPostBySlug, getAllPosts } from '@/lib/mdx/utils';
import { MDXContent } from '@/components/mdx-content';
import { notFound } from 'next/navigation';

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const trPosts = getAllPosts('tr');
  const enPosts = getAllPosts('en');

  return [
    ...trPosts.map((post) => ({ locale: 'tr', slug: post.slug })),
    ...enPosts.map((post) => ({ locale: 'en', slug: post.slug })),
  ];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <article className="container mx-auto px-4 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale)}
            </time>
            {post.author && <span>• {post.author}</span>}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="prose prose-lg max-w-none">
          <MDXContent source={post.content} />
        </div>
      </article>
    </div>
  );
}
