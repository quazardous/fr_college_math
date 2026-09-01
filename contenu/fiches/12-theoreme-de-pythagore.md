---
titre: Le théorème de Pythagore
surtitre: Fiche 12 · Espace et géométrie — 4e
accroche: >-
  Le théorème le plus utilisé du collège. Il relie les trois côtés d'un
  triangle rectangle, et il fonctionne dans les deux sens : pour calculer
  une longueur, et pour prouver qu'un angle est droit.
niveaux: [4e]
priorite: 3
pourquoi: >-
  Réutilisé sans arrêt en 3e, au brevet, puis au lycée. Rien ne le remplace.
duree: 30 min
domaine: Espace et géométrie

notions:
  - théorème de Pythagore
  - hypoténuse
  - triangle rectangle
  - réciproque du théorème de Pythagore
  - contraposée
  - cercle circonscrit

automatismes:
  colonnes: 2
  items:
    - "4e | Les carrés des entiers de 0 à 12"
    - "4e | Reconnaître un triangle rectangle sur un schéma codé"
    - "4e | Reconnaître les droites remarquables d'un triangle"
    - "règle | L'hypoténuse est le côté opposé à l'angle droit — toujours le plus long"
    - "règle | Calculer une longueur : Pythagore. Prouver un angle droit : la réciproque"

videos:
  - id: M9sceJ8gzNc
    titre: Appliquer Pythagore pour calculer une longueur
    chaine: Yvan Monka
    duree: "6:24"
    vues: "2 500 000"
  - id: XVHkUmnFWxg
    titre: Appliquer Pythagore en 1 minute
    chaine: Hedacademy
    duree: "1:41"
    vues: "257 000"
---

## L'énoncé

::: definition L'hypoténuse
Dans un triangle rectangle, l'**hypoténuse** est le côté **opposé à l'angle
droit**. C'est toujours le plus long des trois.
:::

::: retenir Le théorème de Pythagore
Si un triangle $ABC$ est rectangle en $A$, alors
$$BC^{2} = AB^{2} + AC^{2}$$
Le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.
:::

!fig \trianglepythagore{3}{2.2}{A}{B}{C}

::: piege L'erreur qui coûte le plus de points
L'hypoténuse est **toujours seule** de son côté de l'égalité. Repérer l'angle
droit **avant** d'écrire quoi que ce soit : c'est le côté d'en face qui est
l'hypoténuse, pas le plus grand nombre de l'énoncé.
:::

## Calculer l'hypoténuse

::: methode
$ABC$ rectangle en $A$, avec $AB = 6$ cm et $AC = 8$ cm. On cherche $BC$.

1. Écrire le théorème : $BC^{2} = AB^{2}+AC^{2}$.
2. Remplacer : $BC^{2} = 6^{2}+8^{2} = 36+64 = 100$.
3. Remonter par la racine : $BC = \sqrt{100} = 10$ cm.
:::

## Calculer un côté de l'angle droit

Ici, on **soustrait** — et c'est là que se joue la différence.

::: methode
$ABC$ rectangle en $A$, avec $BC = 13$ cm et $AB = 5$ cm. On cherche $AC$.

1. $BC^{2} = AB^{2}+AC^{2}$, donc $AC^{2} = BC^{2}-AB^{2}$.
2. $AC^{2} = 13^{2}-5^{2} = 169-25 = 144$.
3. $AC = \sqrt{144} = 12$ cm.
:::

::: retenir Comment savoir s'il faut additionner ou soustraire
- On cherche **l'hypoténuse** : on **additionne**.
- On cherche **un autre côté** : on **soustrait** le petit carré du grand.

Contrôle immédiat : l'hypoténuse doit être le plus grand des trois résultats.
Si ce n'est pas le cas, l'opération était la mauvaise.
:::

## La réciproque : démontrer qu'un angle est droit

::: retenir La réciproque du théorème
Si dans un triangle $ABC$ on a $BC^{2} = AB^{2}+AC^{2}$,
alors le triangle est **rectangle en $A$**.
:::

::: methode Le calcul se mène en deux colonnes séparées
Un triangle a pour côtés 9 cm, 12 cm et 15 cm. Est-il rectangle ?

Le plus long côté, 15 cm, serait l'hypoténuse. On calcule **séparément** :
$$15^{2} = 225 \qquad\qquad 9^{2}+12^{2} = 81+144 = 225$$

Les deux résultats sont égaux : d'après la réciproque, **le triangle est
rectangle**, et l'angle droit est celui opposé au côté de 15 cm.
:::

::: piege
Ne jamais écrire l'égalité **avant** d'avoir vérifié : on calcule les deux
membres chacun de son côté, puis on compare. Écrire $15^{2}=9^{2}+12^{2}$ dès
la première ligne, c'est supposer vrai ce qu'on doit démontrer.
:::

## La contraposée : démontrer qu'un angle n'est pas droit

::: retenir
Si $BC^{2} \neq AB^{2}+AC^{2}$, alors le triangle **n'est pas** rectangle en $A$.
:::

Un triangle de côtés 4, 5 et 7 : $7^{2}=49$ tandis que $4^{2}+5^{2}=16+25=41$.
Les résultats diffèrent, donc le triangle n'est pas rectangle.

::: definition Un point de logique, explicitement au programme
- Le **théorème** part du triangle rectangle et donne l'égalité.
- La **réciproque** part de l'égalité et donne le triangle rectangle.
- La **contraposée** part de l'inégalité et refuse le triangle rectangle.

Une propriété vraie a toujours une contraposée vraie. En revanche, une
réciproque n'est pas automatiquement vraie : pour Pythagore, elle l'est, et
c'est un résultat à part entière.
:::

## Le triangle rectangle et son cercle circonscrit

::: retenir
Un triangle est rectangle **si et seulement si** il est inscrit dans un
demi-cercle dont le diamètre est l'un de ses côtés.

Le centre du cercle circonscrit d'un triangle rectangle est donc le **milieu
de l'hypoténuse**.
:::

Cette propriété sert à construire un rectangle sans équerre, ce que le
programme demande explicitement : on trace un cercle, un diamètre, et tout
point du cercle forme un angle droit avec les extrémités de ce diamètre.

::: prolongement
Le théorème était connu des Babyloniens mille ans avant Pythagore, et les
mathématiciens chinois et indiens l'ont démontré indépendamment. Le programme
suggère d'étudier la démonstration d'Euclide, fondée sur des **aires** : elle
montre que les deux petits carrés se découpent et se recomposent exactement
dans le grand.
:::
