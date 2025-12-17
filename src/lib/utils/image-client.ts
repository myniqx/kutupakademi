/**
 * Client-side image processing utilities
 * Handles image validation, resizing, and WebP conversion in the browser
 */

const MAX_DIMENSION = 2000
const WEBP_QUALITY = 0.9

export interface ProcessedImageResult {
  file: File
  width: number
  height: number
  originalSize: number
  processedSize: number
}

export interface ProcessImageOptions {
  maxDimension?: number
  quality?: number
}

/**
 * Validates if file is an image
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' }
  }

  // Check file size (10MB max for original file)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 10MB' }
  }

  return { valid: true }
}

/**
 * Load image from File object
 */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }

    img.src = url
  })
}

/**
 * Calculate new dimensions while maintaining aspect ratio
 */
function calculateDimensions(
  width: number,
  height: number,
  maxDimension: number
): { width: number; height: number } {
  if (width <= maxDimension && height <= maxDimension) {
    return { width, height }
  }

  const aspectRatio = width / height

  if (width > height) {
    // Landscape: width is limiting factor
    return {
      width: maxDimension,
      height: Math.round(maxDimension / aspectRatio),
    }
  } else {
    // Portrait or square: height is limiting factor
    return {
      width: Math.round(maxDimension * aspectRatio),
      height: maxDimension,
    }
  }
}

/**
 * Resize image using canvas and convert to WebP
 */
function resizeAndConvertToWebP(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Failed to get canvas context'))
      return
    }

    canvas.width = targetWidth
    canvas.height = targetHeight

    // Use high-quality image rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Draw resized image
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

    // Convert to WebP blob
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to convert image to WebP'))
        }
      },
      'image/webp',
      quality
    )
  })
}

/**
 * Process image: validate, resize if needed, and convert to WebP
 * This runs entirely in the browser
 */
export async function processImage(
  file: File,
  options: ProcessImageOptions = {}
): Promise<ProcessedImageResult> {
  const { maxDimension = MAX_DIMENSION, quality = WEBP_QUALITY } = options

  // Validate file
  const validation = validateImageFile(file)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  // Load image to get dimensions
  const img = await loadImage(file)
  const originalWidth = img.width
  const originalHeight = img.height

  // Calculate target dimensions
  const { width: targetWidth, height: targetHeight } = calculateDimensions(
    originalWidth,
    originalHeight,
    maxDimension
  )

  // Resize and convert to WebP
  const webpBlob = await resizeAndConvertToWebP(img, targetWidth, targetHeight, quality)

  // Convert Blob to File
  const webpFileName = file.name.replace(/\.[^/.]+$/, '.webp')
  const webpFile = new File([webpBlob], webpFileName, { type: 'image/webp' })

  return {
    file: webpFile,
    width: targetWidth,
    height: targetHeight,
    originalSize: file.size,
    processedSize: webpFile.size,
  }
}

/**
 * Process multiple images with progress callback
 */
export async function processImages(
  files: File[],
  onProgress?: (current: number, total: number, fileName: string, status: string) => void,
  options?: ProcessImageOptions
): Promise<ProcessedImageResult[]> {
  const results: ProcessedImageResult[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]

    try {
      onProgress?.(i + 1, files.length, file.name, 'Resizing...')

      const result = await processImage(file, options)

      onProgress?.(i + 1, files.length, file.name, 'Converted to WebP')

      results.push(result)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      onProgress?.(i + 1, files.length, file.name, `Error: ${errorMessage}`)
      throw error
    }
  }

  return results
}
