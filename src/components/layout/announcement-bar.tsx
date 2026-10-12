"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { announcements } from "@/data/nav";

export function AnnouncementBar() {
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduce = useReducedMotion();
  const n = announcements.length;

  const go = React.useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 4200);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div
      className="relative z-50 bg-volt-500 text-navy-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shell flex h-9 items-center justify-center gap-1">
        <button
          onClick={() => go(-1)}
          aria-label="Previous announcement"
          className="grid size-6 place-items-center rounded-full transition-colors hover:bg-navy-900/10"
        >
          <ChevronLeft className="size-3.5" strokeWidth={2.5} />
        </button>

        <div className="relative h-9 flex-1 overflow-hidden sm:flex-none sm:w-[26rem] md:w-[34rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={i}
              initial={reduce ? false : { y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: -14, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center text-center text-[11px] font-semibold tracking-[0.06em] sm:text-[12px]"
            >
              {announcements[i]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next announcement"
          className="grid size-6 place-items-center rounded-full transition-colors hover:bg-navy-900/10"
        >
          <ChevronRight className="size-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
