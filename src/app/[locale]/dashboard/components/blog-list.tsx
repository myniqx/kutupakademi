'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteBlog, togglePublish } from '@/app/actions/blog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { Blog } from '@/db/schema'

interface BlogListProps {
  blogs: Blog[]
}

export function BlogList({ blogs }: BlogListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string, title: string) {
    const confirmed = confirm(`"${title}" başlıklı blog yazısını silmek istediğinize emin misiniz?`)

    if (!confirmed) return

    setDeletingId(id)
    const result = await deleteBlog(id)

    if (result.success) {
      router.refresh()
    }
    setDeletingId(null)
  }

  async function handleTogglePublish(id: string, currentStatus: boolean) {
    await togglePublish(id, currentStatus)
    router.refresh()
  }

  function handleOpenInNewTab(slug: string) {
    window.open(`/blog/${slug}`, '_blank')
  }

  if (blogs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Henüz blog yazısı yok.</p>
        <Button className="mt-4">Yeni Blog Yazısı Oluştur</Button>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Card key={blog.id} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{blog.title_tr}</h3>
                {blog.published ? (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                    Published
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded">
                    Draft
                  </span>
                )}
              </div>

              {blog.summary_tr && (
                <p className="text-sm text-muted-foreground mb-2">
                  {blog.summary_tr}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Slug: {blog.slug}</span>
                <span>•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleOpenInNewTab(blog.slug)}
              >
                Open
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleTogglePublish(blog.id, blog.published)}
              >
                {blog.published ? 'Unpublish' : 'Publish'}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/dashboard/blog/edit/${blog.id}`)}
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(blog.id, blog.title_tr)}
                disabled={deletingId === blog.id}
              >
                {deletingId === blog.id ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
