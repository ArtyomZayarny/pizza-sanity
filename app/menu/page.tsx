import { sanityFetch } from "@/sanity/lib/live";
import { MENU_ITEMS_QUERY } from "@/sanity/lib/queries";
import { MenuSection } from "@/components/MenuSection";

const CATEGORY_ORDER = ["pizza", "drinks", "sides", "desserts"];

export default async function MenuPage() {
  const { data: items } = await sanityFetch({ query: MENU_ITEMS_QUERY });
  const allItems = items ?? [];
  const byCategory: Record<string, typeof allItems> = {};
  for (const item of allItems) {
    const cat = item?.category ?? "other";
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(item);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-12 text-3xl font-bold">Full menu</h1>
      {CATEGORY_ORDER.map(
        (cat) =>
          byCategory[cat]?.length && (
            <MenuSection
              key={cat}
              category={cat}
              items={byCategory[cat]}
            />
          )
      )}
      {Object.keys(byCategory).filter((c) => !CATEGORY_ORDER.includes(c)).length > 0 && (
        <>
          {Object.entries(byCategory)
            .filter(([c]) => !CATEGORY_ORDER.includes(c))
            .map(([cat, list]) => (
              <MenuSection key={cat} category={cat} items={list} />
            ))}
        </>
      )}
    </main>
  );
}
