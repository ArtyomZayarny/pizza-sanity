"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type MenuItemCardProps = {
  item: MenuItem;
};

function formatPrice(price: number, sizes?: { name?: string; priceModifier?: number }[] | null) {
  if (sizes?.length) {
    const base = price;
    const min = base + Math.min(...sizes.map((s) => s.priceModifier ?? 0));
    return { display: `From $${min}`, hasSizes: true };
  }
  return { display: `$${price}`, hasSizes: false };
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { display, hasSizes } = formatPrice(item.price ?? 0, item.sizes);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    item.sizes?.[0]?.name ?? undefined
  );
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    const size = hasSizes ? selectedSize : undefined;
    const priceModifier = hasSizes
      ? item.sizes?.find((s) => s.name === selectedSize)?.priceModifier ?? 0
      : 0;

    addItem({
      menuItemId: item._id,
      name: item.name ?? "",
      price: item.price ?? 0,
      image: item.image?.asset?.url
        ? urlFor(item.image).width(128).height(128).url()
        : undefined,
      size,
      priceModifier,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <Card className="overflow-hidden py-0 transition hover:shadow-md">
      {item.image?.asset?.url && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={urlFor(item.image).width(400).height(300).url()}
            alt={item.image.alt || item.name || ""}
            width={400}
            height={300}
            className="object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {item.description}
        </p>
        {hasSizes && item.sizes && (
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="mt-3 w-full">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {item.sizes.map((s) => (
                <SelectItem key={s.name} value={s.name ?? ""}>
                  {s.name} — ${(item.price ?? 0) + (s.priceModifier ?? 0)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-medium">{display}</span>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className={`rounded-full ${added ? "bg-green-500 hover:bg-green-500" : ""}`}
          >
            {added ? "Added!" : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
