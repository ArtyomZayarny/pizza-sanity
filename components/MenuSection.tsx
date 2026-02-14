import { MenuItemCard } from "./MenuItemCard";

type MenuItem = {
  _id: string;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  image?: {
    asset?: { _id?: string; url?: string; metadata?: { lqip?: string } };
    alt?: string | null;
  } | null;
  category?: string | null;
  sizes?: { name?: string; priceModifier?: number }[] | null;
};

const CATEGORY_LABELS: Record<string, string> = {
  pizza: "Pizzas",
  drinks: "Drinks",
  sides: "Sides",
  desserts: "Desserts",
};

type MenuSectionProps = {
  category: string;
  items: MenuItem[];
};

export function MenuSection({ category, items }: MenuSectionProps) {
  const title = CATEGORY_LABELS[category] || category;

  return (
    <section className="mb-16">
      <h2 className="mb-6 text-2xl font-bold">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}
