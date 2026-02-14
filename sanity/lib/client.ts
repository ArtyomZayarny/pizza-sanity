import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

if (!projectId?.trim()) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Copy .env.example to .env.local and set NEXT_PUBLIC_SANITY_PROJECT_ID (and optionally NEXT_PUBLIC_SANITY_DATASET). Get your project ID from https://sanity.io/manage."
  );
}

export const client = createClient({
  projectId: projectId.trim(),
  dataset,
  apiVersion,
  useCdn: true,
});
