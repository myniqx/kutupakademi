import { getUser } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { BlogEditor } from '@/components/blog/blog-editor'

export default async function NewBlogPage() {
  const user = await getUser()

  if (!user) {
    redirect('/dashboard')
  }

  return <BlogEditor mode="new" />
}
