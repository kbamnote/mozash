import type { Category, Product, SportId } from "@/lib/types";
import { products } from "./products";

export type CategoryDef = {
  /** URL segment: /[sport]/[slug] */
  slug: string;
  label: string;
  /** Undefined = the tile shows but is not stocked yet, so it is not a link. */
  stocked?: Category;
  art: Product["art"];
  blurb: string;
};

/**
 * The seven tiles shown on a sport landing page. Three of them are not stocked
 * in the demo catalogue — they render as "Coming soon" rather than linking to an
 * empty listing, so nothing the client clicks is a dead end.
 */
export const CATEGORIES: CategoryDef[] = [
  { slug: "racquets", label: "Racquets", stocked: "racquets", art: "racquet", blurb: "Frames for every level" },
  { slug: "balls", label: "Balls", stocked: "balls", art: "ball", blurb: "Match and practice" },
  { slug: "strings", label: "Strings", stocked: "strings", art: "string", blurb: "Poly, multi and gut" },
  { slug: "bags", label: "Kit bags", stocked: "bags", art: "bag", blurb: "Backpacks to trolleys" },
  { slug: "shoes", label: "Shoes", stocked: "shoes", art: "shoe", blurb: "Court and indoor" },
  { slug: "grips", label: "Overgrip", art: "racquet", blurb: "Tacky, dry and cushioned" },
  { slug: "training", label: "Training", art: "ball", blurb: "Drills and court aids" },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

export const countIn = (sport: SportId, c: CategoryDef) =>
  c.stocked ? products.filter((p) => p.sport === sport && p.category === c.stocked).length : 0;

/** Tiles for one sport, with live counts. */
export const tilesFor = (sport: SportId) =>
  CATEGORIES.map((c) => ({ ...c, count: countIn(sport, c) }));

/** Listing-page banner copy, keyed by sport. */
export const SPORT_BANNER: Record<SportId, { kicker: string; line1: string; line2: string; sub: string }> = {
  tennis: {
    kicker: "Tennis racquets",
    line1: "Play",
    line2: "without limits",
    sub: "Explore racquets from the world's top brands, strung free at your tension.",
  },
  badminton: {
    kicker: "Badminton",
    line1: "Faster",
    line2: "off the net",
    sub: "Head-light frames, feather shuttles and indoor court shoes.",
  },
  pickleball: {
    kicker: "Pickleball",
    line1: "Own",
    line2: "the kitchen",
    sub: "Carbon-face paddles and tournament balls for India's fastest-growing court sport.",
  },
  padel: {
    kicker: "Padel",
    line1: "Built for",
    line2: "the glass",
    sub: "Diamond, teardrop and round shapes from the clubs of Madrid to Mumbai.",
  },
  squash: {
    kicker: "Squash",
    line1: "Retrieve",
    line2: "everything",
    sub: "Head-light frames, double-yellow balls and protective eyewear.",
  },
};
