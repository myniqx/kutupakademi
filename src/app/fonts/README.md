# Self-hosted fonts

IBM Plex Sans and IBM Plex Mono are served from this folder with `next/font/local`
(`src/app/[locale]/layout.tsx`), so `next build` makes no request to Google Fonts.

Why: `next/font/google` downloads fonts at build time. When Google Fonts answers with
extensionless `https://fonts.gstatic.com/l/font?kit=...&skey=...` URLs, the Next.js 16
Turbopack build fails with `next/font/google queries have exactly one entry`
([vercel/next.js#99114](https://github.com/vercel/next.js/issues/99114)).

| File | Source (google/fonts, SIL OFL 1.1) | Notes |
| --- | --- | --- |
| `IBMPlexSans-Variable.woff2` | `ofl/ibmplexsans/IBMPlexSans[wdth,wght].ttf` | instanced to wdth=100, wght 400-700 |
| `IBMPlexMono-{Regular,Medium,SemiBold,Bold}.woff2` | `ofl/ibmplexmono/IBMPlexMono-*.ttf` | static |

Subset to Latin + Latin Extended (covers Turkish: ç ğ ı İ ö ş ü) with
`pyftsubset --flavor=woff2 --layout-features='*'`. Licence: `OFL.txt`.
