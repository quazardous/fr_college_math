---
titre: Les nombres relatifs
surtitre: Fiche 4 · Nombres et calculs
accroche: >-
  La grande nouveauté de la 5e. Les nombres négatifs existent pour que
  toute soustraction devienne possible : on peut enfin retirer 8 à 3.
niveaux: [5e]
priorite: 2
pourquoi: >-
  Notion neuve, sans laquelle rien ne fonctionne en 4e ni en 3e.
duree: 25 min
domaine: Nombres et calculs

automatismes:
  colonnes: 2
  items:
    - "5e | Additionner, soustraire, multiplier des décimaux à une ou deux décimales"
    - "5e | Une addition à trou se complète par une soustraction : $2+\\ldots=7$ donne $7-2$"
    - "5e | Lire et placer un nombre relatif sur une droite graduée"
    - "5e | Comparer deux nombres relatifs"
    - "règle | Soustraire, c'est ajouter l'opposé"
    - "règle | L'opposé de $-7$ est $+7$ ; l'opposé de $+7$ est $-7$"

videos:
  - id: 9L4lz1NMPoY
    titre: Additions et soustractions de relatifs
    chaine: Yvan Monka
    duree: "8:47"
    vues: "1 100 000"
  - id: ZjrmsHRKajg
    titre: Additions et soustractions — exercices
    chaine: Yvan Monka
    duree: "4:35"
    vues: "284 000"
---

## À quoi servent les nombres négatifs

::: definition Nombre relatif
Un **nombre relatif** est un nombre muni d'un signe : $+$ ou $-$.
Les nombres **positifs** sont supérieurs ou égaux à zéro, les **négatifs**
inférieurs ou égaux à zéro. Le nombre $0$ est à la fois positif et négatif —
c'est le seul.
:::

On les rencontre partout dès qu'une grandeur peut descendre sous une référence :

| Situation | Ce que représente le zéro | Exemple |
|---|---|---|
| Température | la glace fondante | $-6$ °C un matin d'hiver |
| Altitude | le niveau de la mer | $-11\,034$ m dans la fosse des Mariannes |
| Compte bancaire | le compte vide | un découvert de $-50$ € |
| Chronologie | l'an 1 | Jules César naît en $-100$ |

## Les repérer sur une droite graduée

!fig \droitegradueerelatifs{-5}{5}{-3/$-3$, 2/$+2$}

::: retenir
Plus on va **vers la droite**, plus le nombre est **grand**. Cette règle ne
change pas avec les négatifs — c'est la seule chose à retenir pour comparer.
:::

## Opposé et valeur absolue

::: definition
L'**opposé** d'un nombre est le nombre situé à la même distance de zéro,
de l'autre côté. La **valeur absolue** est cette distance, toujours positive.
:::

| Nombre | Son opposé | Sa valeur absolue |
|---|---|---|
| $+7$ | $-7$ | $7$ |
| $-3,5$ | $+3,5$ | $3,5$ |
| $0$ | $0$ | $0$ |

## Comparer et ranger

:cols G{52mm} Y
| Règle | Exemple |
|---|---|
| Un positif est toujours plus grand qu'un négatif | $-100 < 1$ |
| Entre deux négatifs, le plus grand est celui **le plus proche de zéro** | $-3 > -8$ |

::: piege
$-8$ est plus **petit** que $-3$, alors que $8$ est plus grand que $3$.
Le réflexe des entiers positifs joue contre soi : il faut revenir à la droite
graduée, où $-8$ est bien plus à gauche.
:::

## Additionner

::: methode Deux cas, et seulement deux
1. **Même signe** : on additionne les distances à zéro, on garde le signe commun.
2. **Signes contraires** : on soustrait la plus petite distance de la plus grande,
   et on prend le signe du nombre le plus éloigné de zéro.
:::

$$
(-7)+(-5) = -12
\qquad
(-7)+(+12) = +5
\qquad
(+4)+(-9) = -5
$$

Une image utile : additionner un négatif, c'est **reculer** sur la droite graduée ;
additionner un positif, c'est **avancer**.

## Soustraire

::: retenir La règle qui remplace toutes les autres
**Soustraire un nombre, c'est ajouter son opposé.**
$$
a - b \;=\; a + (-b)
$$
:::

$$
3-(+8) = 3+(-8) = -5
\qquad
3-(-8) = 3+(+8) = +11
$$

::: piege
$3-(-8)$ ne fait pas $-5$. Les deux signes moins successifs se transforment en
plus : retirer une dette, c'est s'enrichir. On obtient $+11$.
:::

## Simplifier l'écriture

Le programme demande de savoir quand les parenthèses sont **indispensables**
et quand elles peuvent disparaître.

| Écriture complète | Écriture simplifiée |
|---|---|
| $(+5)+(-3)$ | $5-3$ |
| $(-5)+(+3)$ | $-5+3$ |
| $(-5)-(-3)$ | $-5+3$ |
| $(-5)-(+3)$ | $-5-3$ |

::: methode Enchaîner plusieurs termes
On regroupe les positifs d'un côté, les négatifs de l'autre, puis on conclut.
$$
-4+7-9+2 \;=\; (7+2)-(4+9) \;=\; 9-13 \;=\; -4
$$
:::

## Résoudre un problème

Un matin, il fait $-6$ °C. À midi, le thermomètre indique $+9$ °C.
De combien la température a-t-elle augmenté ?

::: methode
Un écart se calcule toujours par une soustraction : *arrivée moins départ*.
$$
9-(-6) = 9+6 = 15
$$
La température a augmenté de **15 °C**.
:::

::: piege Ce qui n'est PAS au programme de 5e
En 5e, on additionne et on soustrait les relatifs — **c'est tout**.
La multiplication et la division des relatifs sont au programme de 4e.
Voir une règle des signes pour un produit en 5e, c'est une confusion de niveau.
:::

::: prolongement
Les nombres négatifs apparaissent chez le mathématicien indien **Brahmagupta**
vers l'an 600, qui les décrit déjà en termes de dettes et de biens. En Europe,
leur existence même était encore contestée au XVII e siècle : on les appelait
des nombres « absurdes » ou « fictifs ».
:::
