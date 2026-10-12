import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";

import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ShopBySport } from "@/components/sections/shop-by-sport";
import { RacquetFinder } from "@/components/sections/racquet-finder";
import { TrendingNow } from "@/components/sections/trending-now";
import { StringingService } from "@/components/sections/stringing-service";
import { BrandStrip } from "@/components/sections/brand-strip";
import { Guides } from "@/components/sections/guides";
import { Reviews } from "@/components/sections/reviews";

import { products } from "@/data/products";
import { site } from "@/lib/site";

/** ItemList for the products surfaced on this page — helps rich results. */
const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Trending racquet sports gear",
  numberOfItems: products.length,
  itemListElement: products.slice(0, 12).map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: `${p.brand} ${p.name}`,
      brand: { "@type": "Brand", name: p.brand },
      url: `${site.url}/${p.sport}/${p.category}/${p.slug}`,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.rating.toFixed(1),
        reviewCount: p.reviewCount,
        bestRating: "5",
      },
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "INR",
        availability: p.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />

      {/* The hero carries the page's single h1. */}
      <main className="flex-1 pb-[62px] lg:pb-0">
        <Hero />
        <TrustBar />
        <ShopBySport />
        <RacquetFinder />
        <TrendingNow />
        <StringingService />
        <BrandStrip />
        <Guides />
        <Reviews />
      </main>

      <SiteFooter />
      <MobileTabBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
