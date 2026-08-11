"use client";

import type { NumeralSystem } from "@/lib/numerals";

export default function NumeralToggle({
  value,
  onChange,
}: {
  value: NumeralSystem;
  onChange: (v: NumeralSystem) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-line overflow-hidden font-mono text-xs">
      <button
        type="button"
        onClick={() => onChange("latin")}
        className={[
          "px-3 py-1.5 transition-colors",
          value === "latin"
            ? "bg-brass text-ink"
            : "text-muted hover:text-parchment",
        ].join(" ")}
      >
        123
      </button>
      <button
        type="button"
        onClick={() => onChange("eastern")}
        className={[
          "px-3 py-1.5 border-l border-line transition-colors",
          value === "eastern"
            ? "bg-brass text-ink"
            : "text-muted hover:text-parchment",
        ].join(" ")}
      >
        ۱۲۳ (ourdou)
      </button>
    </div>
  );
}
