import Link from "next/link";
import PorteCarre from "@/components/PorteCarre";

const ACTIVE_SIZES = [3, 4, 5, 6, 7, 8, 9, 10, 11];
const ALL_SIZES = [3, 4, 5, 6, 7, 8, 9, 10, 11];

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
          Neuf portes, neuf tailles de carré. Choisissez une taille pour
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
          Les neuf tailles sont couvertes — chacune reprend fidèlement sa
          formule d'origine, sauf le 10×10 et le 11×11 (absents ou jamais
          implémentés dans l'app d'origine), qui utilisent un carré
          magique de référence.
        </p>

        <h2 className="mt-14 font-display text-2xl text-parchment">
          Autres formes
        </h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/triangle">
            <div className="group relative flex flex-col justify-between rounded-lg border border-line p-5 h-32 transition-colors duration-200 hover:border-brass bg-surface">
              <span className="font-mono text-xs text-muted">△</span>
              <span className="font-display text-xl text-parchment group-hover:text-brass">
                Hatim triangulaire
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
