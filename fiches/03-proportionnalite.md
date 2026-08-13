---
titre: La proportionnalité
surtitre: Fiche 3 · Proportionnalité et fonctions
accroche: >-
  Si une seule leçon devait être maîtrisée dans toute l'année, c'est celle-ci.
  Recettes, prix, échelles, vitesses, pourcentages, statistiques : elle est
  partout, au collège comme dans la vie courante.
niveaux: [6e, 5e, 4e]
priorite: 3
pourquoi: >-
  La notion la plus rentable du programme : elle irrigue tous les autres chapitres.
duree: 35 min
domaine: Proportionnalité, fonctions

automatismes:
  colonnes: 2
  items:
    - "6e | Repérer double, moitié, tiers, quart entre deux nombres"
    - "6e | « 4 fois plus » : multiplier ; « 4 fois moins » : diviser"
    - "5e | Dire si une situation relève ou non de la proportionnalité"
    - "5e | Recette pour 4 personnes, la donner pour 2, 6 ou 8"
    - "5e | Prix d'un kilo connu, en déduire le prix de 3 kg, de 4{,}3 kg"
    - "5e | Prendre 1 \\%, 10 \\% ou 50 \\% d'un nombre"
    - "règle | Le coefficient se lit toujours « par unité » : prix *au* kilo, battements *par* minute"

videos:
  - id: QgjbpX_kciA
    titre: Reconnaître la proportionnalité — 6e
    chaine: Yvan Monka
    duree: "7:19"
    vues: "275 000"
  - id: u4lVY1tGSnA
    titre: Proportionnalité — 6e
    chaine: Les Bons Profs
    duree: "4:06"
    vues: "264 000"
  - id: Qy2ppBOEax4
    titre: Appliquer une proportionnalité — 6e
    chaine: Yvan Monka
    duree: "6:30"
    vues: "112 000"
---

## Reconnaître une situation de proportionnalité

::: definition
Deux grandeurs sont **proportionnelles** lorsque l'on passe de l'une à l'autre
en multipliant *toujours par le même nombre*. Ce nombre s'appelle le
**coefficient de proportionnalité**.
:::

:cols G{58mm} Y
| C'est proportionnel | Ce ne l'est pas |
|---|---|
| Le prix payé et la quantité achetée | L'âge et la taille d'une personne |
| La distance parcourue et la durée, à vitesse constante | Le prix d'un abonnement avec frais d'inscription |
| Le périmètre d'un carré et son côté | L'aire d'un carré et son côté |

::: piege Le test qui ne trompe pas
Si l'on double la première grandeur, la seconde *doit* doubler.
Un carré de côté 2 a pour aire 4 ; de côté 4, son aire est 16, et non 8 :
l'aire n'est **pas** proportionnelle au côté.
:::

## Les trois procédures du programme

Le programme demande de *choisir la procédure adaptée aux nombres*, et non
d'en appliquer une seule mécaniquement.

### Linéarité multiplicative — « 3 fois plus »

5 croissants coûtent 6,25 €. Combien coûtent 15 croissants ?

$$15 = 5\times 3 \quad\text{donc}\quad 6{,}25\times 3 = 18{,}75\ \text{€}$$

### Linéarité additive — « 5 + 3 »

5 croissants : 6,25 €. 3 croissants : 3,75 €. Alors 8 croissants coûtent
$6{,}25 + 3{,}75 = 10$ €.

### Retour à l'unité — le passe-partout

::: methode
1. Chercher la valeur pour **une** unité.
2. Multiplier par le nombre voulu.

5 croissants coûtent 6,25 € -> un croissant coûte $6{,}25\div 5 = 1{,}25$ €
-> 8 croissants coûtent $1{,}25\times 8 = 10$ €.
:::

!fig \tableaupropo{Croissants}{Prix (€)}{5/6{,}25, 8/?, 12/15}{$\times\,1{,}25$}

::: piege Ce que le programme interdit explicitement en 6e
La technique du « produit en croix » **n'est pas enseignée** : le texte officiel
demande que l'élève raisonne sur le *sens* de la situation. Un résultat juste
obtenu par produit en croix ne vaut donc pas la démarche attendue.
:::

## Représenter une situation

### Par un tableau

Le nom de chaque grandeur, avec son unité, figure explicitement dans le tableau.
Le programme y insiste : c'est ce qui donne du sens aux nombres.

### [[5e]] Par un graphique

::: retenir La signature graphique de la proportionnalité
Les points sont **alignés** *et* l'alignement **passe par l'origine**.
Les deux conditions sont nécessaires : des points alignés sur une droite qui ne
passe pas par l'origine ne relèvent pas de la proportionnalité.
:::

!fig \repereplan[7mm]{6}{5}{1/1/, 2/2/, 3/3/, 4/4/}

## Les grandes applications

### Les pourcentages

Appliquer un pourcentage, c'est utiliser un coefficient :
$15\,\%$ de $240 = \dfrac{15}{100}\times 240 = 36$. Voir la fiche 2 pour le détail.

### Les échelles

::: definition
Une échelle est le coefficient qui fait passer de la réalité au dessin :
$$\text{échelle} = \frac{\text{distance sur le plan}}{\text{distance réelle}}
\quad\text{(dans la même unité)}$$
:::

À l'échelle $\tfrac{1}{25\,000}$, 1 cm sur la carte représente 25 000 cm dans la
réalité, soit **250 m**. Donc 4 cm sur la carte représentent **1 km**.

::: piege
L'erreur classique est d'oublier la conversion : 25 000 cm ne font pas 25 000 m.
On convertit *toujours* avant de conclure.
:::

### [[5e]] La vitesse moyenne

La vitesse est le coefficient entre la distance et la durée :

$$v = \frac{d}{t} \qquad d = v\times t \qquad t = \frac{d}{v}$$

180 km parcourus en 2 h 30 : $v = \dfrac{180}{2{,}5} = 72$ km/h.

::: piege
2 h 30 s'écrit $2{,}5$ h en écriture décimale, et non $2{,}30$ h : les durées
sont en base 60, pas en base 10. C'est l'une des erreurs les plus coûteuses du collège.
:::

## [[5e]] L'expression « en fonction de »

En 5e, on commence à dire qu'une grandeur **dépend** d'une autre : « le prix
*en fonction de* la quantité ». On produit alors une formule simple, un tableau
de valeurs, ou un graphique — trois façons de dire la même chose.

$$\text{prix} = 1{,}25 \times \text{nombre de croissants}$$

La proportionnalité devient ainsi le premier exemple de fonction, notion qui
sera étudiée en 4e et en 3e.

## [[4e]] Ratios, grandeurs quotients et coefficient multiplicateur

::: definition Le ratio
Un **ratio** compare des parts entre elles, sans dire le total.
« Le ciment et le sable sont dans le ratio $2:5$ » signifie que pour 2 seaux de
ciment, il y a 5 seaux de sable — soit 7 parts en tout.
:::

::: methode Un partage proportionnel
Répartir 350 € entre trois personnes selon le ratio $2:3:5$.

Le total des parts vaut $2+3+5 = 10$. Une part vaut donc $350\div 10 = 35$ €.
Les trois personnes reçoivent $70$ €, $105$ € et $175$ €.

Contrôle : $70+105+175 = 350$. ✔
:::

::: definition Grandeur quotient
Une **grandeur quotient** naît de la division de deux grandeurs :
km/h, €/kg, habitants/km², g/cm³. Elle se lit toujours « par unité ».
C'est le coefficient de proportionnalité, avec son unité.
:::

::: retenir Le coefficient multiplicateur
Une évolution en pourcentage s'applique en **une seule multiplication**.

$$+20\,\%\ \longrightarrow\ \times 1{,}20
\qquad\qquad
-25\,\%\ \longrightarrow\ \times 0{,}75$$

Un article à 80 € soldé à $-25\,\%$ coûte $80\times 0{,}75 = 60$ € — sans passer
par le calcul de la remise.
:::

::: methode Enchaîner deux évolutions
Un prix augmente de 10 %, puis baisse de 10 %. Revient-il à sa valeur de départ ?

$$100\times 1{,}10\times 0{,}90 = 99$$

Non : il manque 1 €. Les pourcentages **ne s'additionnent pas** ; les
coefficients, eux, se multiplient. C'est l'un des résultats les plus
contre-intuitifs du programme.
:::

::: definition Quatrième proportionnelle
Dans un tableau de proportionnalité où trois valeurs sur quatre sont connues,
la quatrième s'appelle la **quatrième proportionnelle**. On la trouve par le
coefficient, par la linéarité, ou — désormais autorisé en 4e — par l'égalité
des rapports.
:::

::: prolongement
Le programme relie la proportionnalité aux grands enjeux contemporains : lire un
graphique d'émissions de CO\textsubscript{2}, comparer des ordres de grandeur,
repérer une présentation trompeuse. C'est là que les mathématiques deviennent un
outil d'esprit critique.
:::
