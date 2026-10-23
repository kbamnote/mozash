export type SportId = "tennis" | "badminton" | "pickleball" | "padel" | "squash";

export type Category = "racquets" | "shoes" | "strings" | "bags" | "balls" | "apparel";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type PlayStyle = "power" | "control" | "spin" | "all-round";

/** The five axes rendered on the Racquet Finder radar chart. */
export type SpecProfile = {
  power: number;
  control: number;
  spin: number;
  comfort: number;
  manoeuvrability: number;
};

export type SpecRow = { label: string; value: string };

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  year?: number;
  /**
   * Fields below are only populated for the products that have a real detail
   * page. The invented demo catalogue leaves them undefined and falls back to
   * the drawn GearArt + the one-line `spec` string.
   */
  images?: string[];
  specs?: SpecRow[];
  description?: string;
  highlights?: string[];
  gripSizes?: string[];
  /** Numeric facets the listing filters work on. */
  headSizeIn?: number;
  weightG?: number;
  sport: SportId;
  category: Category;
  price: number;
  mrp?: number;
  rating: number;
  reviewCount: number;
  colours: string[];
  tag?: "bestseller" | "new" | "pro-pick";
  inStock: boolean;
  /** Headline spec shown under the title, e.g. "300g · 100 sq in". */
  spec: string;
  level: SkillLevel[];
  style: PlayStyle;
  profile: SpecProfile;
  /** Which line-art graphic to render on the card. */
  art: "racquet" | "paddle" | "shuttle-racquet" | "shoe" | "string" | "bag" | "ball";
};

export type Sport = {
  id: SportId;
  name: string;
  productCount: number;
  blurb: string;
  /** Pexels photo id — resolved through `px()` in lib/images. */
  image: number;
  /** Short line used on the sport card hover state. */
  note: string;
};
