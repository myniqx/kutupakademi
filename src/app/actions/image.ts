'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { images } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { createClient } from '@/lib/supabase/server'

export async function getImages() {
  try {
    const allImages = await db.select().from(images).orderBy(images.uploadedAt)
    return allImages
  } catch (error) {
    console.error('Error fetching images:', error)
    return []
  }
}

export async function uploadImage(formData: FormData) {
  try {
    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Unauthorized' }
    }

    const file = formData.get('file') as File
    const width = formData.get('width') as string
    const height = formData.get('height') as string

    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Validate file type
    if (file.type !== 'image/webp') {
      return { success: false, error: 'Only WebP images are allowed' }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const filename = `${timestamp}-${randomString}.webp`

    // Convert File to ArrayBuffer for Supabase
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filename, buffer, {
        contentType: 'image/webp',
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return { success: false, error: 'Failed to upload image to storage' }
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('images').getPublicUrl(filename)

    // Save metadata to database
    const [newImage] = await db
      .insert(images)
      .values({
        filename,
        url: publicUrl,
        alt: filename,
        width,
        height,
        size: file.size.toString(),
        mimeType: 'image/webp',
      })
      .returning()

    // Revalidate dashboard cache
    revalidatePath('/dashboard')

    return { success: true, image: newImage }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { success: false, error: 'Failed to upload image' }
  }
}

export async function deleteImage(id: string) {
  try {
    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Unauthorized' }
    }

    // Get image info from database
    const [image] = await db.select().from(images).where(eq(images.id, id))

    if (!image) {
      return { success: false, error: 'Image not found' }
    }

    // Delete from Supabase Storage
    const { error: storageError } = await supabase.storage.from('images').remove([image.filename])

    if (storageError) {
      console.error('Storage deletion error:', storageError)
      // Continue to delete from DB even if storage deletion fails
    }

    // Delete from database
    await db.delete(images).where(eq(images.id, id))

    // Revalidate dashboard cache
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { success: false, error: 'Failed to delete image' }
  }
}
