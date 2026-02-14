import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";

type HeroImage = {
  asset?: { _id?: string; url?: string; metadata?: { lqip?: string } };
  alt?: string | null;
} | null;

type HeroProps = {
  heading?: string | null;
  subheading?: string | null;
  image?: HeroImage;
  ctaText?: string | null;
  ctaLink?: string | null;
};

export function Hero({
  heading,
  subheading,
  image,
  ctaText,
  ctaLink,
}: HeroProps) {
  return (
    <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#1d4ed8] to-[#0e4a86]">
      {image?.asset?.url && (
        <Image
          src={urlFor(image).width(1920).height(1080).url()}
          alt={image.alt || ""}
          fill
          className="object-cover"
          priority
          placeholder={image.asset.metadata?.lqip ? "blur" : "empty"}
          blurDataURL={image.asset.metadata?.lqip}
        />
      )}
      <div className="absolute inset-0 bg-[#1e3a5f]/50" />
      <div className="relative mx-auto flex min-h-[50vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {heading || "Handcrafted Pizza"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blue-100 sm:text-xl">
          {subheading || "Fresh ingredients, made to order. Browse the menu or place an order."}
        </p>
        <Button size="lg" className="mt-8 rounded-full px-8 py-3 text-base font-semibold shadow-lg" asChild>
          <Link href={ctaLink || "/menu"}>
            {ctaText || "View menu"}
          </Link>
        </Button>
      </div>
    </section>
  );
}
