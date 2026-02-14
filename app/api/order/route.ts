import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

type Body = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
  items?: { menuItem: string; quantity: number; size?: string }[];
  total?: number;
};

export async function POST(request: Request) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    return NextResponse.json(
      { message: "Order API not configured (missing write token)." },
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

  const { customerName, customerEmail, customerPhone, deliveryAddress, notes, items, total } = body;

  if (!customerName?.trim() || !customerEmail?.trim() || !customerPhone?.trim() || !deliveryAddress?.trim()) {
    return NextResponse.json(
      { message: "Name, email, phone, and address are required." },
      { status: 400 }
    );
  }

  try {
    const orderItems = (items ?? []).map((item) => ({
      _type: "orderItem",
      _key: crypto.randomUUID(),
      menuItem: { _type: "reference", _ref: item.menuItem },
      quantity: item.quantity ?? 1,
      ...(item.size && { size: item.size }),
    }));

    await client.create({
      _type: "order",
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      deliveryAddress: deliveryAddress.trim(),
      notes: notes?.trim() || undefined,
      items: orderItems,
      total: total ?? 0,
      status: "new",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order create error:", err);
    return NextResponse.json(
      { message: "Failed to create order." },
      { status: 500 }
    );
  }
}
