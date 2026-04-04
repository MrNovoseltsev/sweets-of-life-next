# Миграция Sweetsoflife.ru → Next.js 15

## Context
Сайт-витрина ручных украшений (95 товаров, 8 категорий), написанный в 2015 году на статическом HTML/CSS с PHP server-side includes. Цель: мигрировать на современный стек Next.js 15 + TypeScript + Tailwind CSS + Mock API, с заложенной архитектурой для будущих Phase 2 фич (SSR, auth, admin, payments).

**Источник:** `/Volumes/PIPKA/Projects/Sweets-of-life/Sweetsoflife.ru/Published`  
**Новый проект:** `/Volumes/PIPKA/Projects/Sweets-of-life/sweetsoflife-next`

---

## Стек

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Linting | ESLint `next/core-web-vitals` |
| Data (Phase 1) | JSON mock файлы + API Routes |
| Data (Phase 2) | Prisma + PostgreSQL (замена без изменения интерфейса) |
| Images | `next/image` |
| Fonts | `next/font/local` (BoblicRegular, SCRIPTBL) |

---

## Данные проекта

**Категории и товары:**
| Категория | SKU-префикс | Кол-во |
|-----------|------------|--------|
| bracelets | BC | 9 |
| earrings  | ER | 39 (3 страницы) |
| brooches  | BH | 7 |
| rings     | RG | 7 |
| pendants  | PD | 7 |
| sets      | ST | 13 |
| toys      | TY | 11 |
| tiaras    | TR | 2 |
| **Итого** | | **95** |

**Новости:** ~30 записей (NS-0031..NS-0061), 3 страницы по 10.

**Цветовая палитра из CSS:**
- `#1e5945` — основной зелёный (текст, рамки)
- `#40d39d` — мятный (nav, кнопки)
- `#fff44f` — жёлтый (hover)
- `#5f7d9d` — синеватый (footer VK)

---

## TypeScript типы (`src/lib/types.ts`)

```typescript
export type CategorySlug = 'bracelets' | 'earrings' | 'brooches' | 'rings' | 'pendants' | 'sets' | 'toys' | 'tiaras';

export interface Product {
  sku: string;           // BC-0001
  category: CategorySlug;
  name: string;
  price: number;         // в рублях
  type: string;
  material: string;
  decoration?: string;   // Декупаж — для bracelets, brooches, rings, sets, toys, tiaras
  hardware?: string;     // Фурнитура — для earrings, pendants
  size: string;
  description: string;
  image: { full: string; preview: string; };  // /images/products/full/BC-0001.jpg
}

export interface NewsPost {
  id: string;            // NS-0061
  date: string;          // "23 июля 2015"
  title: string;
  excerpt: string;
  image: string;         // /images/news/NS-0061.jpg
  url: string | null;
}

// Phase 2 prep (типы созданы, не используются)
export interface CartItem { product: Product; quantity: number; }
export interface Order { id: string; items: CartItem[]; total: number; status: 'pending' | 'paid' | 'shipped' | 'delivered'; }
export interface User { id: string; email: string; name: string; role: 'customer' | 'admin'; }
```

---

## Структура директорий

```
sweetsoflife-next/
├── public/
│   ├── fonts/                    BoblicRegular.woff(.woff2), SCRIPTBL.woff2
│   ├── images/
│   │   ├── backgrounds/          pattern-outer.png, pattern-inner.png
│   │   ├── categories/           BC-PW.jpg ... TR-PW.jpg (8 файлов)
│   │   ├── products/
│   │   │   ├── full/             BC-0001.jpg ... все 95
│   │   │   └── preview/          BC-0001.jpg ... все 95
│   │   └── news/                 NS-0031.jpg ... NS-0061.jpg
│   └── social.png
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            Root layout: fonts, html lang="ru", metadata
│   │   ├── globals.css           @import "tailwindcss" + .bg-pattern-*
│   │   ├── page.tsx              / (главная)
│   │   ├── catalog/
│   │   │   └── [category]/
│   │   │       ├── page.tsx      /catalog/bracelets — generateStaticParams
│   │   │       ├── error.tsx     Error boundary (Phase 2 готов)
│   │   │       └── [sku]/
│   │   │           └── page.tsx  /catalog/bracelets/BC-0001 — generateStaticParams
│   │   ├── news/
│   │   │   ├── page.tsx          /news?page=1
│   │   │   └── error.tsx
│   │   ├── about/page.tsx
│   │   ├── contacts/page.tsx
│   │   ├── purchase/page.tsx
│   │   ├── friends/page.tsx
│   │   ├── error.tsx             Глобальный error boundary
│   │   ├── api/
│   │   │   ├── products/
│   │   │   │   ├── route.ts      GET /api/products?category=&page=&perPage=
│   │   │   │   └── [sku]/route.ts  GET /api/products/BC-0001
│   │   │   ├── categories/
│   │   │   │   └── [slug]/route.ts  GET /api/categories/bracelets
│   │   │   └── news/route.ts     GET /api/news?page=&perPage=
│   │   └── (phase2)/             Route group — не влияет на URL
│   │       └── admin/
│   │           ├── layout.tsx    Auth guard stub
│   │           └── page.tsx      Admin dashboard stub
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        Лого (SCRIPTBL), email, MenuBar
│   │   │   ├── Footer.tsx        FooterMenu, LinkBlock, Copyright
│   │   │   └── PageWrapper.tsx   max-w-page mx-auto + bg-pattern
│   │   ├── ui/
│   │   │   ├── SectionDivider.tsx  Аналог .UnderlineBlock (1px hr)
│   │   │   ├── PaginationBar.tsx   Страницы: currentPage, totalPages, baseHref
│   │   │   ├── BuyButton.tsx       Phase1: mailto с SKU; Phase2: addToCart
│   │   │   └── CategoryCard.tsx    Плитки на главной (230×280)
│   │   ├── catalog/
│   │   │   ├── ProductGrid.tsx     4 колонки, flexbox-wrap
│   │   │   ├── ProductCard.tsx     next/image 230×230 + цена
│   │   │   ├── ProductDetail.tsx   Layout товарной страницы
│   │   │   └── CharacteristicsTable.tsx  Условно: decoration или hardware
│   │   ├── news/
│   │   │   ├── NewsBlock.tsx
│   │   │   └── NewsItem.tsx        Дата + фото 100×100 + текст
│   │   └── (phase2)/
│   │       ├── skeletons/
│   │       │   ├── ProductCardSkeleton.tsx
│   │       │   └── NewsItemSkeleton.tsx
│   │       └── auth/
│   │           └── LoginForm.tsx   Stub
│   │
│   ├── lib/
│   │   ├── types.ts
│   │   ├── constants.ts            CATEGORY_META, CATEGORY_SLUGS
│   │   ├── mock/
│   │   │   ├── products.ts         async getAllProducts(), getProductBySku(), getProductsByCategory()
│   │   │   └── news.ts             async getAllNews(), getNewsPaginated()
│   │   └── (phase2)/
│   │       ├── db.ts               Prisma stub (export const db = null)
│   │       └── auth.ts             NextAuth stub
│   │
│   ├── data/
│   │   ├── products.json           Все 95 товаров
│   │   └── news.json               Все ~30 новостей
│   │
│   └── hooks/
│       └── usePagination.ts        Для client-side компонентов
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

---

## API Routes

| Endpoint | Query params | Ответ |
|----------|-------------|-------|
| `GET /api/products` | `category`, `page`, `perPage` | `{ products, total, page, totalPages }` |
| `GET /api/products/[sku]` | — | `{ product }` или `404 { error }` |
| `GET /api/categories/[slug]` | — | `{ slug, label, products, total }` |
| `GET /api/news` | `page`, `perPage` | `{ posts, total, page, totalPages }` |

**Ключевое:** все accessor-функции в `lib/mock/products.ts` — `async`, даже несмотря на синхронное чтение JSON. При замене на Prisma ни один вызывающий код не меняется.

---

## Стратегия перехода mock → real (Phase 2)

1. Установить Prisma, описать схему по интерфейсам `Product` и `NewsPost`
2. Один раз прогнать seed-скрипт: `src/data/products.json` → Prisma
3. Заменить тела функций в `src/lib/mock/*.ts` на Prisma-запросы
4. Переименовать папку `lib/mock/` → `lib/data/`
5. Удалить `src/data/*.json`

Страницы меняются с SSG на ISR/SSR добавлением одной строки:  
```typescript
export const revalidate = 3600; // ISR
// или убрать generateStaticParams для SSR
```

---

## Tailwind config (ключевые настройки)

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'forest-green':  '#1e5945',
      'mint-green':    '#40d39d',
      'yellow-accent': '#fff44f',
      'social-blue':   '#5f7d9d',
    },
    fontFamily: {
      sans:   ['var(--font-boblic)',   'sans-serif'],
      script: ['var(--font-scriptbl)', 'cursive'],
    },
    maxWidth: { 'page': '1000px' },
    borderRadius: { 'card': '20px' },
    boxShadow: {
      'card-hover': '0 0 10px 0px #1e5945',
    },
  },
}
```

---

## Phase 2 scaffolding

Подготовленные заглушки (не влияют на Phase 1 сборку):

- **Error boundaries**: `error.tsx` в `app/`, `app/catalog/[category]/`, `app/news/` — минимальный UI с кнопкой "Повторить"
- **Suspense**: каждая страница с данными уже оборачивает контент в `<Suspense fallback={<div className="animate-pulse">Загрузка...</div>}>` — Phase 2 меняет только `fallback`
- **Admin route group**: `app/(phase2)/admin/` — layout с TODO-комментарием для `next-auth` guard
- **Skeleton компоненты**: созданы, но не импортированы Phase 1 страницами
- **Auth/DB stubs**: `lib/(phase2)/db.ts` и `auth.ts` — файлы существуют, ничего не экспортируют рабочего

---

## Порядок реализации (14 шагов)

| # | Задача | Файлы |
|---|--------|-------|
| 0 | Bootstrap `create-next-app` + настройка ESLint | `eslint.config.mjs`, `next.config.ts` |
| 1 | Types + constants | `src/lib/types.ts`, `src/lib/constants.ts` |
| 2 | Миграция ассетов в `public/` | `public/images/`, `public/fonts/` |
| 3 | JSON mock данные (95 товаров + 30 новостей) | `src/data/products.json`, `src/data/news.json` |
| 4 | Data accessor layer | `src/lib/mock/products.ts`, `src/lib/mock/news.ts` |
| 5 | Tailwind config + шрифты + root layout | `tailwind.config.ts`, `globals.css`, `app/layout.tsx` |
| 6 | Shared UI: Header, Footer, PageWrapper, SectionDivider, PaginationBar, BuyButton, CategoryCard | `src/components/` |
| 7 | API routes (4 endpoints) | `src/app/api/` |
| 8 | Главная страница | `app/page.tsx` |
| 9 | Страницы категорий | `app/catalog/[category]/page.tsx` |
| 10 | Страницы товаров | `app/catalog/[category]/[sku]/page.tsx` |
| 11 | Страница новостей | `app/news/page.tsx` |
| 12 | Статические страницы | `about`, `contacts`, `purchase`, `friends` |
| 13 | Phase 2 scaffolding | `(phase2)/admin/`, `skeletons/`, `error.tsx`, stubs |
| 14 | QA: `next build`, `tsc --noEmit`, `next lint`, responsive check | — |

---

## Проверка (Verification)

```bash
# Сборка (должны сгенерироваться все 95+8+30 статических страниц)
next build

# TypeScript
npx tsc --noEmit

# ESLint
next lint

# Запуск
next start

# Проверить API вручную
curl http://localhost:3000/api/products?category=earrings
curl http://localhost:3000/api/products/BC-0001
curl http://localhost:3000/api/categories/bracelets
curl http://localhost:3000/api/news?page=1&perPage=10
```

Страницы для проверки: `/`, `/catalog/bracelets`, `/catalog/earrings`, `/catalog/earrings/ER-0001`, `/news`, `/about`, `/contacts`, `/purchase`.

---

## Критические файлы-источники

- [BC-0001.html](Published/Catalog/Bracelets/ItemPages/BC-0001.html) — эталон структуры товарной страницы
- [ItemPageStyle.css](Published/Catalog/Bracelets/ItemPages/ItemPageStyle.css) — полный CSS-референс
- [index.html](Published/index.html) — структура главной: CategoryGrid + NewsPreview
- [News_1.html](Published/News/News_1.html) — структура новостей и пагинация
- [header.html](Published/header.html) / [footer.html](Published/footer.html) — навигация и ссылки
