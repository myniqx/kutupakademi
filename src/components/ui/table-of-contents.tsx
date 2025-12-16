'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Heading } from '@/lib/markdown/extract-headings';

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
          <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
          <p className="text-sm font-semibold text-foreground/90">İçindekiler</p>
        </div>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                'transition-all duration-200',
                heading.level === 3 && 'pl-4'
              )}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  'block py-1.5 px-3 rounded-md text-sm transition-all duration-200',
                  'hover:bg-muted/50 hover:text-foreground',
                  'border-l-2 transition-colors',
                  activeId === heading.id
                    ? 'border-primary bg-primary/5 text-foreground font-medium'
                    : 'border-transparent text-muted-foreground hover:border-border'
                )}
              >
                <span className="line-clamp-2">{heading.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
