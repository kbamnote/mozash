import type { Product } from "@/lib/types";

/**
 * Line-art gear illustrations.
 *
 * Real product cut-outs come from the client's photographer. Until then a single
 * drawn system keeps the catalogue grid uniform instead of mixing stock photos
 * at different crops, scales and backgrounds — which is what makes a demo look
 * thrown together.
 *
 * String beds are generated from the ellipse equation rather than clipped with
 * <clipPath>, so there are no generated DOM ids to desync between server and
 * client render.
 */

type Ellipse = { cx: number; cy: number; rx: number; ry: number };

/** Chord half-length of an ellipse at offset `d` from centre along one axis. */
const chord = (d: number, r1: number, r2: number) => {
  const t = 1 - (d / r1) ** 2;
  return t <= 0 ? 0 : r2 * Math.sqrt(t);
};

function stringBed(e: Ellipse, gap: number, inset: number) {
  const rx = e.rx - inset;
  const ry = e.ry - inset;
  const mains: string[] = [];
  const crosses: string[] = [];

  for (let x = -rx + gap; x < rx; x += gap) {
    const h = chord(x, rx, ry);
    if (h < 4) continue;
    mains.push(`M${(e.cx + x).toFixed(1)} ${(e.cy - h).toFixed(1)}V${(e.cy + h).toFixed(1)}`);
  }
  for (let y = -ry + gap; y < ry; y += gap) {
    const w = chord(y, ry, rx);
    if (w < 4) continue;
    crosses.push(`M${(e.cx - w).toFixed(1)} ${(e.cy + y).toFixed(1)}H${(e.cx + w).toFixed(1)}`);
  }
  return { mains: mains.join(" "), crosses: crosses.join(" ") };
}

const TENNIS: Ellipse = { cx: 100, cy: 96, rx: 64, ry: 80 };
const BADMINTON: Ellipse = { cx: 100, cy: 78, rx: 50, ry: 62 };
const tennisBed = stringBed(TENNIS, 9, 9);
const badmintonBed = stringBed(BADMINTON, 7, 7);

/** Diagonal grip wrap, drawn once and reused. */
const gripWrap = (top: number, bottom: number, left: number, right: number, step = 11) => {
  const d: string[] = [];
  for (let y = top; y < bottom; y += step) {
    d.push(`M${left} ${y + 7}L${right} ${y}`);
  }
  return d.join(" ");
};

type ArtProps = {
  art: Product["art"];
  /** Brand colour used for the accent pass. */
  accent?: string;
  className?: string;
};

export function GearArt({ art, accent = "#D7FF3A", className }: ArtProps) {
  const common = {
    viewBox: "0 0 200 320",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": true as const,
    role: "presentation" as const,
  };

  const ink = "currentColor";

  if (art === "racquet" || art === "shuttle-racquet") {
    const e = art === "racquet" ? TENNIS : BADMINTON;
    const bed = art === "racquet" ? tennisBed : badmintonBed;
    const throatY = e.cy + e.ry;
    const handleTop = art === "racquet" ? 214 : 196;

    return (
      <svg {...common}>
        {/* string bed */}
        <path d={bed.mains} stroke={ink} strokeWidth={1} opacity={0.3} />
        <path d={bed.crosses} stroke={ink} strokeWidth={1} opacity={0.18} />

        {/* hoop */}
        <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} stroke={ink} strokeWidth={5} />
        <ellipse cx={e.cx} cy={e.cy} rx={e.rx - 9} ry={e.ry - 9} stroke={ink} strokeWidth={1.5} opacity={0.45} />

        {/* accent arc on the hoop shoulder */}
        <path
          d={`M${e.cx - e.rx + 3} ${e.cy - 10} A ${e.rx} ${e.ry} 0 0 1 ${e.cx - 14} ${e.cy - e.ry + 3}`}
          stroke={accent}
          strokeWidth={6}
          strokeLinecap="round"
        />

        {/* throat */}
        <path
          d={`M${e.cx - e.rx + 8} ${throatY - 16} C ${e.cx - 34} ${throatY + 18}, ${e.cx - 14} ${handleTop - 20}, ${e.cx - 11} ${handleTop}`}
          stroke={ink}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d={`M${e.cx + e.rx - 8} ${throatY - 16} C ${e.cx + 34} ${throatY + 18}, ${e.cx + 14} ${handleTop - 20}, ${e.cx + 11} ${handleTop}`}
          stroke={ink}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d={`M${e.cx - 24} ${throatY + 6} Q ${e.cx} ${throatY + 22} ${e.cx + 24} ${throatY + 6}`}
          stroke={ink}
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* handle + grip */}
        <path
          d={`M${e.cx - 11} ${handleTop} v74 a11 11 0 0 0 22 0 v-74 z`}
          stroke={ink}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <path d={gripWrap(handleTop + 8, handleTop + 68, e.cx - 10, e.cx + 10)} stroke={ink} strokeWidth={1.2} opacity={0.4} />
        <path d={`M${e.cx - 11} ${handleTop + 74} h22`} stroke={accent} strokeWidth={4} />
      </svg>
    );
  }

  if (art === "paddle") {
    return (
      <svg {...common}>
        <rect x={44} y={22} width={112} height={176} rx={26} stroke={ink} strokeWidth={5} />
        <rect x={54} y={32} width={92} height={156} rx={18} stroke={ink} strokeWidth={1.5} opacity={0.4} />
        {/* carbon weave hint */}
        <path
          d={Array.from({ length: 9 }, (_, i) => `M${58} ${44 + i * 17}L${142} ${28 + i * 17}`).join(" ")}
          stroke={ink}
          strokeWidth={1}
          opacity={0.16}
        />
        <path d="M60 46 L60 70" stroke={accent} strokeWidth={6} strokeLinecap="round" />
        <path d="M89 198 h22 v70 a11 11 0 0 1 -22 0 z" stroke={ink} strokeWidth={4} strokeLinejoin="round" />
        <path d={gripWrap(206, 258, 90, 110)} stroke={ink} strokeWidth={1.2} opacity={0.4} />
        <path d="M89 268 h22" stroke={accent} strokeWidth={4} />
      </svg>
    );
  }

  if (art === "shoe") {
    return (
      <svg {...common}>
        <path
          d="M24 196 C24 160 38 132 62 118 C78 108 90 112 100 124 C112 138 126 148 150 154 C168 158 178 166 180 180 L182 196 C182 206 176 212 166 212 L40 212 C30 212 24 206 24 196 Z"
          stroke={ink}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path d="M24 192 H182" stroke={ink} strokeWidth={2} opacity={0.35} />
        <path d="M26 212 H180 C180 224 172 230 160 230 L46 230 C32 230 26 223 26 212 Z" stroke={ink} strokeWidth={4} strokeLinejoin="round" />
        <path d="M70 122 L88 148 M84 116 L102 142 M98 116 L116 144" stroke={ink} strokeWidth={2.5} opacity={0.55} />
        <path d="M62 170 C92 182 132 186 176 182" stroke={accent} strokeWidth={6} strokeLinecap="round" />
        <circle cx={58} cy={140} r={4} stroke={ink} strokeWidth={2} />
      </svg>
    );
  }

  if (art === "string") {
    return (
      <svg {...common}>
        <circle cx={100} cy={150} r={76} stroke={ink} strokeWidth={5} />
        <circle cx={100} cy={150} r={30} stroke={ink} strokeWidth={4} />
        <circle cx={100} cy={150} r={22} stroke={ink} strokeWidth={1.5} opacity={0.4} />
        {Array.from({ length: 22 }, (_, i) => {
          const a = (i / 22) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 32;
          const y1 = 150 + Math.sin(a) * 32;
          const x2 = 100 + Math.cos(a) * 74;
          const y2 = 150 + Math.sin(a) * 74;
          return <path key={i} d={`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`} stroke={ink} strokeWidth={1.2} opacity={0.3} />;
        })}
        <path d="M100 74 A76 76 0 0 1 168 122" stroke={accent} strokeWidth={6} strokeLinecap="round" />
        <path d="M168 122 C186 128 190 146 176 156" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      </svg>
    );
  }

  if (art === "bag") {
    return (
      <svg {...common}>
        <path d="M28 108 h144 a14 14 0 0 1 14 14 v88 a14 14 0 0 1 -14 14 h-144 a14 14 0 0 1 -14 -14 v-88 a14 14 0 0 1 14 -14 z" stroke={ink} strokeWidth={5} strokeLinejoin="round" />
        <path d="M60 108 v116 M140 108 v116" stroke={ink} strokeWidth={2} opacity={0.35} />
        <path d="M74 108 C74 82 90 70 100 70 C110 70 126 82 126 108" stroke={ink} strokeWidth={4} strokeLinecap="round" />
        <rect x={76} y={142} width={48} height={34} rx={5} stroke={ink} strokeWidth={2.5} opacity={0.6} />
        <path d="M14 166 h172" stroke={accent} strokeWidth={6} />
        <path d="M44 224 v14 M156 224 v14" stroke={ink} strokeWidth={4} strokeLinecap="round" />
      </svg>
    );
  }

  // ball
  return (
    <svg {...common}>
      <circle cx={100} cy={150} r={74} stroke={ink} strokeWidth={5} />
      <path d="M38 110 C72 134 72 166 38 190" stroke={ink} strokeWidth={4} />
      <path d="M162 110 C128 134 128 166 162 190" stroke={ink} strokeWidth={4} />
      <path d="M38 110 C72 134 72 166 38 190" stroke={accent} strokeWidth={4} strokeDasharray="6 9" />
    </svg>
  );
}
