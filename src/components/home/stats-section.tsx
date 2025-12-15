'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { STATS } from '@/constants/stats';
import * as PhosphorIcons from '@phosphor-icons/react';
import { GlowCard } from '@/components/ui/glow-card';
import { CardContent } from '@/components/ui/card';

interface StatsSectionProps {
  className?: string;
}

export function StatsSection({ className }: StatsSectionProps) {
  const t = useTranslations('home.stats');

  return (
    <section className={cn('min-h-screen flex items-center py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.items.map((stat, index) => {
            const Icon = PhosphorIcons[stat.icon] as React.ComponentType<{
              size?: number;
              weight?: string;
              className?: string
            }>;

            return (
              <GlowCard
                key={index}
                mode="border"
                intensity="high"
                smoothness="normal"
                className="group"
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {Icon && <Icon size={32} weight="duotone" />}
                  </div>

                  <div className="space-y-2">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold">
                      {stat.label.tr}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.description.tr}
                    </p>
                  </div>
                </CardContent>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
