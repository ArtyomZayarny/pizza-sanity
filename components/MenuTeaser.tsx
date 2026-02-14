import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

type MenuTeaserProps = {
  items: MenuItem[];
};

function formatPrice(price: number, sizes?: { priceModifier?: number }[] | null) {
  if (sizes?.length) {
    const base = price;
    const min = base + Math.min(...sizes.map((s) => s.priceModifier ?? 0));
    return `From $${min}`;
  }
  return `$${price}`;
}

export function MenuTeaser({ items }: MenuTeaserProps) {
  if (!items?.length) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-6 text-2xl font-semibold">Our menu</h2>
        <p className="mb-4 text-muted-foreground">Menu items will appear here. Add pizzas, drinks, and sides in Sanity Studio.</p>
        <Button asChild>
          <Link href="/menu">View menu</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">Our menu</h2>
        <Button variant="link" asChild>
          <Link href="/menu">View full menu &rarr;</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((item) => (
          <Link key={item._id} href="/menu" className="group">
            <Card className="overflow-hidden py-0 transition hover:shadow-md">
              {item.image?.asset?.url && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={urlFor(item.image).width(400).height(300).url()}
                    alt={item.image.alt || item.name || ""}
                    width={400}
                    height={300}
                    className="object-cover transition group-hover:scale-105"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="mt-2 text-sm font-medium">
                  {formatPrice(item.price ?? 0, item.sizes)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
