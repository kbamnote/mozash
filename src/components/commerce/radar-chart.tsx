import type { SpecProfile } from "@/lib/types";

const AXES: { key: keyof SpecProfile; label: string }[] = [
  { key: "power", label: "Power" },
  { key: "control", label: "Control" },
  { key: "spin", label: "Spin" },
  { key: "comfort", label: "Comfort" },
  { key: "manoeuvrability", label: "Manoeuvre" },
];

const R = 86;
/**
 * The viewBox is wider than it is tall on purpose: the Control and Manoeuvre
 * labels sit ~110px off centre and run another ~60px outward, so a square box
 * clips them.
 */
const VW = 380;
const VH = 264;
const CX = VW / 2;
const CY = 132;
const MAX = 10;

const point = (i: number, r: number) => {
  const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
  return [CX + Math.cos(a) * r, CY + Math.sin(a) * r] as const;
};

const ring = (r: number) =>
  AXES.map((_, i) => point(i, r).map((n) => n.toFixed(1)).join(",")).join(" ");

/**
 * Five-axis spec plot. Hand-drawn SVG rather than a charting library — it is
 * ~40 lines, renders on the server, and ships no runtime JS.
 */
export function RadarChart({
  profile,
  className,
}: {
  profile: SpecProfile;
  className?: string;
}) {
  const shape = AXES.map(({ key }, i) =>
    point(i, (profile[key] / MAX) * R)
      .map((n) => n.toFixed(1))
      .join(",")
  ).join(" ");

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      className={className}
      role="img"
      aria-label={AXES.map(({ key, label }) => `${label} ${profile[key]} out of 10`).join(", ")}
    >
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={ring(R * f)}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          opacity={f === 1 ? 0.3 : 0.14}
        />
      ))}

      {AXES.map((_, i) => {
        const [x, y] = point(i, R);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={x.toFixed(1)}
            y2={y.toFixed(1)}
            stroke="currentColor"
            strokeWidth={1}
            opacity={0.16}
          />
        );
      })}

      <polygon points={shape} fill="#D7FF3A" fillOpacity={0.22} stroke="#D7FF3A" strokeWidth={2} strokeLinejoin="round" />

      {AXES.map(({ key }, i) => {
        const [x, y] = point(i, (profile[key] / MAX) * R);
        return <circle key={key} cx={x.toFixed(1)} cy={y.toFixed(1)} r={3} fill="#D7FF3A" />;
      })}

      {AXES.map(({ key, label }, i) => {
        const [x, y] = point(i, R + 24);
        const anchor = Math.abs(x - CX) < 6 ? "middle" : x > CX ? "start" : "end";
        return (
          <text
            key={key}
            x={x.toFixed(1)}
            y={(y + 4).toFixed(1)}
            textAnchor={anchor}
            fill="currentColor"
            fillOpacity={0.55}
            fontSize={10.5}
            fontWeight={600}
            letterSpacing="0.06em"
          >
            {label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

export { AXES as RADAR_AXES };
