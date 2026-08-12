"use client";

import { useState } from "react";
import { exportSquareToDocx } from "@/lib/exportDocx";

export default function ExportWordButton({
  title,
  subtitle,
  rows,
  fileName,
}: {
  title: string;
  subtitle?: string;
  rows: (string | number | null)[][];
  fileName: string;
}) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    try {
      await exportSquareToDocx({ title, subtitle, rows, fileName });
    } catch {
      // Le téléchargement échoue silencieusement en cas d'erreur du
      // navigateur (ex : Blob non supporté) ; pas de UI d'erreur dédiée
      // pour un simple export.
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className="inline-flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-parchment hover:border-parchment/40 disabled:opacity-50"
    >
      {busy ? "…" : "⬇ Word (.docx)"}
    </button>
  );
}
