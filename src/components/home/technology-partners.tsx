'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HOMEPAGE } from '@/constants/homepage';

interface TechnologyPartnersProps {
  className?: string;
}

export function TechnologyPartners({ className }: TechnologyPartnersProps) {
  const t = useTranslations('home.partners');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const duplicatedPartners = [...HOMEPAGE.partners.list, ...HOMEPAGE.partners.list];

  useEffect(() => {
    if (!trackRef.current) return;

    const calculateAndAnimate = () => {
      if (!trackRef.current) return;
      const width = trackRef.current.scrollWidth / 2;

      controls.start({
        x: [0, -width],
        transition: {
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    };

    const timer = setTimeout(calculateAndAnimate, 100);

    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <section className={cn('min-h-screen flex items-center py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="relative overflow-hidden py-2">
          <motion.div
            ref={trackRef}
            className="flex gap-8 md:gap-12 w-max"
            animate={controls}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={index}
                className="shrink-0 w-48 md:w-52 aspect-3/2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  scale: hoveredIndex === index ? 1.1 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <div
                  className={cn(
                    'relative w-full h-full rounded-lg border border-border/50',
                    'bg-white dark:bg-black dark:border-white/10 p-6 backdrop-blur-sm',
                    'transition-all duration-300',
                    hoveredIndex === index ? 'grayscale-0 opacity-100' : 'grayscale opacity-70'
                  )}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2 dark:invert"
                    sizes="160px"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
