"use client";

import { useState } from "react";
import Link from "next/link";
import SquareGrid, { squareToRows } from "@/components/SquareGrid";
import NumeralToggle from "@/components/NumeralToggle";
import TextScaleSlider from "@/components/TextScaleSlider";
import ExportWordButton from "@/components/ExportWordButton";
import MagicDiamond from "@/components/MagicDiamond";
import {
  carre8,
  diamond8,
  diamond8ToRows,
  isValidDiamond8Base,
  DIAMOND8_STEP,
  SQUARE8_LAYOUT,
  type Square8,
  type Diamond8,
} from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

type Mode = "carre" | "losange";

const MODE_LABELS: Record<Mode, string> = {
  carre: "Carré (une valeur)",
  losange: "Losange magique (32 nombres)",
};

const MIN_VALUE = 252;
const DIAMOND_MIN_VALUE = 124;

export default function Carre8Page() {
  const [mode, setMode] = useState<Mode>("carre");
  const [error, setError] = useState<string | null>(null);
  const [numerals, setNumerals] = useState<NumeralSystem>("latin");
  const [scale, setScale] = useState(1);

  // Mode "carre"
  const [base, setBase] = useState("");
  const [square, setSquare] = useState<Square8 | null>(null);

  // Mode "losange"
  const [diamondBase, setDiamondBase] = useState("");
  const [diamond, setDiamond] = useState<Diamond8 | null>(null);

  function handleModeChange(next: Mode) {
    setMode(next);
    setSquare(null);
    setDiamond(null);
    setError(null);
  }

  function handleCompute() {
    setError(null);
    if (mode === "carre") {
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
    } else {
      if (diamondBase.trim() === "") {
        setDiamond(null);
        setError("Champ vide.");
        return;
      }
      const b = Number(diamondBase);
      if (Number.isNaN(b)) {
        setDiamond(null);
        setError("Merci de renseigner un nombre valide.");
        return;
      }
      if (b < DIAMOND_MIN_VALUE) {
        setDiamond(null);
        setError(`La valeur doit être supérieure à ${DIAMOND_MIN_VALUE}.`);
        return;
      }
      if (!isValidDiamond8Base(b)) {
        setDiamond(null);
        const lower = b - ((b - DIAMOND_MIN_VALUE) % DIAMOND8_STEP);
        const upper = lower + DIAMOND8_STEP;
        setError(
          `Ce nombre ne donne pas des rangées exactement égales à ${b} ` +
            `(le losange n'a que 32 cases pour ${DIAMOND8_STEP} termes par rangée : ` +
            `seul un nombre de la forme ${DIAMOND_MIN_VALUE} + ${DIAMOND8_STEP}×n convient). ` +
            `Essayez ${lower} ou ${upper}.`
        );
        return;
      }
      setDiamond(diamond8(b));
    }
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

        <div className="mt-8 flex flex-wrap gap-2">
          {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={[
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                mode === m
                  ? "border-brass bg-brass/10 text-brass"
                  : "border-line text-muted hover:text-parchment hover:border-parchment/40",
              ].join(" ")}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        {mode === "losange" && (
          <p className="mt-4 max-w-md text-sm text-muted leading-relaxed">
            Absent de l'app Android d'origine. Losange de 32 nombres fourni
            par l'utilisateur : 4 rangées gauche-à-droite, 4 rangées
            droite-à-gauche et 2 colonnes somment toutes au nombre entré ;
            les losanges intérieurs concentriques somment à sa moitié.
            Chaque case du diagramme est coupée en deux : un nombre
            "extérieur" (haut) et un nombre "intérieur" (bas). Ici, chaque
            case appartient à une rangée des deux sens à la fois, donc seul
            un nombre de la forme {DIAMOND_MIN_VALUE} + {DIAMOND8_STEP}×n
            donne des rangées exactement égales au nombre entré.
          </p>
        )}

        <div className="mt-8 space-y-4">
          {mode === "carre" ? (
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
          ) : (
            <label className="block">
              <span className="block text-xs text-muted mb-1">
                Nombre (supérieur à {DIAMOND_MIN_VALUE}, de la forme{" "}
                {DIAMOND_MIN_VALUE} + {DIAMOND8_STEP}×n — ex. {DIAMOND_MIN_VALUE},{" "}
                {DIAMOND_MIN_VALUE + DIAMOND8_STEP}, {DIAMOND_MIN_VALUE + 2 * DIAMOND8_STEP}…)
              </span>
              <input
                type="number"
                inputMode="numeric"
                value={diamondBase}
                onChange={(e) => setDiamondBase(e.target.value)}
                className="w-full rounded-md border border-line bg-surface px-3 py-2 text-parchment focus:border-brass"
              />
            </label>
          )}

          <button
            onClick={handleCompute}
            className="w-full rounded-md bg-brass py-3 font-medium text-ink transition-opacity hover:opacity-90"
          >
            Calculer
          </button>

          {error && <p className="text-sm text-alert">{error}</p>}
        </div>

        {mode === "carre" && square && (
          <div className="mt-10 animate-fade-in space-y-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <NumeralToggle value={numerals} onChange={setNumerals} />
              <TextScaleSlider value={scale} onChange={setScale} />
              <ExportWordButton
                title="Al Kanzou — Carré 8 × 8"
                rows={squareToRows(SQUARE8_LAYOUT, (idx) => square.t[idx], numerals)}
                fileName="al-kanzou-carre-8x8"
              />
            </div>
            <SquareGrid
              layout={SQUARE8_LAYOUT}
              getValue={(idx) => square.t[idx]}
              numerals={numerals}
              scale={scale}
              gap="gap-1.5"
              maxWidth="max-w-2xl"
            />
          </div>
        )}

        {mode === "losange" && diamond && (
          <div className="mt-10 animate-fade-in space-y-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <NumeralToggle value={numerals} onChange={setNumerals} />
              <TextScaleSlider value={scale} onChange={setScale} />
              <ExportWordButton
                title="Al Kanzou — Losange magique"
                rows={diamond8ToRows(diamond)}
                fileName="al-kanzou-losange-magique"
              />
            </div>
            <MagicDiamond cells={diamond.cells} numerals={numerals} scale={scale} />
          </div>
        )}
      </div>
    </main>
  );
}
