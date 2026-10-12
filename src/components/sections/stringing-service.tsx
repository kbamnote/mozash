import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { px, photo } from "@/lib/images";
import { Button } from "@/components/ui/button";

const steps = [
  {
    n: "01",
    title: "Pick your string and tension",
    body: "Natural gut, multifilament or poly — or let a fitter choose based on your answers in the Finder.",
  },
  {
    n: "02",
    title: "We string it before it ships",
    body: "Every frame goes on a calibrated electronic machine. Logged, labelled and photographed.",
  },
  {
    n: "03",
    title: "Play the same day it lands",
    body: "No hunting for a local stringer. Re-string credits are added to your account with each order.",
  },
];

export function StringingService() {
  return (
    <section className="bg-white py-16 md:py-22 lg:py-26">
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-navy-900 lg:aspect-[5/5.4]">
          <Image
            src={px(photo.stringingWall, 1200)}
            alt="Racquets waiting on the stringing wall at the Mozash workshop"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <p className="display text-[clamp(1.6rem,3vw,2.3rem)] leading-none text-white">
              Included,
              <br />
              not extra.
            </p>
            <span className="rule-label rounded-[2px] bg-volt-500 px-2.5 py-1.5 text-navy-900">
              Worth ₹1,200
            </span>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3 flex items-center gap-2.5 text-clay-600">
            <span className="h-px w-7 bg-clay-500" />
            The stringing room
          </p>
          {/* sized against the half-width column, not the full shell */}
          <h2 className="display text-[clamp(1.9rem,3.6vw,2.9rem)] text-navy-900">
            Free stringing on
            <br />
            every racquet.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--fg-muted)] md:text-base">
            Most online stores ship you an unstrung frame and leave the hard part to you. The
            string and the tension change how a racquet plays more than the frame does — so we
            do it in-house, included in the price.
          </p>

          <ol className="mt-9 space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="display shrink-0 text-[15px] leading-none text-clay-500">
                  {s.n}
                </span>
                <div className="border-t border-navy-900/10 pt-0.5">
                  <h3 className="text-[15px] font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-1.5 max-w-md text-[14px] leading-relaxed text-[var(--fg-muted)]">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button variant="solid" size="lg" className="group">
              Learn about our stringing
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <p className="text-[13px] text-[var(--fg-muted)]">
              Avg. turnaround <strong className="font-semibold text-navy-900">18 hours</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
