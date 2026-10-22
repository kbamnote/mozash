import type { SportId } from "@/lib/types";

export type MegaLink = { label: string; href: string; accent?: boolean };
export type MegaColumn = { heading: string; links: MegaLink[] };
export type MegaTab = { id: string; label: string; columns: MegaColumn[] };

export type SportNav = {
  id: SportId;
  label: string;
  tabs: MegaTab[];
  /** Brand wordmarks for the "Shop by brand" strip; the first five also fill
   *  the TOP BRAND column of every tab. */
  brands: string[];
  feature: {
    badge: string;
    brand: string;
    title: string;
    price: string;
    mrp: string;
    href: string;
  };
};

/* ------------------------------------------------------------------ tabs */

type SportMeta = {
  /** Badminton plays shuttles, everyone else plays balls. */
  ballLabel: string;
  ballTypes: string[];
  brands: string[];
  stringBrands: string[];
};

const link = (label: string, href: string, accent?: boolean): MegaLink => ({
  label,
  href,
  ...(accent ? { accent } : {}),
});

const buildTabs = (sport: string, m: SportMeta): MegaTab[] => {
  const top = (cat: string): MegaColumn => ({
    heading: "Top brand",
    links: m.brands
      .slice(0, 5)
      .map((b) => link(b, `/${sport}/${cat}?brand=${b.toLowerCase().replace(/\s+/g, "-")}`)),
  });

  const assistance = (...extra: MegaLink[]): MegaColumn => ({
    heading: "Assistance",
    links: [...extra, link("Buying guide", `/guides/${sport}-buying-guide`)],
  });

  const list = (heading: string, items: string[], base: string): MegaColumn => ({
    heading,
    links: items.map((i) =>
      link(i, `${base}?f=${i.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)
    ),
  });

  return [
    {
      id: "racquets",
      label: "Racquets",
      columns: [
        top("racquets"),
        list(
          "Category",
          ["Professional", "Intermediate", "Recreational", "Beginners", "Junior", "Used racquets"],
          `/${sport}/racquets`
        ),
        assistance(
          link("Racquet Finder", "/racquet-finder", true),
          link("Upgrade racquet", `/${sport}/racquets?f=upgrade`)
        ),
      ],
    },
    {
      id: "balls",
      label: m.ballLabel,
      columns: [
        top("balls"),
        list("Type", m.ballTypes, `/${sport}/balls`),
        assistance(
          link("Which one to buy", `/guides/${sport}-balls`),
          link("Bulk & club orders", "/bulk")
        ),
      ],
    },
    {
      id: "strings",
      label: "Strings",
      columns: [
        {
          heading: "Top brand",
          links: m.stringBrands.map((b) =>
            link(b, `/${sport}/strings?brand=${b.toLowerCase().replace(/\s+/g, "-")}`)
          ),
        },
        list(
          "Type",
          ["Polyester", "Multifilament", "Natural gut", "Synthetic gut", "Hybrid sets"],
          `/${sport}/strings`
        ),
        assistance(
          link("Free stringing", "/stringing", true),
          link("Tension guide", "/guides/string-tension-explained")
        ),
      ],
    },
    {
      id: "kit-bags",
      label: "Kit bags",
      columns: [
        top("bags"),
        list(
          "Capacity",
          ["Backpack", "3 racquet", "6 racquet", "9 racquet", "12 racquet", "Trolley"],
          `/${sport}/bags`
        ),
        assistance(link("Size guide", "/guides/bag-size-guide"), link("Care & cleaning", "/guides/gear-care")),
      ],
    },
    {
      id: "overgrip",
      label: "Overgrip",
      columns: [
        top("grips"),
        list(
          "Feel",
          ["Tacky", "Dry", "Cushioned", "Perforated", "Replacement grip"],
          `/${sport}/grips`
        ),
        assistance(
          link("Grip size guide", "/guides/grip-size"),
          link("How to re-grip", "/guides/how-to-regrip")
        ),
      ],
    },
    {
      id: "training",
      label: "Training",
      columns: [
        list(
          "Category",
          ["Ball machines", "Rebound nets", "Targets & cones", "Agility ladders", "Resistance bands"],
          `/${sport}/training`
        ),
        list(
          "Level",
          ["Beginner drills", "Club level", "Academy", "Coaching aids"],
          `/${sport}/training`
        ),
        assistance(
          link("Academy orders", "/bulk", true),
          link("Coach discounts", "/partners")
        ),
      ],
    },
    {
      id: "accessories",
      label: "Accessories",
      columns: [
        top("accessories"),
        list(
          "Category",
          ["Dampeners", "Wristbands", "Socks", "Eyewear", "Water bottles", "Towels"],
          `/${sport}/accessories`
        ),
        assistance(link("Gift ideas", "/gift-cards"), link("Gear care", "/guides/gear-care")),
      ],
    },
  ];
};

/* ------------------------------------------------------------- sport nav */

const META: Record<SportId, SportMeta> = {
  tennis: {
    ballLabel: "Balls",
    ballTypes: ["Championship", "Practice", "Pressureless", "Clay court", "Junior stage"],
    brands: ["Head", "Babolat", "Yonex", "Wilson", "DSC", "Asics", "Solinco", "Gamma"],
    stringBrands: ["Luxilon", "Babolat", "Yonex", "Tecnifibre", "Solinco"],
  },
  badminton: {
    ballLabel: "Shuttles",
    ballTypes: ["Feather", "Nylon", "Tournament", "Practice", "Junior"],
    brands: ["Yonex", "Li-Ning", "Victor", "Head", "Apacs", "Babolat", "Asics", "Carlton"],
    stringBrands: ["Yonex", "Li-Ning", "Victor", "Ashaway", "Apacs"],
  },
  pickleball: {
    ballLabel: "Balls",
    ballTypes: ["Outdoor", "Indoor", "Tournament", "Practice", "Junior"],
    brands: ["Joola", "Selkirk", "Head", "Babolat", "Onix", "Franklin", "Gamma", "Engage"],
    stringBrands: ["Not applicable", "Edge guard tape", "Lead tape", "Grip tape", "Repair kits"],
  },
  padel: {
    ballLabel: "Balls",
    ballTypes: ["Tournament", "Practice", "Pressureless", "Club packs", "Junior"],
    brands: ["Bullpadel", "Head", "Babolat", "Adidas", "Nox", "Wilson", "Dunlop", "Siux"],
    stringBrands: ["Protector tape", "Lead tape", "Grip tape", "Repair kits", "Edge guards"],
  },
  squash: {
    ballLabel: "Balls",
    ballTypes: ["Double yellow", "Single yellow", "Red dot", "Blue dot", "Junior"],
    brands: ["Dunlop", "Head", "Tecnifibre", "Wilson", "Prince", "Salming", "Karakal", "Eye"],
    stringBrands: ["Tecnifibre", "Ashaway", "Head", "Dunlop", "Karakal"],
  },
};

const FEATURES: Record<SportId, SportNav["feature"]> = {
  tennis: {
    badge: "Featured",
    brand: "Yonex",
    title: "Ezone 100 (2024)",
    price: "₹20,999",
    mrp: "₹26,000",
    href: "/tennis/racquets/yonex-ezone-100-2024",
  },
  badminton: {
    badge: "Featured",
    brand: "Yonex",
    title: "Astrox 99 Pro",
    price: "₹18,490",
    mrp: "₹21,500",
    href: "/badminton/racquets/yonex-astrox-99-pro",
  },
  pickleball: {
    badge: "Pro pick",
    brand: "Joola",
    title: "Ben Johns Hyperion C2",
    price: "₹17,499",
    mrp: "₹19,999",
    href: "/pickleball/racquets/joola-ben-johns-hyperion",
  },
  padel: {
    badge: "Just landed",
    brand: "Bullpadel",
    title: "Vertex 04 Control",
    price: "₹24,999",
    mrp: "₹29,999",
    href: "/padel/racquets/bullpadel-vertex-04",
  },
  squash: {
    badge: "Club favourite",
    brand: "Dunlop",
    title: "Sonic Core Pro 130",
    price: "₹13,999",
    mrp: "₹16,500",
    href: "/squash/racquets/dunlop-sonic-core-pro-130",
  },
};

const ORDER: SportId[] = ["tennis", "badminton", "pickleball", "padel", "squash"];

export const sportNav: SportNav[] = ORDER.map((id) => ({
  id,
  label: id.charAt(0).toUpperCase() + id.slice(1),
  tabs: buildTabs(id, META[id]),
  brands: META[id].brands,
  feature: FEATURES[id],
}));

/* ------------------------------------------------------- announcement bar */

export const announcements = [
  { icon: "truck" as const, label: "Free stringing on every racquet" },
  { icon: "card" as const, label: "No-cost EMI" },
  { icon: "pin" as const, label: "Pan-India delivery" },
];

/* ------------------------------------------------------------------ footer */

export type NavColumn = MegaColumn;

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
