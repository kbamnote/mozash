import { cn } from "@/lib/utils";

/**
 * Typographic wordmark. The O is replaced by a drawn ball so the mark reads as
 * racquet-sport without resorting to a clip-art racquet icon.
 */
export function Wordmark({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const ink = tone === "light" ? "text-white" : "text-navy-900";
  return (
    <span className={cn("inline-flex items-center", ink, className)}>
      <span className="display text-[21px] leading-none tracking-[-0.03em]">M</span>
      <svg
        viewBox="0 0 24 24"
        className="mx-[1px] size-[17px] translate-y-[0.5px]"
        aria-hidden
      >
        <circle cx="12" cy="12" r="10.5" className="fill-volt-500" />
        <path
          d="M4.6 5.2C8.2 8 8.2 16 4.6 18.8M19.4 5.2C15.8 8 15.8 16 19.4 18.8"
          fill="none"
          stroke="#0B1426"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="display text-[21px] leading-none tracking-[-0.03em]">ZASH</span>
      <span className="sr-only">Mozash</span>
    </span>
  );
}
