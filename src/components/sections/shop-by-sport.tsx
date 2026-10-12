import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sports } from "@/data/sports";
import { px } from "@/lib/images";
import { SectionHead } from "@/components/ui/primitives";
import SocialCards, { type CardItem } from "@/components/ui/card-fan-carousel";

/**
 * Built at module scope, not inline in the JSX: the carousel keys its layout
 * effect on the `cards` identity, so a fresh array each render would restart
 * the entry animation.
 *
 * Sources are 2200x3300 portraits. The centre card is 320px wide on desktop and
 * scales to 1.08 on hover, so w=900 (dpr=2 -> 1800px) is still ~2.5x oversampled
 * for a 3x display while being roughly half the bytes of the full-size asset.
 */
const SPORT_CARDS: CardItem[] = sports.map((s) => ({
  imgUrl: px(s.image, 900),
  alt: `${s.name} — ${s.blurb}`,
  linkUrl: `/${s.id}`,
  title: s.name,
  meta: `${s.productCount.toLocaleString("en-IN")}+ products`,
}));

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
      </div>

      <div className="mt-2 lg:mt-4">
        <SocialCards cards={SPORT_CARDS} />
      </div>
    </section>
  );
}
