"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type NavLink = { label?: string | null; href?: string | null };
type Logo = {
  asset?: { _id?: string; url?: string };
  alt?: string | null;
} | null;

type HeaderProps = {
  title?: string | null;
  logo?: Logo;
  navLinks?: NavLink[] | null;
};

export function Header({ title, logo, navLinks }: HeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            {logo?.asset?.url ? (
              <Image
                src={urlFor(logo).width(120).height(48).url()}
                alt={logo.alt || title || "Logo"}
                width={120}
                height={48}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-xl font-semibold">
                {title || "Pizza"}
              </span>
            )}
          </Link>
          <nav className="flex items-center gap-4">
            {(navLinks?.length ? navLinks : [
              { label: "Menu", href: "/menu" },
              { label: "Order", href: "/order" },
            ]).map((link, i) =>
              link?.href ? (
                <Button key={i} variant="ghost" size="sm" asChild>
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </Button>
              ) : null
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {itemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center p-0 text-[11px]">
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </Button>
          </nav>
        </div>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
