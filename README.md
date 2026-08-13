# Fiches de révision — mathématiques 6e, 5e et 4e

Treize fiches de cours, deux séances chronométrées et un recueil de problèmes,
produits en **PDF A4** prêts à imprimer. Contenu calé sur les programmes
officiels :

- **6e** — arrêté du 10 avril 2025, programme de mathématiques du cycle 3
  (BO n° 16 du 17 avril 2025) ;
- **5e et 4e** — arrêté du 18 février 2026, programme du cycle 4
  (BO n° 10 du 5 mars 2026).

Le vocabulaire des rubriques reprend celui des textes officiels :
*Automatismes*, *Objectifs d'apprentissage*, *Prolongements possibles*.
La seule couche ajoutée est l'**indice de priorité**, signalé comme tel.

## Produire les PDF

```bash
./build.sh              # tout
./build.sh 03           # seulement ce dont le nom contient « 03 »
```

Les PDF arrivent dans `pdf/`. Commencer par `pdf/00-sommaire.pdf`, qui dit
dans quel ordre lire les autres.

Prérequis : `node` et [Tectonic](https://tectonic-typesetting.github.io).
Aucune installation de TeX Live n'est nécessaire — Tectonic est un binaire
unique qui télécharge à la demande les seuls paquets utilisés :

```bash
curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh
mv tectonic ~/.local/bin/
```

## Comment c'est fait

```
design.yaml          jetons de design : polices, tailles, couleurs, marges
      │
      ├─ tools/design.mjs ──────────────►  latex/design.tex
      │
fiches/*.md          une fiche = un Markdown + son en-tête YAML
problemes/*.md       séance d'une heure, énoncés et corrigé
problemes/recueil/   un fichier par problème
      │
      ├─ tools/fiche2tex.mjs ───────────►  build/*.tex
      ├─ tools/recueil.mjs ─────────────►  build/recueil*.tex
      ├─ tools/sommaire.mjs ────────────►  build/00-sommaire.tex
      │
      └─ tectonic (XeLaTeX) ────────────►  pdf/*.pdf

latex/fiche.cls      structure et mise en page — aucune valeur de style
latex/figures.sty    figures TikZ réutilisables
```

**Aucune valeur de style n'est écrite dans le LaTeX.** Polices, tailles,
couleurs et marges vivent dans `design.yaml` ; `tools/design.mjs` les traduit
en commandes LaTeX. Changer une taille de police, c'est éditer une ligne de
YAML et relancer `./build.sh`.

De même, `pdf/00-sommaire.pdf` est **engendré** depuis les en-têtes des fiches :
modifier la priorité d'une fiche met la carte des révisions à jour toute seule.

Le pied de page dit deux choses différentes selon la page :

- **page 1** — la *version* du document, déclarée par `version:` dans l'en-tête
  YAML (`1.0` par défaut). Le titre étant déjà en grand juste au-dessus, la
  place est libre pour dire quel tirage on a entre les mains ;
- **pages suivantes** — le *nom court*, pour qu'une feuille détachée reste
  identifiable. Il se déduit du surtitre (`Fiche 1 · Nombres et calculs` donne
  l'étiquette `Fiche 1`), ou se fixe avec `nomcourt:`.

La version ne bouge pas toute seule : c'est à l'auteur de l'incrémenter quand
le contenu change. Une version qui s'incrémenterait à chaque compilation ne
distinguerait plus une correction d'une simple réimpression.

## Écrire une fiche

Un fichier `fiches/NN-nom.md`, avec un en-tête YAML puis du Markdown étendu.

```markdown
---
titre: Les nombres relatifs
surtitre: Fiche 4 · Nombres et calculs
accroche: La grande nouveauté de la 5e.
niveaux: [5e]
priorite: 2          # 3 incontournable · 2 important · 1 complément
nomcourt: Fiche 4 · Relatifs   # pied de page dès la page 2 (facultatif)
version: 1.0                   # affichée en pied de page 1 (défaut : 1.0)
pourquoi: Notion neuve, sans laquelle rien ne fonctionne en 4e.
duree: 25 min
domaine: Nombres et calculs

automatismes:
  colonnes: 2
  items:
    - "5e | Soustraire, c'est ajouter l'opposé"
    - "règle | L'opposé de $-7$ est $+7$"

videos:
  - id: 9L4lz1NMPoY
    titre: Additions et soustractions de relatifs
    chaine: Yvan Monka
    duree: "8:47"
    vues: "1 100 000"
---

## Un titre de section

Du texte avec du **gras**, de l'*italique* et des maths : $\frac34 + \frac58$.

::: piege
Ce qui se trompe une fois sur trois.
:::

:cols G{30mm} Y Y
| Colonne | Deux | Trois |
|---|---|---|
| a | b | c |

!fig \droitegradueerelatifs{-5}{5}{-3/$-3$, 2/$+2$}
```

### La syntaxe en une page

| Écriture | Effet |
|---|---|
| `## Titre` / `### Titre` | section / sous-section |
| `**gras**` `*italique*` `` `code` `` | mise en forme |
| `$…$` et `$$…$$` | maths en ligne et centrées (LaTeX brut) |
| `- item` / `1. item` | listes |
| `::: type Titre … :::` | encadré : `definition`, `retenir`, `methode`, `piege`, `prolongement`, `exo`, `solution` |
| `:cols G{30mm} Y Y` | largeurs du tableau qui suit (`G` fixe, `Y` extensible, `Z` centrée) |
| `\| a \| b \|` | tableau, première ligne en en-tête |
| `!fig \macro{…}` | figure centrée |
| `!saut` | saut de page |
| `[[6e]]` `[[5e]]` `[[4e]]` | pastille de niveau, teinte croissante |
| `->` | flèche |
| `6e` `5e` | exposant automatique |
| `// texte` | commentaire, absent du PDF |

Tout ce que le précompilateur ne reconnaît pas est transmis tel quel à LaTeX :
on peut toujours descendre d'un cran quand c'est nécessaire.

**Une seule restriction** : pas de `[[5e]]` dans le *titre* d'un encadré.
Ces titres passent par `\MakeUppercase`, qui abîmerait le nom de couleur de la
pastille. Dans le corps de l'encadré, ou dans un titre de section, aucun souci.

### Les figures disponibles

`\droitegraduee` · `\droitegradueerelatifs` · `\schemabarres` · `\repereplan`
· `\pavedroit` · `\cylindrerev` · `\prismedroit` · `\disqueraye`
· `\triangleangles` · `\droitesparalleles` · `\tableaupropo`
· `\tableaunumeration` · `\tableaucarres`

Elles sont définies et documentées dans `latex/figures.sty`.

## Ajouter un problème au recueil

Un fichier `problemes/recueil/NN-nom.md`. Le préfixe numérique fixe l'ordre :
`1x` applications guidées, `2x` problèmes à étapes, `3x` problèmes ouverts.

```markdown
---
titre: Le refuge de montagne
type: ouvert          # application · etapes · ouvert
difficulte: 4         # de 1 à 5
duree: 15 min
notions: [proportionnalité, volumes, durées]
---

L'énoncé, sans questions intermédiaires.

::: solution
Un chemin possible.
:::
```

`tools/recueil.mjs` en tire **deux** PDF depuis cette source unique :
`pdf/recueil.pdf` (énoncés seuls, avec sommaire et jauges de difficulté) et
`pdf/recueil-corrige.pdf`.

## Les vidéos

Chaque QR code pointe vers une vidéo réelle : les identifiants proviennent des
résultats de recherche de YouTube, jamais d'une reconstitution. Le premier lot
(6e et 5e) a en plus été recoupé un par un via l'API oEmbed. Critères de choix :
chaîne de référence (Yvan Monka, Les Bons Profs, Hedacademy, Maître Lucas,
Paul Olivier), format court — autour de cinq minutes, dix au plus.

`tools/yt-search.mjs "requête"` liste des candidats avec durée et nombre de vues.

## Deux échelles visuelles, à ne pas confondre

| Échelle | Palette | Ce qu'elle dit |
|---|---|---|
| **Priorité** | rouge / ambre / bleu-gris, jauge à 3 crans | ce qui rapporte le plus à réviser |
| **Niveau** | trois teintes du bleu d'accent, pastille | l'année où la notion est au programme |

Elles sont délibérément distinctes : une notion de 4e n'est pas plus importante
qu'une notion de 6e, elle est seulement plus tardive.
