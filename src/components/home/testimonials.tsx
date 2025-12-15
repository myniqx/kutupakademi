'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { TESTIMONIALS } from '@/constants/testimonials';
import { GlowCard } from '@/components/ui/glow-card';
import { CardContent } from '@/components/ui/card';
import { StarFour, Quotes } from '@phosphor-icons/react';

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className }: TestimonialsProps) {
  const t = useTranslations('home.testimonials');

  return (
    <section className={cn('min-h-screen flex items-center py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.items.slice(0, 6).map((testimonial) => (
            <GlowCard
              key={testimonial.id}
              mode="border"
              intensity="medium"
              smoothness="normal"
              className="group h-full"
            >
              <CardContent className="pt-6 pb-6 flex flex-col h-full">
                {/* Quote icon */}
                <div className="mb-4 text-primary/20">
                  <Quotes size={40} weight="fill" />
                </div>

                {/* Comment */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {testimonial.comment.tr}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarFour
                      key={index}
                      size={16}
                      weight="fill"
                      className={cn(
                        index < testimonial.rating
                          ? 'text-yellow-500'
                          : 'text-muted/30'
                      )}
                    />
                  ))}
                </div>

                {/* Author info */}
                <div className="flex items-start gap-3 pt-4 border-t border-border/50">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {testimonial.role.tr}
                    </div>
                    <div className="text-xs text-muted-foreground/80 truncate">
                      {testimonial.university.tr}
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
