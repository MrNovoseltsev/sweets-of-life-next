# Sweets of Life

> Handmade jewelry storefront — a migration of the original 2015 static site to a modern full-stack Next.js 15 application.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)

---

## About

**Sweets of Life** is a small e-commerce storefront for an author-made jewelry brand (bracelets, earrings, brooches, rings, pendants, sets, toys, tiaras — ~95 products across 8 categories). The original site was a static HTML/CSS project from 2015; this repository is its full migration to a modern stack.

The project demonstrates:

- **Next.js 15 App Router** with React Server Components, Server Actions, and route-segment caching.
- **Feature-Sliced Design v2** as the source-tree convention.
- **Supabase** as the backend — PostgreSQL with Row-Level Security, email/password auth, and SSR-aware cookie sessions via `@supabase/ssr`.
- **Tailwind CSS v4** with a custom palette, custom fonts, and pattern backgrounds.

It is intentionally framework-light: no Prisma, no shadcn/ui, no Redux/Zustand. State that needs to persist across reloads (cart) lives in `localStorage` behind a small `useReducer` + Context.

---

## Features

### Storefront

- Catalog with category routes and product detail pages.
- News section with paginated listings.
- Static informational pages: about, contacts, friends/partners.
- Sortable product lists.
- Custom 404 page.
- Responsive layout for mobile, tablet, and desktop.
- Local custom fonts (Boblic, SCRIPTBL).

### Commerce

- Cart powered by `useReducer` + React Context, persisted to `localStorage`.
- `BuyButton`, `CartButton`, `CartDrawer`, `CartItem` UI components.
- Order placement via a Server Action that requires an authenticated user.
- Total price calculated server-side at checkout.

### Authentication

- Supabase email/password auth.
- `AuthContext` and `AuthModal` on the client.
- Server-side session reading via `@supabase/ssr` (cookie-based).
- Sign-in / sign-up flows under `/auth/login`.

### Admin panel

- Role-gated `/admin/*` routes — middleware enforces `profiles.role === 'admin'`.
- CRUD for products, news, orders, and users.
- Reusable `AdminDataTable` widget with column configs per entity.
- `AdminSidebar` navigation.

---

## Tech stack

| Package | Version | Role |
| --- | --- | --- |
| `next` | 16.2.2 | Full-stack React framework (App Router) |
| `react` / `react-dom` | 19.2.4 | UI runtime |
| `typescript` | ^5 | Type system (strict mode) |
| `tailwindcss` | ^4 | Utility-first CSS |
| `@tailwindcss/postcss` | ^4 | PostCSS pipeline |
| `@supabase/supabase-js` | ^2.103 | PostgreSQL + Auth client |
| `@supabase/ssr` | ^0.10 | Cookie-based SSR auth helpers |
| `eslint` / `eslint-config-next` | ^9 / 16.2.2 | Linting |
| `prettier` / `prettier-plugin-tailwindcss` | ^3.8 / ^0.7 | Formatting + class sorting |

---

## Project structure

The codebase follows **Feature-Sliced Design (FSD) v2**. Layers depend strictly downward: `app → widgets → features → entities → shared`.

```
src/
├── app/         # Next.js App Router — routes, layouts, API handlers
├── widgets/     # Page-level composite blocks
├── features/    # User-facing capabilities with their own state and UI
├── entities/    # Domain models (types, API, basic UI)
└── shared/      # Cross-cutting utilities, UI primitives, lib clients
```

### Layer contents

**`entities/`** — domain objects, each with `model/`, `api/`, and (where useful) `ui/`:

- `product` — product types, public and admin APIs, `ProductCard`, `ProductDetails`
- `order` — order types and admin API
- `user` — user/profile types and admin API
- `news` — news article types, public and admin APIs

**`features/`** — interactive capabilities:

- `auth` — Supabase sign-in/sign-up, context, modal, server actions
- `cart` — cart context, reducer, localStorage persistence, drawer UI
- `checkout` — `placeOrder` server action
- `product-sort` — sorting/filtering UI for catalog
- `admin-products-crud`, `admin-news-crud`, `admin-orders-crud`, `admin-users-crud`

**`widgets/`** — composed UI blocks:

- `header`, `footer`, `page-layout`
- `catalog-grid`
- `admin-sidebar`, `admin-data-table`

**`shared/`** — reusable primitives:

- `lib/supabase` — `client`, `server`, `admin`, `types` (generated `Database` type)
- `ui` — `Breadcrumbs`, `Skeleton`
- `config` — categories config

**Other top-level directories:**

- `public/` — static assets: fonts, product/category/news images, background patterns
- `supabase/migrations/` — SQL migration files
- `scripts/seed.mjs` — database seed script

---

## Getting started

### Prerequisites

- **Node.js** ≥ 20
- **npm** (the lockfile uses npm)
- A **Supabase** project (free tier works)

### 1. Clone and install

```bash
git clone <your-repo-url> sweetsoflife-next
cd sweetsoflife-next
npm install
```

### 2. Configure environment

Create a `.env.local` file in the project root:

```bash
# Supabase — public, exposed to the browser
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-publishable-anon-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase — server-only, never exposed to the browser
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

> **Security:** `SUPABASE_SERVICE_ROLE_KEY` bypasses Row-Level Security. It is used only from server code (`src/shared/lib/supabase/admin.ts`). Never reference it from a client component or expose it via `NEXT_PUBLIC_*`.

### 3. Apply database migrations

Apply the migrations under [supabase/migrations](supabase/migrations) using either the Supabase CLI:

```bash
supabase db push
```

…or by running each `.sql` file in the Supabase SQL editor in chronological order.

### 4. Seed initial data

```bash
npm run seed
```

This populates the `products` and `news` tables with the catalog described in the migration plan.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

| Variable | Scope | Required | Description |
| --- | --- | :---: | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public | ✅ | Supabase anon (publishable) key |
| `NEXT_PUBLIC_SITE_URL` | Public | ✅ | Base URL of the running app |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | ✅ | Privileged server-only key (admin client) |

---

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server on port 3000 |
| `npm run build` | Produce a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint across the project |
| `npm run seed` | Populate the database via `scripts/seed.mjs` |

---

## Routes

### Public

| Route | File | Notes |
| --- | --- | --- |
| `/` | [src/app/page.tsx](src/app/page.tsx) | Homepage — catalog grid + news preview |
| `/catalog` | [src/app/catalog/page.tsx](src/app/catalog/page.tsx) | All products |
| `/catalog/[category]` | `src/app/catalog/[category]/page.tsx` | Products by category |
| `/catalog/[category]/[sku]` | `src/app/catalog/[category]/[sku]/page.tsx` | Product details |
| `/news` | `src/app/news/page.tsx` | News listing |
| `/about` · `/contacts` · `/friends` | `src/app/{about,contacts,friends}/page.tsx` | Static informational pages |
| `/order` | `src/app/order/page.tsx` | Checkout |
| `/auth/login` | `src/app/auth/login/page.tsx` | Sign in / sign up |
| `*` | [src/app/not-found.tsx](src/app/not-found.tsx) | Custom 404 |

### API

| Route | File | Method |
| --- | --- | --- |
| `/api/products` | [src/app/api/products/route.ts](src/app/api/products/route.ts) | `GET` |
| `/api/products/[sku]` | `src/app/api/products/[sku]/route.ts` | `GET` |

### Admin

| Route | File | Notes |
| --- | --- | --- |
| `/admin` | [src/app/admin/page.tsx](src/app/admin/page.tsx) | Admin dashboard (gated) |

---

## Database schema

Generated database types live in [src/shared/lib/supabase/types.ts](src/shared/lib/supabase/types.ts). Migrations live in [supabase/migrations](supabase/migrations).

### `products`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `bigint` | PK |
| `sku` | `text` | e.g. `BC-0001` |
| `category` | `text` | One of: `bracelets`, `earrings`, `brooches`, `rings`, `pendants`, `sets`, `toys`, `tiaras` |
| `name` | `text` | |
| `price` | `numeric` | Stored in RUB |
| `type`, `material`, `decoration`, `hardware`, `size` | `text` | Product attributes |
| `description` | `text` | |
| `image_full`, `image_preview` | `text` | Asset paths under `/public/images/products/` |
| `stock` | `integer` | Default `0` |
| `created_at` | `timestamptz` | |

### `orders`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `bigint` | PK |
| `user_id` | `uuid` | FK → `auth.users.id` |
| `status` | `text` | `pending` · `confirmed` · `paid` · `shipped` · `delivered` · `cancelled` |
| `total_price` | `numeric` | RUB |
| `items` | `jsonb` | Snapshot of cart items |
| `customer_name`, `customer_email`, `notes` | `text` | Optional |
| `created_at`, `updated_at` | `timestamptz` | |

### `news`

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `bigint` | PK |
| `slug` | `text` | Unique |
| `published_date` | `date` | |
| `title`, `excerpt`, `image` | `text` | |
| `url` | `text` | Optional external link |
| `created_at` | `timestamptz` | |

### `profiles`

Extends `auth.users` with role and display fields.

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `uuid` | PK, FK → `auth.users.id` |
| `role` | `text` | `customer` (default) or `admin` |
| `name` | `text` | Optional display name |
| `created_at` | `timestamptz` | |

Access is governed by Supabase Row-Level Security policies defined in the migration files.

---

## Admin access

To grant a user admin privileges:

1. Sign the user up through `/auth/login`.
2. In the Supabase SQL editor, set their role:

   ```sql
   update public.profiles
   set role = 'admin'
   where id = '<user-uuid>';
   ```

3. The user can now access `/admin/*`. The check is enforced server-side by [middleware.ts](middleware.ts), which:
   - Redirects unauthenticated requests to `/auth/login`.
   - Redirects authenticated non-admin users to `/`.

---

## Code style and quality

- **TypeScript:** strict mode, plus `noUncheckedIndexedAccess` and `noImplicitReturns`. Path alias `@/*` maps to `./src/*`.
- **ESLint 9** flat config extending `next/core-web-vitals` and `next/typescript`.
- **Prettier 3** with `prettier-plugin-tailwindcss` for automatic class-name sorting.
- **Server Components by default**; client components are opted in explicitly.

---

## Project status

- ✅ **Phase 1** — Static migration: catalog, news, content pages, responsive layout, FSD refactor.
- ✅ **Phase 2** — Backend integration: Supabase auth, products/news/orders/profiles in PostgreSQL, admin panel with role-gated middleware.

---

## License

Proprietary — all rights reserved. The repository is published for portfolio purposes.
