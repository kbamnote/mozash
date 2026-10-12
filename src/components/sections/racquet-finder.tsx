"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Scissors, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import type { PlayStyle, SkillLevel, SportId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GearArt } from "@/components/graphics/gear-art";
import { RadarChart, RADAR_AXES } from "@/components/commerce/radar-chart";
import { Price, SectionHead } from "@/components/ui/primitives";

const SPORTS: { id: SportId; label: string }[] = [
  { id: "tennis", label: "Tennis" },
  { id: "badminton", label: "Badminton" },
  { id: "pickleball", label: "Pickleball" },
  { id: "padel", label: "Padel" },
  { id: "squash", label: "Squash" },
];
const LEVELS: { id: SkillLevel; label: string }[] = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];
const STYLES: { id: PlayStyle; label: string }[] = [
  { id: "power", label: "Power" },
  { id: "control", label: "Control" },
  { id: "spin", label: "Spin" },
  { id: "all-round", label: "All-round" },
];

/** Narrow by sport, then score on level + style fit, then by rating. */
function match(sport: SportId, level: SkillLevel, style: PlayStyle) {
  const pool = products.filter((p) => p.sport === sport && p.category === "racquets");
  if (!pool.length) return null;
  const scored = pool.map((p) => ({
    p,
    score:
      (p.level.includes(level) ? 2 : 0) +
      (p.style === style ? 2 : 0) +
      (p.inStock ? 0.5 : 0) +
      p.rating / 10,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].p;
}

function Chip({
  active,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "h-9 rounded-full border px-4 text-[13px] font-medium transition-all duration-200 ease-[var(--ease-out-expo)]",
        active
          ? "border-volt-500 bg-volt-500 text-navy-900"
          : "border-white/18 text-white/65 hover:border-white/40 hover:text-white"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function Step({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-t border-white/10 py-5 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:gap-6">
      <div className="flex shrink-0 items-center gap-3 sm:w-40">
        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-white/25 text-[11px] font-bold text-white/70">
          {n}
        </span>
        <span className="text-[13.5px] font-medium text-white/80">{label}</span>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export function RacquetFinder() {
  const [sport, setSport] = React.useState<SportId>("tennis");
  const [level, setLevel] = React.useState<SkillLevel>("intermediate");
  const [style, setStyle] = React.useState<PlayStyle>("control");

  const pick = React.useMemo(() => match(sport, level, style), [sport, level, style]);

  return (
    <section id="racquet-finder" className="grain relative overflow-hidden bg-navy-900 py-16 text-white md:py-22 lg:py-26">
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40" />
      {/* off-centre volt bloom — breaks the flat navy without a stock gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 size-[34rem] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, #D7FF3A 0%, transparent 65%)" }}
      />

      <div className="shell relative">
        <SectionHead
          inverse
          eyebrow="Racquet Finder"
          title={
            <>
              Three questions.
              <br className="hidden sm:block" /> One frame that fits.
            </>
          }
          lead="Our fitters have matched over 12,000 players. Tell us how you play — we'll narrow 2,500 frames down to the one you should be swinging."
        />

        <div className="mt-11 grid gap-6 lg:mt-14 lg:grid-cols-[1fr_26rem] lg:gap-8 xl:grid-cols-[1fr_28rem]">
          {/* ------------------------------------------------------- quiz */}
          <div className="rounded-[3px] border border-white/12 bg-white/[0.035] p-6 md:p-8">
            <Step n={1} label="Your sport">
              {SPORTS.map((s) => (
                <Chip key={s.id} active={sport === s.id} onClick={() => setSport(s.id)}>
                  {s.label}
                </Chip>
              ))}
            </Step>
            <Step n={2} label="Skill level">
              {LEVELS.map((l) => (
                <Chip key={l.id} active={level === l.id} onClick={() => setLevel(l.id)}>
                  {l.label}
                </Chip>
              ))}
            </Step>
            <Step n={3} label="Play style">
              {STYLES.map((s) => (
                <Chip key={s.id} active={style === s.id} onClick={() => setStyle(s.id)}>
                  {s.label}
                </Chip>
              ))}
            </Step>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
              <p className="flex items-center gap-2 text-[13px] text-white/55">
                <Scissors className="size-4 text-volt-500" strokeWidth={1.75} />
                Strung free at your tension before dispatch
              </p>
              <Button variant="outlineLight" size="sm" className="ml-auto">
                See full results
                <ArrowRight />
              </Button>
            </div>
          </div>

          {/* --------------------------------------------- recommendation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pick?.id ?? "none"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col rounded-[3px] border border-volt-500/35 bg-navy-800 p-6"
            >
              {pick ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow flex items-center gap-2 text-volt-500">
                        <Sparkles className="size-3.5" strokeWidth={2} />
                        Recommended for you
                      </p>
                      <h3 className="mt-2.5 text-[19px] font-semibold leading-tight">
                        {pick.brand} {pick.name}
                      </h3>
                      <p className="mt-1 text-[12.5px] text-white/50">{pick.spec}</p>
                    </div>
                    <GearArt
                      art={pick.art}
                      accent="#D7FF3A"
                      className="h-24 w-auto shrink-0 text-white/70"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4 border-y border-white/10 py-4">
                    <ul className="space-y-[7px]">
                      {RADAR_AXES.map(({ key, label }) => (
                        <li key={key} className="flex items-center gap-3 text-[12px]">
                          <span className="w-[4.6rem] shrink-0 text-white/50">{label}</span>
                          <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/12">
                            <span
                              className="block h-full rounded-full bg-volt-500 transition-[width] duration-500 ease-[var(--ease-out-expo)]"
                              style={{ width: `${(pick.profile[key] / 10) * 100}%` }}
                            />
                          </span>
                          <span className="w-6 shrink-0 text-right font-semibold tabular-nums text-white/85">
                            {pick.profile[key].toFixed(1)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <RadarChart profile={pick.profile} className="hidden h-36 w-auto text-white sm:block lg:hidden xl:block" />
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <Price price={pick.price} mrp={pick.mrp} size="lg" className="text-white" />
                    <span className="rule-label rounded-[2px] bg-volt-500 px-2 py-1 text-navy-900">
                      Best match
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <Button size="md" className="w-full">Add to cart</Button>
                    <Button variant="outlineLight" size="md" className="w-full">
                      View details
                    </Button>
                  </div>
                </>
              ) : (
                <p className="py-16 text-center text-[14px] text-white/50">
                  No frames match that combination yet — try another play style.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
