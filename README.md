# Fiches de révision — mathématiques 6e, 5e, 4e et 3e

Dix-neuf fiches de cours, quatre séances chronométrées — une par classe — et un
recueil de problèmes, produits en **PDF A4** prêts à imprimer. Contenu calé sur
les programmes officiels :

- **6e** — arrêté du 10 avril 2025, programme de mathématiques du cycle 3
  (BO n° 16 du 17 avril 2025) ;
- **5e, 4e et 3e** — arrêté du 18 février 2026, programme du cycle 4
  (BO n° 10 du 5 mars 2026).

Le vocabulaire des rubriques reprend celui des textes officiels :
*Automatismes*, *Objectifs d'apprentissage*, *Prolongements possibles*.
La seule couche ajoutée est l'**indice de priorité**, signalé comme tel.

## Produire les PDF

```bash
./build.sh              # tout ce qui a changé
./build.sh 03           # seulement ce dont le nom contient « 03 »
./build.sh --force      # tout recompiler, sans regarder les dates
JOBS=4 ./build.sh       # brider le parallélisme (défaut : nproc)
```

Les PDF arrivent dans `pdf/`. Deux entrées possibles :

- **`pdf/00-sommaire.pdf`** — la carte des révisions, qui dit dans quel ordre
  lire les autres ;
- **`pdf/00-complet.pdf`** — le classeur entier en un seul document, engendré
  depuis les **mêmes sources**, avec un sommaire donnant les numéros de page.

Un document n'est reconstruit que si sa source, ou l'un des fichiers du socle
(classe LaTeX, figures, `design.yaml`, précompilateur), est plus récent que son
PDF. Retoucher une fiche ne relance donc qu'une compilation. Les documents
agrégés dépendent de plus de choses : le sommaire et le classeur complet
vieillissent dès qu'un en-tête YAML bouge quelque part, le recueil dès qu'un
problème change.

`pdf/` n'est **pas versionné** : les PDF sont engendrés depuis les sources et
publiés en actifs de release. Pour les récupérer sans rien installer, prendre
la [dernière release](../../releases/latest). Pour en publier un lot :

```bash
git tag v1.1 && git push origin v1.1
```

`.github/workflows/pdf.yml` construit alors tout et attache les PDF à la
release `v1.1`. Un déclenchement manuel du workflow produit les mêmes fichiers
en artefact du run, sans créer de release.

## Vérifier les PDF

```bash
npm run check           # ou : node tools/verifier.mjs pdf/*.pdf
```

Une compilation verte ne garantit pas un PDF sain. `tools/verifier.mjs`
reprend les fichiers produits et cherche trois défauts que Tectonic laisse
passer sans rien dire :

- les **renvois non résolus** — un `\pageref` resté à `??` ;
- les **polices non embarquées**, qui feraient rendre le document autrement
  ailleurs ;
- les **signets pollués** : hyperref écrit les titres du panneau de navigation
  en texte pur, et toute commande non neutralisée par
  `\pdfstringdefDisableCommands` y apparaît en clair (`color push rgb 0.10196…`
  au lieu de `4e Multiplier et diviser`). Ce défaut-là ne se voit jamais à
  l'impression.

`build.sh` signale en plus les **caractères absents des polices** — ceux que
XeTeX remplace silencieusement par un carré vide. Le contrôle tourne aussi
dans la CI, avant la publication de la release.

Prérequis : `node`, `poppler-utils` et
[Tectonic](https://tectonic-typesetting.github.io).
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
      ├─ tools/complet.mjs ─────────────►  build/00-complet.tex
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

`pdf/00-complet.pdf` recycle la chaîne entière plutôt que d'en doubler une
partie : `tools/complet.mjs` fait précompiler chaque source comme d'habitude,
récupère de chacune son préambule de métadonnées et son corps, puis rejoue les
métadonnées avant chaque `\entetefiche`. Les cartouches, les jauges et les
pieds de page suivent donc document par document, et le sommaire — celui de
`tools/sommaire.mjs`, avec une colonne en plus — pointe des `\pageref` vers les
ancres posées à chaque changement de document.

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

Dans `00-complet.pdf`, cette règle s'inverse : la version, la date de tirage,
l'auteur, l'adresse du dépôt et les licences sont annoncés une seule fois sur
la **page de garde**, et chaque première page de document garde donc son titre
en pied — c'est ce que fait `\sanspiedversion`. L'auteur et l'adresse du dépôt
ne sont pas saisis dans le générateur : ils sont lus dans `package.json`, seul
endroit du projet qui les déclare déjà.

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
licence: CC BY-SA 4.0          # facultatif, écrase la licence du projet
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
| `!fig \macro{…}` | figure centrée, tirée de `figures.sty` |
| ` ```tikz … ``` ` | figure TikZ écrite à la main, centrée |
| ` ```latex … ``` ` | LaTeX brut, transmis tel quel |
| `!saut` | saut de page |
| `✔` | coche de contrôle (relayée par `\coche`, aucune police du document n'ayant le glyphe) |
| `[[6e]]` `[[5e]]` `[[4e]]` `[[3e]]` | pastille de niveau, teinte croissante |
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
· `\tableaunumeration` · `\tableaucarres` · `\trianglepythagore`
· `\figuretranslation` · `\droitedesmilieux` · `\configthales`
· `\configpapillon` · `\triangletrigo` · `\carreidentite`

Elles sont définies et documentées dans `latex/figures.sty`.

Pour une figure unique à un seul document — la plupart des figures de problèmes —
mieux vaut un bloc ` ```tikz ` que d'enrichir la bibliothèque. Le bloc brut est
d'ailleurs **obligatoire** dans ce cas : hors de lui, le précompilateur
transformerait `->` en flèche et échapperait les `%` des commentaires TikZ.

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
| **Niveau** | quatre teintes du bleu d'accent, pastille | l'année où la notion est au programme |

Elles sont délibérément distinctes : une notion de 4e n'est pas plus importante
qu'une notion de 6e, elle est seulement plus tardive.

## Licence

Double licence, parce que le code et le contenu n'ont pas les mêmes usages :

| Ce qui est couvert | Licence | Fichier |
|---|---|---|
| Fiches, énoncés, corrigés (`fiches/`, `problemes/`, PDF publiés) | **CC BY-SA 4.0** | [`LICENSE-CONTENU.md`](LICENSE-CONTENU.md) |
| Classe LaTeX, figures, chaîne de production | **MIT** | [`LICENSE`](LICENSE) |

Ni l'une ni l'autre ne s'étend aux **vidéos** pointées par les QR codes, qui
restent la propriété de leurs auteurs. Les **programmes officiels** sur lesquels
s'appuie le contenu sont des actes officiels, librement réutilisables. Les
**polices** embarquées (GUST Font License, SIL OFL 1.1) autorisent
l'embarquement sans rien imposer au document.

La mention `version 1.0 · CC BY-SA 4.0` apparaît en pied de la première page de
chaque PDF. Pour changer le titulaire des droits, éditer les deux fichiers de
licence ; pour changer la licence affichée, la constante `\@licencedoc` dans
`latex/fiche.cls`, ou `licence:` dans l'en-tête d'un document précis.
