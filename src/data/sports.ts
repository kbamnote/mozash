import { photo } from "@/lib/images";
import type { Sport } from "@/lib/types";

export const sports: Sport[] = [
  {
    id: "tennis",
    name: "Tennis",
    productCount: 2500,
    blurb: "Frames, strings and court shoes",
    image: photo.tennisClay,
    note: "Free stringing at your tension",
  },
  {
    id: "badminton",
    name: "Badminton",
    productCount: 1800,
    blurb: "Racquets, shuttles and indoor shoes",
    image: photo.badmintonCourt,
    note: "Feather and nylon, tested stock",
  },
  {
    id: "pickleball",
    name: "Pickleball",
    productCount: 800,
    blurb: "Paddles, balls and starter sets",
    image: photo.pickleballPlayer,
    note: "India's fastest growing court sport",
  },
  {
    id: "padel",
    name: "Padel",
    productCount: 600,
    blurb: "Bats, balls and club bags",
    image: photo.padelCourt,
    note: "Diamond, teardrop and round shapes",
  },
  {
    id: "squash",
    name: "Squash",
    productCount: 400,
    blurb: "Racquets, eyewear and grips",
    image: photo.squashCourt,
    note: "Head-light frames for retrieval",
  },
];
