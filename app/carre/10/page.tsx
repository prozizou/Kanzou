"use client";

import { useState } from "react";
import Link from "next/link";
import GridCell from "@/components/GridCell";
import { carre10, SQUARE10_LAYOUT, type Square10 } from "@/lib/wafq";

const MIN_VALUE = 495;

export default function Carre10Page() {
  const [base, setBase] = useState("");
  const [square, setSquare] = useState<Square10 | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setSquare(carre10(b));
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 10 × 10
        </h1>

        <p className="mt-3 max-w-md text-sm text-muted leading-relaxed">
          <code className="mx-1 rounded bg-surface px-1.5 py-0.5 text-sm text-brass">
            M10x10Activity.java
          </code>
          déclarait bien les 100 cases mais aucune formule n'y a jamais été
          écrite. Ce carré est donc un carré magique de référence (505,
          lignes/colonnes/diagonales, valeurs 1 à 100) décalé uniformément
          selon le nombre entré.
        </p>

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
          <div className="mt-10 animate-fade-in">
            <div className="grid grid-cols-10 gap-1 max-w-2xl mx-auto">
              {SQUARE10_LAYOUT.flat().map((idx, i) => (
                <GridCell key={i} value={square.t[idx]} filled />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
