export default function GridCell({
  value,
  filled,
}: {
  value: string | number | null;
  filled: boolean;
}) {
  return (
    <div
      className={[
        "aspect-square flex items-center justify-center rounded-md border",
        "font-mono text-lg sm:text-xl transition-colors duration-300",
        filled
          ? "border-brass/60 bg-surface2 text-parchment"
          : "border-line bg-surface text-muted",
      ].join(" ")}
    >
      {value ?? "—"}
    </div>
  );
}
