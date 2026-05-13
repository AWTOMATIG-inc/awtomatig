# Phase 2: Sitemap & Robots.txt for Next.js App Router

## Context
This is a Next.js 15 App Router project with no backend and no CMS
All routes are static including a case studies section which uses
hardcoded `generateStaticParams`. There is no existing sitemap.xml
or robots.txt — building from zero.

The production domain is: `https://awtomatig.com`

---

## Step 1: Audit All Routes

Using your Graphify context, list every page route in the app, including:
- Static pages (e.g. `/`, `/about`, `/contact`, `/services`)
- Case study pages (e.g. `/case-studies/[slug]` and all static slugs
  defined in `generateStaticParams`)

List them before proceeding. Flag anything uncertain.

---

## Step 2: Create `sitemap.ts`

Create `app/sitemap.ts` using the Next.js built-in `MetadataRoute.Sitemap`
type. Include:

- All static pages with appropriate `priority` and `changeFrequency`:
  - Homepage: `priority: 1.0`, `changeFrequency: 'monthly'`
  - Main pages (about, services, contact): `priority: 0.8`,
    `changeFrequency: 'monthly'`
  - Case study index: `priority: 0.7`, `changeFrequency: 'monthly'`
  - Individual case study pages: `priority: 0.6`,
    `changeFrequency: 'yearly'`

- All case study slugs hardcoded from `generateStaticParams` —
  import or reference them directly, do not fetch externally.

- Set `lastModified: new Date()` for all entries.

Example structure:
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://awtomatig.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // ... all other routes
  ]
}
```

---

## Step 3: Create `robots.ts`

Create `app/robots.ts` using the Next.js built-in `MetadataRoute.Robots`
type

Rules:
- Allow all crawlers on all public pages
- Disallow `/api/*` even though there's no backend (future-proofing)
- Point to the sitemap URL

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://awtomatig.com/sitemap.xml',
  }
}
```

---

## Step 4: Verify

After implementation, confirm:
- [ ] `https://awtomatig.com/sitemap.xml` returns valid XML with all routes
- [ ] `https://awtomatig.com/robots.txt` returns correct rules
- [ ] No hardcoded localhost or staging URLs
- [ ] Case study slugs all appear in sitemap
- [ ] `priority` and `changeFrequency` values are set on all entries.
