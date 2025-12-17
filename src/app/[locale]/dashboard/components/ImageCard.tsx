'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import type { Image as ImageType } from '@/db/schema'

interface ImageCardProps {
  image: ImageType
  onSelect?: (image: ImageType) => void
  onDelete: (id: string) => void
}

export default function ImageCard({ image, onSelect, onDelete }: ImageCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isDeleting) return

    const confirmed = window.confirm(`Are you sure you want to delete "${image.filename}"?`)
    if (!confirmed) return

    setIsDeleting(true)
    try {
      await onDelete(image.id)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleClick = () => {
    if (onSelect && !isDeleting) {
      onSelect(image)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        group relative flex flex-col bg-white rounded-lg overflow-hidden
        border border-gray-200 transition-all
        ${onSelect ? 'cursor-pointer hover:shadow-md hover:border-gray-300' : ''}
        ${isDeleting ? 'opacity-50 pointer-events-none' : ''}
      `}
      style={{ aspectRatio: '2/3' }}
    >
      {/* Image Container - 2:2 (square) */}
      <div className="relative bg-gray-100" style={{ aspectRatio: '1/1' }}>
        <Image
          src={image.url}
          alt={image.alt || image.filename}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Trash Button - appears on hover */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="
            absolute top-2 right-2
            opacity-0 group-hover:opacity-100
            transition-opacity
            p-2 bg-red-500 hover:bg-red-600
            text-white rounded-md
            disabled:bg-gray-400 disabled:cursor-not-allowed
          "
          aria-label="Delete image"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Info Section - 1:1 of the card height */}
      <div className="flex-1 p-3 flex flex-col justify-center">
        <p className="text-xs text-gray-700 truncate" title={image.filename}>
          {image.filename}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {image.width} x {image.height}
        </p>
      </div>
    </div>
  )
}
