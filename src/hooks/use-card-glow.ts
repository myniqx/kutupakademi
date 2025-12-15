"use client";

import { useEffect, useRef, useState } from 'react';

type GlowMode = 'border' | 'background' | 'both';
type ColorIntensity = 'low' | 'medium' | 'high';
type Smoothness = 'slow' | 'normal' | 'fast';

type UseCardGlowOptions = {
  mode?: GlowMode;
  colorIntensity?: ColorIntensity;
  enabled?: boolean;
  smoothness?: Smoothness;
};

type GlowStyles = {
  '--mouse-x': string;
  '--mouse-y': string;
  '--glow-opacity': string;
} & React.CSSProperties;

const INTENSITY_VALUES = {
  low: '0.3',
  medium: '0.5',
  high: '0.7',
} as const;

const SMOOTHNESS_VALUES = {
  slow: '300ms',
  normal: '200ms',
  fast: '100ms',
} as const;

export function useCardGlow({
  mode = 'border',
  colorIntensity = 'medium',
  enabled = true,
  smoothness = 'normal',
}: UseCardGlowOptions = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  const glowStyles: GlowStyles = {
    '--mouse-x': `${mousePosition.x}px`,
    '--mouse-y': `${mousePosition.y}px`,
    '--glow-opacity': isHovered ? INTENSITY_VALUES[colorIntensity] : '0',
  };

  const transitionSpeed = SMOOTHNESS_VALUES[smoothness];

  return {
    containerRef,
    glowStyles,
    mode,
    transitionSpeed,
    isActive: enabled && isHovered,
  };
}
