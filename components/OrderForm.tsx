"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type FormLabels = {
  nameLabel?: string | null;
  emailLabel?: string | null;
  phoneLabel?: string | null;
  addressLabel?: string | null;
  notesLabel?: string | null;
};

type OrderFormProps = {
  title?: string | null;
  description?: string | null;
  labels?: FormLabels | null;
};

const DEFAULT_LABELS = {
  nameLabel: "Your name",
  emailLabel: "Email",
  phoneLabel: "Phone",
  addressLabel: "Delivery address",
  notesLabel: "Order notes",
};

export function OrderForm({
  title,
  description,
  labels,
}: OrderFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState<string | null>(null);
  const l = { ...DEFAULT_LABELS, ...labels };
  const { cart, total, removeItem } = useCart();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;

    const data = {
      customerName: (form.elements.namedItem("name") as HTMLInputElement).value,
      customerEmail: (form.elements.namedItem("email") as HTMLInputElement).value,
      customerPhone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      deliveryAddress: (form.elements.namedItem("address") as HTMLTextAreaElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
      items: cart.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        priceModifier: item.priceModifier,
      })),
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Something went wrong");
        setStatus("idle");
        return;
      }
      // Redirect to Stripe Checkout
      window.location.href = json.url;
    } catch {
      setError("Network error");
      setStatus("idle");
    }
  }

  if (cart.length === 0) {
    return (
      <Card className="text-center">
        <CardContent className="py-8">
          <p className="text-lg text-muted-foreground">Your cart is empty</p>
          <Button className="mt-4 rounded-full" asChild>
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {description && (
          <p className="mt-2 text-muted-foreground">{description}</p>
        )}

        {/* Cart Summary */}
        <div className="mt-6 rounded-lg border bg-muted/50 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Order Summary
          </h3>
          <ul className="mt-3 divide-y">
            {cart.map((item) => {
              const lineTotal = (item.price + (item.priceModifier ?? 0)) * item.quantity;
              const key = `${item.menuItemId}:${item.size ?? ""}`;
              return (
                <li key={key} className="flex items-center gap-3 py-3">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.name}
                      {item.size && (
                        <span className="ml-1 text-xs text-muted-foreground">({item.size})</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} &times; ${(item.price + (item.priceModifier ?? 0)).toFixed(2)}
                    </p>
                  </div>
                  <span className="text-sm font-medium">
                    ${lineTotal.toFixed(2)}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => removeItem(item.menuItemId, item.size)}
                    aria-label="Remove item"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </Button>
                </li>
              );
            })}
          </ul>
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{l.nameLabel}</Label>
            <Input id="name" name="name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{l.emailLabel}</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{l.phoneLabel}</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">{l.addressLabel}</Label>
            <Textarea id="address" name="address" rows={2} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">{l.notesLabel}</Label>
            <Textarea id="notes" name="notes" rows={3} />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full"
            size="lg"
          >
            {status === "submitting" ? "Redirecting to payment..." : `Pay $${total.toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
