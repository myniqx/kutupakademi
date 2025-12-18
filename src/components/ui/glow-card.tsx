"use client";

import * as React from "react";
import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GlowMode = 'border' | 'background' | 'both';
type ColorIntensity = 'low' | 'medium' | 'high';
type Smoothness = 'slow' | 'normal' | 'fast';

interface GlowCardProps extends Omit<CardProps, 'ref'> {
  mode?: GlowMode;
  intensity?: ColorIntensity;
  smoothness?: Smoothness;
  enableGlow?: boolean;
  glowColor?: string;
  cardClassName?: string;
}

const INTENSITY_BLUR = {
  low: { outer: 0.2, inner: 0.3 },
  medium: { outer: 0.4, inner: 0.6 },
  high: { outer: 0.6, inner: 0.8 },
} as const;

const SMOOTHNESS_DURATION = {
  slow: 'duration-500',
  normal: 'duration-300',
  fast: 'duration-150',
} as const;

const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({
    className,
    mode = 'border',
    intensity = 'high',
    smoothness = 'slow',
    enableGlow = true,
    cardClassName,
    glowColor = '100, 80, 220', // Primary purple/blue from theme
    children,
    ...props
  }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !enableGlow) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
      if (enableGlow) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const intensityValues = INTENSITY_BLUR[intensity as ColorIntensity];
    const transitionClass = SMOOTHNESS_DURATION[smoothness as Smoothness];

    return (
      <div
        ref={mergedRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("relative group", className)}
      >
        {/* Outer blur glow */}
        {(mode === 'border' || mode === 'both') && (
          <div
            className={cn(
              "pointer-events-none absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-0",
              transitionClass
            )}
            style={{
              background: isHovered
                ? `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, ${intensityValues.outer}), transparent 40%)`
                : 'transparent',
              filter: 'blur(20px)',
            }}
          />
        )}

        {/* Sharp border highlight */}
        {(mode === 'border' || mode === 'both') && (
          <div
            className={cn(
              "pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-10",
              transitionClass
            )}
            style={{
              background: isHovered
                ? `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, ${intensityValues.inner}), rgba(${glowColor}, ${intensityValues.inner * 0.6}) 40%, transparent 70%)`
                : 'transparent',
            }}
          />
        )}

        {/* Background glow (if mode is background or both) */}
        {(mode === 'background' || mode === 'both') && (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-10",
              transitionClass
            )}
            style={{
              background: isHovered
                ? `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${glowColor}, ${intensityValues.outer * 0.3}), transparent 50%)`
                : 'transparent',
            }}
          />
        )}

        <Card
          className={cn(
            "relative z-20 transition-all",
            mode === 'border' && "group-hover:border-[rgba(var(--primary),0.3)]",
            cardClassName
          )}
          {...props}
        >
          {children}
        </Card>
      </div>
    );
  }
);

GlowCard.displayName = "GlowCard";

export { GlowCard };
export type { GlowCardProps };
