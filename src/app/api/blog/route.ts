import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getAuthenticatedUser } from '@/lib/auth/user'
import { z } from 'zod'

const blogPayloadSchema = z.object({
  slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  author: z.string().trim().max(120).optional().nullable(),
  keywords: z.string().trim().max(1000).optional().nullable(),
  title_tr: z.string().trim().min(1).max(240),
  title_en: z.string().trim().max(240).optional().nullable(),
  description_tr: z.string().trim().max(500).optional().nullable(),
  description_en: z.string().trim().max(500).optional().nullable(),
  summary_tr: z.string().trim().max(5000).optional().nullable(),
  summary_en: z.string().trim().max(5000).optional().nullable(),
  content_tr: z.string().trim().min(1).max(250000),
  content_en: z.string().trim().max(250000).optional().nullable(),
  coverImage: z.string().trim().max(2000).optional().nullable(),
  published: z.boolean().optional(),
})

const updateBlogPayloadSchema = blogPayloadSchema.extend({
  id: z.string().uuid(),
})

async function isAuthorized() {
  return Boolean(await getAuthenticatedUser())
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const parsedBody = blogPayloadSchema.safeParse(await request.json())

    if (!parsedBody.success) {
      return NextResponse.json({ error: 'Invalid blog data' }, { status: 400 })
    }

    const body = parsedBody.data

    const [newBlog] = await db.insert(blogs).values({
      slug: body.slug,
      author: body.author || null,
      keywords: body.keywords || null,
      title_tr: body.title_tr,
      title_en: body.title_en || null,
      description_tr: body.description_tr || null,
      description_en: body.description_en || null,
      summary_tr: body.summary_tr || null,
      summary_en: body.summary_en || null,
      content_tr: body.content_tr,
      content_en: body.content_en || null,
      coverImage: body.coverImage || null,
      published: body.published ?? false,
    }).returning()

    // If published, revalidate blog listing pages
    if (body.published) {
      revalidatePath('/[locale]/blog', 'layout')
    }

    return NextResponse.json({ success: true, blog: newBlog })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthorized())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const parsedBody = updateBlogPayloadSchema.safeParse(await request.json())

    if (!parsedBody.success) {
      return NextResponse.json({ error: 'Invalid blog data' }, { status: 400 })
    }

    const body = parsedBody.data

    // Get current blog state to check if published status changed
    const [oldBlog] = await db.select().from(blogs).where(eq(blogs.id, body.id))

    const [updatedBlog] = await db
      .update(blogs)
      .set({
        slug: body.slug,
        author: body.author || null,
        keywords: body.keywords || null,
        title_tr: body.title_tr,
        title_en: body.title_en || null,
        description_tr: body.description_tr || null,
        description_en: body.description_en || null,
        summary_tr: body.summary_tr || null,
        summary_en: body.summary_en || null,
        content_tr: body.content_tr,
        content_en: body.content_en || null,
        coverImage: body.coverImage || null,
        published: body.published ?? false,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, body.id))
      .returning()

    // Revalidate if:
    // - Was published (content changed, visible in listing)
    // - Is published now (draft → published, new in listing)
    // - Published status changed (published → draft, removed from listing)
    const wasPublished = oldBlog?.published
    const isPublished = body.published

    if (wasPublished || isPublished) {
      revalidatePath('/[locale]/blog', 'layout')
    }

    return NextResponse.json({ success: true, blog: updatedBlog })
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}
