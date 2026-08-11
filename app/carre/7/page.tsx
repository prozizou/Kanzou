"use client";

import { useState } from "react";
import Link from "next/link";
import SquareGrid from "@/components/SquareGrid";
import NumeralToggle from "@/components/NumeralToggle";
import TextScaleSlider from "@/components/TextScaleSlider";
import { carre7, SQUARE7_LAYOUT, type Square7 } from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

export default function Carre7Page() {
  const [base, setBase] = useState("");
  const [base2, setBase2] = useState(""); // base = 7*(x-3)
  const [square, setSquare] = useState<Square7 | null>(null);
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
    setSquare(carre7(b));
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 7 × 7
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

          <label className="block">
            <span className="block text-xs text-muted mb-1">
              Ou calculer depuis une autre valeur (base = 7 × (x − 3))
            </span>
            <input
              type="number"
              inputMode="numeric"
              value={base2}
              onChange={(e) => {
                setBase2(e.target.value);
                const x = Number(e.target.value);
                if (!Number.isNaN(x) && e.target.value !== "") {
                  setBase(String(Math.trunc(7 * (x - 3))));
                }
              }}
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
            </div>
            <SquareGrid
              layout={SQUARE7_LAYOUT}
              getValue={(idx) => square.t[idx]}
              numerals={numerals}
              scale={scale}
              gap="gap-1.5"
              maxWidth="max-w-xl"
            />
          </div>
        )}
      </div>
    </main>
  );
}
