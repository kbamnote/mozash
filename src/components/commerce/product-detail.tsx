"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Heart, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GearArt } from "@/components/graphics/gear-art";

/* --------------------------------------------------------------- gallery */

export function ProductGallery({ product: p }: { product: Product }) {
  const images = p.images ?? [];
  const [i, setI] = React.useState(0);

  if (!images.length) {
    return (
      <div className="grid aspect-square place-items-center rounded-[4px] border border-navy-900/10 bg-white">
        <GearArt art={p.art} className="h-[70%] w-auto text-navy-900" />
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <ul className="flex shrink-0 gap-3 sm:flex-col">
        {images.map((src, idx) => (
          <li key={src}>
            <button
              onMouseEnter={() => setI(idx)}
              onFocus={() => setI(idx)}
              onClick={() => setI(idx)}
              aria-label={`View image ${idx + 1}`}
              aria-current={i === idx}
              className={cn(
                "relative size-[4.5rem] overflow-hidden rounded-[3px] border bg-white transition-colors",
                i === idx ? "border-navy-900" : "border-navy-900/12 hover:border-navy-900/40"
              )}
            >
              <Image src={src} alt="" fill sizes="72px" className="object-contain p-1.5" />
            </button>
          </li>
        ))}
      </ul>

      <div className="relative aspect-square min-w-0 flex-1 overflow-hidden rounded-[4px] border border-navy-900/10 bg-white">
        <Image
          src={images[i]}
          alt={`${p.brand} ${p.name}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-contain p-8"
        />
        {!p.inStock && (
          <span className="rule-label absolute left-4 top-4 rounded-[2px] bg-navy-900 px-3 py-1.5 text-white">
            Sold out
          </span>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- buy box */

export function BuyBox({ product: p }: { product: Product }) {
  const grips = p.gripSizes ?? [];
  const [grip, setGrip] = React.useState(grips[1] ?? grips[0] ?? "");
  const [qty, setQty] = React.useState(1);
  const [strung, setStrung] = React.useState(true);
  const [wished, setWished] = React.useState(false);
  const [pin, setPin] = React.useState("");
  const [pinResult, setPinResult] = React.useState<string | null>(null);

  const checkPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) {
      setPinResult("Enter a valid 6-digit PIN code.");
      return;
    }
    setPinResult("Delivers in 3–5 working days. Free shipping on this order.");
  };

  return (
    <div className="space-y-6">
      {grips.length > 0 && (
        <div>
          <p className="mb-2.5 text-[13px] font-semibold text-navy-900">
            Grip size <span className="font-normal text-[var(--fg-muted)]">· {grip}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {grips.map((g) => (
              <button
                key={g}
                onClick={() => setGrip(g)}
                aria-pressed={grip === g}
                className={cn(
                  "h-10 min-w-[3.25rem] rounded-[3px] border px-3 text-[13px] font-medium transition-colors",
                  grip === g
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/20 text-navy-900 hover:border-navy-900"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* stringing choice — the thing that differentiates this shop */}
      <div className="rounded-[3px] border border-navy-900/10 bg-bone-100 p-4">
        <label className="flex cursor-pointer items-start gap-3 select-none">
          <input
            type="checkbox"
            checked={strung}
            onChange={(e) => setStrung(e.target.checked)}
            className="peer sr-only"
          />
          <span className="mt-0.5 grid size-[17px] shrink-0 place-items-center rounded-[2px] border border-navy-900/30 transition-colors peer-checked:border-navy-900 peer-checked:bg-navy-900 peer-checked:[&>svg]:opacity-100">
            <Check className="size-3 text-white opacity-0 transition-opacity" strokeWidth={3} />
          </span>
          <span className="min-w-0">
            <span className="block text-[13.5px] font-semibold text-navy-900">
              String it free before dispatch
              <span className="ml-2 rounded-[2px] bg-volt-500 px-1.5 py-0.5 text-[11px] font-bold">
                Worth ₹1,200
              </span>
            </span>
            <span className="mt-1 block text-[12.5px] leading-snug text-[var(--fg-muted)]">
              Our fitters will call to confirm your string and tension. Adds about a day.
            </span>
          </span>
        </label>
      </div>

      {/* quantity + actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-12 items-center rounded-full border border-navy-900/20">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid size-12 place-items-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5"
          >
            <Minus className="size-4" strokeWidth={2.5} />
          </button>
          <span className="w-8 text-center text-[15px] font-semibold tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(9, q + 1))}
            aria-label="Increase quantity"
            className="grid size-12 place-items-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5"
          >
            <Plus className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        <button
          disabled={!p.inStock}
          className="inline-flex h-12 flex-1 min-w-[12rem] items-center justify-center gap-2 rounded-full bg-volt-500 text-[14.5px] font-semibold text-navy-900 transition-colors hover:bg-volt-600 disabled:cursor-not-allowed disabled:bg-navy-900/10 disabled:text-navy-900/35"
        >
          <ShoppingCart className="size-[18px]" strokeWidth={2} />
          {p.inStock ? "Add to cart" : "Sold out"}
        </button>

        <button
          onClick={() => setWished((v) => !v)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="grid size-12 shrink-0 place-items-center rounded-full border border-navy-900/20 text-navy-900 transition-colors hover:border-navy-900"
        >
          <Heart className={cn("size-[19px]", wished && "fill-clay-500 text-clay-500")} strokeWidth={1.75} />
        </button>
      </div>

      {p.inStock && (
        <button className="h-12 w-full rounded-full border border-navy-900 text-[14.5px] font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white">
          Buy now
        </button>
      )}

      {/* delivery check */}
      <form onSubmit={checkPin} className="rounded-[3px] border border-navy-900/10 p-4">
        <p className="mb-2.5 flex items-center gap-2 text-[13px] font-semibold text-navy-900">
          <Truck className="size-4" strokeWidth={1.75} />
          Check delivery
        </p>
        <div className="flex gap-2">
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            placeholder="Enter PIN code"
            aria-label="PIN code"
            className="h-11 min-w-0 flex-1 rounded-[3px] border border-navy-900/20 px-3.5 text-[13.5px] focus:border-navy-900 focus:outline-none"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-[3px] bg-navy-900 px-5 text-[13px] font-semibold text-white"
          >
            Check
          </button>
        </div>
        {pinResult && (
          <p className="mt-2.5 text-[12.5px] text-[var(--fg-muted)]">{pinResult}</p>
        )}
      </form>
    </div>
  );
}
