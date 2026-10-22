"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CreditCard, MapPin, Truck } from "lucide-react";
import { announcements } from "@/data/nav";

const ICONS = { truck: Truck, card: CreditCard, pin: MapPin };

export function AnnouncementBar() {
  const [i, setI] = React.useState(0);
  const reduce = useReducedMotion();
  const n = announcements.length;

  // Only the phone layout rotates — there is no room for three items there.
  React.useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 4200);
    return () => clearInterval(t);
  }, [n]);

  return (
    <div className="relative z-50 bg-volt-500 text-navy-900">
      {/* md+ : all three, separated by hairlines */}
      <ul className="shell hidden h-10 items-center justify-center md:flex">
        {announcements.map((a, idx) => {
          const Icon = ICONS[a.icon];
          return (
            <li key={a.label} className="flex items-center">
              {idx > 0 && <span className="mx-6 h-4 w-px bg-navy-900/25 lg:mx-9" />}
              <span className="flex items-center gap-2.5 text-[12.5px] font-medium tracking-[-0.005em]">
                <Icon className="size-[17px] shrink-0" strokeWidth={1.75} />
                {a.label}
              </span>
            </li>
          );
        })}
      </ul>

      {/* phone : one at a time */}
      <div className="relative h-9 overflow-hidden md:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={reduce ? false : { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center gap-2 px-4 text-center text-[12px] font-medium"
          >
            {React.createElement(ICONS[announcements[i].icon], {
              className: "size-4 shrink-0",
              strokeWidth: 1.75,
            })}
            {announcements[i].label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
