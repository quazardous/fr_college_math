---
titre: Pensée informatique
surtitre: Fiche 10 · Algorithmique et programmation
accroche: >-
  Écrire un programme, c'est décrire une méthode assez précisément pour qu'une
  machine l'exécute sans rien deviner. C'est la même exigence que celle d'une
  démonstration.
niveaux: [6e, 5e]
priorite: 1
pourquoi: >-
  Peu de points aux évaluations, mais la rigueur acquise ici sert partout ailleurs.
duree: 15 min
domaine: Pensée informatique

automatismes:
  colonnes: 2
  items:
    - "6e | Distinguer une instruction d'une séquence d'instructions"
    - "6e | Exécuter à la main une séquence d'instructions"
    - "5e | Repérer les entrées et les sorties d'un programme"
    - "5e | Prévoir la valeur d'une expression avant de l'exécuter"
    - "règle | Une boucle « répéter $n$ fois » remplace $n$ copies de la même séquence"
---

## Le vocabulaire

::: definition
Une **instruction** est un ordre élémentaire : avancer de 50, tourner de 90°,
ajouter 3.

Une **séquence** est une suite d'instructions exécutées **dans l'ordre**.

Une **entrée** est une donnée fournie au programme ; une **sortie** est ce
qu'il produit.
:::

::: retenir L'ordre change tout
« Avancer de 50, puis tourner de 90° » ne donne pas le même dessin que
« tourner de 90°, puis avancer de 50 ». Une séquence n'est pas un sac
d'instructions : c'est une suite ordonnée.
:::

## Les programmes de calcul

Un programme de calcul est déjà un algorithme. Le programme de 5e demande de
savoir le traduire en **une seule expression**.

::: methode
« Choisis un nombre, ajoute 2, multiplie par 4, retire 3 »

devient $(n+2)\times 4 - 3$.

Les parenthèses traduisent l'ordre des instructions. Sans elles,
$n+2\times 4-3$ décrirait un tout autre programme.
:::

:cols G{22mm} Y Y Y
| Nombre choisi | Après $+2$ | Après $\times 4$ | Après $-3$ |
|---|---|---|---|
| 1 | 3 | 12 | 9 |
| 5 | 7 | 28 | 25 |
| 10 | 12 | 48 | 45 |

Ce tableau de valeurs est exactement ce qu'on obtiendrait en exécutant le
programme trois fois. Le remplir à la main **avant** de lancer la machine est
un attendu explicite du programme : « prévoir la valeur d'une expression
informatique avant son exécution ».

## La boucle

::: definition Boucle inconditionnelle
Répéter $n$ fois une même séquence. En 5e, seul ce type de boucle est au
programme : le nombre de répétitions est connu à l'avance.
:::

::: methode Dessiner un carré
Sans boucle, il faut huit instructions :

*avancer de 100, tourner de 90°, avancer de 100, tourner de 90°…*

Avec une boucle, deux suffisent :

**répéter 4 fois** [ avancer de 100 ; tourner de 90° ]

Pour un triangle équilatéral : **répéter 3 fois** [ avancer de 100 ; tourner de 120° ].
:::

::: piege L'angle de rotation n'est pas l'angle de la figure
Pour un triangle équilatéral, dont les angles mesurent $60°$, on tourne de
$120°$ à chaque sommet. Le lutin tourne de l'angle **extérieur**, et la somme
de ces rotations vaut toujours $360°$ pour un tour complet : $360\div 3 = 120$.
:::

## Les motifs évolutifs

Le programme relie l'algorithmique à la **pensée algébrique** par les suites de
motifs. On cherche la régularité, puis on prédit une étape lointaine sans la
dessiner.

:cols G{26mm} Z Z Z Z Y
| Étape | 1 | 2 | 3 | 4 | … |
|---|---|---|---|---|---|
| Nombre de carreaux | 4 | 7 | 10 | 13 | ? |

::: methode Trouver la règle
On passe d'une étape à la suivante en ajoutant 3.
À l'étape 1 il y a 4 carreaux, soit $1+3\times 1$.
À l'étape 2, $1+3\times 2 = 7$. À l'étape $n$ : $1+3n$.

L'étape 100 comporterait donc $1+3\times 100 = 301$ carreaux — sans rien dessiner.
C'est le pas décisif vers le calcul littéral de la fiche 5.
:::

::: retenir Ce qu'il faut savoir faire, au minimum
- Exécuter à la main une séquence donnée et dire ce qu'elle produit.
- Repérer ce qui entre dans un programme et ce qui en sort.
- Modifier un paramètre d'un programme existant et prévoir l'effet.
- Remplacer des répétitions par une boucle.
:::
