"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

// Helper function to get RGB from CSS variable
function getCSSColorAsRGB(variableName: string): string {
  if (typeof window === 'undefined') return '255, 199, 75'; // SSR fallback

  const color = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

  // If it's already a HEX color
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  }

  return '255, 199, 75'; // Fallback to accent color
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


type GlowMode = 'border' | 'background' | 'both';
type ColorIntensity = keyof typeof INTENSITY_BLUR;
type Smoothness = keyof typeof SMOOTHNESS_DURATION;

interface GlowButtonProps extends Omit<React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }, 'ref'> {
  mode?: GlowMode;
  intensity?: ColorIntensity;
  smoothness?: Smoothness;
  enableGlow?: boolean;
  glowColor?: string;
}


const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({
    className,
    mode = 'border',
    intensity = 'medium',
    smoothness = 'normal',
    enableGlow = true,
    glowColor,
    children,
    ...props
  }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const [accentRGB, setAccentRGB] = React.useState('255, 199, 75');

    // Get accent color from CSS on mount
    React.useEffect(() => {
      setAccentRGB(getCSSColorAsRGB('--accent'));
    }, []);

    const finalGlowColor = glowColor || accentRGB;

    const mergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || !enableGlow) return;

      const rect = buttonRef.current.getBoundingClientRect();
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

    const intensityValues = INTENSITY_BLUR[intensity];
    const transitionClass = SMOOTHNESS_DURATION[smoothness];

    return (
      <div className="relative inline-block group">
        {/* Outer blur glow */}
        {(mode === 'border' || mode === 'both') && (
          <div
            className={cn(
              "pointer-events-none absolute -inset-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-0",
              transitionClass
            )}
            style={{
              background: isHovered
                ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${finalGlowColor}, ${intensityValues.outer}), transparent 40%)`
                : 'transparent',
              filter: 'blur(20px)',
            }}
          />
        )}

        {/* Sharp border highlight */}
        {(mode === 'border' || mode === 'both') && (
          <div
            className={cn(
              "pointer-events-none absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10",
              transitionClass
            )}
            style={{
              background: isHovered
                ? `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${finalGlowColor}, ${intensityValues.inner}), rgba(${finalGlowColor}, ${intensityValues.inner * 0.6}) 40%, transparent 70%)`
                : 'transparent',
            }}
          />
        )}

        {/* Background glow (if mode is background or both) */}
        {(mode === 'background' || mode === 'both') && (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10",
              transitionClass
            )}
            style={{
              background: isHovered
                ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(${finalGlowColor}, ${intensityValues.outer * 0.3}), transparent 50%)`
                : 'transparent',
            }}
          />
        )}

        <Button
          ref={mergedRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative z-20",
            mode === 'border' && "group-hover:border-[rgba(var(--primary),0.3)]",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </div>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton };
export type { GlowButtonProps };
