"use client";

import type { DiamondCell } from "@/lib/wafq";
import { formatNumeral, type NumeralSystem } from "@/lib/numerals";

const UNIT_X = 56;
const UNIT_Y = 40;
const PAD = 24;

/**
 * Rendu SVG du losange magique : chaque case (p, q) est un losange
 * placé en coordonnées isométriques (X = p - q, Y = p + q), ce qui
 * donne naturellement la silhouette en losange (1-2-3-4-3-2-1 cases
 * par niveau). Le losange est coupé par une ligne horizontale entre
 * son nombre "extérieur" (haut) et son nombre "intérieur" (bas).
 */
export default function MagicDiamond({
  cells,
  numerals,
}: {
  cells: DiamondCell[];
  numerals: NumeralSystem;
}) {
  const toScreen = (x: number, y: number) => ({
    sx: x * UNIT_X + 4 * UNIT_X + PAD,
    sy: y * UNIT_Y + PAD,
  });

  const width = 8 * UNIT_X + PAD * 2;
  const height = 8 * UNIT_Y + PAD * 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto block w-full max-w-2xl"
      role="img"
      aria-label="Losange magique"
    >
      {cells.map((cell) => {
        const x = cell.p - cell.q;
        const y = cell.p + cell.q;
        const top = toScreen(x, y - 1);
        const right = toScreen(x + 1, y);
        const bottom = toScreen(x, y + 1);
        const left = toScreen(x - 1, y);
        const center = toScreen(x, y);
        const points = `${top.sx},${top.sy} ${right.sx},${right.sy} ${bottom.sx},${bottom.sy} ${left.sx},${left.sy}`;

        return (
          <g key={`${cell.p}-${cell.q}`}>
            <polygon
              points={points}
              className="fill-surface2 stroke-brass/60"
              strokeWidth={1.5}
            />
            <line
              x1={left.sx}
              y1={left.sy}
              x2={right.sx}
              y2={right.sy}
              className="stroke-brass/40"
              strokeWidth={1}
            />
            <text
              x={center.sx}
              y={center.sy - UNIT_Y * 0.28}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-parchment font-mono font-bold"
              fontSize={13}
            >
              {formatNumeral(cell.outer, numerals)}
            </text>
            <text
              x={center.sx}
              y={center.sy + UNIT_Y * 0.28}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-parchment font-mono font-bold"
              fontSize={13}
            >
              {formatNumeral(cell.inner, numerals)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
