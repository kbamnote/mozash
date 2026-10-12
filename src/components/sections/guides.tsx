import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { px, photo } from "@/lib/images";
import { SectionHead } from "@/components/ui/primitives";

const guides = [
  {
    kicker: "Buying guide",
    title: "How to choose a tennis racquet in 2026",
    read: "9 min read",
    body: "Head size, weight, balance and string pattern — what each one actually changes when you swing, in plain language.",
    image: photo.tennisClay,
    href: "/guides/how-to-choose-a-tennis-racquet",
  },
  {
    kicker: "Stringing",
    title: "Tension, explained: why 24 kg feels nothing like 26",
    read: "6 min read",
    body: "Lower tension gives you power, higher gives control — but the trade-off is not linear, and your elbow has an opinion.",
    image: photo.shuttlesDark,
    href: "/guides/string-tension-explained",
  },
  {
    kicker: "Pickleball",
    title: "Starting pickleball in India: a first kit that lasts",
    read: "7 min read",
    body: "What to buy, what to skip, and the three paddle specs that matter before you spend above ₹8,000.",
    image: photo.pickleballPlayer,
    href: "/guides/pickleball-starter-kit-india",
  },
];

export function Guides() {
  return (
    <section className="bg-bone-100 py-16 md:py-22 lg:py-26">
      <div className="shell">
        <SectionHead
          eyebrow="From the fitting room"
          title="Know before you buy"
          lead="Written by the people who string your racquet, not by a content agency."
          action={
            <Link
              href="/guides"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-navy-900"
            >
              All guides
              <span className="grid size-8 place-items-center rounded-full border border-navy-900/20 transition-colors group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                <ArrowUpRight className="size-4" strokeWidth={2} />
              </span>
            </Link>
          }
        />

        <ul className="mt-10 grid gap-3 md:grid-cols-3 lg:mt-12">
          {guides.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-navy-900/10 bg-white transition-[border-color,transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-navy-900/25 hover:shadow-[0_22px_45px_-28px_rgba(11,20,38,0.45)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                  <Image
                    src={px(g.image, 800)}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <span className="rule-label absolute left-3 top-3 rounded-[2px] bg-white px-2 py-1 text-navy-900">
                    {g.kicker}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[17px] font-semibold leading-snug tracking-[-0.01em] text-navy-900">
                    {g.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                    {g.body}
                  </p>
                  <p className="mt-5 flex items-center justify-between text-[12.5px] text-[var(--fg-muted)]">
                    {g.read}
                    <ArrowUpRight
                      className="size-4 text-navy-900 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
