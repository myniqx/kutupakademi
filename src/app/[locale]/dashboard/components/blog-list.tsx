'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { deleteBlog, togglePublish } from '@/app/actions/blog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eye, EyeOff, Trash2, ArrowUpDown, Pencil } from 'lucide-react'
import { BlogPreviewDialog } from './blog-preview-dialog'
import type { Blog } from '@/db/schema'

interface BlogListProps {
  blogs: Blog[]
}

type FilterType = 'all' | 'published' | 'draft'
type SortType = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

export function BlogList({ blogs }: BlogListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortType>('newest')
  const [previewBlog, setPreviewBlog] = useState<Blog | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  // Check if blog is ready to publish
  const isReadyToPublish = (blog: Blog): boolean => {
    // Helper to check if string is not empty
    const hasValue = (str: string | null | undefined): boolean => {
      return !!str && str.trim().length > 0
    }

    const isReady = (
      hasValue(blog.slug) &&
      hasValue(blog.title_tr) &&
      hasValue(blog.title_en) &&
      hasValue(blog.content_tr) &&
      hasValue(blog.content_en) &&
      hasValue(blog.description_tr) &&
      hasValue(blog.description_en) &&
      hasValue(blog.summary_tr) &&
      hasValue(blog.summary_en) &&
      hasValue(blog.coverImage) &&
      hasValue(blog.keywords)
    )

    return isReady
  }

  // Filter and sort blogs
  const processedBlogs = useMemo(() => {
    let filtered = [...blogs]

    // Apply filter
    if (filter === 'published') {
      filtered = filtered.filter(blog => blog.published)
    } else if (filter === 'draft') {
      filtered = filtered.filter(blog => !blog.published)
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'title-asc':
          return a.title_tr.localeCompare(b.title_tr, 'tr')
        case 'title-desc':
          return b.title_tr.localeCompare(a.title_tr, 'tr')
        default:
          return 0
      }
    })

    return filtered
  }, [blogs, filter, sort])

  async function handleDelete(e: React.MouseEvent, id: string, title: string) {
    e.stopPropagation()
    const confirmed = confirm(`"${title}" başlıklı blog yazısını silmek istediğinize emin misiniz?`)

    if (!confirmed) return

    setDeletingId(id)
    const result = await deleteBlog(id)

    if (result.success) {
      router.refresh()
    }
    setDeletingId(null)
  }

  async function handleTogglePublish(e: React.MouseEvent, id: string, currentStatus: boolean) {
    e.stopPropagation()
    await togglePublish(id, currentStatus)
    router.refresh()
  }

  function handleEdit(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    router.push(`/dashboard/blog/edit/${id}`)
  }

  function handleCardClick(blog: Blog) {
    setPreviewBlog(blog)
    setPreviewOpen(true)
  }

  const publishedCount = blogs.filter(b => b.published).length
  const draftCount = blogs.filter(b => !b.published).length

  if (blogs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Henüz blog yazısı yok.</p>
        <Button
          className="mt-4"
          onClick={() => router.push('/dashboard/blog/new')}
        >
          Yeni Blog Yazısı Oluştur
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter and Sort Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Tümü ({blogs.length})
          </Button>
          <Button
            variant={filter === 'published' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('published')}
          >
            Published ({publishedCount})
          </Button>
          <Button
            variant={filter === 'draft' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('draft')}
          >
            Draft ({draftCount})
          </Button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="text-sm border rounded-md px-3 py-1.5 bg-background"
          >
            <option value="newest">En Yeni</option>
            <option value="oldest">En Eski</option>
            <option value="title-asc">Başlık (A-Z)</option>
            <option value="title-desc">Başlık (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {processedBlogs.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              {filter === 'published' && 'Yayınlanmış blog yazısı yok.'}
              {filter === 'draft' && 'Taslak blog yazısı yok.'}
            </p>
          </Card>
        ) : (
          processedBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="p-6 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCardClick(blog)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold line-clamp-1">{blog.title_tr}</h3>
                    <div className="flex items-center gap-2">
                      {blog.published ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                          Published
                        </span>
                      ) : (
                        <>
                          <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded">
                            Draft
                          </span>
                          {isReadyToPublish(blog) && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                              Ready to Publish
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Slug: {blog.slug}</span>
                    <span>•</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => handleTogglePublish(e, blog.id, blog.published)}
                  title={blog.published ? 'Yayından kaldır' : 'Yayınla'}
                  className="w-40"
                >
                  {blog.published ? (
                    <><EyeOff className="h-4 w-4" /> Yayından kaldır </>
                  ) : (
                    <><Eye className="h-4 w-4" /> Yayınla</>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => handleEdit(e, blog.id)}
                    title="Düzenle"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => handleDelete(e, blog.id, blog.title_tr)}
                    disabled={deletingId === blog.id}
                    title="Sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Preview Dialog */}
      <BlogPreviewDialog
        blog={previewBlog}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  )
}
