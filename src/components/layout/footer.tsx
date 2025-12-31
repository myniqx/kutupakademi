"use client";

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SITE_CONFIG } from '@/constants/site';
import { FOOTER_MENU } from '@/constants/menu';
import { SERVICE_CATEGORIES, SERVICES } from '@/constants/services';
import type { ServiceCategoryId } from '@/constants/services';
import { Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import * as PhosphorIcons from '@phosphor-icons/react';

export function Footer() {
  const locale = useLocale() as 'tr' | 'en';
  const currentYear = new Date().getFullYear();
  const [expandedCategory, setExpandedCategory] = useState<ServiceCategoryId | null>(null);

  const toggleCategory = (categoryId: ServiceCategoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">
              {SITE_CONFIG.name[locale]}
            </h3>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.description[locale]}
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {SITE_CONFIG.contact.email}
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {SITE_CONFIG.contact.phone}
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>{SITE_CONFIG.contact.address[locale]}</span>
              </div>
            </div>
          </div>

          {/* Services Links - Interactive Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {FOOTER_MENU.services.title[locale]}
            </h3>
            <div className="space-y-3">
              {Object.values(SERVICE_CATEGORIES).map((category) => {
                const Icon = PhosphorIcons[category.icon as keyof typeof PhosphorIcons] as React.ComponentType<{ size?: number; className?: string }>;
                const isExpanded = expandedCategory === category.id;

                return (
                  <div key={category.id} className="space-y-2">
                    <button
                      onClick={() => toggleCategory(category.id as ServiceCategoryId)}
                      className="flex items-center justify-between w-full text-left group"
                    >
                      <div className="flex items-center gap-2">
                        {Icon && <Icon size={16} className="text-primary" />}
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {category.title[locale]}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isExpanded && (
                      <ul className="space-y-1.5 pl-6 border-l-2 border-primary/20">
                        {category.services.map((serviceSlug) => {
                          const service = SERVICES[serviceSlug];
                          return (
                            <li key={serviceSlug}>
                              <Link
                                href={`/${serviceSlug}`}
                                className="text-xs text-muted-foreground hover:text-primary transition-colors block"
                              >
                                {service.title[locale]}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4 lg:text-right">
            <h3 className="text-lg font-semibold text-foreground">
              {FOOTER_MENU.company.title[locale]}
            </h3>
            <ul className="space-y-2">
              {FOOTER_MENU.company.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {SITE_CONFIG.name[locale]}.{' '}
              {locale === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
            </p>
            <div className="flex gap-4">
              <div className="flex gap-4 mr-4">
                {SITE_CONFIG.social.twitter && (
                  <a
                    href={SITE_CONFIG.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                {SITE_CONFIG.social.linkedin && (
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {SITE_CONFIG.social.instagram && (
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/gizlilik-politikasi"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {locale === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
              </Link>
              <Link
                href="/kullanim-kosullari"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {locale === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
