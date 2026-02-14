import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { OrderForm } from "@/components/OrderForm";
import { ContactBlock } from "@/components/ContactBlock";

export default async function OrderPage() {
  const { data: settings } = await sanityFetch({ query: SITE_SETTINGS_QUERY });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-[1fr,340px]">
        <OrderForm
          title={settings?.orderFormTitle}
          description={settings?.orderFormDescription}
          labels={settings?.formLabels}
        />
        <aside>
          <ContactBlock
            address={settings?.contactAddress}
            phone={settings?.contactPhone}
            email={settings?.contactEmail}
            openingHours={settings?.openingHours}
          />
        </aside>
      </div>
    </main>
  );
}
