import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  priceModifier?: number;
};

type Body = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
  items?: CartItem[];
};

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { message: "Stripe not configured." },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { customerName, customerEmail, customerPhone, deliveryAddress, notes, items } = body;

  if (!customerName?.trim() || !customerEmail?.trim() || !customerPhone?.trim() || !deliveryAddress?.trim()) {
    return NextResponse.json(
      { message: "Name, email, phone, and address are required." },
      { status: 400 }
    );
  }

  if (!items?.length) {
    return NextResponse.json(
      { message: "Cart is empty." },
      { status: 400 }
    );
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.size ? `${item.name} (${item.size})` : item.name,
      },
      unit_amount: Math.round((item.price + (item.priceModifier ?? 0)) * 100),
    },
    quantity: item.quantity,
  }));

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: customerEmail.trim(),
      success_url: `${appUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/order`,
      metadata: {
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        deliveryAddress: deliveryAddress.trim(),
        notes: notes?.trim() || "",
        items: JSON.stringify(
          items.map((i) => ({
            menuItemId: i.menuItemId,
            name: i.name,
            price: i.price + (i.priceModifier ?? 0),
            quantity: i.quantity,
            size: i.size,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { message: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
