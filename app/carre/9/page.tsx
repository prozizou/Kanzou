"use client";

import { useState } from "react";
import Link from "next/link";
import SquareGrid, { squareToRows } from "@/components/SquareGrid";
import NumeralToggle from "@/components/NumeralToggle";
import TextScaleSlider from "@/components/TextScaleSlider";
import ExportWordButton from "@/components/ExportWordButton";
import { carre9, SQUARE9_LAYOUT, type Square9 } from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

const MIN_VALUE = 360;

export default function Carre9Page() {
  const [base, setBase] = useState("");
  const [square, setSquare] = useState<Square9 | null>(null);
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
    setSquare(carre9(b));
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 9 × 9
        </h1>

        <p className="mt-3 max-w-md text-sm text-muted leading-relaxed">
          Dans l'app d'origine, 9 cases n'étaient jamais calculées (le code
          s'arrête avec un commentaire "//KASR"). Elles sont complétées ici
          en appliquant la règle du carré magique : chaque ligne doit
          sommer au nombre entré, donc la case manquante d'une ligne vaut
          ce nombre moins la somme des 8 autres cases de la même ligne.
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
                title="Al Kanzou — Carré 9 × 9"
                rows={squareToRows(SQUARE9_LAYOUT, (idx) => square.t[idx], numerals)}
                fileName="al-kanzou-carre-9x9"
              />
            </div>
            <SquareGrid
              layout={SQUARE9_LAYOUT}
              getValue={(idx) => square.t[idx]}
              getFilled={(idx) => square.t[idx] !== null}
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
