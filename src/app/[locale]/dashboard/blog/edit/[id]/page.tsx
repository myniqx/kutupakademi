import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { BlogEditor } from '@/components/blog/blog-editor'
import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const user = await getUser()

  if (!user) {
    redirect('/dashboard')
  }

  const { id } = await params
  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id))

  if (!blog) {
    redirect('/dashboard')
  }

  return <BlogEditor mode="edit" blog={blog} />
}
