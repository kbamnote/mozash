import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ trail, className }: { trail: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px]">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 text-navy-900/30" strokeWidth={2} />}
              {c.href && !last ? (
                <Link href={c.href} className="text-[var(--fg-muted)] transition-colors hover:text-navy-900">
                  {c.label}
                </Link>
              ) : (
                <span className="font-semibold text-navy-900" aria-current={last ? "page" : undefined}>
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** BreadcrumbList JSON-LD for the same trail. */
export function breadcrumbLd(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };
}
