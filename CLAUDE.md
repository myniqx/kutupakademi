# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kutupakademi is a bilingual (Turkish/English) Next.js 16 application providing academic services. The site features a blog system, service pages, contact/price request forms, and a dashboard for content management.

## Technology Stack

- **Framework**: Next.js 16 (App Router with React 19)
- **Internationalization**: next-intl (TR/EN, default: TR)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for images)
- **Styling**: Tailwind CSS v4!
- **Animations**: Framer Motion, GSAP
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend with react-email templates
- **Content**: MDX with next-mdx-remote

## Development Commands

```bash
# Development server
npm run dev

# Build production
npm build

# Production server
npm start

# Linting
npm run lint

# Database operations
npm run db:generate    # Generate migrations from schema changes
npm run db:push        # Push schema to database
npm run db:migrate     # Run migrations
npm run db:studio      # Open Drizzle Studio

# Content management
npm run scrape         # Scrape blog content from external sources
npm run import:blogs   # Import scraped blogs to database
```

## Project Structure

### App Router Organization

```
src/app/[locale]/
├── (hizmetler)/[service]/  # Dynamic service pages
├── blog/                   # Blog listing and individual posts
│   └── [slug]/
├── dashboard/              # Admin dashboard
│   ├── blog/
│   └── components/
├── hakkimizda/            # About page
├── iletisim/              # Contact page
└── fiyat-talebi/          # Price request page
```

### Key Directories

- `src/components/`: Reusable UI components organized by feature

  - `blog/`: Blog-specific components (editor, cards, preview)
  - `forms/`: Form components (contact, price request)
  - `layout/`: Header, footer, navigation
  - `ui/`: Shadcn-based UI primitives
  - `templates/`: Page templates for services and blogs

- `src/lib/`: Utility libraries

  - `supabase/`: Client/server Supabase helpers
  - `markdown/`: MDX processing utilities
  - `animations/`: GSAP and animation helpers

- `src/db/`: Database schema and client

  - `schema.ts`: Drizzle schema (blogs, images tables)
  - `index.ts`: Database client initialization

- `src/constants/`: Static configuration

  - Services, menu items, routes, SEO metadata, site config

- `src/messages/`: i18n translation files (en.json, tr.json)

## Internationalization

- Locales: `tr` (default), `en`
- Routing: `as-needed` mode (TR has no prefix, EN uses `/en`)
- Translation files: `src/messages/{locale}.json`
- Database: Bilingual content stored with `_tr` and `_en` suffixes

Example accessing translations:

```typescript
import { useTranslations } from "next-intl";
const t = useTranslations("namespace");
```

## Database Schema

### Blogs Table

- Bilingual fields: title, description, summary, content (with \_tr/\_en suffixes)
- Fields: slug (unique), author, keywords, coverImage, published, timestamps
- MDX content stored in content_tr/content_en

### Images Table

- Supabase Storage integration
- Fields: filename, url, alt, dimensions, size, mimeType

## Authentication Flow

- Supabase Auth for dashboard access
- Server-side auth in dashboard pages
- Cookie-based session management
- Auth check in src/app/[locale]/dashboard/page.tsx

## Blog System

### Content Creation

1. Create/edit in dashboard at `/dashboard/blog/new` or `/dashboard/blog/edit/[id]`
2. Markdown editor with live preview
3. Bilingual content entry (TR required, EN optional)
4. Image upload via Supabase Storage integration
5. Publish toggle to make blogs visible

### Content Rendering

- MDX processed with next-mdx-remote
- Custom components in `src/components/mdx/`
- Syntax highlighting with rehype-pretty-code
- Auto-generated table of contents from headings
- Responsive images with Next.js Image component

## Service Pages

- Service definitions in `src/constants/services.ts`
- Dynamic routes: `src/app/[locale]/(hizmetler)/[service]/page.tsx`
- Template component: `src/components/templates/service-template.tsx`
- MDX content rendered with service-specific metadata

## Styling Conventions

- Tailwind v4 with CSS variables for theming
- Dark mode support via next-themes
- Component variants with class-variance-authority (cva)
- Custom animations using Framer Motion and GSAP
- Responsive design: mobile-first approach

## Important Notes

- **File Paths**: Always use full Windows paths (e.g., `C:\Users\...`) when writing files
- **Translations**: When adding UI elements, update both `src/messages/en.json` and `src/messages/tr.json`
- **Database Changes**: After modifying `src/db/schema.ts`, run `npm run db:generate` then `npm run db:push`
- **Environment Variables**: Required vars in `.env.local`:
  - `POSTGRES_URL`: PostgreSQL connection string
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase config
  - Additional: Resend API key, Supabase service role key

## Common Patterns

### Server Components

- Default in App Router
- Use `async` for data fetching
- Import translations with `getTranslations` from next-intl/server

### Client Components

- Mark with `'use client'`
- Use hooks (useTranslations, useState, etc.)
- Interactive components, forms, animations

### Type Safety

- Infer types from Drizzle schema: `Blog`, `NewBlog`, `Image`, `NewImage`
- Form schemas with Zod
- TypeScript strict mode enabled
