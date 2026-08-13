# Développement

La chaîne de production des PDF : d'où viennent les sources, comment elles se
compilent, et où se posent les valeurs de style. Pour le contenu lui-même —
ce que sont les fiches et à qui elles s'adressent — voir le
[README](README.md) ; pour proposer une modification,
[CONTRIBUTING.md](CONTRIBUTING.md).

Le principe qui gouverne tout le dépôt : **rien n'est saisi deux fois.** Une
durée, une priorité, un niveau, une couleur ne sont écrits qu'à un seul
endroit, et tout ce qui en dépend s'en déduit à la construction.

## L'arborescence

```
contenu/      les sources, et rien d'autre
  fiches/       les fiches de cours
  seances/      les séances chronométrées et leurs corrigés
  problemes/    le recueil, un fichier par problème
latex/        classe, figures, jetons engendrés
web/          la feuille de style du site
tools/        la chaîne de production
build/        TOUT ce qui est engendré — le seul dossier ignoré par git
  tex/          les .tex intermédiaires
  pdf/          les PDF
  site/         le site déployé sur Pages
  html/         le fichier unique, hors ligne
```

Un `rm -rf build` ne détruit rien d'irremplaçable : tout s'y reconstruit.

## Prérequis

Prérequis : `node`, `poppler-utils` et
[Tectonic](https://tectonic-typesetting.github.io).
Aucune installation de TeX Live n'est nécessaire — Tectonic est un binaire
unique qui télécharge à la demande les seuls paquets utilisés :

```bash
curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh
mv tectonic ~/.local/bin/
```

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
- **`pdf/math-college-fr-complet.pdf`** — le classeur entier en un seul
  document, engendré depuis les **mêmes sources**, avec un sommaire donnant
  les numéros de page.

Un document n'est reconstruit que si sa source, ou l'un des fichiers du socle
(classe LaTeX, figures, `design.yaml`, précompilateur), est plus récent que son
PDF. Retoucher une fiche ne relance donc qu'une compilation. Les documents
agrégés dépendent de plus de choses : le sommaire et le classeur complet
vieillissent dès qu'un en-tête YAML bouge quelque part, le recueil dès qu'un
problème change.

## Vérifier les PDF

```bash
npm run check           # ou : node tools/verifier.mjs build/pdf/*.pdf
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

## Comment c'est fait

```
design.yaml               jetons de design : polices, tailles, couleurs
      ├─ tools/design.mjs ─────────────►  latex/design.tex   (LaTeX)
      └─ tools/design.mjs --css ───────►  build/site/design.css

contenu/fiches/*.md       une fiche = un Markdown + son en-tête YAML
contenu/seances/*.md      une séance d'une heure, et son corrigé
contenu/problemes/*.md    un fichier par problème du recueil
      │
      ├─ tools/balisage.mjs ── l'analyse, commune aux deux sorties
      │     ├─ tools/fiche2tex.mjs ────►  build/tex/*.tex ─(tectonic)─► build/pdf/*.pdf
      │     └─ tools/fiche2html.mjs ───►  build/site/*.html
      │
      ├─ tools/recueil.mjs ────────────►  build/tex/recueil*.tex
      ├─ tools/sommaire.mjs ───────────►  build/tex/00-sommaire.tex
      ├─ tools/complet.mjs ────────────►  build/tex/math-college-fr-complet.tex
      ├─ tools/figures.mjs ────────────►  build/site/figures/*.svg
      └─ tools/site.mjs ───────────────►  build/site/  et  build/html/

latex/fiche.cls           structure et mise en page — aucune valeur de style
latex/figures.sty         figures TikZ réutilisables
web/style.css             la seule feuille de style écrite à la main
```

**Aucune valeur de style n'est écrite dans le LaTeX.** Polices, tailles,
couleurs et marges vivent dans `design.yaml` ; `tools/design.mjs` les traduit
en commandes LaTeX. Changer une taille de police, c'est éditer une ligne de
YAML et relancer `./build.sh`.

De même, `pdf/00-sommaire.pdf` est **engendré** depuis les en-têtes des fiches :
modifier la priorité d'une fiche met la carte des révisions à jour toute seule.

`pdf/math-college-fr-complet.pdf` recycle la chaîne entière plutôt que d'en
doubler une partie : `tools/complet.mjs` fait précompiler chaque source comme
d'habitude, récupère de chacune son préambule de métadonnées et son corps, puis
rejoue les métadonnées avant chaque `\entetefiche`. Les cartouches, les jauges
et les pieds de page suivent donc document par document, et le sommaire — celui
de `tools/sommaire.mjs`, avec une colonne en plus — pointe des `\pageref` vers
les ancres posées à chaque changement de document.

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

Dans `math-college-fr-complet.pdf`, cette règle s'inverse : la version, la date
de tirage, l'auteur, l'adresse du dépôt et les licences sont annoncés une fois
sur
la **page de garde**, et chaque première page de document garde donc son titre
en pied — c'est ce que fait `\sanspiedversion`. L'auteur et l'adresse du dépôt
ne sont pas saisis dans le générateur : ils sont lus dans `package.json`, seul
endroit du projet qui les déclare déjà.

## Écrire une fiche

Un fichier `contenu/fiches/NN-nom.md`, avec un en-tête YAML puis du Markdown étendu.

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

liens:                           # sites à visiter — même carte que les vidéos
  - url: https://scratch.mit.edu
    titre: Scratch — programmer par blocs
    source: MIT Media Lab
    image: https://scratch.mit.edu/images/scratch-og.png   # facultatif, distante
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
| `[texte](https://…)` | lien — coloré et cliquable dans le PDF, cliquable sur le site |
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

Un style s'y ajoute, pour les figures écrites à la main : `quadrillage`.

```latex
\draw[quadrillage] (0,0) grid (6,5);
```

Le `step` de TikZ vaut **1 cm par défaut, indépendamment de `x=` et `y=`** :
un repère posé en `x=8mm` voit donc ses traits dériver des graduations, d'un
millimètre à chaque case. Le style lit l'unité réelle de la figure, et reste
aligné quelle que soit l'échelle.

Deux réflexes du même ordre, pour les cotes :

- une cote le long d'un segment se pose avec `sloped` sur le chemin lui-même,
  jamais avec un `rotate=` calculé à la main — un angle recopié finit par
  croiser le trait qu'il devait longer ;
- deux cotes du même côté d'un solide finissent par se recouvrir : une par
  direction, et chacune de son côté.

Pour une figure unique à un seul document — la plupart des figures de problèmes —
mieux vaut un bloc ` ```tikz ` que d'enrichir la bibliothèque. Le bloc brut est
d'ailleurs **obligatoire** dans ce cas : hors de lui, le précompilateur
transformerait `->` en flèche et échapperait les `%` des commentaires TikZ.

## Ajouter un problème au recueil

Un fichier `contenu/problemes/NN-nom.md`. Le préfixe numérique fixe l'ordre :
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

## Le site

```bash
node tools/site.mjs          # engendre site/
python3 -m http.server -d site 8765
```

Troisième sortie des mêmes sources, après le PDF séparé et le classeur relié.
`tools/balisage.mjs` analyse le Markdown une seule fois ; `fiche2tex.mjs` en
émet du LaTeX, `fiche2html.mjs` du HTML. Il n'y a donc qu'une grammaire, et
rien ne peut diverger entre le PDF et le site.

Ce que le site règle, et que le PDF ne peut pas :

- **les figures TikZ** ne tournent pas dans un navigateur. `tools/figures.mjs`
  les compile toutes en **une seule passe** — le paquet `preview` en mode
  `tightpage` donne une page par figure — puis `pdftocairo` en tire des SVG où
  le texte est vectorisé : aucune police à télécharger. Le nom du fichier porte
  le document d'origine et la macro, et le SVG embarque le LaTeX qui l'a
  produit, dans ses balises `<title>` et `<desc>` ;
- **les maths** sont rendues à la construction par KaTeX, en **MathML**. Le
  lecteur ne télécharge ni script ni police mathématique : le navigateur fait
  le rendu lui-même ;
- **les QR codes** deviennent des liens, avec une vignette récupérée une fois
  et servie depuis le site — aucune requête vers YouTube au chargement ;
- **le style** vient de `design.yaml`, traduit en propriétés CSS par
  `tools/design.mjs --css`. `web/style.css` est la seule feuille écrite à la
  main, et ne contient aucune couleur littérale.

Un service worker met les 120 fichiers en cache à la première visite : le site
se lit sans réseau, et s'installe comme une application. Le nom du cache porte
l'empreinte du contenu, si bien qu'une nouvelle version remplace l'ancienne.

`site/` est engendré, et ignoré par git au même titre que `build/` et `pdf/`.

## Publier

`pdf/` n'est pas versionné : les PDF sont engendrés depuis les sources et
publiés en actifs de release.

```bash
git tag v1.2 && git push origin v1.2
```

`.github/workflows/pdf.yml` installe Tectonic, construit tout, vérifie les PDF
et les attache à la release. Il déploie aussi le site sur **GitHub Pages** —
à chaque poussée sur `main`, tag ou non. Un déclenchement manuel du workflow produit les
mêmes fichiers en artefact du run, sans créer de release.

Les numéros de version des documents — la mention `version 1.0 · CC BY-SA 4.0`
en pied de première page — sont **indépendants** des tags. Le tag nomme un lot
publié ; `version:` nomme le tirage d'un document, et c'est à l'auteur de
l'incrémenter quand le contenu de ce document change. Une version qui
s'incrémenterait à chaque compilation ne distinguerait plus une correction
d'une simple réimpression.

Pour changer le titulaire des droits, éditer les deux fichiers de licence ;
pour changer la licence affichée, la constante `\@licencedoc` dans
`latex/fiche.cls`, ou `licence:` dans l'en-tête d'un document précis.
