import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pizza Sanity",
    short_name: "Pizza Sanity",
    description: "Handcrafted pizza, made to order",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#1d4ed8",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
