"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  size?: string;
  priceModifier?: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { menuItemId: string; size?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { menuItemId: string; size?: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

function cartKey(menuItemId: string, size?: string) {
  return `${menuItemId}:${size ?? ""}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { menuItemId, size, quantity = 1, ...rest } = action.payload;
      const idx = state.items.findIndex(
        (i) => i.menuItemId === menuItemId && i.size === size
      );
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
        return { items };
      }
      return {
        items: [...state.items, { menuItemId, size, quantity, ...rest }],
      };
    }
    case "REMOVE_ITEM": {
      return {
        items: state.items.filter(
          (i) =>
            cartKey(i.menuItemId, i.size) !==
            cartKey(action.payload.menuItemId, action.payload.size)
        ),
      };
    }
    case "UPDATE_QUANTITY": {
      const { menuItemId, size, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => cartKey(i.menuItemId, i.size) !== cartKey(menuItemId, size)
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          cartKey(i.menuItemId, i.size) === cartKey(menuItemId, size)
            ? { ...i, quantity }
            : i
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.payload };
    default:
      return state;
  }
}

type CartContextValue = {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (menuItemId: string, size?: string) => void;
  updateQuantity: (menuItemId: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "pizza-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(stored) });
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  // Persist to localStorage on change (skip initial empty state)
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items, mounted]);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const total = state.items.reduce(
    (sum, i) => sum + (i.price + (i.priceModifier ?? 0)) * i.quantity,
    0
  );

  const value: CartContextValue = {
    cart: state.items,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (menuItemId, size) =>
      dispatch({ type: "REMOVE_ITEM", payload: { menuItemId, size } }),
    updateQuantity: (menuItemId, size, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { menuItemId, size, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    itemCount,
    total,
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
