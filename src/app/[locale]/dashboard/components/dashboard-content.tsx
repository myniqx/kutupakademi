'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BlogList } from './blog-list'
import type { Blog } from '@/db/schema'
import { GlowCard } from '@/components/ui/glow-card'

interface DashboardContentProps {
  user: {
    email?: string
    id: string
  }
  blogs: Blog[]
}

export function DashboardContent({ user, blogs }: DashboardContentProps) {
  const router = useRouter()
  const publishedCount = blogs.filter(b => b.published).length
  const draftCount = blogs.filter(b => !b.published).length

  async function handleLogout() {
    const result = await logout()
    if (result?.success) {
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen p-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <form action={handleLogout}>
              <Button type="submit" variant="outline">
                Logout
              </Button>
            </form>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <GlowCard>
            <CardContent className='p-6'>
              <h3 className="text-lg font-semibold mb-2">Total Posts</h3>
              <p className="text-3xl font-bold text-primary">{blogs.length}</p>
              <p className="text-sm text-muted-foreground mt-2">All blog posts</p>
            </CardContent>
          </GlowCard>

          <GlowCard>
            <CardContent className='p-6'>
              <h3 className="text-lg font-semibold mb-2">Published</h3>
              <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
              <p className="text-sm text-muted-foreground mt-2">Live posts</p>
            </CardContent>
          </GlowCard>

          <GlowCard>
            <CardContent className='p-6'>
              <h3 className="text-lg font-semibold mb-2">Drafts</h3>
              <p className="text-3xl font-bold text-orange-500">{draftCount}</p>
              <p className="text-sm text-muted-foreground mt-2">Unpublished posts</p>
            </CardContent>
          </GlowCard>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Blog Posts</h2>
            <Button onClick={() => router.push('/dashboard/blog/new')}>
              Create New Post
            </Button>
          </div>
        </div>

        <BlogList blogs={blogs} />
      </div>
    </div>
  )
}
