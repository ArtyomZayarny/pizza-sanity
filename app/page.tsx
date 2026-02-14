import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY, MENU_ITEMS_FEATURED_QUERY } from "@/sanity/lib/queries";
import { Hero } from "@/components/Hero";
import { MenuTeaser } from "@/components/MenuTeaser";
import { ContactBlock } from "@/components/ContactBlock";

export default async function HomePage() {
  const [
    { data: settings },
    { data: featuredMenu },
  ] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: MENU_ITEMS_FEATURED_QUERY }),
  ]);

  return (
    <main>
      <Hero
        heading={settings?.heroHeading}
        subheading={settings?.heroSubheading}
        image={settings?.heroImage}
        ctaText={settings?.heroCtaText}
        ctaLink={settings?.heroCtaLink}
      />
      <MenuTeaser items={featuredMenu ?? []} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <ContactBlock
          address={settings?.contactAddress}
          phone={settings?.contactPhone}
          email={settings?.contactEmail}
          openingHours={settings?.openingHours}
        />
      </section>
    </main>
  );
}
