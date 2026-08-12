"use client";

import { useState } from "react";
import Link from "next/link";
import SquareGrid, { squareToRows } from "@/components/SquareGrid";
import NumeralToggle from "@/components/NumeralToggle";
import TextScaleSlider from "@/components/TextScaleSlider";
import ExportWordButton from "@/components/ExportWordButton";
import { carre4, SQUARE4_LAYOUT, type Square4 } from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

export default function Carre4Page() {
  const [base, setBase] = useState("");
  const [square, setSquare] = useState<Square4 | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [numerals, setNumerals] = useState<NumeralSystem>("latin");
  const [scale, setScale] = useState(1);

  function handleCompute() {
    setError(null);
    const b = Number(base);
    if (Number.isNaN(b)) {
      setSquare(null);
      setError("Merci de renseigner un nombre valide.");
      return;
    }
    setSquare(carre4(b));
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 4 × 4
        </h1>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="block text-xs text-muted mb-1">Nombre</span>
            <input
              type="number"
              inputMode="numeric"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full rounded-md border border-line bg-surface px-3 py-2 text-parchment focus:border-brass"
            />
          </label>

          <button
            onClick={handleCompute}
            className="w-full rounded-md bg-brass py-3 font-medium text-ink transition-opacity hover:opacity-90"
          >
            Calculer
          </button>

          {error && <p className="text-sm text-alert">{error}</p>}
        </div>

        {square && (
          <div className="mt-10 animate-fade-in space-y-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <NumeralToggle value={numerals} onChange={setNumerals} />
              <TextScaleSlider value={scale} onChange={setScale} />
              <ExportWordButton
                title="Al Kanzou — Carré 4 × 4"
                rows={squareToRows(SQUARE4_LAYOUT, (idx) => square.t[idx], numerals)}
                fileName="al-kanzou-carre-4x4"
              />
            </div>
            <SquareGrid
              layout={SQUARE4_LAYOUT}
              getValue={(idx) => square.t[idx]}
              numerals={numerals}
              scale={scale}
              gap="gap-3"
              maxWidth="max-w-sm"
            />
          </div>
        )}
      </div>
    </main>
  );
}
