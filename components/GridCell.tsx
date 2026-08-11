export default function GridCell({
  value,
  filled,
  scale = 1,
}: {
  value: string | number | null;
  filled: boolean;
  /** Multiplicateur manuel (curseur "Taille du texte"), 1 = taille par défaut. */
  scale?: number;
}) {
  const text = value === null || value === undefined ? "—" : String(value);

  // Bornes de taille (mobile, desktop) selon le nombre de caractères :
  // sans ça, les nombres à 3+ chiffres (bases élevées) débordent de
  // leur case. Chaque palier est multiplié par `scale` pour le curseur
  // manuel de taille de texte.
  const [minRem, maxRem] =
    text.length <= 2
      ? [1, 1.25]
      : text.length === 3
      ? [0.875, 1.125]
      : text.length === 4
      ? [0.6875, 1]
      : text.length <= 6
      ? [0.5625, 0.875]
      : text.length <= 9
      ? [0.5, 0.75]
      : text.length <= 13
      ? [0.4375, 0.625]
      : [0.375, 0.5625];

  const fontSize = `clamp(${minRem * scale}rem, 4vw, ${maxRem * scale}rem)`;

  return (
    <div
      className={[
        "aspect-square flex items-center justify-center rounded-md border overflow-hidden px-0.5",
        "font-mono leading-tight transition-colors duration-300",
        filled
          ? "border-brass/60 bg-surface2 text-parchment"
          : "border-line bg-surface text-muted",
      ].join(" ")}
    >
      {/* Retour à la ligne plutôt que troncature "..." : un très grand
          nombre reste entièrement lisible, réparti sur plusieurs lignes
          dans sa case, au lieu d'être coupé. */}
      <span className="break-all text-center" style={{ fontSize }}>
        {text}
      </span>
    </div>
  );
}
