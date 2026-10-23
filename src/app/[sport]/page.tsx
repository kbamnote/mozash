import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { sports } from "@/data/sports";
import { tilesFor } from "@/data/categories";
import { inCategory } from "@/data/products";
import { px } from "@/lib/images";
import { site } from "@/lib/site";
import type { SportId } from "@/lib/types";
import { cn } from "@/lib/utils";

import { GearArt } from "@/components/graphics/gear-art";
import { ProductCard } from "@/components/commerce/product-card";
import { Breadcrumbs, breadcrumbLd } from "@/components/commerce/breadcrumbs";
import { SectionHead } from "@/components/ui/primitives";
import { TrustBar } from "@/components/sections/trust-bar";
import { BrandStrip } from "@/components/sections/brand-strip";
import { RacquetFinder } from "@/components/sections/racquet-finder";

/**
 * These routes are fully prerendered from generateStaticParams, and the whole
 * page depends on `params`, so there is no useful instant shell to stream
 * ahead of it. Opting out of the instant shell rather than wrapping the entire
 * body in <Suspense> for a placeholder nobody would see.
 */
export const instant = false;

export function generateStaticParams() {
  return sports.map((s) => ({ sport: s.id }));
}

type Props = { params: Promise<{ sport: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sport } = await params;
  const s = sports.find((x) => x.id === sport);
  if (!s) return {};
  return {
    title: `${s.name} gear — racquets, shoes and accessories`,
    description: `Shop ${s.name.toLowerCase()} at ${site.name}. ${s.blurb}. Free professional stringing on every racquet, official India warranty and 7-day returns.`,
    alternates: { canonical: `/${s.id}` },
  };
}

export default async function SportPage({ params }: Props) {
  const { sport } = await params;
  const s = sports.find((x) => x.id === sport);
  if (!s) notFound();

  const id = s.id as SportId;
  const tiles = tilesFor(id);
  const racquets = inCategory(id, "racquets");
  const trail = [{ label: "Home", href: "/" }, { label: s.name }];

  return (
    <main className="flex-1 pb-[62px] lg:pb-0">
      {/* ------------------------------------------------------------- hero */}
      <section className="grain relative isolate overflow-hidden bg-navy-900 text-white">
        <Image
          src={px(s.image, 1600)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/20" />
        <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="shell relative">
          <div className="flex min-h-[20rem] max-w-xl flex-col justify-center py-14 md:min-h-[24rem] md:py-16">
            <p className="eyebrow mb-4 flex items-center gap-2.5 text-volt-500">
              <span className="h-px w-7 bg-volt-500" />
              {s.name}
            </p>
            <h1 className="display text-[clamp(2rem,4.6vw,3.4rem)]">
              Built for
              <br />
              every game.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              Racquets, shoes, strings and more for players of every level — {s.note.toLowerCase()}.
            </p>
            <Link
              href={`/${s.id}/racquets`}
              className="group mt-8 inline-flex h-13 w-fit items-center gap-2 rounded-full bg-volt-500 px-7 text-[15px] font-semibold text-navy-900 transition-colors hover:bg-volt-600"
            >
              Shop {s.name.toLowerCase()}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- category */}
      <section className="bg-navy-950 pb-10 pt-8" aria-label={`${s.name} categories`}>
        <div className="shell">
          <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-7">
            {tiles.map((t) => {
              const body = (
                <>
                  <GearArt
                    art={t.art}
                    className={cn(
                      "absolute -right-5 top-1/2 h-[115%] -translate-y-1/2 transition-transform duration-500 ease-[var(--ease-out-expo)]",
                      t.stocked ? "text-white/25 group-hover:scale-105" : "text-white/10"
                    )}
                  />
                  <div className="relative">
                    <p className="text-[14px] font-semibold text-white">{t.label}</p>
                    <p className="mt-0.5 text-[11.5px] text-white/50">
                      {t.stocked ? `${t.count} product${t.count === 1 ? "" : "s"}` : "Coming soon"}
                    </p>
                  </div>
                </>
              );

              const shell =
                "group relative flex h-[7.5rem] flex-col justify-end overflow-hidden rounded-[3px] border p-4";

              return (
                <li key={t.slug}>
                  {t.stocked && t.count > 0 ? (
                    <Link
                      href={`/${s.id}/${t.slug}`}
                      className={cn(shell, "border-white/12 bg-navy-900 transition-colors hover:border-volt-500/60")}
                    >
                      {body}
                      <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-volt-500 group-hover:text-navy-900">
                        <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                      </span>
                    </Link>
                  ) : (
                    <div className={cn(shell, "cursor-not-allowed border-white/8 bg-navy-900/50")} aria-disabled>
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <TrustBar />

      {/* ---------------------------------------------------------- products */}
      <section className="bg-bone-100 py-14 md:py-18">
        <div className="shell">
          <Breadcrumbs trail={trail} className="mb-7" />
          <SectionHead
            eyebrow="In stock now"
            title={`${s.name} racquets`}
            lead={`${racquets.length} frames, each checked and strung in our workshop before it ships.`}
            action={
              racquets.length ? (
                <Link
                  href={`/${s.id}/racquets`}
                  className="group inline-flex items-center gap-2 text-[14px] font-semibold text-navy-900"
                >
                  View all
                  <span className="grid size-8 place-items-center rounded-full border border-navy-900/20 transition-colors group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                    <ArrowUpRight className="size-4" strokeWidth={2} />
                  </span>
                </Link>
              ) : undefined
            }
          />

          {racquets.length ? (
            <ul className="mt-9 grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5">
              {racquets.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-9 rounded-[3px] border border-navy-900/10 bg-white p-8 text-center text-[14px] text-[var(--fg-muted)]">
              Stock lands shortly. In the meantime, our fitters can source any{" "}
              {s.name.toLowerCase()} frame on request.
            </p>
          )}
        </div>
      </section>

      <BrandStrip />
      <RacquetFinder />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(trail)) }}
      />
    </main>
  );
}
