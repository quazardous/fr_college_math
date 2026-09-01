---
titre: Séance de révision 3e
surtitre: Une heure · 3e
accroche: >-
  Six séries chronométrées sur les notions propres à la 3e. Chaque série
  ratée renvoie à sa fiche — et aux fiches de 4e dès qu'un appui plus ancien
  lâche.
niveaux: [3e]
priorite: 3
pourquoi: >-
  Dernière année du cycle : tout ce qui traîne encore se paiera au lycée.
duree: 60 min
domaine: Révision générale
nomcourt: Séance 1 h · 3e
---

## Arithmétique

*8 minutes. Sans calculatrice.*

::: exo Diviseurs et nombres premiers
a) Écris la liste de tous les diviseurs de 60.

b) 91 est-il un nombre premier ? Justifie.
:::

::: exo Décomposer
Décompose 84 et 180 en produit de facteurs premiers.
:::

::: exo Rendre irréductible
a) Déduis-en le PGCD de 84 et 180.

b) Rends la fraction $\dfrac{84}{180}$ irréductible.
:::

## Calcul littéral et équations

*12 minutes.*

::: exo Développer
a) $(x+3)(x-5)$ \qquad b) $(2x-1)(x+4)$
:::

::: exo Les identités remarquables
a) $(x+5)^{2}$ \qquad b) $(x-3)^{2}$ \qquad c) $(x+7)(x-7)$
:::

::: exo Factoriser
a) $x^{2}-49$ \qquad b) $4x^{2}-9$ \qquad c) $x^{2}+6x+9$
:::

::: exo Équation produit
Résous $(x-2)(3x+9) = 0$.
:::

::: exo Mettre en équation
On augmente le côté d'un carré de 3 cm. Le nouveau carré a une aire de 64 cm².

Quel était le côté du carré de départ ? Pose une équation avant de calculer.
:::

## Fonctions

*10 minutes.*

::: exo Image et antécédent
Soit $f$ la fonction définie par $f(x) = 3x-5$.

a) Calcule $f(4)$ et $f(-2)$.

b) Quel est l'antécédent de 10 par $f$ ?
:::

::: exo Linéaire, affine, constante
Parmi $f(x) = 2x+1$, $g(x) = -3x$ et $h(x) = 5$, laquelle est linéaire ?
laquelle est constante ? Que peut-on dire des trois ?
:::

::: exo Lire un graphique
La droite ci-dessous représente une fonction affine $f$.

```tikz
\begin{tikzpicture}[x=7mm,y=7mm]
  \draw[quadrillage] (0,0) grid (6,5);
  \draw[figaccent,-{Stealth[length=2mm]}] (0,0) -- (6.7,0) node[figleg,right] {$x$};
  \draw[figaccent,-{Stealth[length=2mm]}] (0,0) -- (0,5.7) node[figleg,above] {$y$};
  \foreach \i in {1,...,6} \node[figval,below=0.4mm] at (\i,0) {\i};
  \foreach \j in {1,...,5} \node[figval,left=0.4mm]  at (0,\j) {\j};
  \node[figval,below left=0.4mm] at (0,0) {0};
  \draw[figfort,line width=1.1pt] (0,1) -- (6,4);
  \fill[prioritetrois] (0,1) circle (0.8mm);
  \node[figleg,text=prioritetrois,right=1mm] at (6,4) {$\mathcal{C}_f$};
\end{tikzpicture}
```

a) Lis l'image de 4. \qquad b) Lis l'antécédent de 4.

c) Donne l'expression de $f(x)$.
:::

::: exo Une remise, c'est une fonction
Un magasin baisse tous ses prix de 20 %.

a) Exprime le nouveau prix $p(x)$ en fonction de l'ancien prix $x$.

b) Un article affiché 45 € : quel est son prix après remise ?

c) Un article payé 52 € après remise : quel était son prix affiché ?
\lignes[3]
:::

## Thalès et trigonométrie

*12 minutes. Calculatrice autorisée.*

::: exo Calculer avec Thalès
Dans la figure ci-dessous, $(MN)$ et $(BC)$ sont parallèles.

```tikz
\begin{tikzpicture}[x=10mm,y=10mm]
  \coordinate (A) at (0,4);
  \coordinate (B) at (-2.2,0);
  \coordinate (C) at (3.4,0);
  \coordinate (M) at ($(A)!0.4!(B)$);
  \coordinate (N) at ($(A)!0.4!(C)$);
  \fill[accentclair,opacity=0.6] (A)--(B)--(C)--cycle;
  \draw[fig] (A)--(B)--(C)--cycle;
  \draw[figfort,line width=1.1pt] (M)--(N);
  \fill[encre] (M) circle (0.7mm);
  \fill[encre] (N) circle (0.7mm);
  \node[figleg,above]      at (A) {$A$};
  \node[figleg,below left] at (B) {$B$};
  \node[figleg,below right]at (C) {$C$};
  \node[figleg,left=0.8mm] at (M) {$M$};
  \node[figleg,right=0.8mm]at (N) {$N$};
\end{tikzpicture}
```

On sait que $AM = 4$ cm, $AB = 10$ cm et $MN = 6$ cm.

Calcule $BC$.
:::

::: exo Parallèles ou non
Sur une autre figure, $M$ appartient à $[AB]$ et $N$ à $[AC]$, avec
$AM = 3$ cm, $AB = 7{,}5$ cm, $AN = 4$ cm et $AC = 10$ cm.

Les droites $(MN)$ et $(BC)$ sont-elles parallèles ? Rédige la justification
en entier.
:::

::: exo Calculer un côté
$ABC$ est rectangle en $B$. L'angle $\widehat{BAC}$ mesure $35°$ et
$AC = 8$ cm.

```tikz
\begin{tikzpicture}[x=6mm,y=6mm]
  \coordinate (A) at (0,0);
  \coordinate (B) at (6.55,0);
  \coordinate (C) at (6.55,4.59);
  \fill[accentclair,opacity=0.6] (A)--(B)--(C)--cycle;
  \draw[fig] (A)--(B)--(C)--cycle;
  \draw[fig] (6.55,0.55) -- (6.0,0.55) -- (6.0,0);
  \pic[draw=accent,line width=0.8pt,angle radius=8mm,
       "{\footnotesize$35^\circ$}",angle eccentricity=1.55] {angle=B--A--C};
  \node[figleg,below left]  at (A) {$A$};
  \node[figleg,below right] at (B) {$B$};
  \node[figleg,above right] at (C) {$C$};
  \node[figcote,text=prioritetrois,rotate=35] at (2.85,2.68) {8 cm};
\end{tikzpicture}
```

Calcule $AB$, arrondi au dixième de centimètre.
:::

::: exo Calculer un angle
$RST$ est rectangle en $R$, avec $RS = 5$ cm et $RT = 12$ cm.

Calcule la mesure de l'angle $\widehat{RST}$, arrondie au degré.
:::

## Puissances et grandeurs

*8 minutes.*

::: exo Notation scientifique
Écris en notation scientifique.

a) $0{,}000\,45$ \qquad b) $32\,000\,000$
:::

::: exo Calculer avec les puissances
Donne le résultat en notation scientifique.

a) $(2\times 10^{5})\times(3\times 10^{-2})$ \qquad
b) $\dfrac{6\times 10^{8}}{4\times 10^{3}}$
:::

::: exo Agrandir un solide
Un cube a 4 cm d'arête. On l'agrandit dans le rapport 3.

a) Quelle est l'arête du cube agrandi ?

b) Par combien l'aire d'une face est-elle multipliée ? Et le volume ?

c) Donne le volume du cube agrandi.
\lignes[3]
:::

## Statistiques et probabilités

*10 minutes.*

::: exo Une série de notes
$7$ ; $12$ ; $15$ ; $9$ ; $12$ ; $18$ ; $11$ ; $14$.

Calcule la moyenne, la médiane et l'étendue.
:::

::: exo Une urne
Une urne contient 5 boules rouges, 3 vertes et 2 bleues, indiscernables au
toucher. On en tire une au hasard.

a) Quelle est la probabilité de tirer une rouge ?

b) Quelle est la probabilité de ne pas tirer une bleue ?
:::

::: exo Deux lancers
On lance deux fois de suite une pièce équilibrée.

a) Représente la situation par un arbre.

b) Quelle est la probabilité d'obtenir deux fois pile ?

c) Quelle est la probabilité d'obtenir au moins une fois face ?
\lignes[4]
:::
