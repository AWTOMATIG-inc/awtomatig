# Phase 1: Google Tag Manager Setup & Event Tracking

## Context
This is a Next.js 15 App Router project. The codebase has been analyzed via
Graphify, so you have full context of the component tree, page structure,
and existing code patterns. Do not suggest or install GA4, Google Analytics,
or any analytics library — GTM will be the only tracking layer. GA4 will be
configured later inside Tag Manager by the client.

---

## Step 1: Install & Configure GTM

1. Install the package:
   ```bash
   npm install @next/third-parties
   ```

2. Create a `.env.local` file in the root with:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-P45MZJDK
   ```

3. Add `<GoogleTagManager>` from `@next/third-parties/google` into the root
   `layout.tsx` using the env variable `process.env.NEXT_PUBLIC_GTM_ID`.
   Follow the official Next.js third-parties pattern for App Router.
   Do not add any GA4 or gtag config calls anywhere.

---

## Step 2: Identify Tracking Targets

Using your Graphify context of the codebase, identify:

- All **CTA buttons** (e.g. "Book a Call", "Get a Quote", "Contact Us") —
  note their component names and locations
- The **contact form** component — specifically where the success message
  is shown after submission
- Any **phone number** links (usually `href="tel:..."`)
- The **"Book a Call"** button/link that navigates to Calendly

List what you find before making any changes. Wait for confirmation if
anything is ambiguous.

---

## Step 3: Implement dataLayer Event Pushes

For each tracking target identified in Step 2, push a `window.dataLayer`
event. Use this exact pattern:

```typescript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'event_name',
  // additional properties below
});
```

### Events to implement:

| Trigger | Event Name | Extra Properties |
|---|---|---|
| CTA button click | `cta_click` | `cta_label: "button text"` |
| Book a Call button/link click | `book_call_click` | `destination: "calendly"` |
| Contact form success message shown | `contact_form_success` | `form_location: "contact_page"` |
| Phone number link click | `phone_click` | `phone_number: "the number"` |

### Scroll depth:
Add a scroll depth tracker to the root `layout.tsx` as a client component.
Track at **25%, 50%, 75%, 100%** thresholds. Push this event:
```typescript
window.dataLayer.push({
  event: 'scroll_depth',
  scroll_threshold: 75 // the percentage reached
});
```
Fire each threshold only once per page load.

---

## Step 4: Page View Tracking

GTM fires a default pageview on initial load. For **client-side navigation**
in App Router, push a `page_view` event on route changes using
`usePathname()` from `next/navigation` inside a client component added to
`layout.tsx`:

```typescript
window.dataLayer.push({
  event: 'page_view',
  page_path: pathname
});
```

---

## Step 5: TypeScript Declaration

Add a global TypeScript declaration so `window.dataLayer` doesn't throw
type errors. Create or update `types/gtm.d.ts`:

```typescript
interface Window {
  dataLayer: Record<string, unknown>[];
}
```

---

## Completion Checklist
Before finishing, confirm:
- [ ] GTM script loads via `@next/third-parties` in `layout.tsx`
- [ ] `.env.local` created with `NEXT_PUBLIC_GTM_ID`
- [ ] No GA4 / gtag calls anywhere in the codebase
- [ ] All dataLayer pushes are implemented and fire correctly
- [ ] Scroll depth fires once per threshold per page
- [ ] Page view fires on client-side navigation
- [ ] TypeScript declaration added
- [ ] No existing functionality is broken
