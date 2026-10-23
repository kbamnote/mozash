"use client";

import * as React from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import type { Product, SkillLevel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { inr } from "@/components/ui/primitives";
import { ProductCard } from "./product-card";

/* ------------------------------------------------------------------ facets */

const HEAD_BUCKETS = [
  { label: "95–98", test: (n: number) => n >= 95 && n <= 98 },
  { label: "99–102", test: (n: number) => n >= 99 && n <= 102 },
  { label: "103–106", test: (n: number) => n >= 103 && n <= 106 },
  { label: "107+", test: (n: number) => n >= 107 },
];

const WEIGHT_BUCKETS = [
  { label: "250–275 g", test: (n: number) => n >= 250 && n <= 275 },
  { label: "276–300 g", test: (n: number) => n >= 276 && n <= 300 },
  { label: "301–325 g", test: (n: number) => n >= 301 && n <= 325 },
  { label: "326 g+", test: (n: number) => n >= 326 },
];

const LEVELS: { id: SkillLevel; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

const SORTS = [
  { id: "popular", label: "Best Selling" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Customer Rating" },
  { id: "discount", label: "Biggest Discount" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

const pct = (p: Product) => (p.mrp && p.mrp > p.price ? (p.mrp - p.price) / p.mrp : 0);

/* --------------------------------------------------------------- controls */

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="border-b border-navy-900/10 py-4 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[14px] font-semibold text-navy-900">{title}</span>
        <ChevronDown
          className={cn("size-4 text-navy-900/40 transition-transform duration-200", open && "rotate-180")}
          strokeWidth={2}
        />
      </button>
      {open && <div className="mt-3.5">{children}</div>}
    </div>
  );
}

function Check({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-[5px] text-[13.5px] text-navy-900/75 select-none hover:text-navy-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="grid size-[15px] shrink-0 place-items-center rounded-[2px] border border-navy-900/25 transition-colors peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:[&>svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-volt-600">
        <svg viewBox="0 0 10 10" className="size-2.5 opacity-0 transition-opacity" aria-hidden>
          <path d="M1 5l2.5 2.5L9 2" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {count !== undefined && <span className="text-[12px] text-navy-900/40">({count})</span>}
    </label>
  );
}

/* ------------------------------------------------------------------ main */

export function ProductBrowser({ items }: { items: Product[] }) {
  const bounds = React.useMemo(() => {
    const prices = items.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices, 0) / 500) * 500,
      max: Math.ceil(Math.max(...prices, 1000) / 500) * 500,
    };
  }, [items]);

  const [brands, setBrands] = React.useState<string[]>([]);
  const [heads, setHeads] = React.useState<string[]>([]);
  const [weights, setWeights] = React.useState<string[]>([]);
  const [levels, setLevels] = React.useState<SkillLevel[]>([]);
  const [grips, setGrips] = React.useState<string[]>([]);
  const [maxPrice, setMaxPrice] = React.useState(bounds.max);
  const [sort, setSort] = React.useState<SortId>("popular");
  const [sheet, setSheet] = React.useState(false);

  // No effect syncing maxPrice to bounds: the page mounts this with a `key` per
  // category, so switching listings remounts rather than carrying a stale cap.

  const toggle = <T,>(arr: T[], set: (v: T[]) => void) => (v: T, on: boolean) =>
    set(on ? [...arr, v] : arr.filter((x) => x !== v));

  const brandCounts = React.useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((p) => m.set(p.brand, (m.get(p.brand) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);

  const gripOptions = React.useMemo(
    () => [...new Set(items.flatMap((p) => p.gripSizes ?? []))].sort(),
    [items]
  );

  const filtered = React.useMemo(() => {
    const out = items.filter((p) => {
      if (brands.length && !brands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      if (levels.length && !p.level.some((l) => levels.includes(l))) return false;
      if (heads.length) {
        if (p.headSizeIn === undefined) return false;
        if (!HEAD_BUCKETS.some((b) => heads.includes(b.label) && b.test(p.headSizeIn!))) return false;
      }
      if (weights.length) {
        if (p.weightG === undefined) return false;
        if (!WEIGHT_BUCKETS.some((b) => weights.includes(b.label) && b.test(p.weightG!))) return false;
      }
      if (grips.length && !(p.gripSizes ?? []).some((g) => grips.includes(g))) return false;
      return true;
    });

    const by: Record<SortId, (a: Product, b: Product) => number> = {
      // Merchandised default: products with real photography lead, so the grid
      // does not interleave photographed stock with the drawn placeholders.
      popular: (a, b) =>
        Number(Boolean(b.images?.length)) - Number(Boolean(a.images?.length)) ||
        b.rating * b.reviewCount - a.rating * a.reviewCount,
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      discount: (a, b) => pct(b) - pct(a),
    };
    return [...out].sort(by[sort]);
  }, [items, brands, heads, weights, levels, grips, maxPrice, sort]);

  const activeCount =
    brands.length + heads.length + weights.length + levels.length + grips.length + (maxPrice < bounds.max ? 1 : 0);

  const clearAll = () => {
    setBrands([]);
    setHeads([]);
    setWeights([]);
    setLevels([]);
    setGrips([]);
    setMaxPrice(bounds.max);
  };

  const filters = (
    <>
      <div className="flex items-center justify-between pb-1">
        <p className="text-[16px] font-semibold text-navy-900">Filters</p>
        <button
          onClick={clearAll}
          disabled={!activeCount}
          className="text-[13px] font-medium text-navy-900/55 transition-colors enabled:hover:text-clay-600 disabled:opacity-40"
        >
          Clear all
        </button>
      </div>

      <Section title="Brand">
        <div className="max-h-56 overflow-y-auto pr-1">
          {brandCounts.map(([b, n]) => (
            <Check
              key={b}
              label={b}
              count={n}
              checked={brands.includes(b)}
              onChange={(on) => toggle(brands, setBrands)(b, on)}
            />
          ))}
        </div>
      </Section>

      <Section title="Price range">
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={500}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
          className="range-volt w-full"
        />
        <div className="mt-2 flex justify-between text-[12.5px] text-navy-900/60">
          <span>{inr(bounds.min)}</span>
          <span className="font-semibold text-navy-900">Up to {inr(maxPrice)}</span>
        </div>
      </Section>

      <Section title="Head size (sq in)">
        {HEAD_BUCKETS.map((b) => (
          <Check
            key={b.label}
            label={b.label}
            checked={heads.includes(b.label)}
            onChange={(on) => toggle(heads, setHeads)(b.label, on)}
          />
        ))}
      </Section>

      <Section title="Unstrung weight">
        {WEIGHT_BUCKETS.map((b) => (
          <Check
            key={b.label}
            label={b.label}
            checked={weights.includes(b.label)}
            onChange={(on) => toggle(weights, setWeights)(b.label, on)}
          />
        ))}
      </Section>

      {gripOptions.length > 0 && (
        <Section title="Grip size">
          {gripOptions.map((g) => (
            <Check
              key={g}
              label={g}
              checked={grips.includes(g)}
              onChange={(on) => toggle(grips, setGrips)(g, on)}
            />
          ))}
        </Section>
      )}

      <Section title="Level of game">
        {LEVELS.map((l) => (
          <Check
            key={l.id}
            label={l.label}
            checked={levels.includes(l.id)}
            onChange={(on) => toggle(levels, setLevels)(l.id, on)}
          />
        ))}
      </Section>
    </>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-7">
      {/* desktop rail */}
      <aside className="hidden h-fit rounded-[3px] border border-navy-900/10 bg-white px-5 py-4 lg:block">
        {filters}
      </aside>

      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[14px] text-[var(--fg-muted)]">
            <strong className="font-semibold text-navy-900">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSheet(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-900/20 px-4 text-[13px] font-semibold text-navy-900 lg:hidden"
            >
              <SlidersHorizontal className="size-4" strokeWidth={2} />
              Filters
              {activeCount > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-navy-900 text-[11px] text-white">
                  {activeCount}
                </span>
              )}
            </button>

            <label className="flex items-center gap-2 text-[13px] text-[var(--fg-muted)]">
              <span className="hidden sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="h-10 rounded-[3px] border border-navy-900/20 bg-white px-3 text-[13px] font-medium text-navy-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-volt-600"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {filtered.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-[3px] border border-navy-900/10 bg-white p-12 text-center">
            <p className="text-[15px] font-semibold text-navy-900">Nothing matches those filters</p>
            <p className="mt-1.5 text-[13.5px] text-[var(--fg-muted)]">
              Try widening the price range or clearing a brand.
            </p>
            <button
              onClick={clearAll}
              className="mt-5 inline-flex h-10 items-center rounded-full bg-navy-900 px-6 text-[13px] font-semibold text-white"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* mobile sheet */}
      {sheet && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-950/60" onClick={() => setSheet(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-white">
            <div className="flex items-center justify-between border-b border-navy-900/10 px-5 py-4">
              <p className="text-[16px] font-semibold">Filters</p>
              <button onClick={() => setSheet(false)} aria-label="Close filters" className="grid size-9 place-items-center rounded-full hover:bg-navy-900/5">
                <X className="size-5" strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-5">{filters}</div>
            <div className="border-t border-navy-900/10 p-4">
              <button
                onClick={() => setSheet(false)}
                className="h-12 w-full rounded-full bg-volt-500 text-[14px] font-semibold text-navy-900"
              >
                Show {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
