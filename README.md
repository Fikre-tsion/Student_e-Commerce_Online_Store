# Sheta (ሽታ) — Artisanal & Luxury Perfumes Online Store

> **"Our store helps fragrance enthusiasts and perfume connoisseurs find and order artisanal luxury perfumes crafted from sacred Ethiopian highland resins, Semien cedar, and rare oriental extracts."**

Built for **IBT College • CodeOps Project: Build an Online Store** (incorporating CodeOps Day 43 performance, environment, and architecture concepts).

---

## 🌟 Brand & Concept

**Sheta (ሽታ)** — in Amharic, *Sheta* means scent, aroma, or fragrance. The brand celebrates the ancient incense and botanical heritage of the Horn of Africa, marrying wild-harvested highland frankincense from Bale, Semien mountain cedar, and Harar roasted vanilla with classical haute perfumery extraits de parfum (25%+ concentration).

---

## 🎨 Strict 5-Color Luxury Palette

As specified in the design requirements, the entire UI/UX is built strictly using **five cohesive colors**:

| Color Name | Hex Code | Role in Design System |
| :--- | :--- | :--- |
| **Obsidian Onyx** | `#121212` | High-contrast typography, primary buttons, header & footer background, bold structural accents |
| **Royal Gold** | `#C5A059` | Perfume essence gold, star ratings, active badge highlights, secondary CTAs, focus rings |
| **Alabaster Cream** | `#FAF8F5` | Ambient global background canvas, providing warm luxury warmth without eye strain |
| **Pure White** | `#FFFFFF` | Flacon card surfaces, form inputs, modal dialogs, elevated containers |
| **Muted Slate** | `#6B7280` | Secondary descriptions, subtle 1px dividers, placeholders, metadata typography |

---

## 🚀 Complete Customer Journey

The application implements the complete 6-stage end-to-end shopping journey:

1. **Home (`/`)**:
   - Hero banner with brand mission and Amharic lettering.
   - Scent families preview (Woody & Resinous, Floral Oriental, Gourmand & Warm).
   - Featured products grid with direct Add to Cart.
   - Four pillars of Sheta craftsmanship (25%+ Extraits, Wild Highland Resins, 90-Day Maceration, Hand-numbered Bottles).
2. **Catalogue (`/products`)**:
   - Real-time search across perfume names, notes (e.g. Frankincense, Rose), descriptions, and Amharic titles.
   - Category filter pills for each olfactory family.
   - Sorting by Featured, Price (Low-to-High / High-to-Low), Rating, and Alphabetical.
   - Dynamic product counter and reset filters.
3. **Product Detail (`/products/[id]`)**:
   - High-resolution perfume photography with Next.js Image.
   - Olfactory Pyramid breakdown: Top notes, Heart notes, Base notes.
   - Interactive quantity stepper (- / +).
   - Add to Cart button with micro-animation feedback.
   - Graceful Not Found error state for invalid product IDs.
   - Related fragrances recommendation section ("You May Also Admire").
4. **Shopping Cart (`/cart`)**:
   - Full line item breakdown: bottle thumbnail, name, Amharic title, unit price, quantity, line total.
   - Increase/decrease quantity with zero/removal boundaries.
   - Remove item action with tooltip.
   - Automatic subtotal, estimated tax (5%), and free shipping calculator (complimentary over $150).
   - Helpful empty cart state with direct link to catalogue.
5. **Checkout Order Form (`/checkout`)**:
   - Customer name, contact email, telephone, and physical delivery address.
   - Client-side validation with descriptive inline feedback.
   - Real-time order summary preview before submission.
   - Blocks submission if cart is empty.
   - **Scope Notice**: Pure order submission. No credit card details, payment PINs, or banking credentials are requested.
6. **Order Confirmation (`/order-success`)**:
   - Displays unique generated order reference code (e.g., `SHETA-2026-XXXX`).
   - Summary of ordered bottles, quantities, and financial total.
   - Delivery destination summary and contact info.
   - 3-step fulfillment timeline (Order Queued -> Bottling & Sealing -> Direct Dispatch).
   - Action to return to catalogue.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material UI (MUI v5) + Emotion Cache SSR
- **Icons**: `@mui/icons-material`
- **State Management**: React Context (`CartContext.jsx`) with `localStorage` persistence
- **Performance Optimization**: `next/image` with remote patterns, preconnected web fonts, Server/Client component partitioning
- **Environment Management**: Safe `.env.example` file (no secrets committed to Git)

---

## 📂 Project Structure

```text
ONLINE_STORE/
├── .env                      # Safe environment variable template
├── .gitignore                # Git ignore rules for node_modules, .next, etc.
├── next.config.js            # Next.js config with remote image patterns & formats
├── package.json              # Project dependencies & scripts
├── PERF.md                   # CodeOps Day 43 Performance & Core Web Vitals report
├── README.md                 # Project documentation & assessment questions
├── src/
│   ├── app/
│   │   ├── cart/
│   │   │   └── page.jsx      # Shopping cart route
│   │   ├── checkout/
│   │   │   └── page.jsx      # Order delivery form route (no payments)
│   │   ├── layout.jsx        # Root layout with ThemeRegistry & CartProvider
│   │   ├── order-success/
│   │   │   └── page.jsx      # Order confirmation route
│   │   ├── page.jsx          # Home landing page route
│   │   └── products/
│   │       ├── [id]/
│   │       │   └── page.jsx  # Dynamic product detail route
│   │       └── page.jsx      # Fragrance catalogue & search route
│   ├── components/
│   │   ├── AddToCartButton.jsx # Interactive add-to-cart button
│   │   ├── CartSummary.jsx     # Order summary and financial math component
│   │   ├── Footer.jsx          # Brand story and links footer
│   │   ├── Navbar.jsx          # Responsive navigation bar & mobile drawer
│   │   ├── ProductCard.jsx     # Reusable perfume showcase card
│   │   └── ProductGrid.jsx     # Responsive grid with empty-state handling
│   ├── context/
│   │   └── CartContext.jsx   # Global cart state & localStorage sync
│   ├── data/
│   │   └── products.js       # 10 realistic perfume products (single source of truth)
│   └── theme/
│       ├── theme.js          # Material UI theme with strict 5-color palette
│       └── ThemeRegistry.jsx # Emotion cache integration for Next.js App Router
```

---

## 💻 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm 9+

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>
cd ONLINE_STORE

# Install dependencies
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore the store.

### 4. Build for Production
```bash
npm run build
npm run start
```

---
