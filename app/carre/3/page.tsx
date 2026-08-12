"use client";

import { useState } from "react";
import Link from "next/link";
import SquareGrid, { squareToRows } from "@/components/SquareGrid";
import HatimTriangleGrid from "@/components/HatimTriangleGrid";
import NumeralToggle from "@/components/NumeralToggle";
import TextScaleSlider from "@/components/TextScaleSlider";
import ExportWordButton from "@/components/ExportWordButton";
import {
  wilaya,
  ghazaly,
  bayt,
  hatimTriangulaire,
  hatimTriangleToRows,
  SQUARE3_LAYOUT,
  type Square3,
  type HatimTriangle,
} from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

type Mode = "wilaya" | "ghazaly" | "bayt" | "hatim";

const MODE_LABELS: Record<Mode, string> = {
  wilaya: "Wilaya (3 valeurs connues)",
  ghazaly: "Ghazaly (une valeur)",
  bayt: "Bayt (deux valeurs)",
  hatim: "Hatim triangulaire (une valeur)",
};

export default function Carre3Page() {
  const [mode, setMode] = useState<Mode>("ghazaly");
  const [square, setSquare] = useState<Square3 | null>(null);
  const [triangle, setTriangle] = useState<HatimTriangle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [numerals, setNumerals] = useState<NumeralSystem>("latin");
  const [scale, setScale] = useState(1);

  // Wilaya
  const [wE2, setWE2] = useState("8");
  const [wE4, setWE4] = useState("2");
  const [wE9, setWE9] = useState("4");

  // Ghazaly
  const [hajah, setHajah] = useState("");

  // Bayt
  const [bHajah, setBHajah] = useState("");
  const [bEntree, setBEntree] = useState("");

  // Hatim triangulaire
  const [hD, setHD] = useState("");

  function handleCompute() {
    setError(null);
    try {
      if (mode === "wilaya") {
        const e2 = Number(wE2);
        const e4 = Number(wE4);
        const e9 = Number(wE9);
        if ([e2, e4, e9].some((n) => Number.isNaN(n))) {
          throw new Error("invalid");
        }
        setSquare(wilaya(e2, e4, e9));
      } else if (mode === "ghazaly") {
        const g = Number(hajah);
        if (Number.isNaN(g)) throw new Error("invalid");
        setSquare(ghazaly(g));
      } else if (mode === "bayt") {
        const g = Number(bHajah);
        const en = Number(bEntree);
        if (Number.isNaN(g) || Number.isNaN(en)) throw new Error("invalid");
        setSquare(bayt(g, en));
      } else {
        const d = Number(hD);
        if (Number.isNaN(d) || hD.trim() === "") throw new Error("invalid");
        setTriangle(hatimTriangulaire(d));
      }
    } catch {
      setSquare(null);
      setTriangle(null);
      setError("Merci de renseigner un nombre valide dans chaque champ.");
    }
  }

  function handleModeChange(next: Mode) {
    setMode(next);
    setSquare(null);
    setTriangle(null);
    setError(null);
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 3 × 3
        </h1>

        {/* Sélecteur de mode */}
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

        {mode === "hatim" && (
          <p className="mt-4 max-w-md text-sm text-muted leading-relaxed">
            Absent de l'app Android d'origine (aucune Activity Java
            correspondante). Un triangle extérieur (sommet + 2 coins de
            base) dont le triangle médian intérieur relie les milieux des
            3 côtés : les 6 lignes droites du diagramme somment toutes à
            la valeur entrée. Comme pour Ghazaly, une seule valeur suffit
            — les 3 sommets sont départagés automatiquement.
          </p>
        )}

        {/* Formulaire selon le mode */}
        <div className="mt-8 space-y-4">
          {mode === "wilaya" && (
            <div className="grid grid-cols-3 gap-4">
              <Field label="e2" value={wE2} onChange={setWE2} />
              <Field label="e4" value={wE4} onChange={setWE4} />
              <Field label="e9" value={wE9} onChange={setWE9} />
            </div>
          )}

          {mode === "ghazaly" && (
            <Field label="Nombre (hajah)" value={hajah} onChange={setHajah} wide />
          )}

          {mode === "bayt" && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre (hajah)" value={bHajah} onChange={setBHajah} />
              <Field label="Entrée" value={bEntree} onChange={setBEntree} />
            </div>
          )}

          {mode === "hatim" && (
            <Field label="Valeur (somme de chaque ligne)" value={hD} onChange={setHD} wide />
          )}

          {mode === "bayt" && bHajah && !bEntree && (
            <button
              type="button"
              onClick={() => setBEntree(String(Math.trunc(Number(bHajah) * 3)))}
              className="text-xs text-brass underline underline-offset-2"
            >
              Suggérer entrée = 3 × hajah
            </button>
          )}

          <button
            onClick={handleCompute}
            className="w-full rounded-md bg-brass py-3 font-medium text-ink transition-opacity hover:opacity-90"
          >
            Calculer
          </button>

          {error && <p className="text-sm text-alert">{error}</p>}
        </div>

        {/* Résultat */}
        {mode !== "hatim" && square && (
          <div className="mt-10 animate-fade-in space-y-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <NumeralToggle value={numerals} onChange={setNumerals} />
              <TextScaleSlider value={scale} onChange={setScale} />
              <ExportWordButton
                title="Al Kanzou — Carré 3 × 3"
                rows={squareToRows(SQUARE3_LAYOUT, (key) => square[key], numerals)}
                fileName="al-kanzou-carre-3x3"
              />
            </div>
            <SquareGrid
              layout={SQUARE3_LAYOUT}
              getValue={(key) => square[key]}
              numerals={numerals}
              scale={scale}
              gap="gap-3"
              maxWidth="max-w-xs"
            />
          </div>
        )}

        {mode === "hatim" && triangle && (
          <div className="mt-10 animate-fade-in space-y-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <NumeralToggle value={numerals} onChange={setNumerals} />
              <TextScaleSlider value={scale} onChange={setScale} />
              <ExportWordButton
                title="Al Kanzou — Hatim triangulaire"
                rows={hatimTriangleToRows(triangle)}
                fileName="al-kanzou-hatim-triangulaire"
              />
            </div>
            <HatimTriangleGrid triangle={triangle} numerals={numerals} scale={scale} />
          </div>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  wide,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "block" : "block"}>
      <span className="block text-xs text-muted mb-1">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-line bg-surface px-3 py-2 text-parchment focus:border-brass"
      />
    </label>
  );
}
