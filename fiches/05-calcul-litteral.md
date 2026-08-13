---
titre: Calcul littéral et équations
surtitre: Fiche 5 · Nombres et calculs
accroche: >-
  La lettre entre en scène. Elle ne remplace pas un nombre au hasard : elle
  permet de dire une chose vraie pour tous les nombres à la fois, et donc
  de démontrer.
niveaux: [5e]
priorite: 2
pourquoi: >-
  Porte d'entrée de toute l'algèbre du lycée. Ce qui se joue ici se paie en 3e.
duree: 30 min
domaine: Nombres et calculs

automatismes:
  colonnes: 2
  items:
    - "5e | Poursuivre une suite de motifs et en trouver la régularité"
    - "5e | Donner le nombre d'éléments d'une étape donnée d'un motif"
    - "5e | Nombre quotient : $3\\times\\ldots=7$ donne $\\tfrac73$"
    - "5e | Les carrés des entiers de 0 à 12"
    - "règle | $a\\times a$ s'écrit $a^{2}$, et $3\\times a$ s'écrit $3a$"
    - "règle | $k(a+b)=ka+kb$ dans les deux sens : développer et factoriser"

videos:
  - id: zfqoCo_8jbc
    titre: Simplifier une expression littérale — 5e
    chaine: Hedacademy
    duree: "6:07"
    vues: "71 000"
  - id: yg4NQylKmTc
    titre: Réduire une expression littérale
    chaine: Hedacademy
    duree: "9:21"
    vues: "683 000"
  - id: yQ1auuMtMvw
    titre: Résoudre une équation
    chaine: Hedacademy
    duree: "2:58"
    vues: "378 000"
---

## Pourquoi une lettre

Une formule dit d'un coup ce que mille exemples ne prouveraient pas.
« Le périmètre d'un carré vaut quatre fois le côté » s'écrit $P = 4c$ :
c'est vrai pour $c=3$, pour $c=7{,}5$, et pour tous les autres.

::: retenir Les trois rôles de la lettre
- **Variable** : elle peut prendre n'importe quelle valeur, comme dans $P=4c$.
- **Inconnue** : elle désigne un nombre précis mais encore inconnu, dans une équation.
- **Généralisation** : elle permet de démontrer une propriété pour tous les nombres.
:::

## Les conventions d'écriture

:cols G{34mm} G{30mm} Y
| On écrit | Au lieu de | Remarque |
|---|---|---|
| $3a$ | $3\times a$ | le signe $\times$ disparaît devant une lettre |
| $ab$ | $a\times b$ | idem entre deux lettres |
| $a^{2}$ | $a\times a$ | « $a$ au carré » |
| $2(a+b)$ | $2\times(a+b)$ | les parenthèses restent indispensables |

::: piege
$3a$ n'est pas $3+a$, et $a^{2}$ n'est pas $2a$.
Pour $a=5$ : $3a = 15$, $3+a = 8$, $a^{2}=25$ et $2a=10$. Quatre nombres différents.
:::

## Calculer la valeur d'une expression

::: methode Substituer
On remplace chaque lettre par sa valeur, **en remettant les signes $\times$**,
puis on applique les priorités.

Pour $A = 3x + 5$ avec $x = 4$ :
$$A = 3\times 4 + 5 = 12+5 = 17$$
:::

::: piege
Ne jamais écrire $34+5$ en remplaçant $x$ par 4 dans $3x+5$.
Remettre le signe $\times$ avant de calculer supprime ce piège.
:::

## Réduire une expression

Réduire, c'est regrouper ce qui est de même nature — comme on regroupe des
pommes avec des pommes.

$$5x + 3 + 2x - 7 \;=\; (5x+2x) + (3-7) \;=\; 7x - 4$$

::: piege
$5x + 3$ ne se réduit pas : $x$ et les nombres seuls ne sont pas de même nature.
Le résultat s'arrête là, et ce n'est pas un travail inachevé.
:::

## Développer et factoriser

::: retenir La même égalité, lue dans les deux sens
$$k(a+b) = ka + kb \qquad\qquad k(a-b) = ka - kb$$
De gauche à droite, on **développe**. De droite à gauche, on **factorise**.
:::

:cols G{22mm} Y Y
| Sens | Exemple | Ce qu'on obtient |
|---|---|---|
| Développer | $3(x+4)$ | $3x + 12$ |
| Développer | $5(2x-3)$ | $10x - 15$ |
| Factoriser | $7x + 7\times 2$ | $7(x+2)$ |
| Factoriser | $4x + 12$ | $4(x+3)$ |

## Tester une égalité

Une égalité entre expressions est soit vraie pour toutes les valeurs, soit fausse.
Pour montrer qu'elle est **fausse**, un seul contre-exemple suffit.

::: methode Le contre-exemple
« $2(x+3) = 2x+3$ » : essayons $x=1$.
À gauche $2\times 4 = 8$, à droite $2+3=5$. Comme $8\neq 5$, l'égalité est fausse.

**Un seul contre-exemple suffit à réfuter.** En revanche, cent exemples justes
ne démontrent rien : il faut alors développer.
:::

## Démontrer avec des lettres

Voilà à quoi sert vraiment le calcul littéral.

::: methode Un programme de calcul qui cache une surprise
« Choisis un nombre, ajoute 3, multiplie par 2, retire 6, divise par 2. »

Avec la lettre $n$ :
$$\frac{2(n+3)-6}{2} = \frac{2n+6-6}{2} = \frac{2n}{2} = n$$

On retombe **toujours** sur le nombre de départ. Aucun exemple ne pouvait le
prouver ; une ligne de calcul littéral y suffit.
:::

## Les équations

::: definition
Une **équation** est une égalité dans laquelle une lettre représente un nombre
inconnu. **Résoudre**, c'est trouver la ou les valeurs qui rendent l'égalité vraie.
:::

En 5e, deux formes seulement sont au programme, et on les résout par les
**opérations inverses** — pas par la méthode de la balance formalisée.

:cols G{26mm} Y Y
| Forme | Méthode | Exemple |
|---|---|---|
| $x + b = c$ | soustraire $b$ | $x+7 = 12$ donne $x = 12-7 = 5$ |
| $ax = c$ | diviser par $a$ | $4x = 20$ donne $x = 20\div 4 = 5$ |

::: methode Toujours vérifier
Une fois la solution trouvée, on la remplace dans l'équation de départ.
Pour $4x=20$ et $x=5$ : $4\times 5 = 20$. ✔ La vérification coûte cinq secondes
et rattrape presque toutes les erreurs.
:::

::: prolongement
Le mot « algèbre » vient de l'arabe *al-jabr*, tiré du traité d'**Al-Khwârizmî**
(IX e siècle). Il y distingue déjà deux opérations : *al-jabr* pour les équations
du type $x+b=c$, et *al-hatt* pour celles du type $ax=c$ — exactement les deux
formes au programme de 5e, mille deux cents ans plus tard.
:::
