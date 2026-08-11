import Link from "next/link";

export default function Carre10Page() {
  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="font-mono text-xs text-muted hover:text-brass">
          ← retour
        </Link>

        <h1 className="mt-4 font-display text-4xl text-parchment">
          Carré 10 × 10
        </h1>

        <p className="mt-6 text-muted leading-relaxed max-w-md">
          Cet écran n'a jamais été terminé dans l'app d'origine.
          <code className="mx-1 rounded bg-surface px-1.5 py-0.5 text-sm text-brass">
            M10x10Activity.java
          </code>
          déclare bien les 100 cases et un bouton de calcul, mais le
          clic ne fait rien — aucune formule n'a été écrite. Il n'y a
          donc rien à porter fidèlement ici : mieux vaut le dire
          clairement que d'inventer une formule à 100 cases.
        </p>

        <div className="mt-10 grid grid-cols-10 gap-1 max-w-2xl opacity-40">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm border border-line bg-surface"
            />
          ))}
        </div>

        <p className="mt-6 text-xs text-muted">
          Si une formule pour ce carré existe ailleurs (notes, une
          autre version de l'app), donnez-la-moi et je la porte comme
          les sept autres tailles.
        </p>
      </div>
    </main>
  );
}
