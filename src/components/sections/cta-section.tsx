import { GlowButton } from '@/components/ui/glow-button';
import { Link } from '@/i18n/routing';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SnakeParticles } from '../effects/snake-particles/snake-particles';
import { SnakeParticlesEffect } from '../effects/snake-particles';

type CTASectionProps = {
  locale: 'tr' | 'en';
  badge?: string;
  title?: string;
  description?: string;
  primaryButton?: {
    text?: string;
    href?: string;
  };
  secondaryButton?: {
    text?: string;
    href?: string;
  };
};

const defaultContent = {
  tr: {
    badge: 'Profesyonel Destek',
    title: 'Projeniz İçin Hemen Başlayın',
    description:
      'Uzman ekibimiz size özel çözümler sunmak için hazır. Detaylı bilgi ve fiyat teklifi için iletişime geçin.',
    primaryButton: {
      text: 'Ücretsiz Teklif Alın',
      href: '/fiyat-talebi',
    },
    secondaryButton: {
      text: 'Bize Ulaşın',
      href: '/iletisim',
    },
  },
  en: {
    badge: 'Professional Support',
    title: 'Get Started on Your Project',
    description:
      'Our expert team is ready to provide customized solutions. Contact us for detailed information and quotes.',
    primaryButton: {
      text: 'Get Free Quote',
      href: '/fiyat-talebi',
    },
    secondaryButton: {
      text: 'Contact Us',
      href: '/iletisim',
    },
  },
};

export function CTASection({
  locale,
  badge,
  title,
  description,
  primaryButton,
  secondaryButton,
}: CTASectionProps) {
  const content = defaultContent[locale];

  const finalBadge = badge ?? content.badge;
  const finalTitle = title ?? content.title;
  const finalDescription = description ?? content.description;
  const finalPrimaryButton = {
    text: primaryButton?.text ?? content.primaryButton.text,
    href: primaryButton?.href ?? content.primaryButton.href,
  };
  const finalSecondaryButton = {
    text: secondaryButton?.text ?? content.secondaryButton.text,
    href: secondaryButton?.href ?? content.secondaryButton.href,
  };

  return (
    <section className="relative overflow-hidden border-t border-border/50">
      <SnakeParticlesEffect />
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/0.1),transparent_50%)]" />

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Heading */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{finalBadge}</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            {finalTitle}
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {finalDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowButton asChild mode="border" intensity="high" size="lg" className="text-base">
              <Link href={finalPrimaryButton.href}>
                {finalPrimaryButton.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </GlowButton>
            <GlowButton
              asChild
              mode="background"
              intensity="medium"
              size="lg"
              variant="outline"
              className="text-base"
            >
              <Link href={finalSecondaryButton.href}>{finalSecondaryButton.text}</Link>
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
