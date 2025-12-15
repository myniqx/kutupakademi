'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { GlowButton } from '@/components/ui/glow-button';
import { ArrowRight, ChatCircle } from '@phosphor-icons/react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn('relative min-h-screen flex items-center py-20 md:py-32 overflow-hidden', className)}>
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main title with gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <span className="bg-linear-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Optional description */}
          {description && (
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <GlowButton
              mode="background"
              intensity="high"
              size="lg"
              asChild
            >
              <Link href={primaryCta.href} className="group">
                <ChatCircle size={20} className="mr-2" weight="duotone" />
                {primaryCta.label}
                <ArrowRight
                  size={20}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  weight="bold"
                />
              </Link>
            </GlowButton>

            {secondaryCta && (
              <GlowButton
                mode="border"
                intensity="medium"
                variant="outline"
                size="lg"
                asChild
              >
                <Link href={secondaryCta.href}>
                  {secondaryCta.label}
                </Link>
              </GlowButton>
            )}
          </div>

          {/* Trust badges or additional info */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Hızlı Teslimat</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Uzman Ekip</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>7/24 Destek</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
