"use client";

import { useState } from "react";
import Link from "next/link";
import GridCell from "@/components/GridCell";
import { carre6, SQUARE6_LAYOUT, type Square6 } from "@/lib/wafq";

export default function Carre6Page() {
  const [base, setBase] = useState("");
  const [square, setSquare] = useState<Square6 | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCompute() {
    setError(null);
    const b = Number(base);
    if (Number.isNaN(b)) {
      setSquare(null);
      setError("Merci de renseigner un nombre valide.");
      return;
    }
    setSquare(carre6(b));
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 6 × 6
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
          <div className="mt-10 animate-fade-in">
            <div className="grid grid-cols-6 gap-2 max-w-lg mx-auto">
              {SQUARE6_LAYOUT.flat().map((idx, i) => (
                <GridCell key={i} value={square.t[idx]} filled />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
