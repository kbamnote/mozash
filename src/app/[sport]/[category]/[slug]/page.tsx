import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, RotateCcw, Scissors, ShieldCheck } from "lucide-react";

import { detailedProducts, findProduct, relatedTo } from "@/data/products";
import { sports } from "@/data/sports";
import { categoryBySlug } from "@/data/categories";
import { site } from "@/lib/site";

import { Breadcrumbs, breadcrumbLd } from "@/components/commerce/breadcrumbs";
import { BuyBox, ProductGallery } from "@/components/commerce/product-detail";
import { ProductCard } from "@/components/commerce/product-card";
import { RadarChart, RADAR_AXES } from "@/components/commerce/radar-chart";
import { Price, Rating, Tag } from "@/components/ui/primitives";

/** Only the products with real photography and a spec sheet are pre-rendered. */
/**
 * These routes are fully prerendered from generateStaticParams, and the whole
 * page depends on `params`, so there is no useful instant shell to stream
 * ahead of it. Opting out of the instant shell rather than wrapping the entire
 * body in <Suspense> for a placeholder nobody would see.
 */
export const instant = false;

export function generateStaticParams() {
  return detailedProducts.map((p) => ({
    sport: p.sport,
    category: p.category,
    slug: p.slug,
  }));
}

type Props = { params: Promise<{ sport: string; category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport, category, slug } = await params;
  const p = findProduct(sport, category, slug);
  if (!p) return {};
  const title = `${p.brand} ${p.name}`;
  return {
    title,
    description: p.description?.slice(0, 155) ?? `Buy the ${title} at ${site.name}. ${p.spec}. Free professional stringing, official India warranty and 7-day returns.`,
    alternates: { canonical: `/${p.sport}/${p.category}/${p.slug}` },
    openGraph: {
      title,
      description: p.description?.slice(0, 155),
      images: p.images?.[0] ? [{ url: p.images[0] }] : undefined,
    },
  };
}

const PROMISES = [
  { icon: Scissors, label: "Free stringing" },
  { icon: BadgeCheck, label: "100% genuine" },
  { icon: ShieldCheck, label: "Brand warranty" },
  { icon: RotateCcw, label: "7-day returns" },
];

export default async function ProductPage({ params }: Props) {
  const { sport, category, slug } = await params;
  const p = findProduct(sport, category, slug);
  if (!p) notFound();

  const s = sports.find((x) => x.id === p.sport);
  const c = categoryBySlug(p.category);
  const related = relatedTo(p, 4);

  const trail = [
    { label: "Home", href: "/" },
    { label: s?.name ?? p.sport, href: `/${p.sport}` },
    { label: c?.label ?? p.category, href: `/${p.sport}/${p.category}` },
    { label: p.name },
  ];

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.brand} ${p.name}`,
    description: p.description,
    sku: p.id,
    brand: { "@type": "Brand", name: p.brand },
    ...(p.images?.length ? { image: p.images } : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating.toFixed(1),
      reviewCount: p.reviewCount,
      bestRating: "5",
    },
    offers: {
      "@type": "Offer",
      url: `${site.url}/${p.sport}/${p.category}/${p.slug}`,
      price: p.price,
      priceCurrency: "INR",
      availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: site.legalName },
    },
  };

  return (
    <main className="flex-1 bg-white pb-[62px] lg:pb-0">
      <div className="shell pt-5">
        <Breadcrumbs trail={trail} />
      </div>

      {/* ------------------------------------------------------ buy section */}
      <div className="shell grid gap-10 py-7 lg:grid-cols-2 lg:gap-14 lg:py-10">
        <ProductGallery product={p} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--fg-muted)]">
              {p.brand}
            </p>
            {p.tag && <Tag tag={p.tag} />}
          </div>

          <h1 className="display mt-2.5 text-[clamp(1.6rem,3vw,2.3rem)] text-navy-900">
            {p.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <Rating value={p.rating} count={p.reviewCount} />
            <span className="text-[13px] text-[var(--fg-muted)]">{p.spec}</span>
          </div>

          <div className="mt-5 border-y border-navy-900/10 py-5">
            <Price price={p.price} mrp={p.mrp} size="lg" />
            <p className="mt-1.5 text-[12.5px] text-[var(--fg-muted)]">
              Inclusive of all taxes · No-cost EMI from{" "}
              <strong className="font-semibold text-navy-900">
                ₹{Math.round(p.price / 6).toLocaleString("en-IN")}/month
              </strong>
            </p>
          </div>

          <div className="mt-6">
            <BuyBox product={p} />
          </div>

          <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-navy-900/10 pt-6 sm:grid-cols-4">
            {PROMISES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-[12.5px] text-navy-900/70">
                <Icon className="size-4 shrink-0 text-navy-900" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --------------------------------------------------------- details */}
      <section className="border-t border-navy-900/10 bg-bone-100 py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <div>
            <h2 className="display text-[clamp(1.4rem,2.2vw,1.9rem)] text-navy-900">
              About this racquet
            </h2>
            {p.description && (
              <p className="mt-4 text-[15px] leading-relaxed text-navy-900/75">{p.description}</p>
            )}

            {p.highlights?.length ? (
              <ul className="mt-6 space-y-2.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[14px] text-navy-900/75">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-volt-600" />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* play profile */}
            <div className="mt-9 rounded-[4px] border border-navy-900/10 bg-white p-6">
              <p className="rule-label mb-5 text-navy-900/45">How it plays</p>
              <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
                <ul className="space-y-3">
                  {RADAR_AXES.map(({ key, label }) => (
                    <li key={key} className="flex items-center gap-3 text-[12.5px]">
                      <span className="w-[5.2rem] shrink-0 text-navy-900/55">{label}</span>
                      <span className="h-[4px] flex-1 overflow-hidden rounded-full bg-navy-900/10">
                        <span
                          className="block h-full rounded-full bg-volt-500"
                          style={{ width: `${(p.profile[key] / 10) * 100}%` }}
                        />
                      </span>
                      <span className="w-6 shrink-0 text-right font-semibold tabular-nums text-navy-900">
                        {p.profile[key].toFixed(1)}
                      </span>
                    </li>
                  ))}
                </ul>
                <RadarChart profile={p.profile} className="hidden h-40 w-auto text-navy-900 sm:block" />
              </div>
            </div>
          </div>

          {/* spec table */}
          <div>
            <h2 className="display text-[clamp(1.4rem,2.2vw,1.9rem)] text-navy-900">
              Specifications
            </h2>
            {p.specs?.length ? (
              <dl className="mt-4 overflow-hidden rounded-[4px] border border-navy-900/10 bg-white">
                {p.specs.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex gap-4 px-5 py-3.5 text-[13.5px] ${
                      i % 2 ? "bg-bone-50" : ""
                    }`}
                  >
                    <dt className="w-[11rem] shrink-0 text-navy-900/55">{row.label}</dt>
                    <dd className="font-medium text-navy-900">{row.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-[14px] text-[var(--fg-muted)]">
                Full specifications coming soon.
              </p>
            )}

            <div className="mt-6 rounded-[4px] border border-navy-900/10 bg-white p-5">
              <p className="text-[13.5px] font-semibold text-navy-900">Not sure about tension?</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--fg-muted)]">
                Lower tension gives you power, higher gives control. Our fitters will call before
                stringing — or read the{" "}
                <Link
                  href="/guides/string-tension-explained"
                  className="font-semibold text-navy-900 underline underline-offset-2"
                >
                  tension guide
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- related */}
      {related.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="shell">
            <h2 className="display text-[clamp(1.4rem,2.2vw,1.9rem)] text-navy-900">
              You might also like
            </h2>
            <ul className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.id}>
                  <ProductCard product={r} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbLd(trail), productLd]),
        }}
      />
    </main>
  );
}
