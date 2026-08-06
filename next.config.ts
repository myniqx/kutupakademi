import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : '';

const legacyRedirects = [
  ['/araci-degisken-analizi', '/blog/aracilik-etkisi-analizi-yaptirma'],
  ['/duzenleyici-degisken-analizi', '/blog/duzenleyici-degisken-analizi'],
  ['/hizmetlerimiz-spss-danismanlik-hizmeti', '/spss-danismanlik-hizmeti'],
  ['/spss-danismanlik-hizmetleri', '/spss-danismanlik-hizmeti'],
  ['/spss-egitimi', '/spss-egitimi-ile-veri-analizi'],
  ['/spss-veri-analizi-yaptirma-hizmeti', '/spss-veri-analizi-yaptirma-2'],
  ['/spss-ile-psikolojide-benlik-algisi-testi-veri-analizi', '/blog/spss-ile-psikolojide-benlik-algisi-testi-veri-analizi'],
  ['/spss-ile-saglik-psikolojisi-testleri-analizleri', '/blog/spss-ile-saglik-psikolojisi-testleri-analizleri'],
  ['/piyasa-arastirmasi-icin-spss-analizi', '/blog/piyasa-arastirmasi-icin-spss-analizi'],
  ['/spss-ile-duygularin-analizi', '/blog/spss-ile-duygularin-analizi'],
  ['/spss-ile-egitimde-ogrenme-duzeylerini-analiz-etme', '/blog/spss-ile-egitimde-ogrenme-duzeylerini-analiz-etme'],
  ['/spss-ile-firmanizin-verimlilik-analizleri', '/blog/spss-ile-firmanizin-verimlilik-analizleri'],
  ['/spss-ile-isletmeniz-uzerine-analizler', '/blog/spss-ile-isletmeniz-uzerine-analizler'],
  ['/spss-ile-rakip-firma-analizleri', '/blog/spss-ile-rakip-firma-analizleri'],
  ['/spss-ile-stres-ve-basa-cikma-stratejileri-analizi', '/blog/spss-ile-stres-ve-basa-cikma-stratejileri-analizi'],
  ['/spss-odevi-yapanlar', '/blog/spss-odevi-yapanlar'],
  ['/tuketici-arastirmalari-icin-spss-analizi', '/blog/tuketici-arastirmalari-icin-spss-analizi'],
  ['/yapisal-esitlik-modellemesi', '/yapisal-esitlik-modellemesi-analizi'],
  ['/yuksek-lisans-odev-yaptirma', '/blog/yuksek-lisans-odev-yaptirma'],
] as const;

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/storage/v1/object/public/**',
      },
    ],
    minimumCacheTTL: 31536000, // 1 year in seconds
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|ico|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      ...legacyRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      {
        source: '/blog/instagram.com/kutupakademi',
        destination: 'https://instagram.com/kutupakademi',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
