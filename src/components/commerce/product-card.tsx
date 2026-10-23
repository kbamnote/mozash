"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Check, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GearArt } from "@/components/graphics/gear-art";
import { Price, Rating, Tag, Discount, Swatches } from "@/components/ui/primitives";

export function ProductCard({ product: p, className }: { product: Product; className?: string }) {
  const [wished, setWished] = React.useState(false);
  const [compare, setCompare] = React.useState(false);
  const href = `/${p.sport}/${p.category}/${p.slug}`;
  const onSale = Boolean(p.mrp && p.mrp > p.price);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[3px] border border-navy-900/10 bg-white transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)]",
        p.inStock
          ? "hover:-translate-y-1 hover:border-navy-900/25 hover:shadow-[0_22px_45px_-28px_rgba(11,20,38,0.5)]"
          : "opacity-[0.96]",
        className
      )}
    >
      {/* ------------------------------------------------------------ media */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-[3px] bg-bone-100">
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {p.tag && <Tag tag={p.tag} />}
          {onSale && !p.tag && <Discount price={p.price} mrp={p.mrp!} />}
        </div>

        <button
          onClick={() => setWished((v) => !v)}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-2.5 top-2.5 z-10 grid size-9 place-items-center rounded-full text-navy-900/50 transition-colors hover:bg-navy-900/6 hover:text-navy-900"
        >
          <Heart
            className={cn("size-[18px] transition-colors", wished && "fill-clay-500 text-clay-500")}
            strokeWidth={1.75}
          />
        </button>

        <Link href={href} tabIndex={-1} aria-hidden className="absolute inset-0 grid place-items-center">
          {p.images?.[0] ? (
            <Image
              src={p.images[0]}
              alt=""
              fill
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 30vw, 24vw"
              className={cn(
                "object-contain p-5 transition-transform duration-[700ms] ease-[var(--ease-out-expo)]",
                p.inStock ? "group-hover:scale-[1.045]" : "opacity-50 grayscale"
              )}
            />
          ) : (
            <GearArt
              art={p.art}
              accent={p.colours[1] ?? p.colours[0] ?? "#D7FF3A"}
              className={cn(
                "h-[86%] w-auto transition-transform duration-[700ms] ease-[var(--ease-out-expo)]",
                p.inStock
                  ? "text-navy-900 group-hover:scale-[1.045]"
                  : "text-navy-900/30 grayscale"
              )}
            />
          )}
        </Link>

        {!p.inStock && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-bone-100/55">
            <span className="rule-label rounded-[2px] bg-navy-900 px-3.5 py-2 text-white">
              Sold out
            </span>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- body */}
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-[var(--fg-muted)]">
          {p.brand}
        </p>

        <h3 className="mt-1 text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-navy-900">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {p.name}
          </Link>
        </h3>

        <p className="mt-1 text-[12px] leading-tight text-[var(--fg-muted)]">{p.spec}</p>

        <div className="mt-2.5 flex items-center gap-3">
          <Rating value={p.rating} count={p.reviewCount} />
        </div>

        <Price price={p.price} mrp={p.mrp} className="mt-2.5" />

        <Swatches colours={p.colours} className="mt-3" />

        {/* compare — sits above the stretched link so it stays clickable */}
        <label className="relative z-10 mt-3.5 inline-flex w-fit cursor-pointer items-center gap-2 text-[12.5px] text-[var(--fg-muted)] select-none">
          <input
            type="checkbox"
            checked={compare}
            onChange={(e) => setCompare(e.target.checked)}
            className="peer sr-only"
          />
          <span className="grid size-[15px] place-items-center rounded-[2px] border border-navy-900/25 transition-colors peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:[&>svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-volt-600">
            <Check className="size-2.5 text-white opacity-0 transition-opacity" strokeWidth={3} />
          </span>
          Compare
        </label>

        <div className="relative z-10 mt-4">
          {p.inStock ? (
            <button className="flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-navy-900 bg-transparent text-[13px] font-semibold text-navy-900 transition-colors duration-200 group-hover:border-volt-500 group-hover:bg-volt-500 group-hover:hover:border-volt-600 group-hover:hover:bg-volt-600">
              <Plus className="size-3.5" strokeWidth={2.5} />
              Quick add
            </button>
          ) : (
            <button
              disabled
              className="h-10 w-full cursor-not-allowed rounded-full bg-navy-900/8 text-[13px] font-semibold text-navy-900/35"
            >
              Sold out
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
