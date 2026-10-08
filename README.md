# NEXORA — Technology, Upgraded.

NEXORA is a flagship consumer electronics e-commerce web application built for modern tech retail. It offers laptops, smartphones, tablets, headphones, smartwatches, gaming gear, monitors, PC components, and audio accessories with real-time inventory tracking, multi-step checkout, coupon engines, order timelines, and a full administrative suite.

## 🚀 Key Features

- **Modern Electronics Catalog**: 40+ pre-seeded flagship electronic products with authentic technical specifications, high-definition photography, and prices in Indian Rupees (₹).
- **Advanced Dynamic Search & Filters**: Multi-faceted filtering by Category, Brand, Price range, Rating, Discount, and Stock availability, with instant search modal highlighting matching products.
- **Contiguous Purchase Experience**: Product details with interactive image gallery, zoom view, dynamic tech specs tables (CPU, GPU, RAM, Cameras, Battery, etc.), EMI calculations, reviews with star distribution, and "Frequently Bought Together" bundles.
- **Cart & Discount Engine**: Real-time quantity adjustment, coupon code validation (`WELCOME10`, `NEXORA20`, `SAVE500`), subtotal, GST calculation, and free delivery thresholds.
- **4-Step Checkout Flow**: Address management, delivery speed selection, payment method selection (UPI, Credit/Debit Cards, Net Banking, Cash on Delivery), and mock payment verification.
- **Order Tracking System**: Real-time order timeline with status progressions: `Placed → Confirmed → Packed → Shipped → Out for Delivery → Delivered`.
- **Customer Account Dashboard**: Overview, order history, wishlist sync, address book, profile settings, and recently viewed tracking.
- **Admin Management & Analytics**:
  - Revenue, orders, products sold, and average order value metrics
  - Interactive SVG revenue and category sales charts
  - Product catalog CRUD operations, price & stock adjustments
  - Order status updates and fulfillment management
  - Coupon management and customer directory
- **Product Comparison Tool**: Side-by-side spec comparison table for up to 3 devices.
- **Light & Dark Theme**: Full theme support with refined contrast and high-tech typography.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide React
- **Design System**: Plus Jakarta Sans & Space Grotesk typography, zero-pill metadata discipline, WCAG AA compliance
- **Database Architecture**: PostgreSQL schema for Supabase (`supabase/schema.sql` and `supabase/seed.sql`)
- **Persistence**: Hybrid Supabase integration with automatic local offline storage fallback for immediate out-of-the-box evaluation

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

If connecting to a live Supabase instance:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
*(If left empty, NEXORA automatically runs on the integrated local client engine with full data persistence in localStorage!)*

### 4. Running the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema & Supabase Setup

The complete relational PostgreSQL database schema is located in `supabase/schema.sql`.
To run in Supabase:
1. Create a new Supabase project at [https://supabase.com](https://supabase.com).
2. Go to the **SQL Editor** tab.
3. Paste the contents of `supabase/schema.sql` and click **Run**.
4. Paste the contents of `supabase/seed.sql` to populate sample products, categories, coupons, and orders.
5. Copy your project's URL and Anon Key into `.env`.

---

## 🔑 Demo Accounts

- **Demo Customer**:
  - Email: `alex.mercer@nexora.io`
  - Password: `Password@123`
- **Demo Administrator**:
  - Email: `admin@nexora.io`
  - Password: `AdminSecure@2026`
*(Quick-login buttons are also available on the Login modal for one-click testing)*
