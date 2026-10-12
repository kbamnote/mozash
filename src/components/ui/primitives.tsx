import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/* ------------------------------------------------------------------ price */

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export function Price({
  price,
  mrp,
  className,
  size = "md",
}: {
  price: number;
  mrp?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const off = mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span
        className={cn(
          "font-semibold tracking-tight",
          size === "sm" && "text-[15px]",
          size === "md" && "text-[17px]",
          size === "lg" && "text-2xl"
        )}
      >
        {inr(price)}
      </span>
      {mrp && mrp > price && (
        <>
          <span className="text-[13px] text-[var(--fg-muted)] line-through decoration-[1px]">
            {inr(mrp)}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-clay-600">
            {off}% off
          </span>
        </>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- rating */

export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5 text-[13px]", className)}>
      <Star className="size-3.5 fill-volt-600 text-volt-600" strokeWidth={0} />
      <span className="font-semibold">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-[var(--fg-muted)]">({count})</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ badge */

const tagCopy: Record<NonNullable<Product["tag"]>, string> = {
  bestseller: "Bestseller",
  new: "New",
  "pro-pick": "Pro pick",
};

export function Tag({ tag, className }: { tag: NonNullable<Product["tag"]>; className?: string }) {
  return (
    <span
      className={cn(
        "rule-label inline-flex h-[22px] items-center rounded-[2px] px-2",
        tag === "bestseller" && "bg-clay-500 text-white",
        tag === "new" && "bg-navy-900 text-white",
        tag === "pro-pick" && "bg-volt-500 text-navy-900",
        className
      )}
    >
      {tagCopy[tag]}
    </span>
  );
}

export function Discount({ price, mrp }: { price: number; mrp: number }) {
  const off = Math.round(((mrp - price) / mrp) * 100);
  if (off <= 0) return null;
  return (
    <span className="rule-label inline-flex h-[22px] items-center rounded-[2px] bg-navy-900 px-2 text-volt-500">
      {off}% off
    </span>
  );
}

/* ------------------------------------------------------------- colour dots */

export function Swatches({ colours, className }: { colours: string[]; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-hidden>
      {colours.slice(0, 4).map((c) => (
        <span
          key={c}
          className="size-2.5 rounded-full ring-1 ring-black/15"
          style={{ background: c }}
        />
      ))}
      {colours.length > 4 && (
        <span className="text-[11px] text-[var(--fg-muted)]">+{colours.length - 4}</span>
      )}
    </div>
  );
}

/* --------------------------------------------------------------- eyebrow  */

export function SectionHead({
  eyebrow,
  title,
  lead,
  action,
  inverse,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  action?: React.ReactNode;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-10 gap-y-5", className)}>
      {/* 3xl, not 2xl: the wide display face needs ~0.7em per glyph and a
          19-character title lands just over a 42rem measure. */}
      <div className="max-w-3xl">
        {eyebrow && (
          <p
            className={cn(
              "eyebrow mb-3 flex items-center gap-2.5",
              inverse ? "text-volt-500" : "text-clay-600"
            )}
          >
            <span className={cn("h-px w-7", inverse ? "bg-volt-500" : "bg-clay-500")} />
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "display text-[clamp(1.9rem,4.2vw,3.1rem)]",
            inverse ? "text-white" : "text-navy-900"
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-4 max-w-2xl text-[15px] leading-relaxed md:text-base",
              inverse ? "text-white/60" : "text-[var(--fg-muted)]"
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
