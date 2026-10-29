import Image from 'next/image';
import { ComponentProps } from 'react';

interface MDXImageProps extends Omit<ComponentProps<'img'>, 'src' | 'alt'> {
  src?: string;
  alt?: string;
  slug: string;
}

export function MDXImage({ src, alt = '', slug }: MDXImageProps) {
  if (!src) {
    return null;
  }

  if (src.startsWith('http')) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="rounded-lg w-full h-auto"
      />
    );
  }

  const imageName = src.replace(/^\.\//, '');

  const imageUrl = src.startsWith('/')
    ? src
    : `/blogs/${slug}/${imageName}`;

  const isScaleInfographic =
  slug === 'spss-ile-olcek-gelistirme-ve-uyarlama-hizmeti' &&
  (
    imageUrl === `/blogs/${slug}/olcek-gelistirme-asamalari.png` ||
    imageUrl === `/blogs/${slug}/olcek-uyarlama-asamalari.png` ||
    imageUrl === `/blogs/${slug}/scale-development-stages-en.png` ||
    imageUrl === `/blogs/${slug}/scale-adaptation-stages-en.png`
  );

  if (isScaleInfographic) {
    return (
      <span className="block my-8">
        <a
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            `${alt} — ${
              slug && alt
                ? 'Görseli yeni sekmede aç / Open image in a new tab'
                : 'Open image in a new tab'
            }`
          }
          className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Image
            src={imageUrl}
            alt={alt}
            width={1448}
            height={1086}
            className="rounded-lg"
            style={{
              display: 'block',
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: 'min(65vh, 560px)',
              marginInline: 'auto',
              objectFit: 'contain',
            }}
            sizes="(max-width: 640px) 100vw, 750px"
            unoptimized
          />
        </a>
      </span>
    );
  }

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
