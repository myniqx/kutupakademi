'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { HOMEPAGE } from '@/constants/homepage';
import * as PhosphorIcons from '@phosphor-icons/react';

interface ProcessStepsProps {
  className?: string;
}

export function ProcessSteps({ className }: ProcessStepsProps) {
  const t = useTranslations('home.process');

  return (
    <section className={cn('min-h-screen flex items-center py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {HOMEPAGE.process.steps.map((step, index) => {
            const Icon = PhosphorIcons[step.icon] as React.ComponentType<{
              size?: number;
              weight?: string;
              className?: string
            }>;

            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-300" />
                  <span className="relative text-2xl font-bold text-primary group-hover:text-primary-foreground transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                  {Icon && <Icon size={24} weight="duotone" />}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title.tr}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description.tr}
                </p>

                {/* Arrow between steps (desktop only) */}
                {index < HOMEPAGE.process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 -right-4 transform translate-x-1/2 text-primary/30">
                    <PhosphorIcons.ArrowRight size={24} weight="bold" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
