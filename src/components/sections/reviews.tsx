import { Star, BadgeCheck } from "lucide-react";
import { SectionHead } from "@/components/ui/primitives";

const reviews = [
  {
    name: "Aditya R.",
    city: "Pune",
    sport: "Tennis",
    rating: 5,
    title: "The tension note made the difference",
    body: "Ordered the Blade 98 and asked for 23 kg. It arrived strung, with a card showing the machine reading. First club match in it and I didn't have to adjust a thing.",
    bought: "Wilson Blade 98 v9",
  },
  {
    name: "Shruti M.",
    city: "Bengaluru",
    sport: "Badminton",
    rating: 5,
    title: "Finally a shop that asks before it sells",
    body: "I had been playing with a head-heavy racquet for two years and wondering why my wrist hurt. The finder put me on a Nanoflare and someone actually called to confirm.",
    bought: "Yonex Nanoflare 700",
  },
  {
    name: "Karan D.",
    city: "Mumbai",
    sport: "Pickleball",
    rating: 4,
    title: "Fast, and genuinely original stock",
    body: "Paddle arrived in three days with the warranty card registered to my number. Took half a star off only because I wanted a colour that was out of stock.",
    bought: "Joola Ben Johns Hyperion C2",
  },
  {
    name: "Meera N.",
    city: "Chennai",
    sport: "Tennis",
    rating: 5,
    title: "Returned one, exchanged easily",
    body: "The first frame felt too stiff for my elbow. Raised a return on a Sunday, pickup was Tuesday, replacement strung and back with me by Friday. No argument.",
    bought: "Head Speed MP",
  },
];

export function Reviews() {
  return (
    <section className="grain relative overflow-hidden bg-navy-900 py-16 text-white md:py-22 lg:py-26">
      <div className="shell relative">
        <SectionHead
          inverse
          eyebrow="5,214 verified reviews"
          title="What players say"
          lead="Reviews are only published by customers with a confirmed order. We don't edit them."
          action={
            <div className="flex items-center gap-4 rounded-[3px] border border-white/15 px-5 py-3.5">
              <span className="display text-[2rem] leading-none text-volt-500">4.8</span>
              <div>
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-3.5 fill-volt-500 text-volt-500" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-1 text-[12px] text-white/50">from 5,214 reviews</p>
              </div>
            </div>
          }
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {reviews.map((r) => (
            <li
              key={r.name}
              className="flex flex-col rounded-[3px] border border-white/12 bg-white/[0.035] p-5 transition-colors duration-300 hover:border-white/25"
            >
              <div className="flex gap-0.5" aria-label={`${r.rating} out of 5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={
                      i < r.rating ? "size-3.5 fill-volt-500 text-volt-500" : "size-3.5 fill-white/15 text-white/15"
                    }
                    strokeWidth={0}
                  />
                ))}
              </div>

              <h3 className="mt-3.5 text-[14.5px] font-semibold leading-snug">{r.title}</h3>
              <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-white/60">
                &ldquo;{r.body}&rdquo;
              </p>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="flex items-center gap-1.5 text-[13px] font-medium">
                  {r.name}
                  <BadgeCheck className="size-3.5 text-volt-500" strokeWidth={2} />
                </p>
                <p className="mt-0.5 text-[12px] text-white/40">
                  {r.city} · {r.sport}
                </p>
                <p className="mt-2 truncate text-[11.5px] text-white/35">Bought {r.bought}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
