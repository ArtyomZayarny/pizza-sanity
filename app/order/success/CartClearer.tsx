"use client";

import { useCart } from "@/lib/cart-context";
import { useEffect } from "react";

export function CartClearer() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
