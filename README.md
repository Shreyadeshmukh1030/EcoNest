<div align="center">

<img src="public/logo.png" width="120" height="120" alt="EcoNest Logo" style="border-radius: 50%;" />

# 🌿 EcoNest — Save Nature

### *Your Premier Sustainable Living & Eco-Conscious E-Commerce Platform*

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-econestsavenature.netlify.app-22c55e?style=for-the-badge&logoColor=white)](https://econestsavenature.netlify.app/)
[![Deploy Status](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://econestsavenature.netlify.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.9-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

<div align="center">
  <strong>🏆 A fully-featured, production-ready eco-commerce platform with real-time cart management, user authentication, order tracking, admin dashboard, and 22+ server-rendered pages — all deployed live on Netlify.</strong>
</div>

---

## 🚀 Live Website

> **🌐 [https://econestsavenature.netlify.app](https://econestsavenature.netlify.app/)**

---

## 📸 Website Preview

| Home Page | Indoor Plants | Gifts |
|-----------|---------------|-------|
| Sustainable living homepage with hero banner, category nav, and product grids | 15+ NASA-recommended air-purifying indoor plants & bonsai | 8+ curated sustainable eco-friendly gift hampers |

| Shop | Cart & Checkout | Admin Dashboard |
|------|-----------------|-----------------|
| Full catalog with filters by category, price, rating | Multi-step checkout with address, payment & order confirmation | Real-time sales analytics, product CRUD, and order management |

---

## ✨ Key Features

### 🛍️ Full E-Commerce Experience
- **Product Catalog** with 35+ SKUs across furniture, plants, gifts, decor, and sustainability tools
- **Advanced Filtering** — filter by category, subcategory, price range, rating, and sort order
- **Real-time Search** with instant results across the entire catalog
- **Product Detail Pages** with descriptions, ratings, tags, and add-to-cart/wishlist
- **Persistent Shopping Cart** with quantity management, running total, and item removal
- **Wishlist** — save favourite products with one click
- **Multi-step Checkout** — delivery address, payment method selection, and order summary
- **Order Confirmation** with unique order IDs and full order history

### 🌿 Speciality Category Pages
- **🌱 Indoor Botanical Nursery** (`/plants`) — 15+ NASA air-purifying plants, bonsai trees, trailing vines, and succulents
- **🎁 Gifts to Give** (`/gifts`) — 8+ curated eco-hampers: luxury plant & candle, bamboo dining sets, zero-waste bundles, corporate gifting

### 👤 User Account System
- **Register & Login** with form validation and persistent session management
- **User Profile** — view account details, order history, and wishlist
- **Protected Routes** for order history and profile management

### 📊 Admin Dashboard
- **Sales Analytics** with interactive Recharts charts (revenue, orders, conversion rate)
- **Product Management** — add, edit, and remove products from the catalog
- **Order Management** — view all orders, update status, and manage fulfillment
- **Real-time KPI cards** — Total Revenue, Monthly Orders, Customer Count, Top Product

### 🎨 Premium UI/UX
- **Dark / Light Mode** with system-preference detection via `next-themes`
- **Fully Responsive** — pixel-perfect on mobile, tablet, and desktop
- **Glassmorphism effects**, gradient overlays, and smooth micro-animations
- **Accessible Components** built on Radix UI primitives (ARIA roles, keyboard navigation)
- **Custom Brand Logo** shown in both header and footer

### 🌍 Sustainability & Impact Page
- **Interactive Eco-Impact Tracker** visualizing CO₂ saved, trees planted, plastic avoided
- **Awareness Quiz** to educate customers on sustainable living habits
- **Recycling Tips Carousel** with actionable eco-advice

### ⚡ Backend API (Serverless)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | `GET` | Full catalog with query filters (category, price, rating, pagination) |
| `/api/products/[id]` | `GET` | Single product by ID/slug |
| `/api/orders` | `GET` | Retrieve all or user-specific orders |
| `/api/orders` | `POST` | Create a new order |
| `/api/auth/login` | `POST` | Authenticate a user |
| `/api/auth/register` | `POST` | Register a new user |

---

## 🛠️ Full Tech Stack

### ⚛️ Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | `15.5.9` | Full-stack React framework (App Router, SSR, SSG, Serverless API) |
| **React** | `19.1.0` | UI component library (latest stable, concurrent features) |
| **TypeScript** | `5.x` | End-to-end static typing for components, APIs, and data models |
| **Tailwind CSS** | `4.x` | Utility-first CSS framework for responsive, mobile-first design |

### 🧩 UI Component Library
| Technology | Purpose |
|------------|---------|
| **Radix UI** | 20+ headless, accessible component primitives (Dialog, Select, Toast, Tabs, etc.) |
| **Lucide React** | 454+ pixel-perfect SVG icons |
| **shadcn/ui** | Design system of composed Radix + Tailwind components |
| **class-variance-authority** | Type-safe component variant system |
| **Tailwind Merge** | Conflict-free Tailwind class merging |
| **tailwindcss-animate** | Pre-built keyframe animations via Tailwind |
| **Geist Font** | Vercel's modern design typeface |

### 📊 Data & Charts
| Technology | Purpose |
|------------|---------|
| **Recharts** | `2.15.4` — Responsive SVG charts for Admin sales analytics |
| **SWR** | `2.3.6` — React data fetching with stale-while-revalidate caching |
| **Embla Carousel** | `8.5.1` — Touch-friendly product image carousels |
| **date-fns** | `4.1.0` — Date formatting for order history and timestamps |

### 📝 Forms & Validation
| Technology | Purpose |
|------------|---------|
| **React Hook Form** | `7.x` — Performant, flexible form state management |
| **Zod** | `3.25.76` — TypeScript-first schema validation for forms and APIs |
| **@hookform/resolvers** | Zod ↔ React Hook Form bridge adapter |

### 🎛️ State & Navigation
| Technology | Purpose |
|------------|---------|
| **React Context API** | Global cart, wishlist, and authentication state |
| **localStorage** | Cart and wishlist persistence across browser sessions |
| **Next.js App Router** | File-based routing, layouts, nested routes, route groups |
| **next-themes** | Dark / light mode with SSR-safe theme management |

### 🧰 DX & Developer Tooling
| Technology | Purpose |
|------------|---------|
| **PostCSS** | CSS transformation pipeline for Tailwind |
| **ESLint** | Code quality and Next.js best-practice enforcement |
| **Autoprefixer** | Automatic CSS vendor prefixing |
| **vaul** | Accessible mobile Drawer component |
| **sonner** | Beautiful toast notification system |
| **cmdk** | Command palette / search popover |
| **input-otp** | OTP input component for auth flows |
| **react-resizable-panels** | Resizable layout panels for Admin dashboard |

### 🚀 Deployment & Infrastructure
| Technology | Purpose |
|------------|---------|
| **Netlify** | Full-stack serverless hosting with Next.js Runtime v5 |
| **Netlify Serverless Functions** | Automatic compilation of all `/api/` routes as edge functions |
| **GitHub** | Version control with automatic CI/CD pipeline to Netlify |
| **Netlify CDN** | Global edge caching for images and static assets |

---

## 📁 Project Architecture

```
EcoNest/
├── app/                         # Next.js App Router
│   ├── page.tsx                 # Home — Hero, category nav, plant & gift grids
│   ├── shop/                    # Full product catalog with filters
│   ├── plants/                  # Indoor Botanical Nursery page
│   ├── gifts/                   # Gifts to Give page
│   ├── products/[slug]/         # Dynamic product detail pages (SSR)
│   ├── cart/                    # Shopping cart with real-time totals
│   ├── checkout/                # Multi-step checkout flow
│   ├── orders/[id]/             # Order confirmation & tracking
│   ├── wishlist/                # Saved products
│   ├── profile/                 # User account & order history
│   ├── admin/                   # Admin dashboard (analytics + CRUD)
│   ├── search/                  # Search results page
│   ├── about/                   # Brand story & sustainability mission
│   ├── impact/                  # Eco-impact tracker & awareness quiz
│   ├── login/                   # User login
│   ├── register/                # User registration
│   └── api/                     # Serverless API routes
│       ├── products/route.ts    # GET products with filters & pagination
│       ├── products/[id]/route.ts # GET single product
│       ├── orders/route.ts      # GET + POST orders
│       └── auth/
│           ├── login/route.ts   # POST login
│           └── register/route.ts # POST register
│
├── components/                  # Reusable UI components
│   ├── site-header.tsx          # Sticky header with nav, search, cart, profile
│   ├── site-footer.tsx          # Footer with logo and navigation links
│   ├── product-card.tsx         # Reusable product card (image, title, price, CTA)
│   ├── newsletter-signup.tsx    # Client-side newsletter form component
│   ├── customer-reviews.tsx     # Star-rated review cards
│   ├── awareness-quiz.tsx       # Interactive sustainability quiz
│   ├── recycling-tips-carousel.tsx # Animated eco-tips carousel
│   ├── ecoplant-section.tsx     # Featured plant showcase
│   └── ui/                      # shadcn/ui component library (30+ components)
│
├── lib/
│   ├── data/products.ts         # Master product catalog (35+ SKUs with full metadata)
│   ├── store.ts                 # Global state (useCart, useWishlist, useAuth hooks)
│   └── utils.ts                 # Shared utility functions (cn, formatCurrency, etc.)
│
├── public/                      # Static assets
│   ├── logo.png                 # Official EcoNest brand logo
│   └── *.jpg                    # 60+ high-quality product photography images
│
├── styles/                      # Global CSS
├── netlify.toml                 # Netlify deployment configuration
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🌐 All Pages at a Glance

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage — Hero, Category Nav, Gift Grid, Plant Grid, Newsletter |
| `/shop` | Static | Full catalog with category + price + rating filters |
| `/plants` | Static | Indoor Botanical Nursery (15+ plants) |
| `/gifts` | Static | Gifts to Give collection (8+ hampers) |
| `/products` | Static | All products grid view |
| `/products/[slug]` | **Dynamic SSR** | Individual product detail page |
| `/cart` | Static | Shopping cart with item management |
| `/checkout` | Static | Multi-step checkout (address, payment, summary) |
| `/orders/[id]` | **Dynamic SSR** | Order confirmation & tracking detail |
| `/wishlist` | Static | User's saved / favorited products |
| `/profile` | Static | User account info & order history |
| `/search` | Static | Search results with keyword matching |
| `/admin` | Static | Admin dashboard (analytics, product & order CRUD) |
| `/login` | Static | User login with email & password |
| `/register` | Static | User registration with validation |
| `/about` | Static | Brand mission and sustainability story |
| `/impact` | Static | Eco-impact tracker, quiz, and recycling tips |
| `/api/products` | **Serverless** | REST API — Products with filters |
| `/api/products/[id]` | **Serverless** | REST API — Single product |
| `/api/orders` | **Serverless** | REST API — Orders CRUD |
| `/api/auth/login` | **Serverless** | REST API — Authentication |
| `/api/auth/register` | **Serverless** | REST API — User Registration |

**Total: 22 routes (16 frontend pages + 6 serverless API endpoints)**

---

## 🏃 Running Locally

### Prerequisites
- Node.js `>= 18.x`
- npm or pnpm

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Shreyadeshmukh1030/EcoNest.git
cd EcoNest

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser 🚀

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server with hot-reload |
| `npm run build` | Compile production-optimized Next.js build |
| `npm run start` | Start production server from compiled build |
| `npm run lint` | Run ESLint code quality checks |

---

## 📦 Deployment

This project is deployed using **Netlify's Next.js Runtime v5** which automatically compiles:
- Static pages → **Netlify CDN** (globally cached)
- Dynamic SSR pages → **Netlify Serverless Functions**
- API routes (`/api/*`) → **Netlify Edge Functions**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"
```

**CI/CD Pipeline**: Every push to the `main` branch on GitHub automatically triggers a new Netlify build and deploy. ✅

---

## 🌱 Sustainability Mission

> *"Every purchase at EcoNest plants a seed for the future."*

EcoNest is not just an e-commerce store — it's a movement. We believe everyday living can be sustainable:
- 🌳 **Every order** contributes to reforestation efforts
- ♻️ **All packaging** is 100% biodegradable and plastic-free
- 🏭 **Artisan-crafted** furniture from reclaimed and sustainably sourced materials
- 💚 **NASA-certified** air-purifying indoor plants for a healthier home
- 🎁 **Sustainable gifting** that says you care — for people *and* the planet

---

## 👩‍💻 Developer

<div align="center">

Made with 💚 by **Shreya Deshmukh**

[![GitHub](https://img.shields.io/badge/GitHub-Shreyadeshmukh1030-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shreyadeshmukh1030)
[![Live Site](https://img.shields.io/badge/Live-EcoNest-22c55e?style=for-the-badge&logo=netlify&logoColor=white)](https://econestsavenature.netlify.app/)

</div>

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

**⭐ If you found this project impressive, please star the repository! ⭐**

*Built with Next.js 15 · React 19 · TypeScript · Tailwind CSS · Radix UI · Deployed on Netlify*

</div>
