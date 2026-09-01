---
titre: Exposants négatifs et notation scientifique
surtitre: Fiche 20 · Nombres et calculs — 3e
accroche: >-
  Un exposant négatif n'annonce pas un nombre négatif : il annonce un inverse.
  Tout le reste de la fiche découle de cette seule idée, y compris la façon
  d'écrire les nombres très petits.
niveaux: [3e]
priorite: 2
pourquoi: >-
  Au programme de 3e, au brevet, et dans toutes les sciences ensuite.
duree: 30 min
domaine: Nombres et calculs

notions:
  - exposant négatif
  - inverse
  - notation scientifique
  - écriture scientifique
  - puissance de 10
  - multiplication de puissances
  - division de puissances
  - ordre de grandeur
  - équation x carré égale a
  - racine carrée

automatismes:
  colonnes: 2
  items:
    - "4e | Les puissances d'exposant positif : $a^{m}\\times a^{n}=a^{m+n}$"
    - "4e | Les carrés des entiers de 0 à 12"
    - "3e | $a^{-n} = \\dfrac{1}{a^{n}}$"
    - "3e | $10^{-1}=0{,}1$ · $10^{-2}=0{,}01$ · $10^{-3}=0{,}001$"
    - "règle | En notation scientifique, un seul chiffre avant la virgule"
    - "règle | $x^{2}=a$ a deux solutions dès que $a>0$"

videos:
  - id: 5miQxq30zhY
    titre: Utiliser les puissances d'exposant négatif
    chaine: Yvan Monka
    duree: "4:53"
    vues: "258 000"
  - id: WvMgAdWhUf4
    titre: L'écriture scientifique d'un nombre
    chaine: Paul Olivier
    duree: "6:43"
    vues: "318 000"
  - id: VNGFmMt1W3Y
    titre: Résoudre une équation du type $x^{2}=a$
    chaine: Yvan Monka
    duree: "9:59"
    vues: "163 000"
---

## L'exposant négatif

En 4e, l'exposant comptait des facteurs : $2^{3}$, c'est trois fois le facteur 2.
Un exposant négatif ne peut donc pas compter quoi que ce soit. Il fait autre
chose.

::: definition Puissance d'exposant négatif
Pour $a$ non nul et $n$ entier positif :
$$a^{-n} = \frac{1}{a^{n}}$$

Le signe moins de l'exposant ne change pas le signe du nombre : il le
**renverse**. Un exposant négatif, c'est un inverse.
:::

::: piege La confusion qui coûte le plus cher
$2^{-3}$ ne vaut **pas** $-8$.
$$2^{-3} = \frac{1}{2^{3}} = \frac{1}{8} = 0{,}125$$

Une puissance d'un nombre positif est toujours positive, quel que soit le signe
de l'exposant. Ce sont deux signes indépendants : celui de la base décide du
signe du résultat, celui de l'exposant décide si l'on multiplie ou si l'on
divise.
:::

::: retenir Pourquoi cette définition, et pas une autre
Elle est la seule qui laisse la règle de 4e continuer de fonctionner. Si l'on
veut que $a^{m}\times a^{n} = a^{m+n}$ reste vraie quand les exposants
s'opposent, alors
$$a^{3}\times a^{-3} = a^{3-3} = a^{0} = 1$$
et le nombre qui, multiplié par $a^{3}$, donne 1, c'est exactement
$\dfrac{1}{a^{3}}$.

La définition n'est donc pas une convention arbitraire : c'est la seule qui ne
casse rien.
:::

## Multiplier et diviser des puissances

::: retenir Les deux règles, désormais valables pour tous les exposants
$$a^{m}\times a^{n} = a^{m+n} \qquad\qquad \frac{a^{m}}{a^{n}} = a^{m-n}$$

La seconde n'est pas une règle de plus : diviser par $a^{n}$, c'est multiplier
par $a^{-n}$.
:::

::: methode
$$10^{5}\times 10^{-2} = 10^{5-2} = 10^{3} \qquad
  \frac{10^{8}}{10^{3}} = 10^{8-3} = 10^{5}$$
$$3^{-2}\times 3^{5} = 3^{3} = 27 \qquad
  \frac{2^{4}}{2^{7}} = 2^{-3} = \frac{1}{8}$$

Le calcul se fait **sur les exposants**, jamais sur les puissances elles-mêmes.
:::

## Les puissances de 10, dans les deux sens

La fiche 11 s'arrêtait aux grands nombres. Les exposants négatifs ouvrent
l'autre côté : celui des très petits.

:cols G{26mm} Y Y
| Puissance | Écriture décimale | Ce que ça sert à dire |
|---|---|---|
| $10^{3}$ | 1 000 | un kilomètre en mètres |
| $10^{1}$ | 10 | |
| $10^{0}$ | 1 | |
| $10^{-1}$ | 0,1 | un décimètre en mètres |
| $10^{-3}$ | 0,001 | un millimètre en mètres |
| $10^{-9}$ | 0,000 000 001 | un nanomètre en mètres |

::: retenir Le rang de la virgule
$10^{n}$ déplace la virgule de $n$ rangs vers la **droite**,
$10^{-n}$ de $n$ rangs vers la **gauche**.
$$1{,}2\times 10^{3} = 1\,200 \qquad\qquad 1{,}2\times 10^{-3} = 0{,}0012$$
:::

## La notation scientifique

::: definition
La **notation scientifique** — on dit aussi *écriture scientifique* — d'un
nombre non nul est son écriture sous la forme
$$a\times 10^{n}$$
où $n$ est un entier relatif et où $a$ est un décimal tel que
$$1 \leqslant |a| < 10$$

Autrement dit : **un seul chiffre, non nul, avant la virgule**.
:::

::: methode Dans les deux sens
**Un grand nombre.** $32\,000\,000$ : on place la virgule après le premier
chiffre, ce qui donne $3{,}2$, et l'on compte les rangs franchis — sept.
$$32\,000\,000 = 3{,}2\times 10^{7}$$

**Un petit nombre.** $0{,}000\,45$ : la virgule doit avancer de quatre rangs
vers la droite pour donner $4{,}5$, donc l'exposant est $-4$.
$$0{,}000\,45 = 4{,}5\times 10^{-4}$$

Contrôle : le nombre est plus petit que 1, l'exposant doit donc être négatif.
:::

::: piege Ni $0{,}45$, ni $45$
$$0{,}45\times 10^{-3} \quad\text{et}\quad 45\times 10^{-5}$$
valent bien le même nombre que $4{,}5\times 10^{-4}$, mais **aucune des deux
n'est une notation scientifique** : la première a un 0 avant la virgule, la
seconde en a deux chiffres. Il en faut exactement un, et il doit être non nul.
:::

::: methode Calculer sans quitter la notation
$$(2\times 10^{5})\times(3\times 10^{-2})
  = (2\times 3)\times 10^{5-2} = 6\times 10^{3}$$
$$\frac{6\times 10^{8}}{4\times 10^{3}}
  = \frac{6}{4}\times 10^{8-3} = 1{,}5\times 10^{5}$$

On regroupe les nombres d'un côté, les puissances de 10 de l'autre. Si le
premier facteur sort de l'intervalle, on rectifie :
$5\times 10^{3}\times 4\times 10^{2} = 20\times 10^{5} = 2\times 10^{6}$.
:::

::: retenir Comparer devient immédiat
Entre deux nombres positifs en notation scientifique, c'est l'**exposant** qui
tranche d'abord ; à exposants égaux, on compare les premiers facteurs.
$$7{,}9\times 10^{4} < 1{,}2\times 10^{5}$$
même si $7{,}9 > 1{,}2$. C'est là tout l'intérêt de cette écriture : elle rend
l'ordre de grandeur lisible d'un coup d'œil.
:::

## Les équations $x^{2} = a$

::: retenir Trois cas, selon le signe de $a$
- si $a > 0$ : **deux** solutions, $\sqrt{a}$ et $-\sqrt{a}$ ;
- si $a = 0$ : une seule, $0$ ;
- si $a < 0$ : **aucune**, un carré n'étant jamais négatif.
:::

::: piege L'oubli le plus fréquent du brevet
$x^{2} = 9$ n'a pas pour seule solution $3$. Le nombre $-3$ convient tout
autant : $(-3)^{2} = 9$. Une équation de ce type a **deux** solutions dès que
$a$ est strictement positif, et n'en oublier qu'une coûte la moitié des points.
:::

Graphiquement, résoudre $x^{2} = 9$ revient à chercher où la courbe de $x^{2}$
rencontre la droite d'équation $y = 9$ : elle la coupe en deux points, dont les
abscisses sont les deux solutions.

```tikz
\begin{tikzpicture}[x=8mm,y=2.6mm]
  \draw[figaccent,-{Stealth[length=2mm]}] (-4,0) -- (4.5,0) node[figleg,right] {$x$};
  \draw[figaccent,-{Stealth[length=2mm]}] (0,0) -- (0,13) node[figleg,above] {$y$};
  \draw[figtrait,dashed] (-4,9) -- (4,9);
  \node[figleg,left] at (-3.9,10.2) {$y=9$};
  \draw[figfort,line width=1.1pt,domain=-3.45:3.45,samples=70,smooth]
    plot (\x,{\x*\x});
  \node[figcote,right] at (3.3,11.6) {$y=x^{2}$};
  \draw[figtrait,dashed] (-3,0) -- (-3,9);
  \draw[figtrait,dashed] (3,0) -- (3,9);
  \node[figpoint] at (-3,9) {};
  \node[figpoint] at (3,9) {};
  \node[figval,below=0.8mm] at (-3,0) {$-3$};
  \node[figval,below=0.8mm] at (3,0) {$3$};
\end{tikzpicture}
```

::: methode Résoudre par le calcul
$$x^{2} = 49 \quad\Longrightarrow\quad x = 7 \ \text{ ou } \ x = -7$$

Quand la valeur n'est pas un carré parfait, on garde le radical :
$$x^{2} = 5 \quad\Longrightarrow\quad x = \sqrt{5} \ \text{ ou } \ x = -\sqrt{5}$$
et l'on ne donne une valeur approchée que si l'énoncé la demande.
:::

::: piege Une longueur ne prend qu'une solution
Si $x$ désigne un côté, la solution négative est à écarter — mais il faut
**l'avoir trouvée d'abord**, puis la rejeter en le disant. C'est le contexte
qui élimine, jamais le calcul.
:::

::: prolongement
La notation scientifique n'est pas une commodité d'écriture : c'est le langage
commun de la physique, de la chimie et de l'informatique. Un atome mesure
environ $10^{-10}$ m, une cellule $10^{-5}$ m, la Voie lactée $10^{21}$ m — et
c'est parce que ces nombres s'écrivent tous de la même façon qu'on peut les
comparer sans les compter.
:::
