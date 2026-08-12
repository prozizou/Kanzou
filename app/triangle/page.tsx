"use client";

import { useState } from "react";
import Link from "next/link";
import HatimTriangleGrid from "@/components/HatimTriangleGrid";
import NumeralToggle from "@/components/NumeralToggle";
import TextScaleSlider from "@/components/TextScaleSlider";
import ExportWordButton from "@/components/ExportWordButton";
import { hatimTriangulaire, hatimTriangleToRows, type HatimTriangle } from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

const EXAMPLE = { d: "644", sommet: "200", baseGauche: "150", baseDroite: "250" };

export default function TrianglePage() {
  const [d, setD] = useState("");
  const [sommet, setSommet] = useState("");
  const [baseGauche, setBaseGauche] = useState("");
  const [baseDroite, setBaseDroite] = useState("");
  const [triangle, setTriangle] = useState<HatimTriangle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [numerals, setNumerals] = useState<NumeralSystem>("latin");
  const [scale, setScale] = useState(1);

  function handleCompute() {
    setError(null);
    const dv = Number(d);
    const sv = Number(sommet);
    const bgv = Number(baseGauche);
    const bdv = Number(baseDroite);
    if ([dv, sv, bgv, bdv].some((n) => Number.isNaN(n)) || [d, sommet, baseGauche, baseDroite].some((v) => v.trim() === "")) {
      setTriangle(null);
      setError("Merci de renseigner un nombre valide dans chaque champ.");
      return;
    }
    setTriangle(hatimTriangulaire(dv, sv, bgv, bdv));
  }

  function fillExample() {
    setD(EXAMPLE.d);
    setSommet(EXAMPLE.sommet);
    setBaseGauche(EXAMPLE.baseGauche);
    setBaseDroite(EXAMPLE.baseDroite);
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Hatim triangulaire
        </h1>

        <p className="mt-3 max-w-md text-sm text-muted leading-relaxed">
          Absent de l'app Android d'origine (aucune Activity Java
          correspondante). Reconstruit et vérifié à partir d'un exemple
          fourni : un triangle extérieur (sommet + 2 coins de base) dont
          le triangle médian intérieur est tracé en reliant les milieux
          des 3 côtés — chacune des 6 lignes droites du diagramme somme
          exactement à D. Le triangle "parfait" est donc entièrement
          déterminé par 4 valeurs : D, le sommet, et les 2 coins de base.
        </p>

        <div className="mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="D (somme visée)" value={d} onChange={setD} />
            <Field label="Sommet" value={sommet} onChange={setSommet} />
            <Field label="Base gauche" value={baseGauche} onChange={setBaseGauche} />
            <Field label="Base droite" value={baseDroite} onChange={setBaseDroite} />
          </div>

          <button
            type="button"
            onClick={fillExample}
            className="text-xs text-brass underline underline-offset-2"
          >
            Remplir avec l'exemple vérifié (D : 644)
          </button>

          <button
            onClick={handleCompute}
            className="w-full rounded-md bg-brass py-3 font-medium text-ink transition-opacity hover:opacity-90"
          >
            Calculer
          </button>

          {error && <p className="text-sm text-alert">{error}</p>}
        </div>

        {triangle && (
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
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
