'use client'

import { useRef } from 'react'
import { Upload } from 'lucide-react'

interface UploadAreaProps {
  onFileSelect: (files: FileList) => void
  disabled?: boolean
}

export default function UploadArea({ onFileSelect, disabled }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files)
      // Reset input so same file can be selected again
      e.target.value = ''
    }
  }

  return (
    <div
      onClick={disabled ? undefined : handleClick}
      className={`
        flex flex-col items-center justify-center gap-3
        border-2 border-dashed rounded-lg p-8
        transition-colors cursor-pointer
        ${
          disabled
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-60'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }
      `}
    >
      <Upload className={`w-10 h-10 ${disabled ? 'text-gray-400' : 'text-gray-500'}`} />
      <div className="text-center">
        <p className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          Upload Image
        </p>
        <p className={`text-xs mt-1 ${disabled ? 'text-gray-300' : 'text-gray-500'}`}>
          Click to select images (multiple files supported)
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />
    </div>
  )
}
