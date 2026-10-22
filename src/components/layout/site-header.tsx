"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { sportNav } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";
import { GearArt } from "@/components/graphics/gear-art";

const CART_COUNT = 3;

export function SiteHeader() {
  const [open, setOpen] = React.useState<string | null>(null);
  const [tabId, setTabId] = React.useState<string | null>(null);
  const [drawer, setDrawer] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (id !== open) setTabId(null); // new sport falls back to its first tab
    setOpen(id);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  const active = sportNav.find((s) => s.id === open);
  const activeTab = active ? active.tabs.find((t) => t.id === tabId) ?? active.tabs[0] : null;

  return (
    <header className="sticky top-0 z-40 bg-navy-950 text-white" onMouseLeave={hoverClose}>
      <div className="shell flex h-16 items-center gap-4 lg:h-[72px] lg:gap-7">
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

        {/* sports */}
        <nav className="hidden items-stretch self-stretch lg:flex" aria-label="Shop by sport">
          {sportNav.map((s) => {
            const isOpen = open === s.id;
            return (
              <div key={s.id} onMouseEnter={() => hoverOpen(s.id)} className="relative flex">
                <Link
                  href={`/${s.id}`}
                  className={cn(
                    "relative flex items-center px-3 text-[14.5px] font-medium transition-colors xl:px-4",
                    isOpen ? "text-volt-500" : "text-white/85 hover:text-white"
                  )}
                >
                  {s.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 bottom-4 h-[2px] origin-left bg-volt-500 transition-transform duration-300 ease-[var(--ease-out-expo)] xl:inset-x-4",
                      isOpen ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* search + find my racquet */}
        <div className="ml-auto hidden min-w-0 flex-1 justify-end md:flex lg:max-w-[38rem]">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex h-[52px] w-full items-center gap-3 rounded-full border border-white/12 bg-white/[0.045] pl-5 pr-1.5 transition-colors focus-within:border-white/30 hover:border-white/20"
          >
            <Search className="size-[18px] shrink-0 text-white/45" strokeWidth={1.75} />
            <input
              placeholder="Search for racquets, shoes, bags…"
              aria-label="Search products"
              className="min-w-0 flex-1 bg-transparent text-[14px] text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              className="hidden h-10 shrink-0 items-center gap-2 rounded-full bg-volt-500 px-5 text-[13.5px] font-semibold text-navy-900 transition-colors hover:bg-volt-600 lg:inline-flex"
            >
              <Sparkles className="size-4" strokeWidth={2} />
              Find my racquet
            </button>
          </form>
        </div>

        {/* actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-2 lg:gap-2">
          <button
            aria-label="Search"
            className="grid size-10 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            <Search className="size-[20px]" strokeWidth={1.75} />
          </button>
          <button
            aria-label="Wishlist"
            className="grid size-10 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Heart className="size-[21px]" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Account"
            className="hidden size-10 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:grid"
          >
            <User className="size-[21px]" strokeWidth={1.5} />
          </button>
          <button
            aria-label={`Cart, ${CART_COUNT} items`}
            className="relative grid size-10 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ShoppingCart className="size-[21px]" strokeWidth={1.5} />
            <span className="absolute right-0.5 top-0.5 grid size-[18px] place-items-center rounded-full bg-clay-500 text-[10px] font-bold text-white">
              {CART_COUNT}
            </span>
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------------- mega menu */}
      <AnimatePresence>
        {active && activeTab && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => hoverOpen(active.id)}
            className="absolute inset-x-0 top-full hidden lg:block"
          >
            <div className="shell pb-6">
              <div className="overflow-hidden rounded-xl bg-white text-navy-900 shadow-[0_30px_70px_-20px_rgba(6,13,24,0.55)]">
                <div className="grid grid-cols-[1fr_21rem]">
                  <div className="min-w-0">
                    {/* category tabs */}
                    <div
                      role="tablist"
                      aria-label={`${active.label} categories`}
                      className="flex items-stretch px-5 pt-5"
                    >
                      {active.tabs.map((t, i) => {
                        const on = t.id === activeTab.id;
                        return (
                          <div key={t.id} className={cn("flex flex-1", i > 0 && "border-l border-navy-900/10")}>
                            <button
                              role="tab"
                              aria-selected={on}
                              onMouseEnter={() => setTabId(t.id)}
                              onFocus={() => setTabId(t.id)}
                              className={cn(
                                "mx-2 w-full rounded-full px-3 py-2.5 text-[12.5px] font-semibold uppercase tracking-[0.07em] transition-colors",
                                on
                                  ? "bg-volt-500 text-navy-900"
                                  : "text-navy-900/70 hover:bg-navy-900/5 hover:text-navy-900"
                              )}
                            >
                              {t.label}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* link columns */}
                    <div className="mt-4 border-t border-navy-900/10 px-7 py-7">
                      <div className="grid grid-cols-3">
                        {activeTab.columns.map((col, i) => (
                          <div
                            key={col.heading}
                            className={cn("px-6 first:pl-0", i > 0 && "border-l border-navy-900/10")}
                          >
                            <p className="rule-label mb-4 text-navy-900/45">{col.heading}</p>
                            <ul className="space-y-[11px]">
                              {col.links.map((l) => (
                                <li key={l.label}>
                                  <Link
                                    href={l.href}
                                    onClick={() => setOpen(null)}
                                    className={cn(
                                      "group inline-flex items-center gap-1.5 text-[13px] uppercase tracking-[0.04em] transition-colors",
                                      l.accent
                                        ? "font-semibold text-clay-600 hover:text-clay-500"
                                        : "text-navy-900/65 hover:text-navy-900"
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
                      </div>
                    </div>
                  </div>

                  {/* featured product */}
                  <div className="p-5">
                    <Link
                      href={active.feature.href}
                      onClick={() => setOpen(null)}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-navy-900 p-5 text-white"
                    >
                      <GearArt
                        art={active.id === "badminton" ? "shuttle-racquet" : active.id === "tennis" || active.id === "squash" ? "racquet" : "paddle"}
                        className="pointer-events-none absolute -right-10 top-1/2 h-[125%] -translate-y-1/2 text-white/25 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                      <span className="rule-label relative z-10 w-fit rounded-[2px] bg-volt-500 px-2 py-1 text-navy-900">
                        {active.feature.badge}
                      </span>

                      <div className="relative z-10 mt-auto">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">
                          {active.feature.brand}
                        </p>
                        <p className="mt-1 max-w-[11rem] text-[17px] font-semibold leading-snug">
                          {active.feature.title}
                        </p>
                        <p className="mt-2 flex items-baseline gap-2">
                          <span className="text-[19px] font-semibold">{active.feature.price}</span>
                          <span className="text-[13px] text-white/45 line-through">
                            {active.feature.mrp}
                          </span>
                        </p>
                        <span className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-navy-900 transition-colors group-hover:bg-volt-500">
                          View product
                          <ArrowRight className="size-3.5" strokeWidth={2.5} />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* brands + quiz strip */}
                <div className="flex items-center gap-7 border-t border-navy-900/10 bg-bone-100 px-7 py-5">
                  <div className="min-w-0 flex-1">
                    <p className="rule-label mb-3 text-navy-900/45">Shop by brand</p>
                    <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
                      {/* Licensed logos come from the client; wordmarks until then. */}
                      {active.brands.map((b) => (
                        <Link
                          key={b}
                          href={`/${active.id}?brand=${b.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => setOpen(null)}
                          className="display text-[15px] text-navy-900/45 transition-colors hover:text-navy-900"
                        >
                          {b}
                        </Link>
                      ))}
                      <Link
                        href={`/${active.id}/brands`}
                        onClick={() => setOpen(null)}
                        className="group inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-navy-900"
                      >
                        View all brands
                        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>

                  <span className="h-12 w-px shrink-0 bg-navy-900/10" />

                  <div className="flex shrink-0 items-center gap-4">
                    <GearArt art="racquet" className="h-11 w-auto shrink-0 text-navy-900/70" />
                    <div className="max-w-[20rem]">
                      <p className="text-[13.5px] font-semibold">
                        Not sure which racquet is right for you?
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-navy-900/55">
                        Take the 60-sec{" "}
                        <span className="font-semibold text-navy-900 underline underline-offset-2">
                          Racquet Quiz
                        </span>{" "}
                        and get personalised recommendations.
                      </p>
                    </div>
                    <Link
                      href="/racquet-finder"
                      onClick={() => setOpen(null)}
                      className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-volt-500 px-6 text-[13.5px] font-semibold text-navy-900 transition-colors hover:bg-volt-600"
                    >
                      Take the Quiz
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
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
              className="fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col bg-navy-950 lg:hidden"
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
                        className="flex items-center justify-between border-b border-white/10 py-3.5 text-[17px] font-medium text-white"
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
                        className="block border-b border-white/10 py-3 text-[15px] text-white/70"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 p-5">
                <Link
                  href="/racquet-finder"
                  onClick={() => setDrawer(false)}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-volt-500 text-[15px] font-semibold text-navy-900"
                >
                  Take the 60-sec quiz
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
