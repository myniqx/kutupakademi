'use client'

import { useEffect, useRef, useState } from 'react'
import UploadArea from './UploadArea'
import ImageGrid from './ImageGrid'
import { getImages, uploadImage, deleteImage } from '@/app/actions/image'
import { processImage } from '@/lib/utils/image-client'
import type { Image } from '@/db/schema'

interface MediaManagerProps {
  onSelect?: (image: Image) => void
}

export default function MediaManager({ onSelect }: MediaManagerProps) {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate columns based on container width
  const columns = Math.max(1, Math.floor(containerWidth / 220)) // 200px card + 20px gap

  // Load images on mount
  useEffect(() => {
    loadImages()
  }, [])

  // Observe container width for responsive columns
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  async function loadImages() {
    try {
      setLoading(true)
      const fetchedImages = await getImages()
      setImages(fetchedImages)
    } catch (error) {
      console.error('Failed to load images:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleFileSelect(files: FileList) {
    setUploading(true)
    setUploadError(null)

    const fileArray = Array.from(files)

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]

      try {
        // Process image (resize + convert to WebP)
        setUploadProgress(`${file.name} - Resizing...`)
        const processed = await processImage(file)

        setUploadProgress(`${file.name} - Converting to WebP...`)
        // Small delay to show the progress message
        await new Promise((resolve) => setTimeout(resolve, 100))

        setUploadProgress(`${file.name} - Uploading...`)

        // Upload to server
        const formData = new FormData()
        formData.append('file', processed.file)
        formData.append('width', processed.width.toString())
        formData.append('height', processed.height.toString())

        const result = await uploadImage(formData)

        if (!result.success) {
          setUploadError(`${file.name} - Error: ${result.error}`)
          break
        }

        setUploadProgress(`${file.name} - Saving to database...`)
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Add new image to list
        if (result.image) {
          setImages((prev) => [...prev, result.image])
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        setUploadError(`${file.name} - Error: ${errorMessage}`)
        break
      }
    }

    setUploading(false)
    setUploadProgress('')
  }

  async function handleDelete(id: string) {
    try {
      const result = await deleteImage(id)

      if (result.success) {
        // Remove from local state
        setImages((prev) => prev.filter((img) => img.id !== id))
      } else {
        alert(`Failed to delete image: ${result.error}`)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
    }
  }

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Upload Area */}
      <UploadArea onFileSelect={handleFileSelect} disabled={uploading} />

      {/* Upload Progress */}
      {(uploadProgress || uploadError) && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          {uploadProgress && (
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 animate-pulse w-full"></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{uploadProgress}</p>
              </div>
            </div>
          )}
          {uploadError && (
            <div className="text-sm text-red-600 font-medium">{uploadError}</div>
          )}
        </div>
      )}

      {/* Image Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          <p>Loading images...</p>
        </div>
      ) : (
        <ImageGrid images={images} columns={columns} onSelect={onSelect} onDelete={handleDelete} />
      )}
    </div>
  )
}
