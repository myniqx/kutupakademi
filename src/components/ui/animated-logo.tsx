'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useLogoAnimation } from '@/hooks/use-logo-animation';

export function AnimatedLogo() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const { positions } = useLogoAnimation(logoRef);

  useEffect(() => {
    if (positions.length > 0) {
      setIsReady(true);
    }
  }, [positions]);

  return (
    <div
      ref={logoRef}
      className="fixed z-30 pointer-events-none"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <Image
        src="/kutupakademi.svg"
        alt="Kutup Akademi"
        width={100}
        height={100}
        className="pointer-events-auto w-full h-full z-30 shadow-lg object-contain rounded-full border-2 p-4 text-primary border-primary"
        style={{
          backfaceVisibility: 'hidden',
        }}
        priority
      />
    </div>
  );
}
