"use client";

import { useState } from "react";
import Link from "next/link";
import SquareGrid from "@/components/SquareGrid";
import NumeralToggle from "@/components/NumeralToggle";
import TextScaleSlider from "@/components/TextScaleSlider";
import {
  carre5Base,
  carre5Askandria,
  SQUARE5_LAYOUT,
  type Square5,
} from "@/lib/wafq";
import type { NumeralSystem } from "@/lib/numerals";

type Mode = "base" | "askandria";

const MODE_LABELS: Record<Mode, string> = {
  base: "Base (une valeur)",
  askandria: "Askandria (4 valeurs connues)",
};

export default function Carre5Page() {
  const [mode, setMode] = useState<Mode>("base");
  const [square, setSquare] = useState<Square5 | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [numerals, setNumerals] = useState<NumeralSystem>("latin");
  const [scale, setScale] = useState(1);

  // Mode Base
  const [base, setBase] = useState("");
  const [base2, setBase2] = useState(""); // équivalent edittext2 : base = 5*(x-2)

  // Mode Askandria
  const [t8, setT8] = useState("");
  const [t4, setT4] = useState("");
  const [t21, setT21] = useState("");
  const [t17, setT17] = useState("");

  function handleCompute() {
    setError(null);
    try {
      if (mode === "base") {
        const b = Number(base);
        if (Number.isNaN(b)) throw new Error("invalid");
        setSquare(carre5Base(b));
      } else {
        const v8 = Number(t8);
        const v4 = Number(t4);
        const v21 = Number(t21);
        const v17 = Number(t17);
        if ([v8, v4, v21, v17].some((n) => Number.isNaN(n))) {
          throw new Error("invalid");
        }
        setSquare(carre5Askandria(v8, v4, v21, v17));
      }
    } catch {
      setSquare(null);
      setError("Merci de renseigner un nombre valide dans chaque champ.");
    }
  }

  function handleModeChange(next: Mode) {
    setMode(next);
    setSquare(null);
    setError(null);
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 5 × 5
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

        <div className="mt-8 space-y-4">
          {mode === "base" && (
            <>
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
                  Ou calculer depuis une autre valeur (base = 5 × (x − 2))
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={base2}
                  onChange={(e) => {
                    setBase2(e.target.value);
                    const x = Number(e.target.value);
                    if (!Number.isNaN(x) && e.target.value !== "") {
                      setBase(String(Math.trunc(5 * (x - 2))));
                    }
                  }}
                  className="w-full rounded-md border border-line bg-surface px-3 py-2 text-parchment focus:border-brass"
                />
              </label>
            </>
          )}

          {mode === "askandria" && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="t8" value={t8} onChange={setT8} />
              <Field label="t4" value={t4} onChange={setT4} />
              <Field label="t21" value={t21} onChange={setT21} />
              <Field label="t17" value={t17} onChange={setT17} />
            </div>
          )}

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
              layout={SQUARE5_LAYOUT}
              getValue={(idx) => square.t[idx]}
              getFilled={(idx) => square.t[idx] !== null}
              numerals={numerals}
              scale={scale}
              gap="gap-2"
              maxWidth="max-w-md"
            />
            {square.total !== undefined && (
              <p className="mt-4 text-center font-mono text-sm text-muted">
                Tot: {square.total}
              </p>
            )}
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
