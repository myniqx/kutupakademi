import Image from 'next/image';
import { ComponentProps } from 'react';

interface MDXImageProps extends Omit<ComponentProps<'img'>, 'src' | 'alt'> {
  src?: string;
  alt?: string;
  slug: string;
}

export function MDXImage({ src, alt = '', slug, ...props }: MDXImageProps) {
  if (!src) {
    return null;
  }

  if (src.startsWith('http')) {
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-lg w-full h-auto"
        {...props}
      />
    );
  }

  const imageName = src.replace('./', '');
  const imageUrl = `/api/data?slug=${slug}&image=${imageName}`;

  return (
    <span className="block my-8">
      <Image
        src={imageUrl}
        alt={alt}
        width={1200}
        height={675}
        className="rounded-lg w-full h-auto"
        unoptimized
      />
    </span>
  );
}
