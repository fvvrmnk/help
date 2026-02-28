# SSR, SSG, and SEO Implementation Guide

## Overview

DocsHelp now includes server-side rendering (SSR), static site generation (SSG), and comprehensive SEO optimization following Google Search Central best practices.

## Components

### 1. Server-Side Rendering (SSR)

**Files:**
- `server/ssr.tsx` - React app rendering on server
- `server/routes/ssr.ts` - SSR request handler
- `server/index.ts` - Express server with SSR route

**How it works:**
1. Server receives HTTP request
2. Uses `renderApp(url)` to render React app on server
3. Extracts helmet data (meta tags, titles) from render
4. Injects SSR HTML and meta tags into template
5. Returns complete HTML document to client

**Benefits:**
- ✓ Instant page loads (no white screen)
- ✓ Meta tags available for crawlers before JavaScript
- ✓ Better Core Web Vitals
- ✓ Improved SEO ranking

### 2. Client-Side Hydration

**File:** `client/App.tsx`

**Implementation:**
```typescript
const root = document.getElementById("root")!;
const hasContent = root.innerHTML.length > 0;

if (hasContent) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
```

**How it works:**
1. Client detects if server rendered HTML exists
2. Uses `hydrateRoot` if content exists (SSR case)
3. Uses `createRoot` if empty (development SPA mode)
4. React attaches event listeners without re-rendering

**Important:** All component renders must be identical on server and client for hydration to work without warnings.

### 3. Static Site Generation (SSG)

**Files:**
- `scripts/prerender.ts` - Prerender script
- Routes configured in prerender script

**Usage:**
```bash
npm run build
# or
npm run prerender
```

**What it generates:**
- `/index.html` - Homepage
- `/rf/index.html` - RF services
- `/rb/index.html` - RB services
- `/ua/index.html` - UA services
- `/legal/**/index.html` - Legal pages

**Benefits:**
- ✓ Static files for CDN caching
- ✓ Zero server CPU load for static routes
- ✓ Ultra-fast page loads
- ✓ Perfect SEO (everything indexed)

**Note:** Dynamic routes (user input, forms) still handled by server.

## SEO Implementation

### Meta Tags & Open Graph

**File:** `client/lib/seo.tsx` - `Seo` component

**Includes:**
- ✓ Meta description
- ✓ Canonical URL
- ✓ Open Graph (og:title, og:description, og:image, og:url)
- ✓ Twitter Card (twitter:title, twitter:description, twitter:image)
- ✓ Theme color (mobile)
- ✓ Charset and viewport
- ✓ Robots meta (for noindex pages)

### JSON-LD Structured Data

**Schemas implemented:**

#### 1. Organization/LocalBusiness
```typescript
organizationJsonLd()
```
- Name, URL, logo
- Contact points (Telegram, WhatsApp)
- Address
- Aggregate rating (4.9 stars, 6 reviews)

#### 2. FAQ Schema
```typescript
faqJsonLd(items)
```
- Question-answer pairs
- Helps Google show FAQ rich snippets

#### 3. Reviews/Ratings
```typescript
reviewsJsonLd(testimonials)
```
- Aggregate rating
- Individual reviews
- Star ratings
- Helps show review ratings in search results

#### 4. Service Schema
```typescript
serviceJsonLd(params)
```
- Service name and description
- Area served
- Offer details (price, currency, availability)

#### 5. Breadcrumbs
```typescript
breadcrumbsJsonLd(items)
```
- Navigation breadcrumbs
- Helps Google understand site structure

### Semantic HTML

**Landmarks used:**
- `<header>` - Navigation
- `<nav>` - Navigation menu
- `<main>` - Main content
- `<footer>` - Footer
- `<section>` - Content sections
- `<h1>`, `<h2>`, `<h3>` - Proper heading hierarchy

**Benefits:**
- ✓ Screen readers understand content structure
- ✓ Google better understands content
- ✓ WCAG 2.2 Level AA compliant

### Image Optimization

**In ServiceCard.tsx:**
- Meaningful alt text for all images
- Lazy loading for performance
- Async decoding
- Object-fit with specific positions

## Performance Best Practices

### 1. Critical Rendering Path
- Meta tags injected in `<head>` before content
- Minimal render blocking
- CSS and JS optimized

### 2. Cache Headers
For static prerendered pages:
```
Cache-Control: public, max-age=86400
```

For API routes:
```
Cache-Control: private, max-age=0
```

### 3. Compression
- Enable gzip on server
- Minify JavaScript and CSS
- Compress images

### 4. HTTP/2 Server Push (for Vercel)
- Critical CSS/fonts
- Preload key resources

## Testing & Validation

### Check SSR works:
```bash
curl http://localhost:8080/ | grep -i "dochelp"
# Should show rendered content, not just empty div
```

### Check meta tags:
```bash
curl http://localhost:8080/ | grep -E '<meta|<title>'
# Should show all meta tags before body content
```

### Check JSON-LD:
```bash
curl http://localhost:8080/ | grep 'application/ld+json'
# Should show structured data
```

### Test with Google Tools:
1. **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
2. **Rich Results Test:** https://search.google.com/test/rich-results
3. **PageSpeed Insights:** https://pagespeed.web.dev
4. **URL Inspection Tool:** In Google Search Console

## Page Titles & Descriptions Best Practices

### Title Rules:
- ✓ 50-60 characters
- ✓ Include primary keyword
- ✓ Unique per page
- ✓ Front-load important words

### Description Rules:
- ✓ 155-160 characters
- ✓ Include primary keyword
- ✓ Include call-to-action
- ✓ Unique per page
- ✓ Compelling and clear

### Examples:

**Homepage:**
- Title: "DocsHelp — дистанционные услуги по документам"
- Description: "Агрегатор дистанционных услуг по документам для граждан РФ, РБ и Украины: справки, ЗАГС, права, паспорта, образование..."

**Country Page:**
- Title: "DocsHelp — услуги для граждан [Страна]"
- Description: "Каталог услуг DocsHelp для граждан [Страна]: справки, ЗАГС, права, паспорта, образование..."

## Deployment

### Vercel
SSR works out of the box with Vercel:
1. Build: `npm run build` (includes prerender)
2. Static files served from `/dist/spa`
3. Server functions handle API routes and SSR fallback

### Self-hosted
1. Build: `npm run build`
2. Run: `npm start` (starts Express server on port 3000)
3. Server will SSR routes and serve prerendered static files

## Monitoring

### Track Core Web Vitals:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

### Google Search Console:
- Monitor indexing status
- Check coverage report
- Review enhancement reports
- Analyze search performance

## Future Improvements

1. **Image Optimization:**
   - WebP format for modern browsers
   - Responsive images (srcset)
   - Picture elements for art direction

2. **Caching Strategy:**
   - Service worker for offline support
   - Cache busting for CSS/JS
   - Long-lived cache headers

3. **Dynamic Prerendering:**
   - Revalidate prerendered pages on demand
   - ISR (Incremental Static Regeneration)

4. **Advanced SEO:**
   - hreflang for multi-language
   - sitemap generation
   - robots.txt optimization
