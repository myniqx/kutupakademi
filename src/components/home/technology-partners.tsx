'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { HOMEPAGE } from '@/constants/homepage';

interface TechnologyPartnersProps {
  className?: string;
}

export function TechnologyPartners({ className }: TechnologyPartnersProps) {
  const t = useTranslations('home.partners');

  return (
    <section className={cn('min-h-screen flex items-center py-16 md:py-24', className)}>
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
          {HOMEPAGE.partners.list.map((partner, index) => (
            <div
              key={index}
              className="group relative w-full max-w-40 aspect-3/2 flex items-center justify-center"
            >
              <div className="relative w-full h-full border-primary transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
