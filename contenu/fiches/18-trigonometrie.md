---
titre: La trigonométrie du triangle rectangle
surtitre: Fiche 18 · Espace et géométrie — 3e
accroche: >-
  Pythagore relie les trois côtés entre eux. La trigonométrie va plus loin :
  elle relie les côtés aux angles, et permet enfin de calculer un angle sans
  rapporteur.
niveaux: [3e]
priorite: 2
pourquoi: Seul outil du collège qui fasse le lien entre longueurs et angles.
duree: 30 min
domaine: Espace et géométrie

notions:
  - trigonométrie
  - cosinus
  - sinus
  - tangente
  - côté adjacent
  - côté opposé
  - hypoténuse
  - triangle rectangle

automatismes:
  colonnes: 2
  items:
    - "4e | Repérer l'hypoténuse : le côté opposé à l'angle droit"
    - "3e | Passer de la calculatrice en mode degrés"
    - "3e | Utiliser les touches $\\cos^{-1}$, $\\sin^{-1}$, $\\tan^{-1}$"
    - "règle | CAH · SOH · TOA"
    - "règle | Un cosinus et un sinus sont toujours compris entre 0 et 1"

videos:
  - id: BscM5Iti3zI
    titre: Calculer une longueur avec cosinus, sinus ou tangente
    chaine: Yvan Monka
    duree: "8:12"
    vues: "1 500 000"
  - id: md7hgVVKVI0
    titre: Calculer un angle avec cosinus, sinus ou tangente
    chaine: Yvan Monka
    duree: "6:52"
    vues: "1 580 000"
---

## Le vocabulaire, qui décide de tout

::: definition Les trois côtés, vus depuis un angle
Dans un triangle rectangle, on se place **à l'intérieur d'un angle aigu**,
noté ici $\alpha$ :

- l'**hypoténuse** est le côté opposé à l'angle droit — elle ne change jamais ;
- le côté **opposé** à $\alpha$ est celui qui lui fait face ;
- le côté **adjacent** à $\alpha$ est celui qui le borde, sans être
  l'hypoténuse.
:::

!fig \triangletrigo

::: piege
Opposé et adjacent **échangent leurs rôles** quand on change d'angle aigu. Ils
ne sont pas des propriétés du triangle, mais du couple triangle-angle. D'où la
première question à se poser : depuis quel angle est-ce que je regarde ?
:::

## Les trois rapports

::: retenir CAH · SOH · TOA
$$\cos\alpha = \frac{\text{adjacent}}{\text{hypoténuse}} \qquad
\sin\alpha = \frac{\text{opposé}}{\text{hypoténuse}} \qquad
\tan\alpha = \frac{\text{opposé}}{\text{adjacent}}$$

Ces rapports ne dépendent **que** de l'angle, jamais de la taille du triangle :
deux triangles rectangles de même angle aigu sont l'un l'agrandissement de
l'autre.
:::

::: retenir Un contrôle qui ne trompe pas
L'hypoténuse est le plus long côté, donc
$$0 < \cos\alpha < 1 \qquad\text{et}\qquad 0 < \sin\alpha < 1$$

Un cosinus supérieur à 1 signale une erreur de rapport, sans autre vérification.
La tangente, elle, n'est pas bornée : elle dépasse 1 dès que l'angle dépasse
$45°$.
:::

## Calculer une longueur

::: methode
$ABC$ est rectangle en $B$, $\widehat{BAC} = 35°$ et $AC = 8$ cm. On cherche
$AB$.

1. **Se placer** dans l'angle de $35°$, en $A$.
2. **Nommer** : $AC$ est l'hypoténuse, $AB$ est le côté adjacent.
   Adjacent et hypoténuse, donc **cosinus**.
3. **Écrire** : $\cos(35°) = \dfrac{AB}{8}$.
4. **Isoler** : $AB = 8\times\cos(35°) \approx 6{,}55$ cm.
5. **Contrôler** : $AB$ est plus court que l'hypoténuse. ✔
:::

::: retenir Choisir le bon rapport en une question
Écrire les deux côtés en jeu — celui qu'on connaît et celui qu'on cherche —
puis lire la ligne correspondante :

| Les deux côtés en jeu | Rapport |
|---|---|
| adjacent et hypoténuse | cosinus |
| opposé et hypoténuse | sinus |
| opposé et adjacent | tangente |

Le côté dont on ne parle pas ne sert à rien : inutile de le chercher d'abord.
:::

## Calculer un angle

::: methode
$RST$ est rectangle en $R$, avec $RS = 5$ cm et $RT = 12$ cm. On cherche
$\widehat{RST}$.

1. Vu de $S$, le côté $[RT]$ est **opposé** et $[RS]$ **adjacent** : tangente.
2. $\tan\big(\widehat{RST}\big) = \dfrac{12}{5} = 2{,}4$.
3. On remonte à l'angle avec la touche $\tan^{-1}$ :
   $\widehat{RST} \approx 67{,}4°$, soit $\mathbf{67°}$ au degré près.
4. Contrôle : la tangente dépasse 1, donc l'angle dépasse $45°$. ✔
:::

::: piege La calculatrice
Deux réglages font échouer tout le chapitre :

- le mode doit être **DEG**, jamais RAD ni GRAD ;
- $\tan^{-1}$ n'est pas $\dfrac{1}{\tan}$ : c'est la touche qui rend l'angle,
  souvent obtenue par la combinaison seconde fonction.

Un résultat aberrant vient neuf fois sur dix de là, pas du raisonnement.
:::

## Avec Pythagore

::: methode Le troisième côté
Une fois deux côtés connus, le troisième s'obtient par **Pythagore**, sans
trigonométrie. Dans l'exemple ci-dessus :
$$ST^{2} = 5^{2}+12^{2} = 169 \qquad ST = 13 \text{ cm}$$

Les deux outils se complètent : Pythagore entre longueurs, la trigonométrie dès
qu'un angle entre en jeu.
:::

::: prolongement
La somme des angles d'un triangle valant $180°$, le second angle aigu se déduit
sans nouveau calcul : $90-67 = 23°$. On peut aussi vérifier que le sinus de
l'un égale le cosinus de l'autre — deux angles complémentaires échangent leur
sinus et leur cosinus.
:::
