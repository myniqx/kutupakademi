import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SITE_CONFIG } from '@/constants/site';
import { useLocale } from 'next-intl';

interface LogoProps {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  rounded?: boolean;
  border?: boolean;
  className?: string;
  alt?: string;
}

export function Logo({ x, y, w = 40, h, rounded = false, border = false, className, alt }: LogoProps) {
  const isFixed = x !== undefined && y !== undefined;
  const ratio = 861 / 270

  const locale = useLocale() as 'tr' | 'en';
  if (h === undefined) {
    h = w * ratio
  }

  if (alt === undefined) {
    alt = SITE_CONFIG.name[locale]
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        isFixed && 'fixed',
        rounded && 'rounded-full overflow-hidden',
        border && 'border border-border',
        className
      )}
      style={
        isFixed
          ? {
            left: `${x}px`,
            top: `${y}px`,
            width: `${w}px`,
            height: `${h}px`,
          }
          : {
            width: `${w}px`,
            height: `${h}px`,
          }
      }
    >
      <Image
        src="/kutupakademii.webp"
        alt={alt}
        width={w}
        height={w}
        className="object-contain mix-blend-multiply dark:mix-blend-screen"
        priority
      />
    </div>
  );
}
