import { getUser } from '@/app/actions/auth'
import { getBlogs } from '@/app/actions/blog'
import { LoginForm } from './components/login-form'
import { DashboardContent } from './components/dashboard-content'

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    return <LoginForm />
  }

  const blogs = await getBlogs()

  return <DashboardContent user={user} blogs={blogs} />
}
