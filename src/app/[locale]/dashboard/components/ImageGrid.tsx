'use client'

import ImageCard from './ImageCard'
import type { Image } from '@/db/schema'

interface ImageGridProps {
  images: Image[]
  columns: number
  onSelect?: (image: Image) => void
  onDelete: (id: string) => void
}

export default function ImageGrid({ images, columns, onSelect, onDelete }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No images uploaded yet</p>
        <p className="text-sm mt-2">Upload your first image to get started</p>
      </div>
    )
  }

  return (
    <div
      className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} onSelect={onSelect} onDelete={onDelete} />
      ))}
    </div>
  )
}
