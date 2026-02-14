# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pizza ordering website built with **Next.js 16** (App Router) and **Sanity v3** as the headless CMS. All site content (header, hero, contact info, order form labels, menu items) is managed through Sanity Studio, which is embedded at `/studio`.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (includes embedded Sanity Studio at `/studio`) |
| `npm run build` | Production build |
| `npm run lint` | ESLint (flat config, Next.js core-web-vitals + TypeScript rules) |
| `npm run seed` | Seed Sanity with site settings + menu items (requires `.env.local`) |
| `npm run schema:deploy` | Deploy Sanity schema to the project (wraps `sanity schema deploy` with `--experimental-require-module` to avoid ESM errors) |

No test framework is configured.

## Environment

Requires `.env.local` with:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` — Sanity project config
- `SANITY_API_WRITE_TOKEN` — Editor-role token, required for order submission API and seed script
- Optional: `SANITY_API_READ_TOKEN` — enables Live Content API / real-time preview

`.npmrc` sets `legacy-peer-deps=true`.

## Architecture

### Data flow

All data fetching uses `sanityFetch` from `sanity/lib/live.ts` (wraps `next-sanity/live` `defineLive`). GROQ queries are defined in `sanity/lib/queries.ts` using `defineQuery`. Pages are async Server Components that fetch data and pass it to presentational client components.

### Sanity schemas (3 document types)

- **`menuItem`** — name, slug, description, price, image, category (pizza/drinks/sides/desserts), optional sizes array (pizza only), display order
- **`siteSettings`** — singleton (fixed `_id: "siteSettings"`), groups: header, hero, contact, orderForm. Controls all configurable UI text/images
- **`order`** — customer info, items (references to menuItem), total, status (new→confirmed→preparing→delivered), createdAt

### Sanity lib (`sanity/lib/`)

- `client.ts` — read-only Sanity client (CDN-backed)
- `live.ts` — exports `sanityFetch` and `SanityLive` component for live content
- `queries.ts` — all GROQ queries (`SITE_SETTINGS_QUERY`, `MENU_ITEMS_QUERY`, `MENU_ITEMS_FEATURED_QUERY`)
- `image.ts` — `urlFor()` helper for Sanity image URLs

### Studio

Embedded via `app/studio/[[...tool]]/page.tsx` at `/studio`. Uses a `StudioLoader` → `StudioClient` pattern (static page that lazy-loads the studio client-side). Studio structure (`sanity/structure.ts`) shows siteSettings as a singleton, then menuItem and order lists.

### API route

`app/api/order/route.ts` — POST endpoint that creates Order documents in Sanity using a separate write client with `SANITY_API_WRITE_TOKEN`.

### Frontend pages

- `/` — Hero + featured menu (first 6 items) + contact block
- `/menu` — Full menu grouped by category (pizza → drinks → sides → desserts)
- `/order` — Order form + contact sidebar

### Styling

Tailwind CSS v4 with PostCSS. No component library.

### Path aliases

`@/*` maps to project root (e.g., `@/sanity/lib/client`, `@/components/Header`).
