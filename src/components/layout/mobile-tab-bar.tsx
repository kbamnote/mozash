"use client";

import * as React from "react";
import Link from "next/link";
import { Home, LayoutGrid, Search, Heart, ShoppingBag } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: LayoutGrid, label: "Categories", href: "/shop" },
  { icon: Search, label: "Search", href: "/search" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  // keep in step with CART_COUNT in site-header.tsx
  { icon: ShoppingBag, label: "Cart", href: "/cart", count: 3 },
];

export function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-900/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="flex">
        {tabs.map(({ icon: Icon, label, href, active, count }) => (
          <li key={label} className="flex-1">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className="relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium"
            >
              <span className="relative">
                <Icon
                  className={active ? "size-[21px] text-volt-500" : "size-[21px] text-white/55"}
                  strokeWidth={1.75}
                />
                {count ? (
                  <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-volt-500 text-[9px] font-bold text-navy-900">
                    {count}
                  </span>
                ) : null}
              </span>
              <span className={active ? "text-volt-500" : "text-white/55"}>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
