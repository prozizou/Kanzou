"use client";

import GridCell from "./GridCell";
import { formatNumeral, type NumeralSystem } from "@/lib/numerals";

/**
 * Rendu générique d'un carré : factorise le pattern répété dans les
 * 8 pages /carre/N (une grille CSS de N colonnes construite depuis
 * SQUAREN_LAYOUT). `T` est le type de clé du layout — un index
 * numérique dans un tableau `t[]` pour la plupart des tailles, ou une
 * clé de type "e1".."e9" pour le carré 3x3.
 */
export default function SquareGrid<T>({
  layout,
  getValue,
  getFilled,
  numerals,
  gap = "gap-1.5",
  maxWidth = "max-w-2xl",
}: {
  layout: T[][];
  getValue: (key: T) => string | number | null;
  getFilled?: (key: T) => boolean;
  numerals: NumeralSystem;
  gap?: string;
  maxWidth?: string;
}) {
  const cols = layout[0]?.length ?? 1;

  return (
    <div
      className={`grid ${gap} ${maxWidth} mx-auto`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {layout.flat().map((key, i) => (
        <GridCell
          key={i}
          value={formatNumeral(getValue(key), numerals)}
          filled={getFilled ? getFilled(key) : true}
        />
      ))}
    </div>
  );
}
