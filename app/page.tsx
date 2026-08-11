import PorteCarre from "@/components/PorteCarre";

const ACTIVE_SIZES = [3, 4, 5, 6, 7, 8, 9, 10];
const ALL_SIZES = [3, 4, 5, 6, 7, 8, 9, 10];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">
          Al Kanzou
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl text-parchment">
          Carrés numériques
        </h1>
        <p className="mt-4 max-w-xl text-muted leading-relaxed">
          Huit portes, huit tailles de carré. Choisissez une taille pour
          renseigner vos valeurs de départ et obtenir le carré complet.
        </p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ALL_SIZES.map((size) => (
            <PorteCarre
              key={size}
              size={size}
              active={ACTIVE_SIZES.includes(size)}
            />
          ))}
        </div>

        <p className="mt-10 text-xs text-muted">
          Les huit tailles sont couvertes — chacune reprend fidèlement
          sa formule d'origine (ou son absence, pour le 10×10).
        </p>
      </div>
    </main>
  );
}
