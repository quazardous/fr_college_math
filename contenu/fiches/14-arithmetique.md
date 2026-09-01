---
titre: Arithmétique
surtitre: Fiche 14 · Nombres et calculs — 3e
accroche: >-
  Décomposer un entier en facteurs premiers, c'est en lire la carte d'identité.
  Tout le reste — PGCD, fractions irréductibles — s'en déduit presque
  mécaniquement.
niveaux: [3e]
priorite: 1
pourquoi: >-
  Circonscrit, mais rentable au brevet : les questions sont toujours les mêmes.
duree: 25 min
domaine: Nombres et calculs

notions:
  - diviseur
  - nombre premier
  - décomposition en facteurs premiers
  - PGCD
  - PPCM
  - fraction irréductible

automatismes:
  colonnes: 2
  items:
    - "6e | Les critères de divisibilité par 2, 3, 5, 9 et 10"
    - "3e | Les nombres premiers jusqu'à 50"
    - "3e | Les tables de multiplication, lues à l'envers"
    - "règle | 1 n'est pas premier : il n'a qu'un seul diviseur"
    - "règle | Tester les premiers jusqu'à la racine carrée suffit"
    - "règle | PGCD : facteurs communs, plus petit exposant"

videos:
  - id: RBE2wPIKagI
    titre: Décomposer un nombre en un produit de facteurs premiers
    chaine: Yvan Monka
    duree: "9:01"
    vues: "1 100 000"
  - id: qZaTliAWkA0
    titre: Rendre une fraction irréductible
    chaine: Yvan Monka
    duree: "6:56"
    vues: "728 000"
---

## Diviseurs

::: definition Diviseur
Un entier $d$ est un **diviseur** de l'entier $n$ lorsque la division de $n$
par $d$ tombe juste, c'est-à-dire quand il existe un entier $q$ tel que
$n = d\times q$.

On dit aussi que $n$ est un **multiple** de $d$, ou que $n$ est **divisible**
par $d$. Ce sont trois façons de dire la même chose.
:::

::: methode Lister tous les diviseurs, sans en oublier
On cherche les diviseurs de 60. On essaie $1, 2, 3, \dots$ dans l'ordre, et
**chaque essai réussi en donne deux** :

$$1\times 60 \quad 2\times 30 \quad 3\times 20 \quad 4\times 15 \quad
5\times 12 \quad 6\times 10$$

On s'arrête dès que les deux facteurs se croisent : après $6\times 10$ viendrait
$10\times 6$, déjà écrit. Il y a donc **douze** diviseurs :
$$1\,;\,2\,;\,3\,;\,4\,;\,5\,;\,6\,;\,10\,;\,12\,;\,15\,;\,20\,;\,30\,;\,60$$
:::

::: piege
Chercher « au hasard » garantit l'oubli. La liste par paires croissantes est la
seule méthode qui dit **quand s'arrêter** — et un oubli de diviseur fausse tout
le PGCD qui suit.
:::

## Nombres premiers

::: definition Nombre premier
Un nombre entier est **premier** lorsqu'il a **exactement deux** diviseurs :
1 et lui-même.

Les premiers jusqu'à 50 :
$$2\,;\,3\,;\,5\,;\,7\,;\,11\,;\,13\,;\,17\,;\,19\,;\,23\,;\,29\,;\,31\,;\,37\,;\,41\,;\,43\,;\,47$$
:::

::: piege Deux erreurs classiques
**1 n'est pas premier** : il n'a qu'un seul diviseur, pas deux.

**2 est premier**, et c'est le seul nombre pair à l'être. « Premier » ne veut pas
dire « impair » : 9, 15 et 21 sont impairs sans être premiers.
:::

::: methode Tester si un nombre est premier
Est-ce que 91 est premier ? On essaie les premiers successifs, et on peut
s'arrêter dès que le diviseur testé dépasse $\sqrt{91}\approx 9{,}5$ :

- par 2 ? non, 91 est impair ;
- par 3 ? non, $9+1 = 10$ n'est pas divisible par 3 ;
- par 5 ? non, il ne finit ni par 0 ni par 5 ;
- par 7 ? **oui** : $91 = 7\times 13$.

**91 n'est pas premier.**

Si aucun premier jusqu'à la racine n'avait marché, on aurait pu conclure que 91
est premier — inutile d'aller plus loin, car au-delà de la racine le cofacteur
serait déjà passé.
:::

## Décomposition en facteurs premiers

::: retenir Le théorème fondamental
Tout entier supérieur à 1 s'écrit comme un produit de nombres premiers, et
cette écriture est **unique** à l'ordre près.

C'est la carte d'identité du nombre : deux entiers différents n'ont jamais la
même décomposition.
:::

::: methode Divisions successives
On divise par le plus petit premier possible, encore et encore, jusqu'à
tomber sur 1.

:cols Z Z
| 84 | 2 |
|---|---|
| 42 | 2 |
| 21 | 3 |
| 7 | 7 |
| 1 | |

$$84 = 2\times 2\times 3\times 7 = 2^{2}\times 3\times 7$$

De même : $180 = 2^{2}\times 3^{2}\times 5$.
:::

L'arbre donne la même chose, en montrant mieux que l'ordre des découpages ne
change pas le résultat :

```tikz
\begin{tikzpicture}[x=12mm,y=10mm]
  \node[figval] (n84) at (0,2)     {$84$};
  \node[figval] (n2a) at (-0.9,1)  {$2$};
  \node[figval] (n42) at (0.9,1)   {$42$};
  \node[figval] (n2b) at (0,0)     {$2$};
  \node[figval] (n21) at (1.8,0)   {$21$};
  \node[figval] (n3)  at (0.9,-1)  {$3$};
  \node[figval] (n7)  at (2.7,-1)  {$7$};
  \draw[fig] (n84)--(n2a) (n84)--(n42) (n42)--(n2b) (n42)--(n21)
             (n21)--(n3) (n21)--(n7);
  \fill[prioritetrois] (n2a) circle (0.9mm) (n2b) circle (0.9mm)
                       (n3) circle (0.9mm) (n7) circle (0.9mm);
\end{tikzpicture}
```

Les feuilles marquées sont les facteurs premiers.

## Le PGCD

::: definition Plus grand commun diviseur
Le **PGCD** de deux entiers est le plus grand des diviseurs qu'ils ont en
commun. On le note $\text{PGCD}(a\,;b)$.
:::

::: methode Par les décompositions
On cherche $\text{PGCD}(84\,;180)$.
$$84 = 2^{2}\times 3\times 7 \qquad\qquad 180 = 2^{2}\times 3^{2}\times 5$$

On garde **les facteurs communs**, chacun affecté du **plus petit** des deux
exposants :

- le 2 est dans les deux, exposants 2 et 2 : on garde $2^{2}$ ;
- le 3 est dans les deux, exposants 1 et 2 : on garde $3^{1}$ ;
- le 7 et le 5 ne sont que d'un côté : on ne garde rien.

$$\text{PGCD}(84\,;180) = 2^{2}\times 3 = 12$$
:::

::: piege
Prendre le **plus grand** exposant donnerait le PPCM, pas le PGCD. Moyen
mnémotechnique : le PGCD est un **diviseur** des deux nombres, il ne peut donc
pas être plus gros que le plus petit d'entre eux. Ici $12 \leq 84$. ✔
:::

::: prolongement L'algorithme d'Euclide
Quand les nombres sont trop gros pour être décomposés, on remplace le plus
grand par le reste de sa division par le plus petit, et on recommence. Le
dernier reste non nul est le PGCD :
$$180 = 2\times 84+12 \qquad 84 = 7\times 12+0 \qquad \text{PGCD} = 12$$
Le programme le signale comme prolongement possible, notamment en lien avec la
programmation : c'est une boucle de trois lignes.
:::

## Rendre une fraction irréductible

::: definition
Une fraction est **irréductible** quand son numérateur et son dénominateur
n'ont plus aucun diviseur commun autre que 1.
:::

::: methode En une seule simplification
$$\frac{84}{180} = \frac{84\div 12}{180\div 12} = \frac{7}{15}$$

Diviser par le PGCD amène directement à la forme irréductible : c'est le sens
même du mot « plus grand ». Simplifier par un diviseur commun plus petit
marche aussi, mais oblige à recommencer.
:::

::: retenir Le contrôle
La fraction obtenue est irréductible si et seulement si
$\text{PGCD}(\text{numérateur}\,;\text{dénominateur}) = 1$.

Ici $\text{PGCD}(7\,;15) = 1$ : c'est fini.
:::
