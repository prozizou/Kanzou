"use client";

import type { DiamondCell } from "@/lib/wafq";
import { formatNumeral, type NumeralSystem } from "@/lib/numerals";

const UNIT_X = 56;
const UNIT_Y = 40;
const PAD = 24;

type Point = { sx: number; sy: number };

/**
 * Rendu SVG du losange magique : chaque case (p, q) est un losange
 * placé en coordonnées isométriques (X = p - q, Y = p + q), ce qui
 * donne naturellement la silhouette en losange (1-2-3-4-3-2-1 cases
 * par niveau).
 *
 * Chaque losange est coupé en 2 vrais triangles par UNE de ses deux
 * diagonales — pas toujours la même : la diagonale choisie est celle
 * qui sépare le losange selon sa direction dominante par rapport au
 * centre du losange global (verticale près du sommet haut/bas,
 * horizontale près des pointes gauche/droite). Dans l'équation
 * d'origine, le premier nombre de chaque paire occupe systématiquement
 * le sommet Nord (coupe horizontale) ou Est (coupe verticale), le
 * second le sommet Sud ou Ouest — vérifié sur les 4 pointes connues
 * (1=Nord, 32=Ouest, 7=Est, 26=Sud).
 */
export default function MagicDiamond({
  cells,
  numerals,
}: {
  cells: DiamondCell[];
  numerals: NumeralSystem;
}) {
  const toScreen = (x: number, y: number): Point => ({
    sx: x * UNIT_X + 4 * UNIT_X + PAD,
    sy: y * UNIT_Y + PAD,
  });

  const centroid = (pts: Point[]): Point => ({
    sx: pts.reduce((s, p) => s + p.sx, 0) / pts.length,
    sy: pts.reduce((s, p) => s + p.sy, 0) / pts.length,
  });

  // Léger décalage du texte vers son sommet propre, pour l'éloigner de
  // la ligne de partage et bien distinguer les deux triangles.
  const towards = (from: Point, to: Point, t: number): Point => ({
    sx: from.sx + (to.sx - from.sx) * t,
    sy: from.sy + (to.sy - from.sy) * t,
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
        const dx = x;
        const dy = y - 3;

        const N = toScreen(x, y - 1);
        const E = toScreen(x + 1, y);
        const S = toScreen(x, y + 1);
        const W = toScreen(x - 1, y);

        const splitEW = Math.abs(dy) >= Math.abs(dx);

        // triA porte cell.outer (1er nombre de la paire d'origine),
        // triB porte cell.inner (2e nombre).
        const triA = splitEW ? [N, E, W] : [E, N, S];
        const triB = splitEW ? [S, E, W] : [W, N, S];
        const apexA = splitEW ? N : E;
        const apexB = splitEW ? S : W;

        const labelA = towards(centroid(triA), apexA, 0.15);
        const labelB = towards(centroid(triB), apexB, 0.15);

        const rhombusPoints = `${N.sx},${N.sy} ${E.sx},${E.sy} ${S.sx},${S.sy} ${W.sx},${W.sy}`;
        const divider = splitEW
          ? { a: E, b: W }
          : { a: N, b: S };

        return (
          <g key={`${cell.p}-${cell.q}`}>
            <polygon
              points={rhombusPoints}
              className="fill-surface2 stroke-brass/60"
              strokeWidth={1.5}
            />
            <line
              x1={divider.a.sx}
              y1={divider.a.sy}
              x2={divider.b.sx}
              y2={divider.b.sy}
              className="stroke-brass/40"
              strokeWidth={1}
            />
            <text
              x={labelA.sx}
              y={labelA.sy}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-parchment font-mono font-bold"
              fontSize={13}
            >
              {formatNumeral(cell.outer, numerals)}
            </text>
            <text
              x={labelB.sx}
              y={labelB.sy}
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
