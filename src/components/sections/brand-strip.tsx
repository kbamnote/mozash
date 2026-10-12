import { brandNames } from "@/data/products";

/**
 * Wordmark marquee. Licensed brand logos come from the client; set in the
 * display face the row still reads as a stockist wall rather than a gap.
 */
export function BrandStrip() {
  const row = [...brandNames, ...brandNames];

  return (
    <section
      aria-label="Brands we stock"
      className="relative overflow-hidden border-y border-navy-900/10 bg-white py-7"
    >
      <p className="shell rule-label mb-5 text-[var(--fg-muted)]">
        Authorised stockist · official India warranty
      </p>

      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max animate-[marquee-x_38s_linear_infinite] items-center gap-14 motion-reduce:animate-none">
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="display shrink-0 text-[clamp(1.1rem,2vw,1.6rem)] text-navy-900/30 transition-colors duration-300 hover:text-navy-900"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
