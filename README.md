# Al Kanzou — Carrés (version web)

Portage web (Next.js 14, App Router, Tailwind) des calculateurs de
carrés numériques (wafq) de l'app Android "Al Kanzou Pro" (Sketchware,
`com.alkanzouHatim`).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## État du portage

| Taille | Statut | Source Java |
|---|---|---|
| 3×3 | ✅ Fait — 4 modes (Wilaya / Ghazaly / Bayt / Hatim triangulaire) | `Ghaz1Activity.java` |
| 4×4 | ✅ Fait — 1 mode | `M4x4Activity.java` |
| 5×5 | ✅ Fait — 2 modes (Base / Askandria) | `M5x5Activity.java` |
| 6×6 | ✅ Fait — 1 mode | `M6x6Activity.java` |
| 7×7 | ✅ Fait — 1 mode | `M7x7Activity.java` |
| 8×8 | ✅ Fait — 1 mode (validation min. 252) | `M8x8Activity.java` |
| 9×9 | ⚠️ Fait — mais 9 cases sur 81 restent vides (inachevé dans l'original) | `M9x9Activity.java` |
| 10×10 | ⚠️ Jamais implémenté dans l'app d'origine — page qui le documente honnêtement | `M10x10Activity.java` |

Les 8 tailles sont maintenant couvertes. Les deux dernières lignes ne
sont pas des limites du portage web : ce sont des lacunes réelles de
l'app Android elle-même, reproduites fidèlement plutôt que masquées.

Chaque taille restante a probablement ses propres formules et modes —
il faut lire le fichier Java correspondant avant de l'implémenter, pour
ne pas deviner les calculs.

## Choix faits pendant le portage

- **Troncature** : le cast `(long)` de Java (troncature vers zéro) est
  reproduit exactement via `Math.trunc()` dans `lib/wafq.ts`, pour ne
  pas changer les résultats numériques.
- **Ordre visuel des cases** : vérifié dans les XML d'origine
  (`ghaz1.xml`, `m4x4.xml`) plutôt que supposé — l'ordre des variables
  (`e1`..`e9`, `textview1`..`textview16`) ne correspond pas à l'ordre
  d'affichage réel.
- **Bug corrigé (mode Bayt du 3x3)** : dans l'app d'origine, le champ
  "entrée" avait un TextWatcher qui s'auto-multipliait par 3 sur
  chaque frappe (bug d'auto-référence). Ici, l'UI propose "entrée = 3 ×
  hajah" comme suggestion au lieu de le faire automatiquement et de
  façon incontrôlée.
- **Chaînage 3x3 → 5x5 découvert** : le mode "Mouhamass" du 3x3
  redirige dans l'app d'origine vers le 5x5 en pré-remplissant ses 4
  valeurs "Askandria" (feu/terre/air/eau = t8/t4/t21/t17). Ce chaînage
  n'est pas encore câblé dans cette version web (chaque page reste
  indépendante), mais le mode "Askandria" du 5x5 est bien implémenté et
  utilisable seul.
- **9x9 incomplet dans l'app d'origine** : `M9x9Activity.java` remplit
  les cases `textview1` à `textview72` puis s'arrête sur un
  commentaire `//KASR`, sans jamais rien assigner à `textview73`
  jusqu'à `textview81`. Ces 9 cases sont donc restées vides à vie dans
  l'app Android elle-même — ce n'est pas une limite du portage web.
  `carre9()` reproduit fidèlement ce comportement (9 cases à `null`)
  plutôt que d'inventer une formule pour les compléter.
- **10x10 jamais implémenté** : `M10x10Activity.java` (401 lignes)
  déclare les 100 cases et un bouton, mais le `onClick` est un bloc
  vide et `Double.parseDouble` n'apparaît nulle part dans le fichier.
  La page `/carre/10` documente cette lacune plutôt que d'inventer une
  formule à 100 cases.
- **Hatim triangulaire (4e mode du 3x3)** : absent de l'app Android
  d'origine, pas de code Java à porter. Structure reconstruite et
  vérifiée à partir d'un exemple fourni par l'utilisateur (sommet=200,
  base gauche=150, base droite=250, D=644) : un triangle extérieur
  dont le triangle médian intérieur relie les milieux des 3 côtés, où
  les 6 lignes droites du diagramme (3 côtés extérieurs + 3 côtés
  intérieurs) somment toutes exactement à D. Comme pour Ghazaly, une
  seule valeur suffit : elle devient directement D.
  **Bug corrigé** : départager les 3 sommets extérieurs en 3 valeurs
  consécutives autour de D/3 provoquait des répétitions massives dans
  les 6 cases restantes (démontré avec D=9 : seulement 3 valeurs
  distinctes, chacune répétée 3 fois). Il se trouve que la somme des 3
  sommets extérieurs est mathématiquement fixée par la structure quelle
  que soit D (= un tiers de la somme totale des 9 cases), ce qui borne
  D à [12, 18] pour une solution 100% unique avec les chiffres 1 à 9 —
  et une recherche exhaustive montre que seuls D = 12, 14, 16 et 18 ont
  effectivement une solution (exactement les 4 exemples de l'image de
  référence d'origine). L'utilisateur a ensuite fourni cette image en
  haute résolution : les 4 triangles D:12/14/16/18 y sont reproduits
  EXACTEMENT dans `hatimTriangulaire()` (table `HATIM_TRIANGLE_EXACT`),
  chiffre pour chiffre — au passage, vérifié que D:18 est le complément
  exact de D:12 et D:16 celui de D:14 (chaque case = 10 − la case
  correspondante, conséquence directe de Souter = 15). Pour un D hors
  de ces 4 valeurs, généralisation par décalage uniforme d'une des 3
  solutions de référence (une par reste modulo 3) — même principe que
  `carre10()` / `carre11()` / `diamond8()` — ce qui garantit les 9
  valeurs toujours distinctes et les 6 lignes toujours égales à D,
  quelle que soit la valeur entrée.

## Architecture

- `lib/wafq.ts` — moteur de calcul pur (aucune dépendance UI), une
  fonction par mode.
- `components/GridCell.tsx`, `components/PorteCarre.tsx` — UI partagée
  aux carrés ; `components/MagicDiamond.tsx` et
  `components/HatimTriangleGrid.tsx` — rendu SVG dédié aux formes
  hors grille (losange, triangle intérieur du mode Hatim).
- `app/carre/3/page.tsx` — 4 modes (Wilaya / Ghazaly / Bayt / Hatim
  triangulaire), `app/carre/4/page.tsx` — pages dédiées (client
  components, formulaire + calcul).
- `app/carre/[size]/page.tsx` — placeholder pour les tailles non
  encore portées.
