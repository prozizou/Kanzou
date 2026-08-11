"use client";

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;
const STEP = 0.1;

export default function TextScaleSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-3 font-mono text-xs text-muted">
      <span className="shrink-0">A⁻</span>
      <input
        type="range"
        min={MIN_SCALE}
        max={MAX_SCALE}
        step={STEP}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-32 cursor-pointer appearance-none rounded-full bg-line accent-brass"
        aria-label="Taille du texte des cases"
      />
      <span className="shrink-0">A⁺</span>
      <span className="w-10 shrink-0 text-right text-brass">
        {Math.round(value * 100)}%
      </span>
    </label>
  );
}
