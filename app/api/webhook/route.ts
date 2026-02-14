import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@sanity/client";
import type Stripe from "stripe";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: "Missing signature or webhook secret." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { message: "Invalid signature." },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata ?? {};

    let items: { menuItemId: string; name: string; price: number; quantity: number; size?: string }[] = [];
    try {
      items = JSON.parse(meta.items || "[]");
    } catch {
      // ignore
    }

    const orderItems = items.map((item) => ({
      _type: "orderItem",
      _key: crypto.randomUUID(),
      menuItem: { _type: "reference", _ref: item.menuItemId },
      quantity: item.quantity,
      ...(item.size && { size: item.size }),
    }));

    try {
      await sanityClient.create({
        _type: "order",
        customerName: meta.customerName,
        customerEmail: meta.customerEmail,
        customerPhone: meta.customerPhone,
        deliveryAddress: meta.deliveryAddress,
        notes: meta.notes || undefined,
        items: orderItems,
        total: (session.amount_total ?? 0) / 100,
        status: "confirmed",
        isPaid: true,
        stripeSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id,
        paidAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to create order in Sanity:", err);
      return NextResponse.json(
        { message: "Failed to create order." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
