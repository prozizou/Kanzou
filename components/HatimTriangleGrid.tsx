"use client";

import type { HatimTriangle } from "@/lib/wafq";
import { formatNumeral, type NumeralSystem } from "@/lib/numerals";

type Point = { x: number; y: number };

const A: Point = { x: 200, y: 34 };
const BL: Point = { x: 46, y: 330 };
const BR: Point = { x: 354, y: 330 };

const mid = (p: Point, q: Point): Point => ({
  x: (p.x + q.x) / 2,
  y: (p.y + q.y) / 2,
});

// Le triangle intérieur est le triangle médian du triangle extérieur
// (sommets = milieux des côtés), et chaque "centre" est à son tour le
// milieu d'un côté de ce triangle médian — reproduisant exactement la
// disposition géométrique du diagramme d'origine.
const L = mid(A, BL);
const R = mid(A, BR);
const M = mid(BL, BR);
const CT = mid(L, R);
const CL = mid(L, M);
const CR = mid(R, M);

const EDGES: [Point, Point][] = [
  [A, L],
  [L, BL],
  [A, R],
  [R, BR],
  [BL, M],
  [M, BR],
  [L, CT],
  [CT, R],
  [L, CL],
  [CL, M],
  [R, CR],
  [CR, M],
];

const RADIUS = 27;
const BASE_FONT_SIZE = 14;
const VIEW_W = 400;
const VIEW_H = 400;

/**
 * Rendu SVG du Hatim triangulaire : 9 cases (3 sommets extérieurs, 3
 * milieux de côtés, 3 sommets du triangle intérieur) reliées par les 6
 * lignes droites qui somment toutes à D — voir hatimTriangulaire() dans
 * lib/wafq.ts. Le "D : …" est affiché sous le diagramme, comme sur les
 * exemples d'origine.
 */
export default function HatimTriangleGrid({
  triangle,
  numerals,
  scale = 1,
}: {
  triangle: HatimTriangle;
  numerals: NumeralSystem;
  /** Multiplicateur manuel de taille de texte, voir TextScaleSlider. */
  scale?: number;
}) {
  const nodes: { point: Point; value: number }[] = [
    { point: A, value: triangle.sommet },
    { point: L, value: triangle.gauche },
    { point: R, value: triangle.droite },
    { point: BL, value: triangle.baseGauche },
    { point: BR, value: triangle.baseDroite },
    { point: M, value: triangle.bas },
    { point: CT, value: triangle.centreHaut },
    { point: CL, value: triangle.centreGauche },
    { point: CR, value: triangle.centreDroite },
  ];

  return (
    <div className="mx-auto max-w-sm">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto block w-full"
        role="img"
        aria-label={`Hatim triangulaire, D = ${triangle.d}`}
      >
        {EDGES.map(([p, q], i) => (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            className="stroke-brass/40"
            strokeWidth={2}
          />
        ))}
        {nodes.map(({ point, value }, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r={RADIUS}
              className="fill-surface2 stroke-brass/70"
              strokeWidth={1.5}
            />
            <text
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-parchment font-mono font-bold"
              fontSize={BASE_FONT_SIZE * scale}
            >
              {formatNumeral(value, numerals)}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-center font-mono text-sm text-brass">
        D : {formatNumeral(triangle.d, numerals)}
      </p>
    </div>
  );
}
