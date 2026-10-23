import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Scissors, Truck } from "lucide-react";

import { sports } from "@/data/sports";
import { CATEGORIES, categoryBySlug, SPORT_BANNER } from "@/data/categories";
import { inCategory } from "@/data/products";
import { site } from "@/lib/site";
import type { SportId } from "@/lib/types";

import { ProductBrowser } from "@/components/commerce/product-browser";
import { Breadcrumbs, breadcrumbLd } from "@/components/commerce/breadcrumbs";
import { GearArt } from "@/components/graphics/gear-art";

/**
 * These routes are fully prerendered from generateStaticParams, and the whole
 * page depends on `params`, so there is no useful instant shell to stream
 * ahead of it. Opting out of the instant shell rather than wrapping the entire
 * body in <Suspense> for a placeholder nobody would see.
 */
export const instant = false;

export function generateStaticParams() {
  return sports.flatMap((s) =>
    CATEGORIES.filter((c) => c.stocked).map((c) => ({ sport: s.id, category: c.slug }))
  );
}

type Props = { params: Promise<{ sport: string; category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport, category } = await params;
  const s = sports.find((x) => x.id === sport);
  const c = categoryBySlug(category);
  if (!s || !c) return {};
  return {
    title: `${s.name} ${c.label.toLowerCase()} — buy online in India`,
    description: `Shop ${s.name.toLowerCase()} ${c.label.toLowerCase()} at ${site.name}. ${c.blurb}. Official India warranty, free professional stringing and 7-day returns.`,
    alternates: { canonical: `/${s.id}/${c.slug}` },
  };
}

const PROMISES = [
  { icon: Scissors, title: "Free Stringing", note: "On every racquet" },
  { icon: BadgeCheck, title: "100% Genuine", note: "Authorised stockist" },
  { icon: Truck, title: "Pan-India Delivery", note: "Fast & secure" },
];

export default async function CategoryPage({ params }: Props) {
  const { sport, category } = await params;
  const s = sports.find((x) => x.id === sport);
  const c = categoryBySlug(category);
  if (!s || !c || !c.stocked) notFound();

  const id = s.id as SportId;
  const items = inCategory(id, c.stocked);
  const banner = SPORT_BANNER[id];

  const trail = [
    { label: "Home", href: "/" },
    { label: s.name, href: `/${s.id}` },
    { label: c.label },
  ];

  return (
    <main className="flex-1 bg-bone-100 pb-[62px] lg:pb-0">
      <div className="shell pt-5">
        <Breadcrumbs trail={trail} />
      </div>

      {/* --------------------------------------------------------- banner */}
      <div className="shell pt-5">
        <section className="grain relative overflow-hidden rounded-[4px] bg-navy-950 text-white">
          <div className="hairline-grid pointer-events-none absolute inset-0 opacity-45" />
          <GearArt
            art={c.art}
            className="pointer-events-none absolute right-[16%] top-1/2 hidden h-[190%] -translate-y-1/2 rotate-[18deg] text-white/15 md:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-1/2 size-[26rem] -translate-y-1/2 rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #D7FF3A 0%, transparent 65%)" }}
          />

          <div className="relative flex flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
            <div className="max-w-lg">
              <p className="eyebrow text-volt-500">
                {s.name} {c.label.toLowerCase()}
              </p>
              <h1 className="display mt-3 text-[clamp(2rem,4.6vw,3.3rem)]">
                {banner.line1}{" "}
                <span className="text-volt-500">{banner.line2}</span>
              </h1>
              <p className="mt-4 text-[14.5px] leading-relaxed text-white/65">
                Explore {items.length}+ {c.label.toLowerCase()} from top global brands.
              </p>
            </div>

            <ul className="flex shrink-0 flex-col gap-4">
              {PROMISES.map(({ icon: Icon, title, note }) => (
                <li key={title} className="flex items-center gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20">
                    <Icon className="size-[18px] text-volt-500" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold leading-tight">{title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-tight text-white/50">{note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* ---------------------------------------------------------- browser */}
      <div className="shell py-8 md:py-10">
        {/* key: remount per listing so filter state never leaks between categories */}
        <ProductBrowser key={`${s.id}-${c.slug}`} items={items} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(trail)) }}
      />
    </main>
  );
}
