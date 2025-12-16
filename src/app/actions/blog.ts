'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getBlogs() {
  const allBlogs = await db.select().from(blogs).orderBy(blogs.createdAt)
  return allBlogs
}

export async function getBlogBySlug(slug: string) {
  const [blog] = await db.select().from(blogs).where(eq(blogs.slug, slug))
  return blog
}

export async function deleteBlog(id: string) {
  try {
    await db.delete(blogs).where(eq(blogs.id, id))
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete blog' }
  }
}

export async function togglePublish(id: string, currentStatus: boolean) {
  try {
    await db
      .update(blogs)
      .set({ published: !currentStatus })
      .where(eq(blogs.id, id))
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to update blog' }
  }
}
