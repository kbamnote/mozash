import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

/* Brand glyphs — lucide dropped third-party logos, so these are drawn inline. */
const Instagram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className} aria-hidden>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
  </svg>
);
import { footerNav } from "@/data/nav";
import { site } from "@/lib/site";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* ------------------------------------------------------- newsletter */}
      <div className="border-b border-white/10">
        <div className="shell grid gap-8 py-12 md:py-14 lg:grid-cols-[1fr_28rem] lg:items-center lg:gap-16">
          <div>
            <h2 className="display text-[clamp(1.6rem,3.4vw,2.4rem)]">
              Get the drop list.
            </h2>
            <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-white/55">
              New frames, restocks and a monthly fitting note from the stringing room. No
              daily discount spam — about two emails a month.
            </p>
          </div>

          <form className="w-full">
            <div className="flex h-13 w-full items-center gap-2 rounded-full border border-white/18 bg-white/[0.05] p-1.5 pl-5 transition-colors focus-within:border-volt-500/60">
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-[14px] text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-volt-500 px-5 text-[13px] font-semibold text-navy-900 transition-colors hover:bg-volt-600"
              >
                Subscribe
                <ArrowRight className="size-3.5" strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-2.5 pl-5 text-[11.5px] text-white/35">
              By subscribing you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-white/60">
                privacy policy
              </Link>
              . Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>

      {/* ------------------------------------------------------------- nav */}
      <div className="shell grid gap-10 py-12 md:grid-cols-2 md:py-14 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:gap-8">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-4 text-[13.5px] leading-relaxed text-white/50">
            {site.description}
          </p>
          <p className="mt-5 flex items-start gap-2 text-[13px] text-white/45">
            <MapPin className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.75} />
            {site.address.street}, {site.address.locality} {site.address.postalCode}
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { Icon: Instagram, href: site.social.instagram, label: "Instagram" },
              { Icon: Youtube, href: site.social.youtube, label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                rel="noopener noreferrer"
                target="_blank"
                className="grid size-9 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {footerNav.map((col) => (
          <div key={col.heading}>
            <p className="rule-label mb-4 text-white/35">{col.heading}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-white/60 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ----------------------------------------------------------- legal */}
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          {/* Static year: `new Date()` is a dynamic API under cacheComponents. */}
          <p>© 2026 {site.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Shipping policy", href: "/help/shipping" },
              { label: "Returns", href: "/help/returns" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white/70">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
