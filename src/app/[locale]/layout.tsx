import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { generateMeta } from '@/constants/seo';
import { SITE_CONFIG } from '@/constants/site';
import { JsonLd } from '@/components/seo/json-ld';
import "../globals.css";

// Fonts are self-hosted (see src/app/fonts/README.md). next/font/google downloads
// fonts at build time and Next.js 16 fails the build when Google Fonts answers
// with extensionless /l/font?kit= URLs (vercel/next.js#99114).
const ibmPlexSans = localFont({
  src: "../fonts/IBMPlexSans-Variable.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: [
    { path: "../fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/IBMPlexMono-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/IBMPlexMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  preload: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    ...generateMeta({
      locale: locale as 'tr' | 'en',
      path: locale === 'en' ? '/en' : '',
    }),
    metadataBase: new URL(SITE_CONFIG.url),
  };
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'tr')) {
    notFound();
  }

  const messages = await getMessages();
  const localizedName = SITE_CONFIG.name[locale as 'tr' | 'en'];
  const localizedDescription = SITE_CONFIG.description[locale as 'tr' | 'en'];
  const homeUrl = locale === 'en' ? `${SITE_CONFIG.url}/en` : SITE_CONFIG.url;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${SITE_CONFIG.url}/#organization`,
              name: localizedName,
              url: SITE_CONFIG.url,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_CONFIG.url}/kutupakademii.webp`,
                width: 486,
                height: 513,
              },
              email: SITE_CONFIG.contact.email,
              telephone: SITE_CONFIG.contact.phone,
              address: {
                '@type': 'PostalAddress',
                addressLocality: locale === 'en' ? 'Pendik, Istanbul' : 'Pendik, İstanbul',
                addressCountry: 'TR',
              },
              sameAs: Object.values(SITE_CONFIG.social).filter(Boolean),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${SITE_CONFIG.url}/#website`,
              url: homeUrl,
              name: localizedName,
              description: localizedDescription,
              inLanguage: locale,
              publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
            },
          ]}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W7TS48WD');`,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZLCFFD6H9R" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-ZLCFFD6H9R');`,
          }}
        />
      </head>
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W7TS48WD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 -mt-16">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
