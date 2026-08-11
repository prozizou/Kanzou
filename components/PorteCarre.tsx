import Link from "next/link";

export default function PorteCarre({
  size,
  active,
}: {
  size: number;
  active: boolean;
}) {
  const content = (
    <div
      className={[
        "group relative flex flex-col justify-between rounded-lg border p-5 h-32",
        "transition-colors duration-200",
        active
          ? "border-line hover:border-brass bg-surface"
          : "border-line/50 bg-surface/40 cursor-not-allowed",
      ].join(" ")}
    >
      <span className="font-mono text-xs text-muted">
        {String(size).padStart(2, "0")}
      </span>
      <span
        className={[
          "font-display text-2xl",
          active ? "text-parchment group-hover:text-brass" : "text-muted",
        ].join(" ")}
      >
        {size} × {size}
      </span>
      {!active && (
        <span className="absolute top-3 right-3 text-[10px] uppercase tracking-wide text-muted">
          à venir
        </span>
      )}
    </div>
  );

  if (!active) return content;

  return <Link href={`/carre/${size}`}>{content}</Link>;
}
