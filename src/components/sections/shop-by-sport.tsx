import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sports } from "@/data/sports";
import { px } from "@/lib/images";
import { SectionHead } from "@/components/ui/primitives";

export function ShopBySport() {
  return (
    <section className="bg-white py-16 md:py-22 lg:py-26">
      <div className="shell">
        <SectionHead
          eyebrow="Five sports, one specialist"
          title="Shop by sport"
          lead="Every frame we stock is checked, strung and matched by people who actually play. Pick your court."
          action={
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-navy-900"
            >
              Explore your game
              <span className="grid size-8 place-items-center rounded-full border border-navy-900/20 transition-colors group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                <ArrowUpRight className="size-4" strokeWidth={2} />
              </span>
            </Link>
          }
        />

        {/* One card per sport. The lead card spans both columns at sm so the
            remaining four fill two clean rows instead of leaving an orphan. */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5 lg:gap-2.5">
          {sports.map((s, i) => (
            <li key={s.id} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <Link
                href={`/${s.id}`}
                className="group relative flex h-[18rem] flex-col justify-end overflow-hidden rounded-[3px] bg-navy-900 p-5 sm:h-[20rem] lg:h-[24rem]"
              >
                <Image
                  src={px(s.image, 900)}
                  alt={`${s.name} — ${s.blurb}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

                <div className="relative flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="display text-[clamp(1.25rem,1.6vw,1.6rem)] text-white">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-white/65">
                      {s.productCount.toLocaleString("en-IN")}+ products
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/12 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-volt-500 group-hover:text-navy-900">
                    <ArrowUpRight className="size-[17px]" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
