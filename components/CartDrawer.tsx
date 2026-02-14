"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeItem, updateQuantity, total } = useCart();

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent className="flex flex-col p-0 sm:max-w-md" showCloseButton={true}>
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="mt-4 text-sm">Your cart is empty</p>
              <Button className="mt-4 rounded-full" onClick={onClose} asChild>
                <Link href="/menu">Browse Menu</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => {
                const lineTotal = (item.price + (item.priceModifier ?? 0)) * item.quantity;
                const key = `${item.menuItemId}:${item.size ?? ""}`;
                return (
                  <li key={key} className="flex gap-3">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {item.name}
                          </p>
                          {item.size && (
                            <p className="text-xs text-muted-foreground">{item.size}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => removeItem(item.menuItemId, item.size)}
                          aria-label="Remove item"
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </Button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon-xs"
                            onClick={() =>
                              updateQuantity(item.menuItemId, item.size, item.quantity - 1)
                            }
                          >
                            -
                          </Button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon-xs"
                            onClick={() =>
                              updateQuantity(item.menuItemId, item.size, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                        <span className="text-sm font-medium">
                          ${lineTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t px-4 py-4">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="mt-3 w-full rounded-full" size="lg" onClick={onClose} asChild>
              <Link href="/order">Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
