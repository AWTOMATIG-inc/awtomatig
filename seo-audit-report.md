# SEO Audit Report — awtomatig.com
**Date:** 2026-06-03  
**Site type:** Service agency (business automation, operations, web development)  
**Framework:** Next.js (App Router) deployed on Vercel  
**Scope:** Full technical + on-page audit of source code

---

## Executive Summary

The site has solid technical bones (Next.js App Router, sitemap.xml, robots.txt, GTM) but is suffering from **systemic metadata gaps** that leave every page effectively invisible to Google's title/description indexing. The single biggest issue is that the home page, services page, and process page all use `"use client"`, which blocks Next.js from exporting per-page `metadata` — meaning they all inherit the root layout's generic `"AWTOMATIG"` title.

**Top 5 priorities:**
1. Remove `"use client"` from page-level files (or architect around it) to unlock per-page metadata
2. Add unique `title` + `description` metadata to every page
3. Add OpenGraph + Twitter card metadata (social sharing, click-through)
4. Fix multiple `<h1>` tags on case study detail pages
5. Fix generic/missing image alt text across case studies

---

## Critical Issues

### 1. Home page (`page.js`) cannot export metadata — blocked by `"use client"`

**File:** [src/app/page.js](src/app/page.js#L1)  
**Impact:** High  
**Evidence:** Line 1 is `"use client"`. In Next.js App Router, Client Components cannot export a `metadata` object. The home page therefore falls back to the root layout's generic title — showing "AWTOMATIG" in Google's SERP with no keywords.

**Fix:** Extract the client-side interactivity into a child component and make the page itself a Server Component.

```js
// src/app/page.js — remove "use client" from here
export const metadata = {
  title: "Awtomatig — Business Automation, Operations & Web Agency",
  description: "Your extended tech and ops team without the overhead. Automation, ERPNext, back-office execution, and high-performance websites. Founder-led since 2022.",
  alternates: { canonical: "https://awtomatig.com" },
};

export default function Home() { ... }
```

Any component that uses `useState`, `useEffect`, or GTM event handlers should be its own `"use client"` child component.

---

### 2. Services page and Process page also blocked by `"use client"`

**Files:** [src/app/services/page.jsx](src/app/services/page.jsx#L1), [src/app/process/page.jsx](src/app/process/page.jsx#L1)  
**Impact:** High  
**Evidence:** Both files begin with `"use client"` (services: line 1, process: line 1). Both pages serve high-intent keywords ("business automation services", "our process") but show "AWTOMATIG" as their title.

**Fix:** Same pattern — move client hooks (`useRef`, `useEffect`, `pushEvent`) to child components, keep the page file as a Server Component and export `metadata`.

---

### 3. No per-page metadata on any page

**Files:** All pages under [src/app/](src/app/)  
**Impact:** High  
**Evidence:** The Grep for `export.*metadata|generateMetadata` returns only one result: `src/app/layout.js:52`. None of the following pages export their own metadata:

| Page | File |
|------|------|
| About Us | [src/app/about-us/page.jsx](src/app/about-us/page.jsx) |
| Services | [src/app/services/page.jsx](src/app/services/page.jsx) |
| Process | [src/app/process/page.jsx](src/app/process/page.jsx) |
| Contact | [src/app/contact/page.js](src/app/contact/page.js) |
| Case Studies | [src/app/case-studies/page.jsx](src/app/case-studies/page.jsx) |
| Case Study (dynamic) | [src/app/case-studies/[slug]/page.jsx](src/app/case-studies/[slug]/page.jsx) |

Every page in Google shows the title "AWTOMATIG" and the same root description. This is the single largest SERP ranking and click-through problem on the site.

**Fix:** Add `export const metadata = { ... }` to each server component page. For the dynamic case study page, use `generateMetadata`:

```js
// src/app/case-studies/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  return {
    title: `${study.title} Case Study — Awtomatig`,
    description: study.summary.slice(0, 155),
    alternates: { canonical: `https://awtomatig.com/case-studies/${slug}` },
  };
}
```

---

### 4. Multiple `<h1>` tags on case study detail pages

**File:** [src/app/case-studies/[slug]/page.jsx](src/app/case-studies/[slug]/page.jsx)  
**Impact:** High  
**Evidence:**
- Line 22: `<h1 className="...">Overview</h1>`
- Line 64: `<h1 className="...">Style Guideline</h1>`

There should be exactly one `<h1>` per page. Google uses the H1 as a strong relevance signal. Having two H1s with generic section headings ("Overview", "Style Guideline") means the project name — the actual topic of the page — is never in an H1.

**Fix:** Change both to `<h2>`. Add a single H1 at the top of the page with the project name:

```jsx
<h1 className="text-5xl font-russo-one text-teal">
  {singleCaseStudies.title}
</h1>
```

---

## High Priority Issues

### 5. Root layout title has no keywords

**File:** [src/app/layout.js](src/app/layout.js#L52)  
**Impact:** High  
**Evidence:** `title: "AWTOMATIG"` — all-caps brand name, 9 characters, no descriptive keywords.

**Fix:**

```js
export const metadata = {
  title: {
    default: "Awtomatig — Business Automation & Operations Agency",
    template: "%s | Awtomatig",
  },
  description: "Operational infrastructure for growing businesses — back-office execution, automation, ERPNext, and high-performance websites. Founder-led, since 2022.",
  metadataBase: new URL("https://awtomatig.com"),
  ...
};
```

The `template` field is critical — it means child pages that export `title: "Services"` will automatically render as "Services | Awtomatig" in the browser tab and SERP.

---

### 6. No `metadataBase` — OG images will not resolve

**File:** [src/app/layout.js](src/app/layout.js#L52)  
**Impact:** High  
**Evidence:** The `metadata` export has no `metadataBase`. Without it, any relative URLs used in future `openGraph.images` or `twitter.images` will not resolve, and Next.js logs a warning. Social unfurling (Slack, LinkedIn, Twitter previews) will fail.

**Fix:** Add `metadataBase: new URL("https://awtomatig.com")` to the root layout metadata object.

---

### 7. No OpenGraph or Twitter card metadata anywhere

**Impact:** High  
**Evidence:** No `openGraph` or `twitter` keys exist anywhere in the codebase.

When a page is shared on LinkedIn, Slack, WhatsApp, or Twitter/X, it shows no preview image, no branded title, and no description. This reduces click-through from social channels and referral traffic.

**Fix (root layout):**

```js
export const metadata = {
  ...
  metadataBase: new URL("https://awtomatig.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://awtomatig.com",
    siteName: "Awtomatig",
    title: "Awtomatig — Business Automation & Operations Agency",
    description: "Your extended tech and ops team without the overhead.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awtomatig — Business Automation & Operations Agency",
    description: "Your extended tech and ops team without the overhead.",
    images: ["/og-image.png"],
  },
};
```

You will need to create a 1200×630px OG image and place it at `public/og-image.png`.

---

### 8. Generic and missing image alt text

**Impact:** High  
**Evidence:**

| File | Line | Current alt | Problem |
|------|------|-------------|---------|
| [src/app/case-studies/page.jsx](src/app/case-studies/page.jsx#L27) | 27 | `alt="churassco"` | Brand name, not descriptive |
| [src/app/case-studies/page.jsx](src/app/case-studies/page.jsx#L30) | 30 | `alt="royal_safari"` | Underscore in alt, not descriptive |
| [src/app/case-studies/[slug]/page.jsx](src/app/case-studies/[slug]/page.jsx#L207) | ~207 | `alt="component"` | Used for every component screenshot — completely generic |
| [src/app/not-found.js](src/app/not-found.js#L18) | 18 | `alt="404"` | Non-descriptive |

Alt text is used by screen readers (accessibility) and by Google Image Search for indexing. Generic alt text wastes an indexing signal.

**Fix:**

```jsx
// case-studies/page.jsx
<Image src={churassco_laptop} alt="Churassco restaurant website — laptop mockup" />
<Image src={royal_safari_laptop} alt="Royal Safari Tours website — laptop mockup" />

// [slug]/page.jsx — make alt dynamic
{singleCaseStudies.components.map((component, cid) => (
  <Image src={component} alt={`${singleCaseStudies.title} UI component ${cid + 1}`} ... />
))}
```

---

### 9. `lastModified: new Date()` in sitemap regenerates on every build

**File:** [src/app/sitemap.js](src/app/sitemap.js#L8)  
**Impact:** Medium-High  
**Evidence:** Every URL in the sitemap uses `lastModified: new Date()`. This means on every deployment, Google sees every page as "just updated." Over time, Google's crawl scheduling relies on `lastModified` to prioritize recrawling — when it's always "now," this signal becomes noise.

**Fix:** Use hardcoded or content-derived dates:

```js
{
  url: BASE_URL,
  lastModified: new Date("2026-05-13"),
  changeFrequency: "monthly",
  priority: 1.0,
},
```

For dynamic case study pages, use a date field from the `caseStudies` data constant.

---

## Medium Priority Issues

### 10. No structured data (Schema.org / JSON-LD)

**Impact:** Medium  
**Evidence:** No `<script type="application/ld+json">` found anywhere in the source.

Structured data unlocks rich results in Google (sitelinks, organization knowledge panel, breadcrumbs). For a service agency, the most valuable schemas are:

- **Organization** — company name, logo, social profiles, contact info (root layout)
- **WebSite** — enables sitelinks search box
- **Service** — marks up each service offering
- **BreadcrumbList** — on case study detail pages

**Fix (root layout):**

```jsx
// Add to layout.js inside <head> via next/head or as a Script component
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Awtomatig",
  "url": "https://awtomatig.com",
  "logo": "https://awtomatig.com/favicon.png",
  "foundingDate": "2022",
  "sameAs": [
    "https://www.linkedin.com/company/awtomatig",
  ]
};
```

---

### 11. No blog / content marketing route

**Impact:** Medium  
**Evidence:** A `BlogTimeline` component exists on the home page ([src/components/home/BlogTimeline.jsx](src/components/home/BlogTimeline.jsx)) but there is no `/blog` route in the sitemap or app directory. The sitemap has no blog entries.

Service agencies live and die by organic search. Without a blog, the site can only rank for branded terms and a handful of service keywords. Content targeting long-tail keywords like "how to automate shopify workflows" or "erpnext implementation guide" drives qualified inbound traffic.

**Fix:** Create a `/blog` route with static or CMS-backed posts. Add blog entries to [src/app/sitemap.js](src/app/sitemap.js).

---

### 12. Canonical URLs not set

**Impact:** Medium  
**Evidence:** No `alternates.canonical` is defined in any metadata export. Without explicit canonicals, if the same page is accessible at both `https://awtomatig.com/services` and `https://www.awtomatig.com/services` (or with/without trailing slash), Google may split ranking signals between duplicates.

**Fix:** Add `metadataBase` to the root layout (see Issue 6) and add per-page canonicals:

```js
export const metadata = {
  alternates: {
    canonical: "https://awtomatig.com/services",
  },
};
```

---

## Low Priority Issues

### 13. Social links on 404 page have empty `href=""`

**File:** [src/app/not-found.js](src/app/not-found.js#L33)  
**Impact:** Low  
**Evidence:** Lines 33–45 have `<a href="">` for Facebook, Twitter, LinkedIn, and YouTube. Empty hrefs are treated as links to the current page and may confuse crawlers.

**Fix:** Fill in the actual social profile URLs or remove the links.

---

### 14. Copyright year says 2025 in 404 page footer

**File:** [src/app/not-found.js](src/app/not-found.js#L48)  
**Impact:** Low  
**Evidence:** "Copyright @ AWTOMATIG 2025." It is now 2026. While Google doesn't directly penalise this, it's a trust signal for users.

**Fix:** Change to `2026` or better, use a dynamic year: `{new Date().getFullYear()}`.

---

## Prioritized Action Plan

### Tier 1 — Do These First (blocking ranking)

1. **Add `metadataBase` and `title template` to root layout** — [src/app/layout.js](src/app/layout.js). Unlocks proper title inheritance for all pages. 30-minute fix.

2. **Remove `"use client"` from home, services, and process page files** — extract hooks/events to child components. This is the prerequisite to all metadata work on those three pages.

3. **Add per-page `metadata` exports to all 6 pages** — unique title (50-60 chars) and description (150-160 chars) for home, about-us, services, process, contact, and case-studies.

4. **Add `generateMetadata` to the dynamic case study page** — [src/app/case-studies/[slug]/page.jsx](src/app/case-studies/[slug]/page.jsx). Each case study needs its own title in Google.

5. **Fix the two `<h1>` tags on case study detail pages** — demote "Overview" and "Style Guideline" to `<h2>`, add a project-name `<h1>` at the top.

### Tier 2 — High Impact, Short Effort

6. **Add OpenGraph + Twitter metadata to root layout** — create a 1200×630 OG image and wire up the metadata object.

7. **Fix image alt text** — descriptive alt on all case study images (list and detail pages).

8. **Fix `lastModified` in sitemap** — use real dates, not `new Date()`.

### Tier 3 — Structured Data & Content

9. **Add Organization + WebSite JSON-LD schema** to root layout.

10. **Add BreadcrumbList schema** to case study detail pages.

11. **Add `alternates.canonical`** to each page's metadata.

12. **Create a `/blog` route** and start publishing content targeting automation, operations, and web development keywords.

### Tier 4 — Hygiene

13. Fix empty `href=""` social links on 404 page.
14. Update copyright year to current year.

---

## Clarifying Questions

Before implementing, a few questions would sharpen the recommendations:

1. **What are your target keywords?** (e.g., "business automation agency", "erpnext implementation", "web design for startups") — this informs which page titles and H1s to prioritise.

2. **Do you have Google Search Console access?** — If so, what pages are already indexed? Are there coverage errors? This tells us if there are crawl issues beyond what's in the code.

3. **Is there a blog or content backlog planned?** — The `BlogTimeline` component on the home page suggests yes, but there's no route yet. Knowing the timeline helps prioritise.

4. **Are there any pages you intentionally want to keep `noindex`?** — Right now everything is allowed; worth confirming nothing sensitive should be hidden.

5. **Do you have existing social profile URLs for the structured data?** (LinkedIn, Twitter/X, Facebook) — needed for the Organization schema.
