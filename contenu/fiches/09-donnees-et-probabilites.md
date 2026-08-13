---
titre: Données, statistiques et probabilités
surtitre: Fiche 9 · Organisation et gestion de données
accroche: >-
  Lire un graphique, calculer une moyenne, estimer une chance : le programme
  présente ce domaine comme un outil d'esprit critique, pas seulement comme
  une technique de calcul.
niveaux: [6e, 5e, 4e]
priorite: 2
pourquoi: >-
  Compétence directement réutilisable en SVT, en géographie et dans la vie courante.
duree: 25 min
domaine: Organisation et gestion de données et probabilités

automatismes:
  colonnes: 2
  items:
    - "6e | Lire un tableau, un diagramme en barres, un diagramme circulaire"
    - "5e | Calculer une moyenne pour un petit nombre de valeurs"
    - "5e | Retrouver un effectif manquant dans un tableau"
    - "5e | Placer un évènement sur l'échelle de probabilité : impossible, certain"
    - "5e | « Une chance sur quatre » correspond à la probabilité $\\tfrac14$"
    - "5e | Donner une probabilité en fraction, en décimal ou en pourcentage"

videos:
  - id: h0urYAnMUNI
    titre: Calculer une moyenne — 5e
    chaine: Yvan Monka
    duree: "5:47"
    vues: "145 000"
  - id: MwNV5eCBFrI
    titre: Calculer des fréquences — 5e
    chaine: Yvan Monka
    duree: "7:24"
    vues: "480 000"
  - id: a9Mb5v7Z4Mw
    titre: Calculs de probabilités très simples
    chaine: Yvan Monka
    duree: "6:42"
    vues: "135 000"
  - id: q-O9ETTk-y8
    titre: Médiane, mode, étendue — 4e
    chaine: Hedacademy
    duree: "8:04"
    vues: "237 000"
  - id: S6HpRIVaL5U
    titre: Probabilité de l'évènement contraire — 4e
    chaine: Yvan Monka
    duree: "8:14"
    vues: "25 000"
---

## Effectifs et fréquences

::: definition
L'**effectif** d'une valeur est le nombre de fois où elle apparaît.
L'**effectif total** est le nombre total d'observations.

La **fréquence** est la part que représente une valeur dans le total :
$$f = \frac{\text{effectif}}{\text{effectif total}}$$
:::

Une fréquence s'exprime indifféremment en fraction, en décimal ou en pourcentage —
le programme demande les trois écritures.

Sur 24 élèves ayant voté pour quatre candidats :

:cols G{28mm} Z Z Z Z Z
| Candidat | Alexis | Chloé | Salma | Djibril | Total |
|---|---|---|---|---|---|
| Effectif | 6 | 12 | 3 | 3 | 24 |
| Fréquence | 0,25 | 0,5 | 0,125 | 0,125 | 1 |
| Pourcentage | 25 % | 50 % | 12,5 % | 12,5 % | 100 % |

::: retenir Le contrôle qui ne coûte rien
La somme des fréquences vaut toujours **1**, donc la somme des pourcentages
vaut toujours **100 %**. Si ce n'est pas le cas, il y a une erreur.
:::

## La moyenne

::: definition
La **moyenne** d'une série est la somme de toutes les valeurs divisée par leur
nombre. C'est la valeur qu'aurait chacun si l'on répartissait tout également.
:::

$$\frac{12+15+8+14+11}{5} = \frac{60}{5} = 12$$

::: piege
La moyenne n'est pas la valeur du milieu. Avec 1 ; 1 ; 1 ; 1 ; 96, la moyenne
vaut 20, alors que quatre valeurs sur cinq valent 1. Une moyenne seule peut
donc induire en erreur — c'est exactement le genre de vigilance que le
programme cherche à installer.
:::

## Choisir une représentation

:cols G{40mm} Y
| Représentation | Quand l'utiliser |
|---|---|
| **Tableau** | pour donner les valeurs exactes |
| **Diagramme en barres** | pour comparer des catégories entre elles |
| **Diagramme circulaire** | pour montrer des **parts d'un tout** |
| **Graphique cartésien** | pour montrer une évolution |

::: methode Construire un diagramme circulaire
Le disque entier vaut $360°$ et représente le total. L'angle d'une part est
proportionnel à son effectif :
$$\text{angle} = \frac{\text{effectif}}{\text{effectif total}}\times 360$$

Pour Chloé, 12 voix sur 24 : $\dfrac{12}{24}\times 360 = 180°$, soit la moitié
du disque. C'est de la proportionnalité, rien d'autre.
:::

::: piege Les graphiques qui mentent
Un axe vertical qui ne commence pas à zéro exagère les écarts. Le programme
demande explicitement de savoir repérer ces présentations trompeuses.
:::

## Les probabilités

::: definition Le vocabulaire officiel
Une **expérience aléatoire** est une expérience dont on ne peut pas prévoir le
résultat. Chaque résultat possible est une **issue**. Un **évènement** est un
ensemble d'issues.
:::

::: retenir L'échelle des probabilités
Une probabilité est un nombre compris **entre 0 et 1**.

- $0$ : l'évènement est **impossible**.
- $1$ : l'évènement est **certain**.
- $0{,}5$ : il y a une chance sur deux.
:::

::: definition Équiprobabilité
Quand toutes les issues ont la même chance de se produire — dé équilibré, pièce
non truquée, tirage au hasard — on dit qu'il y a **équiprobabilité**, et alors :
$$P(\text{évènement}) = \frac{\text{nombre d'issues favorables}}{\text{nombre d'issues possibles}}$$
:::

Avec un dé à six faces : $P(\text{obtenir un 4}) = \dfrac16$, et
$P(\text{obtenir un nombre pair}) = \dfrac36 = \dfrac12$.

::: piege Le dé n'a pas de mémoire
Après cinq « 6 » d'affilée, la probabilité d'obtenir un « 6 » au lancer suivant
reste $\dfrac16$. Le dé ne se souvient de rien. Croire le contraire est une
erreur de raisonnement si répandue qu'elle porte un nom.
:::

::: methode Comparer l'expérience et la théorie
En répétant réellement l'expérience et en notant les résultats dans un tableau
d'effectifs et de fréquences, on observe que les fréquences se rapprochent des
probabilités théoriques à mesure que le nombre d'essais augmente. Sur dix
lancers, l'écart peut être grand ; sur mille, il devient très petit.
:::

## Médiane, étendue, moyenne pondérée [[4e]]

::: definition La médiane
La **médiane** partage la série en deux moitiés de même effectif : autant de
valeurs en dessous qu'au-dessus. On range d'abord les valeurs dans l'ordre.
:::

::: methode
Série : 3 ; 7 ; 8 ; 12 ; 15 ; 18 ; 20. Sept valeurs, la médiane est la
**quatrième** : $12$.

Si l'effectif est **pair**, la médiane est la moyenne des deux valeurs
centrales. Pour 3 ; 7 ; 8 ; 12 : $(7+8)\div 2 = 7{,}5$.
:::

::: definition L'étendue
L'**étendue** est l'écart entre la plus grande et la plus petite valeur.
Elle mesure la dispersion, pas le centre.
:::

::: retenir Pourquoi la médiane vaut mieux que la moyenne, parfois
Série des salaires : 1 500 ; 1 600 ; 1 700 ; 1 800 ; 20 000.

Moyenne : $5\,320$ € — un montant que **personne** ne touche.
Médiane : $1\,700$ € — bien plus représentatif.

Une valeur extrême déplace fortement la moyenne, mais laisse la médiane presque
intacte. Le programme demande explicitement de comprendre cet effet.
:::

::: methode La moyenne pondérée
Quand une valeur revient plusieurs fois, on la compte autant de fois.

| Note | 8 | 12 | 15 |
|---|---|---|---|
| Effectif | 3 | 5 | 2 |

$$\frac{8\times 3 + 12\times 5 + 15\times 2}{3+5+2}
= \frac{24+60+30}{10} = \frac{114}{10} = 11{,}4$$
:::

## L'évènement contraire et les deux épreuves [[4e]]

::: retenir
L'**évènement contraire** de $A$ est celui qui se produit exactement quand $A$
ne se produit pas.
$$P(\text{contraire de }A) = 1 - P(A)$$
:::

Avec un dé : $P(\text{obtenir un 6}) = \tfrac16$, donc
$P(\text{ne pas obtenir un 6}) = 1-\tfrac16 = \tfrac56$.

::: methode Deux épreuves : l'arbre ou le tableau
On lance deux pièces. Les issues possibles sont PP, PF, FP, FF — quatre issues
équiprobables.

$$P(\text{deux fois pile}) = \frac14 \qquad
P(\text{un pile et un face}) = \frac24 = \frac12$$

PF et FP sont **deux issues distinctes** : les oublier fait passer la seconde
probabilité de $\tfrac12$ à $\tfrac14$. C'est l'erreur classique.
:::

::: prolongement
Le programme cite les diagrammes de **Florence Nightingale**, infirmière et
statisticienne du XIX e siècle. Ses représentations des causes de mortalité
pendant la guerre de Crimée ont convaincu l'administration britannique de
réformer les hôpitaux militaires : un cas où un bon graphique a sauvé des vies.
:::
