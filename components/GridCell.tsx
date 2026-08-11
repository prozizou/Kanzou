export default function GridCell({
  value,
  filled,
}: {
  value: string | number | null;
  filled: boolean;
}) {
  const text = value === null || value === undefined ? "—" : String(value);

  // La taille de police diminue avec le nombre de caractères : sans ça,
  // les nombres à 3+ chiffres (bases élevées sur les carrés 7x7 à
  // 10x10) débordent de leur case et chevauchent la case voisine,
  // surtout sur petit écran.
  const fontSizeClass =
    text.length <= 2
      ? "text-base sm:text-xl"
      : text.length === 3
      ? "text-sm sm:text-lg"
      : text.length === 4
      ? "text-[11px] sm:text-base"
      : "text-[9px] sm:text-sm";

  return (
    <div
      className={[
        "aspect-square flex items-center justify-center rounded-md border overflow-hidden px-0.5",
        "font-mono leading-none transition-colors duration-300",
        fontSizeClass,
        filled
          ? "border-brass/60 bg-surface2 text-parchment"
          : "border-line bg-surface text-muted",
      ].join(" ")}
    >
      <span className="truncate">{text}</span>
    </div>
  );
}
