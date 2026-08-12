"use client";

import { useState } from "react";
import Link from "next/link";
import SquareGrid, { squareToRows } from "@/components/SquareGrid";
import NumeralToggle from "@/components/NumeralToggle";
import TextScaleSlider from "@/components/TextScaleSlider";
import ExportWordButton from "@/components/ExportWordButton";
import { carre11, SQUARE11_LAYOUT, type Square11 } from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

const MIN_VALUE = 660;

export default function Carre11Page() {
  const [base, setBase] = useState("");
  const [square, setSquare] = useState<Square11 | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [numerals, setNumerals] = useState<NumeralSystem>("latin");
  const [scale, setScale] = useState(1);

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
    setSquare(carre11(b));
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 11 × 11
        </h1>

        <p className="mt-3 max-w-md text-sm text-muted leading-relaxed">
          Taille absente de l'app Android d'origine (le plus grand carré
          développé était le 10×10, resté inachevé). Ce carré repose sur un
          carré magique de référence (671 ; lignes, colonnes et diagonales
          valides ; entiers 1 à 121 chacun utilisé une fois), décalé
          uniformément selon le nombre entré.
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
          <div className="mt-10 animate-fade-in space-y-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <NumeralToggle value={numerals} onChange={setNumerals} />
              <TextScaleSlider value={scale} onChange={setScale} />
              <ExportWordButton
                title="Al Kanzou — Carré 11 × 11"
                rows={squareToRows(SQUARE11_LAYOUT, (idx) => square.t[idx], numerals)}
                fileName="al-kanzou-carre-11x11"
              />
            </div>
            <SquareGrid
              layout={SQUARE11_LAYOUT}
              getValue={(idx) => square.t[idx]}
              numerals={numerals}
              scale={scale}
              gap="gap-1"
              maxWidth="max-w-2xl"
            />
          </div>
        )}
      </div>
    </main>
  );
}
