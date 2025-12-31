'use client';

import Link from 'next/link';
import { GlowCard } from '@/components/ui/glow-card';
import { CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as PhosphorIcons from '@phosphor-icons/react';
import { SERVICES } from '@/constants/services';
import type { ServiceSlug } from '@/constants/services';

interface CategoryServiceCardProps {
  icon: keyof typeof PhosphorIcons;
  title: string;
  description: string;
  services: ServiceSlug[];
  locale: 'tr' | 'en';
  className?: string;
}

export function CategoryServiceCard({
  icon,
  title,
  description,
  services,
  locale,
  className,
}: CategoryServiceCardProps) {
  const Icon = PhosphorIcons[icon] as React.ComponentType<{
    size?: number;
    weight?: string;
    className?: string;
  }>;

  const displayedServices = services.slice(0, 3);
  const remainingCount = services.length - 3;

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
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-end flex-1 space-y-3">
        <ul className="space-y-2">
          {displayedServices.map((serviceSlug) => {
            const service = SERVICES[serviceSlug];
            return (
              <li key={serviceSlug}>
                <Link
                  href={`/${serviceSlug}`}
                  className="group flex items-start gap-2 text-sm hover:text-primary transition-colors"
                >
                  <PhosphorIcons.ArrowRight
                    size={16}
                    className="mt-0.5 shrink-0 transition-transform group-hover:translate-x-1"
                  />
                  <span className="leading-tight">
                    {service.title[locale]}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={cn(
          "pt-2 h-8 flex items-center",
          remainingCount > 0 && "border-t border-border/50"
        )}>
          {remainingCount > 0 && (
            <span className="text-xs text-muted-foreground">
              +{remainingCount} {locale === 'tr' ? 'hizmet daha' : 'more services'}
            </span>
          )}
        </div>
      </CardContent>
    </GlowCard>
  );
}
