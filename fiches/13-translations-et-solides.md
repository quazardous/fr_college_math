---
titre: Translations, milieux et solides
surtitre: Fiche 13 · Espace et géométrie — 4e
accroche: >-
  Une troisième transformation après les deux symétries, trois théorèmes qui
  se déduisent d'un simple milieu, et deux nouveaux solides dont le volume
  se divise par trois.
niveaux: [4e]
priorite: 2
pourquoi: >-
  Les théorèmes des milieux servent de premier vrai enchaînement de démonstration.
duree: 25 min
domaine: Espace et géométrie

automatismes:
  colonnes: 2
  items:
    - "4e | Construire le symétrique d'un point par demi-tour"
    - "4e | Reconnaître un parallélogramme grâce aux codages"
    - "4e | Reconnaître les solides : cube, pavé, cylindre, prisme droit"
    - "4e | Les formules de volume du cube, du pavé, du prisme, du cylindre"
    - "4e | Les aires du triangle, du rectangle, du disque"
    - "4e | Reconnaître la base d'un prisme en perspective cavalière"

videos:
  - id: chYUBSVEoFo
    titre: Construire l'image d'une figure par une translation
    chaine: Yvan Monka
    duree: "5:18"
    vues: "928 000"
  - id: Lj4-To1rZEU
    titre: Comprendre la translation — 4e
    chaine: Hedacademy
    duree: "5:35"
    vues: "42 000"
  - id: j51NVp4HJvM
    titre: Droite des milieux, les trois propriétés
    chaine: Echecs et Maths Faciles
    duree: "3:12"
    vues: "22 000"
---

## La translation

::: definition
Une **translation** fait glisser une figure entière : chaque point se déplace
dans la **même direction**, dans le **même sens**, et de la **même longueur**.

C'est le mouvement d'un tapis roulant, ou d'une frise qui se répète.
:::

!fig \figuretranslation

:cols G{30mm} G{30mm} Y
| Transformation | Ce qu'on donne | Le geste |
|---|---|---|
| Symétrie axiale [[6e]] | une droite | retournement |
| Symétrie centrale [[5e]] | un point | demi-tour |
| **Translation** [[4e]] | une direction, un sens, une longueur | glissement |

::: retenir Le lien avec le parallélogramme
Si $A'$ est l'image de $A$ et $B'$ celle de $B$ par la même translation, alors
$ABB'A'$ est un **parallélogramme**. C'est ce qui permet de construire une image
à la règle et au compas, sans rien mesurer.
:::

::: retenir Ce que la translation conserve
Les longueurs, les mesures d'angles, les aires, l'alignement, les milieux,
le parallélisme — **et le sens de lecture**, contrairement à la symétrie axiale.

Une figure et son image sont superposables par simple glissement.
:::

## Les théorèmes des milieux

Trois énoncés, tous construits sur la même figure : un triangle et les milieux
de deux côtés.

!fig \droitedesmilieux

::: retenir Les trois théorèmes
Dans un triangle $ABC$, soit $I$ le milieu de $[AC]$ et $J$ celui de $[BC]$.

1. **Si** $I$ et $J$ sont les milieux, **alors** $(IJ)$ est parallèle à $(AB)$.
2. **Si** $I$ et $J$ sont les milieux, **alors** $IJ = \dfrac{AB}{2}$.
3. **Si** $I$ est le milieu de $[AC]$ et si la parallèle à $(AB)$ passant par $I$
   coupe $[BC]$, **alors** elle le coupe en son milieu.
:::

::: methode Comment choisir lequel utiliser
On regarde ce que l'énoncé **donne** et ce qu'il **demande**.

- Deux milieux donnés, un parallélisme demandé : théorème 1.
- Deux milieux donnés, une longueur demandée : théorème 2.
- Un milieu et un parallélisme donnés, un milieu demandé : théorème 3.

Rédiger une démonstration, c'est nommer le théorème utilisé, vérifier que ses
conditions sont réunies, puis conclure. Ces trois étapes, dans cet ordre.
:::

::: piege
Le théorème 2 donne $IJ = \dfrac{AB}{2}$, donc le segment des milieux est
**deux fois plus court** que le côté. L'inverser — écrire $AB = \dfrac{IJ}{2}$ —
donne un résultat aberrant que le dessin dément immédiatement.
:::

## Pyramide et cône

::: definition
Une **pyramide** a pour base un polygone, et toutes ses faces latérales sont
des triangles réunis en un **sommet**.

Un **cône de révolution** s'obtient en faisant tourner un triangle rectangle
autour d'un de ses côtés de l'angle droit : sa base est un disque.
:::

::: retenir Le tiers, dans les deux cas
$$V_{\text{pyramide}} = \frac{\mathcal{A}_{\text{base}}\times h}{3}
\qquad\qquad
V_{\text{cône}} = \frac{\pi R^{2}\times h}{3}$$

C'est la formule du prisme et du cylindre, **divisée par trois**. Une pyramide
occupe exactement le tiers du prisme de même base et de même hauteur.
:::

:cols G{40mm} Y Y
| Solide | Volume | Niveau |
|---|---|---|
| Pavé droit | $L\times \ell\times h$ | [[5e]] |
| Prisme droit | $\mathcal{A}_{\text{base}}\times h$ | [[5e]] |
| Cylindre | $\pi R^{2}\times h$ | [[5e]] |
| **Pyramide** | $\dfrac{\mathcal{A}_{\text{base}}\times h}{3}$ | [[4e]] |
| **Cône** | $\dfrac{\pi R^{2}\times h}{3}$ | [[4e]] |

::: piege La hauteur n'est pas l'arête
La hauteur d'une pyramide se mesure **du sommet perpendiculairement à la base**,
pas le long d'une arête latérale. L'arête est plus longue que la hauteur ;
la confondre avec elle gonfle le volume.
:::

::: prolongement
Le programme cite les **pavages d'Escher et de l'Alhambra**, qui reposent
entièrement sur les translations, et invite à rapprocher les pyramides
égyptiennes de celle du Louvre — même solide, quatre mille ans d'écart.
:::
