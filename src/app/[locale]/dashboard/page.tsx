import { getUser } from '@/app/actions/auth'
import { getBlogs } from '@/app/actions/blog'
import { LoginForm } from './components/login-form'
import { DashboardContent } from './components/dashboard-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kutup Akademi Dashboard',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    return <LoginForm />
  }

  const blogs = await getBlogs()

  return <DashboardContent user={user} blogs={blogs} />
}
