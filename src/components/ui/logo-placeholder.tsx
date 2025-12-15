'use client';

import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LogoPlaceholderProps {
  id: string;
  w?: number;
  h?: number;
  className?: string;
}

export const LogoPlaceholder = forwardRef<HTMLDivElement, LogoPlaceholderProps>(
  ({ id, w = 40, className }, ref) => {

    return (
      <div
        ref={ref}
        id={id}
        data-logo-placeholder
        className={cn('pointer-events-none opacity-40 bg-green-300 flex items-center justify-center text-[8px] font-mono text-black p-1 overflow-hidden', className)}
        style={{
          width: `${w}px`,
          height: `${w}px`,
        }}
        aria-hidden="true"
      />
    );
  }
);

LogoPlaceholder.displayName = 'LogoPlaceholder';
