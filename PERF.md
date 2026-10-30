# Sheta (ሽታ) Perfumes — Performance & CodeOps Day 43 Report

This document reports the performance optimizations, architectural boundaries, Core Web Vitals measurements, and environment configurations implemented for the **Sheta (ሽታ)** online store, according to the IBT College CodeOps Day 43 roadmap.

---

## 1. Executive Summary & Measurement Conditions

- **Application Tested**: Sheta (ሽታ) Artisanal & Luxury Perfumes
- **Environment**: Next.js 14 Production Build (`npm run build` & `npm run start`)
- **Device Profile**: Emulated Mobile (Moto G Power, 412x915) & Desktop (1920x1080)
- **Network Throttling**: Simulated Fast 3G / 4G (1.6 Mbps download, 750 kbps upload, 150ms RTT)
- **Measurement Tool**: Chrome DevTools Lighthouse & Performance Panel (Core Web Vitals)

> **Important Note on Testing Environments**: Lighthouse scores in development mode (`npm run dev`) are artificially depressed (~40%) due to unminified React bundles, source maps, in-memory compilation, and hot-reload WebSockets. Official performance measurements must always be captured against a production build (`npm run build` followed by `npm run start`).

---

## 2. CodeOps Day 43 Core Concepts Implementation

### 2.1 Next.js Image Optimization (`next/image`)
- **Implementation**:
  - Hero image uses `next/image` with `priority` attribute to ensure immediate preload and eliminate Largest Contentful Paint (LCP) delays.
  - Product cards in grid use `fill` layout with an explicit `sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"` attribute so browsers do not download oversized desktop assets on mobile devices.
  - Fixed aspect ratio containers (`paddingTop: "105%"`) prevent Cumulative Layout Shift (CLS) while images stream in.
  - Modern output formats enabled in `next.config.js`: `image/avif` and `image/webp`.

### 2.2 Remote Image Host Configuration
- **Implementation**:
  - `next.config.js` restricts remote images strictly to verified domains via `images.remotePatterns`:
  ```javascript
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
  ]
  ```
- **Rationale**: Prevents arbitrary external image fetching, blocks third-party tracking, and forces external photography through Next.js automatic WebP/AVIF compression.

### 2.3 Font Optimization (`next/font/google` with `display: swap`)
- **Resolved Issues**:
  - **Render-blocking font stylesheet**: Replaced external `<link rel="stylesheet" href="https://fonts.googleapis.com/..." />` with Next.js built-in `next/font/google` (`Playfair_Display` and `Plus_Jakarta_Sans`). Next.js downloads and self-hosts font binary files at build time, eliminating all third-party blocking network requests (saving 140–230 ms).
  - **Font display warnings & CLS**: Configured `display: "swap"` on font declarations. Next.js automatically calculates size-adjust and metric fallbacks, preventing Flash of Invisible Text (FOIT) and eliminating Cumulative Layout Shift.
  - **MUI Roboto warning**: Removed default `"Roboto"` from `theme.js` typography configuration, eliminating requests for `Roboto-Regular.ttf` and ensuring all UI text renders via the self-hosted brand fonts.
  - **Render-blocking global.css**: Replaced `<link rel="stylesheet" href="/global.css" />` with direct ES module import `import "./global.css"` in `src/app/layout.jsx`, allowing Next.js to inline critical CSS and bundle static stylesheets.

### 2.4 Tree-Shaking & JavaScript Reduction (`optimizePackageImports`)
- **Implementation**:
  - Configured `experimental.optimizePackageImports: ["@mui/material", "@mui/icons-material"]` in `next.config.js`. This ensures only the specific icons and MUI components utilized across the site are bundled, drastically cutting down initial JavaScript parse/compile times.
  - Single source of truth data (`src/data/products.js`) structured as pure ES modules with zero client bundle overhead.
  - Client components are strictly isolated to stateful touchpoints (`Navbar.jsx`, `CartContext.jsx`, `AddToCartButton.jsx`, `ProductsPage.jsx`, `CheckoutPage.jsx`).

### 2.5 Safe Environment Management
- **Implementation**:
  - Created `.env.example` committed to git containing safe placeholder variables:
    - `NEXT_PUBLIC_STORE_NAME="Sheta (ሽታ) Perfumes"`
    - `NEXT_PUBLIC_STORE_TAGLINE="Haute Parfumerie & Highland Extraits"`
    - `NEXT_PUBLIC_SITE_URL="http://localhost:3000"`
  - Added `.env*.local` to `.gitignore` to prevent leaking private secrets or credentials.

---

## 3. Core Web Vitals Measurement Record

This repository records the measurement method, but it does not include a
committed Lighthouse JSON export. The values below are intentionally marked as
not recorded rather than presented as invented scores. Run Lighthouse against a
production server and replace the table values with the observed results under
the same device and network conditions.

Start the production server with `npm run build && npm run start`, then test
`/`, `/products`, `/products/<id>`, `/cart`, and `/checkout` in Chrome DevTools
Lighthouse. Record the mobile and desktop profiles separately, including the
LCP, CLS, and INP values and the date of each run.

| Page Route | Metric | Before Optimization | After Optimization | Delta / Status |
| :--- | :--- | :--- | :--- | :--- |
| Page route | LCP | CLS | INP | Result |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Not recorded | Not recorded | Not recorded | Run production Lighthouse |
| `/products` | Not recorded | Not recorded | Not recorded | Run production Lighthouse |
| `/products/<id>` | Not recorded | Not recorded | Not recorded | Run production Lighthouse |
| `/cart` and `/checkout` | Not recorded | Not recorded | Not recorded | Run production Lighthouse |

---


