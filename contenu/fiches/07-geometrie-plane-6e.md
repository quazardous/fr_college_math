---
titre: Géométrie plane
surtitre: Fiche 7 · Espace et géométrie — 6e
accroche: >-
  La géométrie change de nature en 6e : on cesse de mesurer pour vérifier,
  on commence à raisonner à partir de définitions. Un dessin n'est plus une
  preuve.
niveaux: [6e]
priorite: 2
pourquoi: >-
  Toutes les démonstrations de 5e et de 4e reposent sur ces définitions.
duree: 25 min
domaine: Espace et géométrie

notions:
  - milieu
  - distance
  - cercle
  - disque
  - rayon
  - diamètre
  - médiatrice
  - angle
  - bissectrice
  - triangle
  - somme des angles d'un triangle
  - triangle isocèle
  - triangle équilatéral
  - inégalité triangulaire
  - cercle circonscrit
  - symétrie axiale
  - axe de symétrie

automatismes:
  colonnes: 2
  items:
    - "6e | Le lexique et le codage : angle droit, longueurs égales, angles égaux"
    - "6e | Reconnaître un carré, un rectangle, un triangle"
    - "6e | Reconnaître si une figure a un ou plusieurs axes de symétrie"
    - "6e | Coder soi-même les angles droits et les longueurs égales"
    - "6e | Un angle droit mesure $90°$, un angle plat $180°$"
    - "règle | Utiliser le compas pour reporter une longueur"

videos:
  - id: sRcgsiPeIq4
    titre: Construire le symétrique d'une figure — 6e
    chaine: Yvan Monka
    duree: "5:34"
    vues: "933 000"
  - id: x0UA6kbiDcM
    titre: Calculer un angle dans un triangle
    chaine: Yvan Monka
    duree: "4:43"
    vues: "434 000"
---

## Points, distances, milieu

::: definition
La **distance entre deux points** $A$ et $B$ est la longueur du segment $[AB]$,
notée $AB$.

Le **milieu** de $[AB]$ est le point de ce segment situé à égale distance de
$A$ et de $B$.
:::

::: piege La notation compte
$[AB]$ est le **segment**, $(AB)$ est la **droite**, et $AB$ est un **nombre**,
la longueur. Écrire « $[AB] = 5$ cm » est incorrect : un segment n'est pas un nombre.
:::

## Cercle et disque

::: definition Deux ensembles de points
Le **cercle** de centre $O$ et de rayon $R$ est l'ensemble des points situés
**à la distance exacte** $R$ de $O$.

Le **disque** est l'ensemble des points situés **à une distance inférieure ou
égale** à $R$ de $O$ : le cercle et tout l'intérieur.
:::

- Un **rayon** est un segment reliant le centre à un point du cercle.
- Un **diamètre** est une corde qui passe par le centre : $D = 2R$.
- Une **corde** est un segment reliant deux points du cercle.

!fig \disqueraye{2}{cm}

## La médiatrice

::: definition
La **médiatrice** d'un segment $[AB]$ est la droite perpendiculaire à $[AB]$
qui passe par son milieu.
:::

::: retenir La propriété caractéristique
Un point appartient à la médiatrice de $[AB]$ **si et seulement si** il est à
égale distance de $A$ et de $B$.

C'est cette propriété — et non le dessin — qui sert à démontrer.
:::

::: methode Construire une médiatrice au compas
1. Pointe en $A$, tracer un arc de cercle de rayon plus grand que la moitié de $AB$.
2. Même écartement, pointe en $B$, tracer un second arc.
3. Les deux arcs se coupent en deux points : la droite qui les joint est la médiatrice.
:::

## Les angles

:cols G{34mm} Y Y
| Nom | Mesure | Remarque |
|---|---|---|
| Angle nul | $0°$ | |
| Angle **aigu** | entre $0°$ et $90°$ | plus « pointu » qu'un angle droit |
| Angle **droit** | $90°$ | se code par un petit carré |
| Angle **obtus** | entre $90°$ et $180°$ | |
| Angle **plat** | $180°$ | les deux côtés sont alignés |
| Angle plein | $360°$ | |

Deux angles sont **supplémentaires** si la somme de leurs mesures vaut $180°$,
**adjacents** s'ils partagent un côté et un sommet sans se chevaucher,
**opposés par le sommet** s'ils sont formés par deux droites sécantes — et
dans ce cas ils sont égaux.

::: definition Bissectrice
La **bissectrice** d'un angle est la demi-droite issue du sommet qui partage
l'angle en deux angles de même mesure.
:::

## Les triangles

::: retenir La propriété la plus utilisée du collège
Dans **tout** triangle, la somme des mesures des trois angles vaut $180°$.
:::

!fig \triangleangles{47}{68}{?}

Deux angles connus suffisent donc à trouver le troisième :
$180 - (47+68) = 65°$.

:cols G{34mm} Y
| Triangle particulier | Ce qu'on en sait |
|---|---|
| **Isocèle** | deux côtés égaux, et les deux angles à la base égaux |
| **Équilatéral** | trois côtés égaux, et trois angles de $60°$ |
| **Rectangle** | un angle droit ; les deux autres angles sont complémentaires |

::: methode Triangle isocèle, angle au sommet connu
Les deux angles à la base sont égaux. On retire l'angle au sommet de $180°$,
puis on partage en deux.

Angle au sommet $40°$ : $180-40 = 140$, puis $140\div 2 = 70°$ pour chaque angle à la base.
:::

::: piege L'inégalité triangulaire
Trois longueurs ne forment pas toujours un triangle. Avec 3 cm, 4 cm et 9 cm,
c'est impossible : les deux petits côtés réunis ($3+4=7$) n'atteignent pas le
grand. Le programme demande de le constater au compas.
:::

## Cercle circonscrit

::: retenir
Les **trois médiatrices** d'un triangle se coupent en un même point.
Ce point est à égale distance des trois sommets : c'est le centre du
**cercle circonscrit**, celui qui passe par les trois sommets.
:::

La démonstration tient en une phrase : le point d'intersection de deux
médiatrices est à égale distance des trois sommets, donc il appartient aussi
à la troisième.

## La symétrie axiale

::: definition
Le **symétrique** d'un point $M$ par rapport à une droite $(d)$ est le point
$M'$ tel que $(d)$ soit la **médiatrice** de $[MM']$.
:::

::: retenir Ce que la symétrie axiale conserve
Les longueurs, les mesures d'angles, les aires, l'alignement, le milieu.
Une figure et son symétrique sont **superposables** — par retournement.
:::

::: methode Construire un symétrique au compas
Pour chaque point, on trace la perpendiculaire à l'axe, puis on reporte de
l'autre côté la même distance à l'axe. On relie ensuite les points obtenus
dans le même ordre.
:::

::: prolongement
Le programme invite à chercher la symétrie hors des mathématiques : rosaces
gothiques, pavages de l'art islamique, flocons de neige, alvéoles d'abeilles.
Beaucoup de figures possèdent plusieurs axes — les compter est déjà un exercice.
:::
