import { BadgeCheck, ShieldCheck, Scissors, RotateCcw, CreditCard } from "lucide-react";

const items = [
  { icon: BadgeCheck, title: "100% genuine", note: "Authorised stockist" },
  { icon: ShieldCheck, title: "Brand warranty", note: "Official India warranty" },
  { icon: Scissors, title: "Free stringing", note: "At your chosen tension" },
  { icon: RotateCcw, title: "7-day easy returns", note: "No questions asked" },
  { icon: CreditCard, title: "UPI · COD · EMI", note: "No-cost EMI available" },
];

export function TrustBar() {
  return (
    <section
      aria-label="Why shop with Mozash"
      className="border-b border-navy-900/10 bg-bone-100"
    >
      <div className="shell">
        <ul className="grid grid-cols-2 divide-navy-900/10 sm:grid-cols-3 md:grid-cols-5 md:divide-x">
          {items.map(({ icon: Icon, title, note }, i) => (
            <li
              key={title}
              className={`flex items-center gap-3 py-5 md:px-5 md:first:pl-0 md:last:pr-0 ${
                i >= 2 ? "border-t border-navy-900/10 sm:border-t-0 md:border-t-0" : ""
              } ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <Icon className="size-[22px] shrink-0 text-navy-900" strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold leading-tight text-navy-900">{title}</p>
                <p className="mt-0.5 truncate text-[12px] leading-tight text-[var(--fg-muted)]">
                  {note}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
