"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, User, X, ArrowRight } from "lucide-react";
import { sportNav } from "@/data/nav";
import { px, photo } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";
import { Button } from "@/components/ui/button";
import { GearArt } from "@/components/graphics/gear-art";

export function SiteHeader() {
  const [open, setOpen] = React.useState<string | null>(null);
  const [drawer, setDrawer] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setDrawer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hoverOpen = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const active = sportNav.find((s) => s.id === open);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-navy-900 text-white transition-shadow duration-300",
        scrolled && "shadow-[0_1px_0_rgba(255,255,255,0.1),0_14px_40px_-18px_rgba(0,0,0,0.9)]"
      )}
      onMouseLeave={hoverClose}
    >
      <div className="shell flex h-16 items-center gap-4 lg:h-[68px] lg:gap-8">
        {/* mobile menu */}
        <button
          onClick={() => setDrawer(true)}
          aria-label="Open menu"
          className="-ml-2 grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
        >
          <Menu className="size-5" strokeWidth={1.75} />
        </button>

        <Link href="/" className="shrink-0" aria-label="Mozash home">
          <Wordmark />
        </Link>

        {/* sport nav */}
        <nav className="hidden items-stretch self-stretch lg:flex" aria-label="Shop by sport">
          {sportNav.map((s) => (
            <div key={s.id} onMouseEnter={() => hoverOpen(s.id)} className="relative flex">
              <Link
                href={`/${s.id}`}
                className={cn(
                  "relative flex items-center px-3.5 text-[13.5px] font-medium tracking-[-0.01em] transition-colors xl:px-4",
                  open === s.id ? "text-white" : "text-white/70 hover:text-white"
                )}
              >
                {s.label}
                <span
                  className={cn(
                    "absolute inset-x-3.5 bottom-0 h-[2px] origin-left bg-volt-500 transition-transform duration-300 ease-[var(--ease-out-expo)] xl:inset-x-4",
                    open === s.id ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            </div>
          ))}
        </nav>

        {/* search */}
        <div className="ml-auto hidden min-w-0 flex-1 justify-end md:flex lg:max-w-[30rem]">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="group flex h-11 w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] pl-4 pr-1.5 transition-colors focus-within:border-white/35 hover:border-white/25"
          >
            <Search className="size-4 shrink-0 text-white/45" strokeWidth={1.75} />
            <input
              placeholder="Search racquets, shoes, bags…"
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/40 focus:outline-none"
            />
            <Button size="sm" className="hidden h-8 shrink-0 px-3.5 text-[12px] lg:inline-flex">
              Find my racquet
            </Button>
          </form>
        </div>

        {/* actions */}
        <div className="flex items-center gap-0.5 md:ml-0 ml-auto">
          <button aria-label="Search" className="grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden">
            <Search className="size-[19px]" strokeWidth={1.75} />
          </button>
          <button aria-label="Wishlist" className="grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <Heart className="size-[19px]" strokeWidth={1.75} />
          </button>
          <button aria-label="Account" className="hidden size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:grid">
            <User className="size-[19px]" strokeWidth={1.75} />
          </button>
          <button aria-label="Cart, 2 items" className="relative grid size-10 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white">
            <ShoppingBag className="size-[19px]" strokeWidth={1.75} />
            <span className="absolute right-1 top-1 grid size-[17px] place-items-center rounded-full bg-volt-500 text-[10px] font-bold text-navy-900">
              2
            </span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------- mega menu */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => hoverOpen(active.id)}
            className="absolute inset-x-0 top-full hidden border-t border-white/10 bg-navy-900 lg:block"
          >
            <div className="shell grid grid-cols-[repeat(4,minmax(0,1fr))_20rem] gap-8 py-9">
              {active.columns.map((col) => (
                <div key={col.heading}>
                  <p className="rule-label mb-4 text-white/40">{col.heading}</p>
                  <ul className="space-y-[9px]">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          onClick={() => setOpen(null)}
                          className={cn(
                            "group inline-flex items-center gap-1.5 text-[13.5px] transition-colors",
                            l.accent ? "text-volt-500 hover:text-volt-400" : "text-white/70 hover:text-white"
                          )}
                        >
                          {l.label}
                          {l.accent && (
                            <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* feature card */}
              <Link
                href={active.feature.href}
                onClick={() => setOpen(null)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[3px] border border-white/10 bg-navy-800 p-5 transition-colors hover:border-volt-500/50"
              >
                <div className="relative z-10">
                  <p className="rule-label text-volt-500">{active.feature.eyebrow}</p>
                  <p className="mt-2 max-w-[11rem] text-[15px] font-semibold leading-snug text-white">
                    {active.feature.title}
                  </p>
                </div>
                <GearArt
                  art={active.id === "badminton" ? "shuttle-racquet" : active.id === "tennis" || active.id === "squash" ? "racquet" : "paddle"}
                  className="pointer-events-none absolute -right-8 top-1/2 h-[150%] -translate-y-1/2 text-white/25 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <div className="relative z-10 flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-white">{active.feature.price}</span>
                  <span className="text-[13px] text-white/40 line-through">{active.feature.mrp}</span>
                </div>
              </Link>
            </div>

            {/* quiz strip */}
            <div className="border-t border-white/10">
              <div className="shell flex items-center gap-6 py-4">
                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-[3px]">
                  <Image
                    src={px(photo.stringingWall, 400)}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-white">
                    Not sure which {active.label.toLowerCase()} racquet is right for you?
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/55">
                    Answer three questions and we&rsquo;ll shortlist frames that suit your swing — free stringing included.
                  </p>
                </div>
                <Button size="sm" className="ml-auto shrink-0">
                  Take the quiz
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------- mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-[2px] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col bg-navy-900 lg:hidden"
            >
              <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                <Wordmark />
                <button
                  onClick={() => setDrawer(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full text-white/70 hover:bg-white/10"
                >
                  <X className="size-5" strokeWidth={1.75} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
                <p className="rule-label mb-4 text-white/40">Shop by sport</p>
                <ul className="mb-8 space-y-1">
                  {sportNav.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/${s.id}`}
                        onClick={() => setDrawer(false)}
                        className="flex items-center justify-between border-b border-white/8 py-3.5 text-[17px] font-medium text-white"
                      >
                        {s.label}
                        <ArrowRight className="size-4 text-white/35" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="rule-label mb-4 text-white/40">Services</p>
                <ul className="space-y-1">
                  {[
                    { label: "Racquet Finder", href: "/racquet-finder" },
                    { label: "Free stringing", href: "/stringing" },
                    { label: "Deals", href: "/deals" },
                    { label: "Track your order", href: "/orders/track" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setDrawer(false)}
                        className="block border-b border-white/8 py-3 text-[15px] text-white/70"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 p-5">
                <Button size="lg" className="w-full">
                  Take the 60-sec quiz
                  <ArrowRight />
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
