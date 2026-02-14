"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(
  () => import("./StudioClient").then((mod) => mod.StudioClient),
  { ssr: false }
);

export function StudioLoader() {
  return <Studio />;
}
