import type { Metadata } from "next";
import "./globals.css";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { SanityLive } from "@/sanity/lib/live";
import { Header } from "@/components/Header";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: "Pizza Sanity",
  description: "Handcrafted pizza, made to order",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <CartProvider>
          <Header
            title={settings?.title}
            logo={settings?.logo}
            navLinks={settings?.navLinks}
          />
          {children}
        </CartProvider>
        <SanityLive />
      </body>
    </html>
  );
}
