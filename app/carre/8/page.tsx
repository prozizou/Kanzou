"use client";

import { useState } from "react";
import Link from "next/link";
import SquareGrid from "@/components/SquareGrid";
import NumeralToggle from "@/components/NumeralToggle";
import { carre8, SQUARE8_LAYOUT, type Square8 } from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

const MIN_VALUE = 252;

export default function Carre8Page() {
  const [base, setBase] = useState("");
  const [square, setSquare] = useState<Square8 | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [numerals, setNumerals] = useState<NumeralSystem>("latin");

  function handleCompute() {
    setError(null);
    if (base.trim() === "") {
      setSquare(null);
      setError("Champ vide.");
      return;
    }
    const b = Number(base);
    if (Number.isNaN(b)) {
      setSquare(null);
      setError("Merci de renseigner un nombre valide.");
      return;
    }
    if (b < MIN_VALUE) {
      setSquare(null);
      setError(`La valeur doit être supérieure à ${MIN_VALUE}.`);
      return;
    }
    setSquare(carre8(b));
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 8 × 8
        </h1>

        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="block text-xs text-muted mb-1">
              Nombre (supérieur à {MIN_VALUE})
            </span>
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
            <div className="flex justify-center">
              <NumeralToggle value={numerals} onChange={setNumerals} />
            </div>
            <SquareGrid
              layout={SQUARE8_LAYOUT}
              getValue={(idx) => square.t[idx]}
              numerals={numerals}
              gap="gap-1.5"
              maxWidth="max-w-2xl"
            />
          </div>
        )}
      </div>
    </main>
  );
}
