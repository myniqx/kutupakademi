'use client';

import Link from 'next/link';
import { GlowCard } from '@/components/ui/glow-card';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as PhosphorIcons from '@phosphor-icons/react';

interface ServiceCardProps {
  icon: keyof typeof PhosphorIcons;
  title: string;
  description: string;
  details: string;
  href?: string;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  details,
  href = '#',
  className,
}: ServiceCardProps) {
  const Icon = PhosphorIcons[icon] as React.ComponentType<{ size?: number; weight?: string; className?: string }>;

  return (
    <GlowCard
      mode="border"
      intensity="medium"
      smoothness="normal"
      className={cn('h-full transition-transform hover:scale-[1.02]', className)}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary">
          {Icon && <Icon size={28} weight="duotone" />}
        </div>
        <div>
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-base font-medium text-primary/80">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {details}
        </p>
        {href !== '#' && (
          <Link
            href={href}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            Daha Fazla Bilgi
            <PhosphorIcons.ArrowRight
              size={16}
              className="ml-1 transition-transform group-hover:translate-x-1"
            />
          </Link>
        )}
      </CardContent>
    </GlowCard>
  );
}
