# Kutup Akademi

A bilingual (Turkish/English) Next.js 16 web application providing academic study support and SPSS analysis services.

## 🚀 Features

### Core Features
- **🌍 Multilingual Support**: Turkish and English with next-intl (default: TR)
- **📝 Blog System**: MDX-based blog with syntax highlighting
- **🎨 Modern UI**: Tailwind CSS v4 + Shadcn/ui components
- **📱 Responsive**: Flawless display across all devices
- **🔐 Admin Dashboard**: Supabase Auth-protected panel for blog management
- **📧 Contact Forms**: Email delivery with Resend integration
- **🎭 Animations**: Smooth animations with Framer Motion and GSAP
- **🔍 SEO Optimized**: Comprehensive metadata, Open Graph, Twitter Card support

### Technical Features
- **⚡ Next.js 16**: App Router + React 19
- **🗄️ Database**: PostgreSQL + Drizzle ORM
- **🖼️ Media**: Supabase Storage (image management)
- **📄 Content**: MDX + next-mdx-remote (code syntax highlighting)
- **✅ Form Validation**: React Hook Form + Zod
- **🎨 Theme System**: Dynamic theme colors + dark mode

## 📋 Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL database
- Supabase account (for auth + storage)
- Resend API key (for email)

## 🛠️ Installation

### 1. Clone the Project
```bash
git clone <repository-url>
cd kutupakademi
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables
Create a `.env.local` file:

```env
# Database
POSTGRES_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."

# Email
RESEND_API_KEY="re_..."

# Optional
DEEPL_API_KEY="..."
```

### 4. Setup Database
```bash
# Push schema to database
pnpm db:push

# Or create migrations
pnpm db:generate
pnpm db:migrate
```

### 5. Start Development Server
```bash
pnpm dev
```

The application will run at http://localhost:3000

## 📁 Project Structure

```
kutupakademi/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/            # Language-based routing
│   │   │   ├── (hizmetler)/     # Service pages
│   │   │   ├── blog/            # Blog pages
│   │   │   ├── dashboard/       # Admin panel
│   │   │   └── ...              # Other pages
│   │   ├── api/                 # API routes
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── blog/               # Blog components
│   │   ├── forms/              # Form components
│   │   ├── layout/             # Header, Footer, etc.
│   │   ├── mdx/                # MDX render components
│   │   ├── sections/           # Page sections
│   │   ├── templates/          # Page templates
│   │   └── ui/                 # Shadcn UI components
│   ├── constants/              # Constants
│   │   ├── seo.ts             # SEO metadata management
│   │   ├── services.ts        # Service definitions
│   │   └── site.ts            # Site configuration
│   ├── db/                     # Database
│   │   ├── schema.ts          # Drizzle schema
│   │   └── index.ts           # DB client
│   ├── lib/                    # Utility libraries
│   │   ├── supabase/          # Supabase client/server
│   │   ├── markdown/          # MDX processing
│   │   ├── email/             # Email templates
│   │   └── utils/             # General utilities
│   ├── messages/               # i18n translation files
│   │   ├── en.json
│   │   └── tr.json
│   └── styles/                 # CSS files
├── public/                     # Static files
└── scripts/                    # Helper scripts
```

## 🎯 NPM Scripts

### Development
```bash
pnpm dev              # Development server
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # Linting
```

### Database
```bash
pnpm db:generate      # Generate migration files
pnpm db:push          # Push schema to DB
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio
```

### Content Management
```bash
pnpm scrape           # Scrape content from external sources
pnpm import:blogs     # Import blogs to database
```

### Theme
```bash
pnpm generate:theme   # Regenerate theme colors
```

## 🌐 Multilingual Structure

### Language Routing
- **Turkish (default)**: `https://kutupakademi.com/`
- **English**: `https://kutupakademi.com/en/`

### Adding Translations
Edit JSON files in `src/messages/`:

```json
// tr.json
{
  "home": {
    "title": "Ana Sayfa"
  }
}

// en.json
{
  "home": {
    "title": "Home"
  }
}
```

## 📝 Blog System

### Creating a Blog Post
1. Login to dashboard: `/dashboard`
2. Click "New Blog" button
3. Enter Turkish and English content
4. Write in MDX format (syntax highlighting for code examples)
5. Publish

### MDX Features
- Syntax highlighting (rehype-pretty-code + shiki)
- Responsive images (Next.js Image)
- GitHub Flavored Markdown (GFM)
- Custom React components

## 🎨 Theme Customization

### Changing Colors
1. Edit `src/config/theme-colors.json`
2. Regenerate theme:
```bash
pnpm generate:theme
```

### Dark Mode
Automatic dark mode support is available. Managed with `next-themes`.

## 🔐 Authentication

Dashboard is protected with Supabase Auth:
- Email/password login
- Session management
- Server-side auth checks

## 📧 Email System

### Contact Form
Email delivery using Resend API:
- Customizable HTML templates
- Auto-reply support
- Form validation

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy with Vercel CLI
vercel

# Production
vercel --prod
```

### Environment Variables
Configure these variables in Vercel dashboard:
- `POSTGRES_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`

## 📊 Database Schema

### Blogs Table
```typescript
{
  id: integer (primary key),
  slug: text (unique),
  title_tr: text,
  title_en: text,
  description_tr: text,
  description_en: text,
  content_tr: text,
  content_en: text,
  summary_tr: text,
  summary_en: text,
  author: text,
  keywords: text,
  coverImage: text,
  published: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Images Table
```typescript
{
  id: integer (primary key),
  filename: text,
  url: text,
  alt: text,
  width: integer,
  height: integer,
  size: integer,
  mimeType: text,
  createdAt: timestamp
}
```

## 🛡️ SEO

All pages have comprehensive SEO metadata:
- Title and description
- Open Graph tags
- Twitter Card
- Canonical URLs
- Alternate language links
- JSON-LD structured data
- Sitemap and robots.txt

Blog pages additionally include:
- Article metadata (publishedTime, modifiedTime, authors)
- Blog-specific keywords + default keywords

## 🔧 Technology Stack

### Frontend
- **Next.js 16** (App Router, React 19)
- **Tailwind CSS v4**
- **Shadcn/ui**
- **Framer Motion**
- **Radix UI**
- **Lucide Icons**
- **Phosphor Icons**

### Backend
- **PostgreSQL**
- **Drizzle ORM**
- **Supabase** (Auth + Storage)
- **Resend** (Email)

### Content
- **next-mdx-remote**
- **rehype-pretty-code** (syntax highlighting)
- **shiki** (code themes)
- **remark-gfm** (GitHub markdown)

### Developer Tools
- **TypeScript**
- **ESLint**
- **React Hook Form**
- **Zod**

## 📄 License

This is a private project.

## 🤝 Contributing

This project is currently in active development.

## 📞 Contact

Web: [kutupakademi.com](https://kutupakademi.com)

---

**Note**: This README reflects the current state of the project. Features and configurations may change over time.
