/**
 * Seed Sanity with site settings and menu items.
 * Run: npm run seed  (loads .env.local automatically)
 * Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 */
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: ".env.local" });
import { siteSettings as siteSettingsData, menuItems } from "./seed-data";

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset) {
    console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local");
    process.exit(1);
  }
  if (!token) {
    console.error("Set SANITY_API_WRITE_TOKEN in .env.local for creating documents.");
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });

  console.log("Creating site settings...");
  await client.createOrReplace(siteSettingsData);
  console.log("Site settings created.");

  console.log("Creating menu items...");
  for (const item of menuItems) {
    await client.create({ ...item } as Parameters<typeof client.create>[0]);
  }
  console.log(`Created ${menuItems.length} menu items.`);
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
