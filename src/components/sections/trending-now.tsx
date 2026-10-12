"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/commerce/product-card";
import { SectionHead } from "@/components/ui/primitives";

const TABS: { id: Category; label: string }[] = [
  { id: "racquets", label: "Racquets" },
  { id: "shoes", label: "Shoes" },
  { id: "strings", label: "Strings" },
  { id: "bags", label: "Bags" },
];

export function TrendingNow() {
  const [tab, setTab] = React.useState<Category>("racquets");
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    skipSnaps: false,
  });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const items = React.useMemo(() => products.filter((p) => p.category === tab), [tab]);

  const sync = React.useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  React.useEffect(() => {
    if (!embla) return;
    // Deferred to the next frame: calling sync() in the effect body would set
    // state synchronously and cascade a render.
    const frame = requestAnimationFrame(sync);
    embla.on("select", sync).on("reInit", sync);
    return () => {
      cancelAnimationFrame(frame);
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, sync]);

  // Re-measure and rewind when the tab changes the slide count.
  React.useEffect(() => {
    if (!embla) return;
    embla.reInit();
    embla.scrollTo(0, true);
  }, [embla, tab]);

  return (
    <section className="bg-bone-100 py-16 md:py-22 lg:py-26">
      <div className="shell">
        <SectionHead
          eyebrow="Moving fast this week"
          title="Trending now"
          action={
            <div className="flex items-center gap-2">
              <button
                onClick={() => embla?.scrollPrev()}
                disabled={!canPrev}
                aria-label="Previous products"
                className="grid size-10 place-items-center rounded-full border border-navy-900/20 text-navy-900 transition-colors enabled:hover:border-navy-900 enabled:hover:bg-navy-900 enabled:hover:text-white disabled:opacity-30"
              >
                <ArrowLeft className="size-4" strokeWidth={2} />
              </button>
              <button
                onClick={() => embla?.scrollNext()}
                disabled={!canNext}
                aria-label="Next products"
                className="grid size-10 place-items-center rounded-full border border-navy-900/20 text-navy-900 transition-colors enabled:hover:border-navy-900 enabled:hover:bg-navy-900 enabled:hover:text-white disabled:opacity-30"
              >
                <ArrowRight className="size-4" strokeWidth={2} />
              </button>
            </div>
          }
        />

        {/* tabs */}
        <div
          role="tablist"
          aria-label="Product categories"
          className="mt-8 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "h-9 shrink-0 rounded-full border px-4 text-[13px] font-medium transition-all duration-200",
                tab === t.id
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-900/15 text-[var(--fg-muted)] hover:border-navy-900/40 hover:text-navy-900"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* carousel */}
        <div className="mt-6 overflow-hidden" ref={emblaRef}>
          <div className="-ml-3 flex touch-pan-y">
            {items.map((p) => (
              <div
                key={p.id}
                className="min-w-0 shrink-0 grow-0 basis-[72%] pl-3 sm:basis-[46%] lg:basis-[30%] xl:basis-[23.5%]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[12.5px] text-[var(--fg-muted)] lg:hidden">
          Swipe for more &rarr;
        </p>
      </div>
    </section>
  );
}
