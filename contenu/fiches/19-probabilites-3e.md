---
titre: Probabilités à deux épreuves
surtitre: Fiche 19 · Données et probabilités — 3e
accroche: >-
  Une seule idée neuve par rapport à la 4e : quand l'expérience se fait en deux
  temps, on dessine l'arbre de tous les chemins possibles — et un chemin, ça se
  multiplie.
niveaux: [3e]
priorite: 1
pourquoi: Peu de contenu, mais un raisonnement qui se retrouve tel quel en seconde.
duree: 25 min
domaine: Données et probabilités

notions:
  - probabilité
  - événement
  - événement contraire
  - expérience à deux épreuves
  - arbre de probabilité
  - tableau à double entrée
  - tirage avec remise
  - tirage sans remise
  - équiprobabilité

automatismes:
  colonnes: 2
  items:
    - "4e | Une probabilité est comprise entre 0 et 1"
    - "4e | Cas favorables sur cas possibles, en situation d'équiprobabilité"
    - "3e | $P(\\overline{A}) = 1-P(A)$"
    - "règle | Le long d'un chemin, on multiplie"
    - "règle | Entre plusieurs chemins, on additionne"

videos:
  - id: d6Co0q01QH0
    titre: Calculer une probabilité
    chaine: Yvan Monka
    duree: "7:21"
    vues: "773 000"
  - id: CQk-yzdeUzQ
    titre: Calculer une probabilité à l'aide d'un arbre
    chaine: Yvan Monka
    duree: "9:10"
    vues: "477 000"
---

## Ce qui est déjà su

::: retenir En situation d'équiprobabilité
$$P(\text{événement}) = \frac{\text{nombre de cas favorables}}{\text{nombre de cas possibles}}$$

Une probabilité est toujours comprise entre 0 et 1. La somme des probabilités
de toutes les issues vaut 1.
:::

::: methode Une urne
5 boules rouges, 3 vertes, 2 bleues, indiscernables au toucher : 10 boules en
tout.
$$P(\text{rouge}) = \frac{5}{10} = \frac12 = 0{,}5$$
:::

## L'événement contraire

::: retenir
L'événement contraire de $A$, noté $\overline{A}$, est celui qui se réalise
exactement quand $A$ ne se réalise pas.
$$P(\overline{A}) = 1-P(A)$$
:::

::: methode Quand le contraire est plus court à compter
Probabilité de **ne pas** tirer une bleue :
$$P(\text{pas bleue}) = 1-\frac{2}{10} = \frac{8}{10} = 0{,}8$$

On aurait pu compter les 8 boules non bleues, mais dès que l'énoncé dit
« au moins » ou « pas », le contraire raccourcit presque toujours le travail.
:::

## Deux épreuves : l'arbre

::: definition
Une expérience à **deux épreuves** se déroule en deux temps : deux lancers,
deux tirages, un tirage puis un autre. On la représente par un **arbre**, dont
chaque **chemin** est une issue.
:::

On lance deux fois une pièce équilibrée :

```tikz
\begin{tikzpicture}[x=17mm,y=9mm]
  \coordinate (R) at (0,0);
  \node[figval] (P)  at (1,0.95)  {P};
  \node[figval] (F)  at (1,-0.95) {F};
  \node[figval] (PP) at (2,1.6)   {P};
  \node[figval] (PF) at (2,0.45)  {F};
  \node[figval] (FP) at (2,-0.45) {P};
  \node[figval] (FF) at (2,-1.6)  {F};
  \fill[encre] (R) circle (0.8mm);
  \draw[fig] (R)--(P) (R)--(F);
  \draw[fig] (P)--(PP) (P)--(PF) (F)--(FP) (F)--(FF);
  \node[figcote,above left=0.1mm]  at (0.55,0.5)   {$\tfrac12$};
  \node[figcote,below left=0.1mm]  at (0.55,-0.5)  {$\tfrac12$};
  \node[figcote,above left=0.1mm]  at (1.55,1.35)  {$\tfrac12$};
  \node[figcote,below left=0.1mm]  at (1.55,0.65)  {$\tfrac12$};
  \node[figleg,right=1.8mm] at (PP) {$(\text{P}\,;\text{P})$ \quad $\tfrac14$};
  \node[figleg,right=1.8mm] at (PF) {$(\text{P}\,;\text{F})$ \quad $\tfrac14$};
  \node[figleg,right=1.8mm] at (FP) {$(\text{F}\,;\text{P})$ \quad $\tfrac14$};
  \node[figleg,right=1.8mm] at (FF) {$(\text{F}\,;\text{F})$ \quad $\tfrac14$};
\end{tikzpicture}
```

::: retenir Les deux règles de l'arbre
- **Le long d'un chemin, on multiplie** les probabilités rencontrées ;
- **entre plusieurs chemins** qui conviennent, on **additionne**.

Contrôle : la somme des probabilités de tous les chemins vaut 1.
:::

::: methode
$$P(\text{deux fois pile}) = \frac12\times\frac12 = \frac14$$

$$P(\text{au moins une fois face}) = 1-P(\text{deux fois pile})
= 1-\frac14 = \frac34$$

Passer par le contraire évite d'additionner les trois chemins qui contiennent
au moins un face — même résultat, trois fois moins d'écriture.
:::

## Le tableau à double entrée

Quand les deux épreuves sont indépendantes et peu nombreuses, le tableau
remplace l'arbre et laisse voir toutes les issues d'un coup.

:cols G{18mm} Z Z Z Z Z Z
| Dé 1 · Dé 2 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| 6 | 7 | 8 | 9 | 10 | 11 | 12 |

Les 36 cases sont équiprobables. La somme 7 apparaît 6 fois, d'où
$P(\text{somme} = 7) = \dfrac{6}{36} = \dfrac16$ — c'est la somme la plus
probable, et le tableau le montre sans calcul.

::: piege
Les 11 sommes possibles, de 2 à 12, ne sont **pas** équiprobables. Écrire
$\frac{1}{11}$ revient à confondre « nombre de résultats différents » et
« nombre de cas possibles ». Ce sont les 36 cases qui sont équiprobables, pas
les 11 sommes.
:::

## Avec ou sans remise

::: retenir La question à se poser avant de dessiner
- **Avec remise** : la boule tirée retourne dans l'urne, la deuxième épreuve se
  joue dans les mêmes conditions que la première.
- **Sans remise** : il y a une boule de moins, et les probabilités du deuxième
  étage **changent**.
:::

::: methode Deux tirages sans remise
Une urne contient 3 boules rouges et 2 vertes. On tire deux boules
successivement, sans remise.
$$P(\text{deux rouges}) = \frac{3}{5}\times\frac{2}{4} = \frac{6}{20}
= \frac{3}{10}$$

Au deuxième étage, il ne reste que 4 boules dont 2 rouges : le dénominateur a
changé, et le numérateur aussi.
:::

::: prolongement
Répéter l'expérience un grand nombre de fois fait tendre les fréquences
observées vers les probabilités calculées : c'est la **loi des grands
nombres**, que le programme suggère d'illustrer par une simulation. Quelques
lignes de code suffisent, en réutilisant la fiche de pensée informatique.
:::
