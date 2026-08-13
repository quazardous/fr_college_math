---
titre: Géométrie et espace
surtitre: Fiche 8 · Espace et géométrie — 5e
accroche: >-
  En 5e, la mesure cesse d'être une preuve. On démontre à partir de propriétés,
  et on apprend à distinguer une définition d'une propriété caractéristique.
niveaux: [5e]
priorite: 2
pourquoi: >-
  C'est l'année où la démonstration s'installe ; elle ne fera que se durcir ensuite.
duree: 30 min
domaine: Espace et géométrie

automatismes:
  colonnes: 2
  items:
    - "5e | Construire le symétrique d'une figure par symétrie axiale"
    - "5e | Reconnaître angles opposés par le sommet, adjacents, supplémentaires"
    - "5e | Les angles de l'équerre : $30$-$60$-$90$ ou $45$-$45$-$90$"
    - "5e | La somme des angles d'un triangle, et le troisième angle"
    - "5e | Reconnaître un triangle isocèle, équilatéral ou rectangle sur un schéma codé"
    - "5e | Reconnaître un cube ou un pavé en perspective cavalière"
    - "5e | Reconnaître un patron de cube"
    - "5e | Placer un point d'abscisse décimale sur une demi-droite graduée"

videos:
  - id: gQZIWxzOfaE
    titre: Image d'une figure par symétrie centrale
    chaine: Yvan Monka
    duree: "4:12"
    vues: "937 000"
  - id: v7XmtQhOP9I
    titre: Utiliser les angles alternes-internes
    chaine: Yvan Monka
    duree: "6:48"
    vues: "475 000"
  - id: UV2E89VbBiQ
    titre: Le parallélogramme — les propriétés
    chaine: Hedacademy
    duree: "3:37"
    vues: "18 000"
  - id: eJ8BSaTIpYU
    titre: Calculer le volume d'un cylindre — 5e
    chaine: Yvan Monka
    duree: "4:58"
    vues: "471 000"
---

## Le repérage dans le plan

::: definition
Un **repère orthogonal** est formé de deux axes gradués perpendiculaires.
Un point y est décrit par ses **coordonnées** $(x\,;y)$ : d'abord l'**abscisse**,
lue horizontalement, puis l'**ordonnée**, lue verticalement.
:::

!fig \repereplan[7mm]{6}{4}{2/3/$A(2\,;3)$, 5/1/$B(5\,;1)$}

::: piege
L'abscisse **toujours en premier**. Le point $(2\,;3)$ n'est pas le point $(3\,;2)$.
Moyen mnémotechnique : on marche d'abord, on grimpe ensuite.
:::

## La symétrie centrale

::: definition
Le **symétrique** d'un point $M$ par rapport à un point $O$ est le point $M'$
tel que $O$ soit le **milieu** de $[MM']$.

On dit aussi que la figure a subi un **demi-tour** autour de $O$.
:::

:cols G{40mm} Y Y
| | Symétrie axiale (6e) | Symétrie centrale (5e) |
|---|---|---|
| L'élément de symétrie | une **droite** | un **point** |
| Le geste | un retournement, comme un miroir | un demi-tour, comme une rotation |
| Sens de lecture | inversé | conservé |

::: retenir Ce que la symétrie centrale conserve
Longueurs, mesures d'angles, aires, alignement, milieux — et en plus, elle
transforme une droite en une droite **parallèle**. C'est cette dernière
propriété qui la rend utile en démonstration.
:::

## Angles et parallélisme

Quand deux droites sont coupées par une sécante, certaines paires d'angles
portent un nom.

!fig \droitesparalleles{\alpha}

::: retenir La propriété qui sert à démontrer
Si deux droites sont **parallèles**, alors les angles **alternes-internes**
sont égaux, et les angles **correspondants** aussi.

La réciproque est vraie et tout aussi utile : si deux angles alternes-internes
sont égaux, alors les droites **sont** parallèles. C'est ainsi qu'on
*démontre* un parallélisme, plutôt que de le lire sur le dessin.
:::

## Les triangles

::: methode Démontrer que la somme des angles vaut 180°
On trace la parallèle à $(AB)$ passant par $C$. Les angles alternes-internes
reportent alors les angles $\widehat{A}$ et $\widehat{B}$ de part et d'autre de
$\widehat{C}$, au sommet $C$. Les trois angles forment ensemble un angle plat,
donc leur somme vaut $180°$.

Le programme demande explicitement cette démonstration en 5e, alors qu'en 6e
la propriété était admise.
:::

:cols G{30mm} Y Y
| Droite remarquable | Définition | Propriété |
|---|---|---|
| **Médiatrice** | perpendiculaire à un côté en son milieu | les trois sont concourantes : centre du cercle circonscrit |
| **Hauteur** | issue d'un sommet, perpendiculaire au côté opposé | les trois sont concourantes |
| **Médiane** | joint un sommet au milieu du côté opposé | elle partage le triangle en deux aires égales |

::: methode Pourquoi une médiane partage l'aire en deux
Les deux petits triangles ont des bases de même longueur — les deux moitiés du
côté — et **la même hauteur**, celle issue du sommet opposé. Leurs aires,
$\dfrac{b\times h}{2}$, sont donc égales.
:::

L'aire du triangle est $\mathcal{A} = \dfrac{\text{base}\times\text{hauteur}}{2}$,
la hauteur étant celle **relative à la base choisie**.

## Le parallélogramme

::: definition
Un **parallélogramme** est un quadrilatère dont les côtés opposés sont
parallèles deux à deux.
:::

::: retenir Les propriétés caractéristiques
Un quadrilatère est un parallélogramme **si et seulement si** l'une de ces
conditions est vraie :

- ses côtés opposés sont parallèles deux à deux ;
- ses côtés opposés sont de même longueur deux à deux ;
- ses **diagonales se coupent en leur milieu** ;
- deux côtés opposés sont à la fois parallèles et de même longueur.

« Si et seulement si » veut dire qu'on peut s'en servir dans les deux sens :
pour **déduire** une propriété, ou pour **démontrer** que le quadrilatère en est un.
:::

:cols G{34mm} Y
| Parallélogramme particulier | Ce qui s'ajoute |
|---|---|
| **Rectangle** | quatre angles droits ; diagonales de même longueur |
| **Losange** | quatre côtés égaux ; diagonales perpendiculaires |
| **Carré** | les deux à la fois |

Son aire est $\mathcal{A} = \text{base}\times\text{hauteur}$ — la hauteur, pas
le côté oblique.

::: piege
Le côté oblique d'un parallélogramme est plus long que sa hauteur. Utiliser le
côté à la place de la hauteur donne une aire trop grande.
:::

## Représenter l'espace

::: definition Perspective cavalière
La face avant est dessinée en vraie grandeur ; les fuyantes partent en oblique,
et les arêtes cachées se tracent en pointillés.
:::

!fig \pavedroit{5}{3}{3}{cm}\hspace{9mm}\prismedroit{3}{4}{cm}\hspace{9mm}\cylindrerev{2}{4}{cm}

::: retenir Une seule idée pour trois solides
$$V_{\text{pavé}} = L\times \ell\times h \qquad
V_{\text{prisme}} = \mathcal{A}_{\text{base}}\times h \qquad
V_{\text{cylindre}} = \pi R^{2}\times h$$
Dans les trois cas : **aire de la base $\times$ hauteur**.
:::

Un **patron** est la figure plane qui, découpée et pliée, redonne le solide.
Le programme demande de passer d'une représentation à l'autre, dans les deux sens.

::: prolongement
Les cinq **solides de Platon** — tétraèdre, cube, octaèdre, dodécaèdre,
icosaèdre — sont les seuls polyèdres réguliers convexes ; il n'en existe pas
d'autres, et c'est démontrable. Le programme cite aussi les gravures d'Escher,
qui jouent sur l'ambiguïté de la perspective.
:::
