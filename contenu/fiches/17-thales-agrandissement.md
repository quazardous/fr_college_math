---
titre: Thalès et agrandissement-réduction
surtitre: Fiche 17 · Espace et géométrie — 3e
accroche: >-
  Deux droites parallèles coupent deux sécantes en proportions égales. Le même
  fait, vu de plus loin, explique pourquoi une maquette au 1/50 n'a pas une
  aire cinquante fois plus petite.
niveaux: [3e]
priorite: 2
pourquoi: >-
  Le pendant de Pythagore : l'un donne les longueurs, l'autre les proportions.
duree: 30 min
domaine: Espace et géométrie

automatismes:
  colonnes: 2
  items:
    - "5e | Reconnaître deux droites parallèles sur un codage"
    - "6e | Passer d'une égalité de quotients au produit en croix"
    - "3e | Repérer les points alignés et leur ordre"
    - "règle | Trois rapports égaux, écrits dans le même ordre"
    - "règle | Aires $\\times k^2$, volumes $\\times k^3$"

videos:
  - id: GwGQD2BdZ3s
    titre: Appliquer le théorème de Thalès
    chaine: Yvan Monka
    duree: "9:35"
    vues: "3 000 000"
  - id: j0QOiLcU-3M
    titre: Agrandissement et réduction
    chaine: Les Bons Profs
    duree: "3:53"
    vues: "192 000"
---

## Le théorème

::: retenir Le théorème de Thalès
$M$ est un point de $(AB)$, $N$ un point de $(AC)$.

Si $(MN)$ est **parallèle** à $(BC)$, alors
$$\frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}$$
:::

!fig \configthales

::: retenir Comment écrire les trois rapports sans se tromper
Les trois fractions se lisent **petit triangle sur grand triangle**, et dans
le même ordre à chaque fois :

- au numérateur, les côtés du triangle $AMN$ ;
- au dénominateur, les côtés **homologues** du triangle $ABC$.

$A$ est le sommet commun : il apparaît dans les deux premiers rapports, jamais
dans le troisième.
:::

## L'autre configuration

Le théorème ne dit rien du dessin : il suffit que les points soient alignés et
les droites parallèles. La configuration dite **en papillon**, où $A$ se trouve
entre les deux triangles, donne exactement les mêmes rapports.

!fig \configpapillon

::: piege
Ne pas chercher à reconnaître une forme. Chercher plutôt : où est le sommet
commun ? quels côtés se correspondent ? Un triangle retourné n'est pas un cas
particulier, c'est le même cas.
:::

## Calculer une longueur

::: methode
Sur la première figure, $AM = 4$ cm, $AB = 10$ cm et $MN = 6$ cm. On cherche
$BC$.

1. Poser le théorème : $\dfrac{AM}{AB} = \dfrac{MN}{BC}$.
2. Remplacer : $\dfrac{4}{10} = \dfrac{6}{BC}$.
3. Produit en croix : $4\times BC = 10\times 6$, donc
   $BC = \dfrac{60}{4} = 15$ cm.
4. Contrôler : le rapport $0{,}4$ est inférieur à 1, donc le petit triangle est
   bien une réduction, et $BC$ doit dépasser $MN$. ✔
:::

::: retenir On n'utilise que deux rapports à la fois
Les trois rapports sont égaux, mais on n'en écrit que **deux** : celui qui
contient l'inconnue, et un dont les deux longueurs sont connues.
:::

## La réciproque : démontrer un parallélisme

::: retenir La réciproque
Si $A$, $M$, $B$ sont alignés, si $A$, $N$, $C$ le sont **dans le même ordre**,
et si
$$\frac{AM}{AB} = \frac{AN}{AC}$$
alors $(MN)$ et $(BC)$ sont **parallèles**.
:::

::: methode Le calcul se mène en deux colonnes séparées
$AM = 3$, $AB = 7{,}5$, $AN = 4$, $AC = 10$.
$$\frac{AM}{AB} = \frac{3}{7{,}5} = 0{,}4 \qquad\qquad
\frac{AN}{AC} = \frac{4}{10} = 0{,}4$$

Les deux rapports sont égaux et l'ordre des points est le même, donc d'après la
réciproque du théorème de Thalès, **$(MN)$ et $(BC)$ sont parallèles**.
:::

::: piege
La condition sur l'**ordre** des points n'est pas décorative : avec les mêmes
rapports mais un point de l'autre côté de $A$, les droites ne sont plus
parallèles. C'est la seule chose que la figure doit servir à vérifier.
:::

## Agrandissement et réduction

::: definition
Agrandir ou réduire une figure dans le **rapport $k$**, c'est multiplier
**toutes** ses longueurs par $k$.

$k > 1$ : agrandissement. $k < 1$ : réduction. Les **angles ne changent pas**.
:::

::: retenir Les trois puissances de $k$
| Ce qu'on mesure | Multiplié par |
|---|---|
| Longueurs | $k$ |
| Aires | $k^{2}$ |
| Volumes | $k^{3}$ |

Une dimension, une puissance : c'est la seule chose à retenir, et elle explique
tout le reste.
:::

::: methode
Un cube de 4 cm d'arête est agrandi dans le rapport 3.

- Arête : $4\times 3 = 12$ cm.
- Aire d'une face : multipliée par $3^{2} = 9$.
- Volume : multiplié par $3^{3} = 27$, soit $64\times 27 = 1\,728$ cm³.

Contrôle direct : $12^{3} = 1\,728$ cm³. ✔
:::

::: piege
Multiplier le volume par $k$ au lieu de $k^{3}$ est l'erreur la plus coûteuse du
chapitre, parce qu'elle passe inaperçue : le résultat reste plausible. Le
réflexe est de se demander combien de dimensions la grandeur possède.
:::

::: prolongement
Thalès **est** une réduction : le petit triangle $AMN$ est l'image du grand par
une réduction de rapport $\frac{AM}{AB}$, de centre $A$. Les deux moitiés de
cette fiche ne sont donc qu'un seul et même énoncé, regardé à deux échelles.
:::
