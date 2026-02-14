import { getStripe } from "@/lib/stripe";
import Link from "next/link";
import { CartClearer } from "./CartClearer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  let customerName: string | null = null;
  let total: number | null = null;

  if (session_id) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      customerName = session.metadata?.customerName ?? null;
      total = session.amount_total ? session.amount_total / 100 : null;
    } catch {
      // session not found — still show generic success
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <CartClearer />
      <Card className="border-green-200 bg-green-50">
        <CardContent className="py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h1 className="mt-4 text-2xl font-bold text-green-800">
            Order confirmed!
          </h1>
          {customerName && (
            <p className="mt-2 text-green-700">
              Thank you, {customerName}!
            </p>
          )}
          {total != null && (
            <p className="mt-1 text-lg font-medium text-green-700">
              Total paid: ${total.toFixed(2)}
            </p>
          )}
          <p className="mt-4 text-sm text-green-600">
            Your order has been received and is being prepared.
          </p>
          <Button className="mt-6 rounded-full" size="lg" asChild>
            <Link href="/menu">Back to Menu</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
