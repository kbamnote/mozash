# Mozash — landing page demo

Next.js 16 (App Router) + Tailwind v4 + TypeScript. Frontend only; no backend yet.

```bash
npm install
npm run dev -- -p 3100
```

## Brand tokens

Defined once in `src/app/globals.css`. A rebrand touches that file and nothing else.

| Token | Hex | Role |
|---|---|---|
| Court Navy | `#0B1426` | Dark surfaces: header, hero, finder, reviews, footer |
| Ball Volt | `#D7FF3A` | Accent, primary CTA, active states |
| Clay Orange | `#FF6B3D` | Badges only (`Bestseller`, discount) |
| Off-white | `#F6F5F1` | Light section background |
| Slate | `#6B7385` | Secondary text |

Two rules the code enforces:

- **Volt never carries white text.** It sits at ~1.3:1 on white, so every volt-filled
  control pairs with navy ink (`--accent-fg`).
- **Clay is a badge colour.** 3.1:1 on white, so it stays off body copy.

Type: **Archivo** (variable, `wdth` 112%) for display, **Inter** for everything else, both
via `next/font` so there is no layout shift.

## Structure

```
src/
  app/            layout (metadata + JSON-LD), page, sitemap.ts, robots.ts
  components/
    layout/       announcement bar, header + mega-menu, footer, mobile tab bar
    sections/     hero, trust bar, sports, finder, trending, stringing, brands, guides, reviews
    commerce/     product card, radar chart
    graphics/     gear-art.tsx — the drawn racquet/paddle/shoe/string/bag system
    ui/           button, primitives (price, rating, tag, swatches, section head)
  data/           products.ts, sports.ts, nav.ts  ← mock catalogue
  lib/            site.ts, types.ts, images.ts
```

## Pages

| Route | What it is |
|---|---|
| `/` | Home |
| `/[sport]` | Sport landing — hero, 7 category tiles, product rail, brands, finder |
| `/[sport]/[category]` | Listing — banner, working filters + sort, product grid |
| `/[sport]/[category]/[slug]` | Product detail — gallery, buy box, specs, play profile, related |

All three are prerendered from `generateStaticParams`. They carry
`export const instant = false`: the whole page depends on `params`, so there is no
useful instant shell to stream ahead of it and wrapping the body in `<Suspense>`
would only render a placeholder nobody sees.

Category tiles for stock we do not carry (overgrip, training) render as
"Coming soon" and are **not** links, so nothing the client clicks is a dead end.

## Product data

Two sets, merged in `src/data/products.ts`:

- **`src/data/babolat.ts`** — 5 real racquets (names, MRP/sale prices, spec tables and
  photography sourced from babolattennis.in). These are the only products with a full
  detail page; `detailedProducts` drives `generateStaticParams`. Descriptions and
  highlights are written for this site, not copied.
- **`demoProducts`** — the invented catalogue that keeps the homepage rails and the
  other four sports populated.

The default "Best Selling" sort puts products with real photography first, so listings
do not interleave photographs with the drawn placeholders.

## Swapping in the backend

`src/data/products.ts` is typed against `src/lib/types.ts`, shaped to match the planned
`GET /api/products` response. Replacing it means changing the import in the three sections
that consume it — not rewriting components.

## Placeholders to replace before launch

1. **Photography** — `src/lib/images.ts` points at the Pexels CDN. Every id was checked
   against the sport it illustrates, but these are demo images. Swap `px()` for the real CDN.
2. **Product imagery** — cards render drawn line art (`gear-art.tsx`) rather than photos, so
   the grid stays uniform. Keep it, or replace with cut-outs on a white background.
3. **Brand logos** — `brand-strip.tsx` sets names in the display face. Licensed logos drop in.
4. **Catalogue, copy and reviews** — the 5 Babolat racquets carry real names, prices and
   specs; everything else (the other products, all review text, ratings and review counts)
   is invented. Babolat product photography is hot-linked from their CDN for the demo —
   replace it with the client's own shots, and get sign-off before anything goes public.
5. **`site.url`, address, phone, socials** in `src/lib/site.ts` — placeholders.
6. **21st.dev** — the registry now requires an API key, so components here are custom. With a
   key (`21st.dev/mcp`) specific ones can be pulled in.

## SEO

Static-rendered; client components only where interaction needs them. Metadata API with
canonical + OG/Twitter, JSON-LD for Organization, WebSite + SearchAction and ItemList,
generated `sitemap.xml` and `robots.txt`, AVIF/WebP via `next/image` with a `priority` hero.
