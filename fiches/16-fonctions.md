---
titre: Les fonctions
surtitre: Fiche 16 · Fonctions — 3e
accroche: >-
  Une machine qui transforme un nombre en un autre. Toute la difficulté tient
  dans un mot et son contraire : l'image se calcule, l'antécédent se cherche.
niveaux: [3e]
priorite: 3
pourquoi: >-
  Notion neuve et centrale : elle porte toute la seconde, puis le reste du lycée.
duree: 35 min
domaine: Fonctions

automatismes:
  colonnes: 2
  items:
    - "4e | Calculer la valeur d'une expression littérale"
    - "4e | Résoudre une équation du premier degré"
    - "3e | Lire les coordonnées d'un point dans un repère"
    - "règle | Image : on remplace et on calcule"
    - "règle | Antécédent : on pose une équation et on résout"
    - "règle | Une fonction linéaire est une situation de proportionnalité"

videos:
  - id: 0NakIDu5dQU
    titre: Calculer un antécédent par une fonction
    chaine: Yvan Monka
    duree: "5:24"
    vues: "494 000"
  - id: 5ocIH2UJabk
    titre: Fonctions affines et linéaires
    chaine: Hedacademy
    duree: "7:39"
    vues: "230 000"
---

## Ce qu'est une fonction

::: definition Fonction
Une **fonction** est un procédé qui, à un nombre, associe **un seul** nombre.

On note $f : x \mapsto 3x-5$, et on lit « $f$ qui à $x$ associe $3x-5$ ».
L'écriture $f(x) = 3x-5$ dit la même chose.
:::

::: retenir Le vocabulaire, dans les deux sens
- $f(4) = 7$ se lit : **7 est l'image de 4** par $f$ ;
- la même égalité se lit aussi : **4 est un antécédent de 7** par $f$.

Un nombre a **au plus une** image. En revanche il peut avoir **plusieurs**
antécédents, ou aucun.
:::

## Calculer une image

::: methode
Soit $f(x) = 3x-5$. On calcule $f(-2)$ en remplaçant $x$ par $-2$ :
$$f(-2) = 3\times(-2)-5 = -6-5 = -11$$

**L'image de $-2$ est $-11$.** Rien à résoudre : on remplace, on calcule.
:::

## Chercher un antécédent

::: methode
Toujours avec $f(x) = 3x-5$, quel est l'antécédent de 10 ?

On cherche le $x$ tel que $f(x) = 10$, c'est-à-dire on **résout une équation** :
$$3x-5 = 10 \qquad 3x = 15 \qquad x = 5$$

**L'antécédent de 10 est 5.** Contrôle : $f(5) = 15-5 = 10$. ✔
:::

::: piege La confusion qui coûte le plus cher
« Calculer $f(3)$ » et « calculer l'antécédent de 3 » sont deux questions
**opposées**.

| Question | Ce qu'on connaît | Ce qu'on fait |
|---|---|---|
| Image de 3 | $x = 3$ | on remplace |
| Antécédent de 3 | $f(x) = 3$ | on résout |

Devant un énoncé, repérer d'abord de quel côté de la flèche on se trouve.
:::

## Trois façons de dire la même fonction

Une fonction peut se donner par une **formule**, un **tableau** ou une
**courbe** — et il faut savoir passer de l'une à l'autre.

```tikz
\begin{tikzpicture}[x=8mm,y=8mm]
  \draw[quadrillage] (0,0) grid (6,5);
  \draw[figaccent,-{Stealth[length=2mm]}] (0,0) -- (6.7,0) node[figleg,right] {$x$};
  \draw[figaccent,-{Stealth[length=2mm]}] (0,0) -- (0,5.7) node[figleg,above] {$y$};
  \foreach \i in {1,...,6} \node[figval,below=0.4mm] at (\i,0) {\i};
  \foreach \j in {1,...,5} \node[figval,left=0.4mm]  at (0,\j) {\j};
  \node[figval,below left=0.4mm] at (0,0) {0};
  \draw[figfort] (0,1) -- (6,4);
  \draw[figtrait,dashed] (4,0) -- (4,3) -- (0,3);
  \fill[prioritetrois] (4,3) circle (1mm);
  \node[figleg,text=prioritetrois,above left=0.3mm] at (4,3) {$(4\,;3)$};
  \node[figcote,right=1mm] at (6,4) {$\mathcal{C}_f$};
\end{tikzpicture}
```

::: methode Lire une image et un antécédent sur la courbe
- **Image de 4** : on monte depuis 4 sur l'axe des abscisses jusqu'à la courbe,
  puis on lit à gauche : $f(4) = 3$.
- **Antécédent de 3** : on part de 3 sur l'axe des ordonnées, on va jusqu'à la
  courbe, puis on lit en bas : c'est 4.

Le même point $(4\,;3)$ répond aux deux questions — on le lit simplement dans
l'autre sens.
:::

## Les fonctions linéaires

::: definition
Une fonction **linéaire** est de la forme $f(x) = ax$, avec $a$ un nombre fixé,
appelé **coefficient**.
:::

::: retenir
- Sa représentation graphique est une **droite passant par l'origine**.
- Elle traduit exactement une situation de **proportionnalité**, de
  coefficient $a$.
- Une hausse de $t$ % correspond à $x\mapsto \left(1+\frac{t}{100}\right)x$,
  une baisse à $x\mapsto\left(1-\frac{t}{100}\right)x$.
:::

::: methode Une remise de 20 %
Baisser de 20 %, c'est garder 80 %, donc multiplier par $0{,}8$ :
$$p(x) = 0{,}8x$$

Un article affiché 45 € coûte $p(45) = 36$ €.

Un article **payé** 52 € était affiché à $\dfrac{52}{0{,}8} = 65$ € : on cherche
ici un antécédent, donc on divise. Retirer 20 % de 52 donnerait 41,60 € et
répondrait à une autre question.
:::

## Les fonctions affines

::: definition
Une fonction **affine** est de la forme $f(x) = ax+b$.

$a$ est le **coefficient directeur**, $b$ l'**ordonnée à l'origine**.
:::

::: retenir Trois cas, une seule famille
- $b = 0$ : la fonction est **linéaire**, la droite passe par l'origine ;
- $a = 0$ : la fonction est **constante**, la droite est horizontale ;
- sinon, la droite coupe l'axe des ordonnées en $b$.

Les fonctions linéaires et constantes sont donc des cas particuliers de
fonctions affines. Toute fonction affine est représentée par une **droite**.
:::

::: methode Lire l'expression sur le graphique
La droite ci-dessus coupe l'axe des ordonnées en 1, donc $b = 1$.

Entre les points $(0\,;1)$ et $(6\,;4)$, on avance de 6 et on monte de 3 :
$$a = \frac{3}{6} = 0{,}5 \qquad\text{d'où}\qquad f(x) = 0{,}5x+1$$

Contrôle avec le point lu plus haut : $0{,}5\times 4+1 = 3$. ✔
:::

::: prolongement
Deux droites sont parallèles exactement quand elles ont le même coefficient
directeur. Comparer deux tarifs, c'est comparer deux fonctions affines : la
moins chère change au point d'intersection, qu'on trouve en résolvant
$f(x) = g(x)$.
:::
