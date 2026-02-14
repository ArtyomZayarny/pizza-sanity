# Pizza Sanity – High-end pizza ordering site

Next.js frontend with **Sanity** as the full backend: menu (pizzas, drinks, sides, desserts), site settings (header, hero, contact, order form), and order submission stored in Sanity.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Sanity project and env

- Create a project at [sanity.io/manage](https://sanity.io/manage) (or use existing).
- Copy `.env.example` to `.env.local` and set:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` – your project ID
  - `NEXT_PUBLIC_SANITY_DATASET` – e.g. `production`
  - `SANITY_API_WRITE_TOKEN` – create a token with **Editor** role (needed for order submission and seed).

### 3. Deploy schema and seed content

```bash
npm run schema:deploy
npm run seed
```

This deploys the content model and creates site settings + dummy menu items (pizzas, drinks, sides, desserts).  
If you see an `ERR_REQUIRE_ESM` error, use `npm run schema:deploy` (it enables Node’s ESM require support). Node 20+ required.

### 4. Run the app

```bash
npm run dev
```

- **Site:** [http://localhost:3000](http://localhost:3000)
- **Studio:** [http://localhost:3000/studio](http://localhost:3000/studio) – edit header, hero, contact, order form, and menu.

## Scripts

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Start Next.js dev server              |
| `npm run build`| Build for production                  |
| `npm run seed` | Seed Sanity with site settings + menu (requires `.env.local`) |
| `npm run schema:deploy` | Deploy Sanity schema (use this instead of `npx sanity schema deploy` if you get ESM errors) |

## Project structure

- **Sanity:** `sanity.config.ts`, `sanity/schemaTypes/` (menuItem, siteSettings, order), `sanity/lib/` (client, image, live, queries), `sanity/structure.ts`
- **Studio:** `app/studio/[[...tool]]/page.tsx`
- **Pages:** `app/page.tsx` (home), `app/menu/page.tsx`, `app/order/page.tsx`
- **Components:** `Header`, `Hero`, `MenuTeaser`, `MenuItemCard`, `MenuSection`, `ContactBlock`, `OrderForm`
- **API:** `app/api/order/route.ts` – creates Order documents in Sanity

All customizable content (header, hero, contact, order form labels and messages) is editable in Sanity Studio.
