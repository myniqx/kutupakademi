import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { blogs } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const [newBlog] = await db.insert(blogs).values({
      slug: body.slug,
      title_tr: body.title_tr,
      title_en: body.title_en || null,
      description_tr: body.description_tr || null,
      description_en: body.description_en || null,
      summary_tr: body.summary_tr || null,
      summary_en: body.summary_en || null,
      content_tr: body.content_tr,
      content_en: body.content_en || null,
      coverImage: body.coverImage || null,
      published: body.published || false,
    }).returning()

    return NextResponse.json({ success: true, blog: newBlog })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 })
    }

    const [updatedBlog] = await db
      .update(blogs)
      .set({
        slug: body.slug,
        title_tr: body.title_tr,
        title_en: body.title_en || null,
        description_tr: body.description_tr || null,
        description_en: body.description_en || null,
        summary_tr: body.summary_tr || null,
        summary_en: body.summary_en || null,
        content_tr: body.content_tr,
        content_en: body.content_en || null,
        coverImage: body.coverImage || null,
        published: body.published || false,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, body.id))
      .returning()

    return NextResponse.json({ success: true, blog: updatedBlog })
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}
