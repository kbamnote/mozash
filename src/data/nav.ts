import type { SportId } from "@/lib/types";

export type NavColumn = { heading: string; links: { label: string; href: string; accent?: boolean }[] };

export type SportNav = {
  id: SportId;
  label: string;
  columns: NavColumn[];
  feature: {
    eyebrow: string;
    title: string;
    price: string;
    mrp: string;
    href: string;
  };
};

const shared = (sport: string): NavColumn[] => [
  {
    heading: "Racquets",
    links: [
      { label: `All ${sport} racquets`, href: `/${sport}/racquets` },
      { label: "Beginner", href: `/${sport}/racquets?level=beginner` },
      { label: "Intermediate", href: `/${sport}/racquets?level=intermediate` },
      { label: "Advanced", href: `/${sport}/racquets?level=advanced` },
      { label: "Junior", href: `/${sport}/racquets?level=junior` },
      { label: "Racquet Finder", href: "/racquet-finder", accent: true },
    ],
  },
  {
    heading: "Footwear",
    links: [
      { label: "All shoes", href: `/${sport}/shoes` },
      { label: "Court shoes", href: `/${sport}/shoes?type=court` },
      { label: "Indoor shoes", href: `/${sport}/shoes?type=indoor` },
      { label: "Training shoes", href: `/${sport}/shoes?type=training` },
      { label: "Junior shoes", href: `/${sport}/shoes?type=junior` },
    ],
  },
  {
    heading: "Accessories",
    links: [
      { label: "Bags", href: `/${sport}/bags` },
      { label: "Strings", href: `/${sport}/strings` },
      { label: "Grips & overgrips", href: `/${sport}/grips` },
      { label: "Balls & shuttles", href: `/${sport}/balls` },
      { label: "Apparel", href: `/${sport}/apparel` },
      { label: "Protection & fitness", href: `/${sport}/protection` },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "New arrivals", href: `/${sport}/new` },
      { label: "Bestsellers", href: `/${sport}/bestsellers` },
      { label: "Deals", href: "/deals", accent: true },
      { label: "Pro picks", href: `/${sport}/pro-picks` },
      { label: "How to choose", href: "/guides/how-to-choose" },
      { label: "Stringing service", href: "/stringing" },
    ],
  },
];

export const sportNav: SportNav[] = [
  {
    id: "tennis",
    label: "Tennis",
    columns: shared("tennis"),
    feature: {
      eyebrow: "Most matched this month",
      title: "Yonex EZONE 100 (2024)",
      price: "₹20,999",
      mrp: "₹26,000",
      href: "/tennis/racquets/yonex-ezone-100-2024",
    },
  },
  {
    id: "badminton",
    label: "Badminton",
    columns: shared("badminton"),
    feature: {
      eyebrow: "Most matched this month",
      title: "Yonex Astrox 99 Pro",
      price: "₹18,490",
      mrp: "₹21,500",
      href: "/badminton/racquets/yonex-astrox-99-pro",
    },
  },
  {
    id: "pickleball",
    label: "Pickleball",
    columns: shared("pickleball"),
    feature: {
      eyebrow: "Pro pick",
      title: "Joola Ben Johns Hyperion C2",
      price: "₹17,499",
      mrp: "₹19,999",
      href: "/pickleball/racquets/joola-ben-johns-hyperion",
    },
  },
  {
    id: "padel",
    label: "Padel",
    columns: shared("padel"),
    feature: {
      eyebrow: "Just landed",
      title: "Bullpadel Vertex 04 Control",
      price: "₹24,999",
      mrp: "₹29,999",
      href: "/padel/racquets/bullpadel-vertex-04",
    },
  },
  {
    id: "squash",
    label: "Squash",
    columns: shared("squash"),
    feature: {
      eyebrow: "Club favourite",
      title: "Dunlop Sonic Core Pro 130",
      price: "₹13,999",
      mrp: "₹16,500",
      href: "/squash/racquets/dunlop-sonic-core-pro-130",
    },
  },
];

export const announcements = [
  "Free professional stringing on every racquet",
  "No-cost EMI from ₹999/month",
  "Pan-India delivery · 7-day easy returns",
  "100% genuine stock · brand warranty",
];

export const footerNav: NavColumn[] = [
  {
    heading: "Shop",
    links: [
      { label: "Tennis", href: "/tennis" },
      { label: "Badminton", href: "/badminton" },
      { label: "Pickleball", href: "/pickleball" },
      { label: "Padel", href: "/padel" },
      { label: "Squash", href: "/squash" },
      { label: "Deals", href: "/deals" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Racquet Finder", href: "/racquet-finder" },
      { label: "Stringing service", href: "/stringing" },
      { label: "Demo programme", href: "/demo" },
      { label: "Club & academy orders", href: "/bulk" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Track your order", href: "/orders/track" },
      { label: "Shipping & delivery", href: "/help/shipping" },
      { label: "Returns & exchanges", href: "/help/returns" },
      { label: "Warranty claims", href: "/help/warranty" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Mozash", href: "/about" },
      { label: "Stores", href: "/stores" },
      { label: "Careers", href: "/careers" },
      { label: "Blog & guides", href: "/guides" },
      { label: "Partner with us", href: "/partners" },
    ],
  },
];
