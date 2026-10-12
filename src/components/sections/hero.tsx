"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Star, Users, Scissors } from "lucide-react";
import { px, photo } from "@/lib/images";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "12,000+", label: "players matched" },
  { icon: Scissors, value: "Free stringing", label: "on every racquet" },
  { icon: Star, value: "4.8 / 5", label: "from 5,000+ reviews" },
];

const rise = (d: number) => ({
  initial: { y: 22, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy-900 text-white">
      {/* photograph */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <Image
          src={px(photo.heroServe, 1800)}
          alt="Player serving on an outdoor court"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover object-[62%_center]"
        />
        {/* scrim: vertical on mobile, horizontal on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/72 to-navy-900/35 lg:bg-gradient-to-r lg:from-navy-900 lg:via-navy-900/70 lg:to-transparent" />
      </div>

      {/* faint court grid */}
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-[0.55]" />

      <div className="shell relative">
        <div className="flex min-h-[32rem] max-w-[49rem] flex-col justify-center py-16 md:min-h-[36rem] md:py-20 lg:min-h-[40rem] lg:py-24">
          <motion.p {...rise(0)} className="eyebrow mb-6 flex items-center gap-2.5 text-volt-500">
            <span className="h-px w-7 bg-volt-500" />
            India&rsquo;s racquet sports specialist
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="display text-[clamp(2.4rem,5.6vw,3.9rem)]"
          >
            Find the racquet
            <br />
            that <span className="text-volt-500">plays like you.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/70 md:text-[17px]"
          >
            Expert matched. Game changing gear. Tell us how you play and we&rsquo;ll shortlist
            frames that fit your swing — strung free, at your tension, before it ships.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button size="lg" className="group">
              Take the 60-sec quiz
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Link
              href="/shop"
              className="inline-flex h-14 items-center rounded-full border border-white/25 px-8 text-[15px] font-semibold transition-colors hover:border-white hover:bg-white hover:text-navy-900"
            >
              Shop all
            </Link>
          </motion.div>

          {/* stats */}
          <motion.dl
            {...rise(0.34)}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/12 pt-7 md:gap-x-10"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20">
                  <Icon className="size-4 text-volt-500" strokeWidth={1.75} />
                </span>
                <div>
                  <dt className="text-[14px] font-semibold leading-tight">{value}</dt>
                  <dd className="text-[12.5px] leading-tight text-white/50">{label}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
