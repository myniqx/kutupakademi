"use client";

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MAIN_MENU, type MenuItem } from '@/constants/menu';
import { SITE_CONFIG } from '@/constants/site';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';
import { GlowButton } from '@/components/ui/glow-button';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const locale = useLocale() as 'tr' | 'en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Logo w={60} /> <span className='font-medium text-xl md:text-2xl'> {SITE_CONFIG.name[locale]}</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {MAIN_MENU.map((item) => (
                <NavigationMenuItem key={item.href === '#' ? item.label[locale] : item.href}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.label[locale]}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="columns-2 w-125 gap-3 p-4 md:w-150">
                          {item.children.map((child) => (
                            <li key={child.href} className="break-inside-avoid mb-3">
                              {child.children ? (
                                <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm p-3 space-y-2">
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={child.href}
                                      className="block text-sm font-semibold text-foreground hover:text-primary transition-colors"
                                    >
                                      {child.label[locale]}
                                    </Link>
                                  </NavigationMenuLink>
                                  <ul className="space-y-1">
                                    {child.children.map((subChild) => (
                                      <li key={subChild.href}>
                                        <NavigationMenuLink asChild>
                                          <Link
                                            href={subChild.href}
                                            className="block select-none rounded-md px-2 py-1.5 text-sm leading-tight no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                          >
                                            {subChild.label[locale]}
                                          </Link>
                                        </NavigationMenuLink>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    className="block select-none rounded-lg border border-border bg-card/60 backdrop-blur-sm p-3 text-sm font-medium leading-tight no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    {child.label[locale]}
                                  </Link>
                                </NavigationMenuLink>
                              )}
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-lg bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.label[locale]}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />

            <GlowButton asChild mode="border" intensity="medium" className="hidden lg:inline-flex">
              <Link href="/fiyat-talebi">
                {locale === 'tr' ? 'Fiyat Talebi' : 'Get Quote'}
              </Link>
            </GlowButton>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader>
                  <SheetTitle>{SITE_CONFIG.name[locale]}</SheetTitle>
                </SheetHeader>
                <nav className="mt-6">
                  <MobileMenu items={MAIN_MENU} locale={locale} onClose={() => setMobileMenuOpen(false)} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({
  items,
  locale,
  onClose,
  level = 0,
}: {
  items: MenuItem[];
  locale: 'tr' | 'en';
  onClose: () => void;
  level?: number;
}) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (href: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(href)) {
      newOpenItems.delete(href);
    } else {
      newOpenItems.add(href);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <ul className={cn("space-y-1", level > 0 && "ml-4 mt-2 border-l border-border pl-4")}>
      {items.map((item) => (
        <li key={item.href}>
          {item.children ? (
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label[locale]}
                </Link>
                <button
                  onClick={() => toggleItem(item.href)}
                  className="rounded-md px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openItems.has(item.href) && "rotate-180"
                    )}
                  />
                </button>
              </div>
              {openItems.has(item.href) && (
                <MobileMenu
                  items={item.children}
                  locale={locale}
                  onClose={onClose}
                  level={level + 1}
                />
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              onClick={onClose}
              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              {item.label[locale]}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
