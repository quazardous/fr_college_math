---
titre: Nombres décimaux et calculs
surtitre: Fiche 1 · Nombres et calculs
accroche: >-
  Tout le reste du programme repose là-dessus. Un calcul mal posé fait rater
  un problème de géométrie ou de proportionnalité même quand le raisonnement
  est juste.
niveaux: [6e, 5e]
priorite: 3
pourquoi: >-
  Outil de tous les autres chapitres : aucun exercice de collège ne s'en passe.
duree: 25 min
domaine: Nombres, calcul et résolution de problèmes

automatismes:
  colonnes: 2
  items:
    - "6e | $\\dfrac{1}{10}=0{,}1$ \\quad $\\dfrac{1}{100}=0{,}01$ \\quad $\\dfrac{1}{1000}=0{,}001$"
    - "6e | $1=\\dfrac{10}{10}=\\dfrac{100}{100}=\\dfrac{1000}{1000}$"
    - "6e | Multiplier ou diviser un décimal par $10$, $100$, $1000$"
    - "5e | $0{,}6\\times 7=4{,}2$ \\quad $40\\times 0{,}03=1{,}2$"
    - "5e | $2{,}7+1{,}4$ \\quad $3{,}4-0{,}8$ de tête"
    - "5e | Factoriser avec les tables : $21=3\\times 7$"
    - "5e | Les carrés des entiers de $0$ à $12$, et $10^{3}=1000$"
    - "5e | Les critères de divisibilité par $3$ et par $9$"
    - "règle | Priorités : parenthèses, puissances, $\\times$ et $\\div$, puis $+$ et $-$"
    - "5e | $k(a+b)=ka+kb$ \\quad et \\quad $k(a-b)=ka-kb$"

videos:
  - id: lzsYQYvEKss
    titre: Numération et nombres décimaux — 6e
    chaine: Les Bons Profs
    duree: "3:28"
    vues: "188 000"
  - id: TJH-fiwAt5s
    titre: Calculs avec des priorités — 5e
    chaine: Yvan Monka
    duree: "4:54"
    vues: "354 000"
---

## Lire et écrire un nombre décimal

::: definition Nombre décimal
Un **nombre décimal** est un nombre qui peut s'écrire sous la forme d'une
**fraction décimale**, c'est-à-dire avec un dénominateur $10$, $100$, $1000$…
$$
4{,}107 \;=\; \frac{4107}{1000} \;=\; 4+\frac{1}{10}+\frac{0}{100}+\frac{7}{1000}
$$
:::

!fig \tableaunumeration

::: piege Le piège le plus fréquent de toute la 6e
$3{,}7 > 3{,}17$ ! On ne compare **pas** les parties décimales comme des entiers.

*Méthode sûre* : compléter avec des zéros pour avoir autant de décimales
($3{,}70$ contre $3{,}17$), puis comparer chiffre par chiffre.
:::

## Comparer, encadrer, arrondir

**Comparer** : d'abord la partie entière ; si elle est égale, on compare les
dixièmes, puis les centièmes, etc.

:cols >{\bfseries}G{26mm} Y Y Y
| Nombre | À l'unité | Au dixième | Au centième |
|---|---|---|---|
| Encadrer $7{,}368$ | $7 < 7{,}368 < 8$ | $7{,}3 < 7{,}368 < 7{,}4$ | $7{,}36 < 7{,}368 < 7{,}37$ |
| Arrondir $7{,}368$ | $\approx 7$ | $\approx 7{,}4$ | $\approx 7{,}37$ |

::: methode Arrondir
On regarde le chiffre **juste après** le rang demandé. S'il vaut $5$ ou plus,
on augmente de $1$ le chiffre du rang ; sinon on le garde tel quel.
:::

**Intercaler** un nombre entre $2{,}3$ et $2{,}4$ : il suffit d'ajouter une
décimale, par exemple $2{,}35$. *Entre deux décimaux, il y en a toujours une infinité.*

## Multiplier et diviser par 10, 100, 1000 — et par 0,1 ; 0,01 ; 0,001

:cols >{\bfseries}G{17mm} Y Y
| Opération | Ce que ça fait | Exemple |
|---|---|---|
| $\times 10$ | la virgule se décale d'un rang vers la droite | $4{,}56\times 10=45{,}6$ |
| $\times 100$ | deux rangs vers la droite | $4{,}56\times 100=456$ |
| $\div 10$ | un rang vers la gauche | $4{,}56\div 10=0{,}456$ |
| $\times 0{,}1$ | **revient à diviser par 10** | $4{,}56\times 0{,}1=0{,}456$ |
| $\times 0{,}01$ | **revient à diviser par 100** | $4{,}56\times 0{,}01=0{,}0456$ |

::: piege
Multiplier ne rend pas toujours plus grand : multiplier par $0{,}1$ *diminue*.
:::

## Les quatre opérations

### Le vocabulaire, exigé en 5e

:cols G{16mm} G{26mm} Y
| Opération | Le résultat | Les nombres s'appellent |
|---|---|---|
| $a+b$ | une **somme** | des **termes** |
| $a-b$ | une **différence** | des **termes** |
| $a\times b$ | un **produit** | des **facteurs** |
| $a\div b$ | un **quotient** | dividende et diviseur |

### Multiplier deux décimaux

::: methode
1. On calcule **sans les virgules**.
2. On compte le nombre total de décimales des deux facteurs.
3. On place la virgule pour en avoir autant dans le résultat.

$2{,}4\times 1{,}5$ : \quad $24\times 15=360$, et $1+1=2$ décimales,
donc $2{,}4\times 1{,}5 = 3{,}60 = 3{,}6$.
:::

**Contrôle par ordre de grandeur** — $2{,}4\approx 2$ et $1{,}5\approx 1{,}5$ :
le résultat doit être proche de $3$. C'est le cas. Le programme demande
explicitement ce réflexe de vérification.

### Diviser

- **Division euclidienne** (entiers) : $17 = 3\times 5 + 2$, avec toujours **reste $<$ diviseur**.
- **Division décimale** : on continue après la virgule en abaissant des zéros.
- [[5e]] **Diviser par un décimal** : on multiplie *les deux* nombres par $10$, $100$…
  pour rendre le diviseur entier, par exemple $\dfrac{7{,}2}{0{,}4}=\dfrac{72}{4}=18$.

### [[5e]] Multiples, diviseurs et critères de divisibilité

Si $a = b\times c$, alors $a$ est un **multiple** de $b$ et de $c$, et $b$ et $c$
sont des **diviseurs** de $a$.

:cols >{\bfseries}G{22mm} Y >{\itshape}Y
| Divisible par | Critère | Exemple |
|---|---|---|
| 2 | se termine par $0,2,4,6,8$ | $4536$ : oui |
| 3 | la **somme des chiffres** est divisible par 3 | $4+5+3+6=18$ : oui |
| 5 | se termine par $0$ ou $5$ | $4536$ : non |
| 9 | la **somme des chiffres** est divisible par 9 | $18$ est divisible par 9 : oui |
| 10 | se termine par $0$ | $4536$ : non |

## [[5e]] Priorités opératoires

::: retenir L'ordre, dans tous les cas
1. les **parenthèses**, en commençant par les plus intérieures ;
2. les **puissances** (carrés, cubes) ;
3. les **multiplications et divisions**, de gauche à droite ;
4. les **additions et soustractions**, de gauche à droite.
:::

$$
7 + 3\times(12-4)\div 2 \;=\; 7+3\times 8\div 2 \;=\; 7+24\div 2 \;=\; 7+12 \;=\; 19
$$

::: piege
$12\div 4\times 3$ vaut $9$, et non $1$ : à priorité égale, on va **de gauche à droite**.
:::

**Traduire un programme de calcul en une seule expression** est un objectif
d'apprentissage explicite de la 5e. « Choisir un nombre, lui ajouter 2,
multiplier par 4, retirer 3 » devient $(n+2)\times 4 - 3$.
Les parenthèses sont ici **indispensables** : sans elles, $n+2\times 4-3$ ne
décrit plus le même programme.

## [[5e]] Distributivité

::: retenir
$$k\times(a+b)=k\times a+k\times b \qquad\qquad k\times(a-b)=k\times a-k\times b$$
:::

C'est d'abord un outil de **calcul mental** :

$$7\times 102 = 7\times(100+2)=700+14=714 \qquad
  25\times 98 = 25\times(100-2)=2500-50=2450$$

## [[5e]] Carrés et cubes

$a^{2}=a\times a$ (« $a$ au carré ») \qquad $a^{3}=a\times a\times a$ (« $a$ au cube »).

!fig \tableaucarres

::: piege
$5+3^{2}=5+9=14$ : la puissance passe *avant* l'addition. Alors que $(5+3)^{2}=8^{2}=64$.
:::

::: prolongement
Le programme suggère d'aborder les **nombres premiers** en prolongement :
le crible d'Ératosthène, et le fait qu'il en existe une infinité — une des plus
anciennes démonstrations connues, dans les *Éléments* d'Euclide.
:::
