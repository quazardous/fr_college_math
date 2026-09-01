---
titre: Puissances et racine carrée
surtitre: Fiche 11 · Nombres et calculs — 4e
accroche: >-
  Deux notations pour écrire court ce qui serait long : la puissance abrège
  un produit répété, la racine carrée remonte le fil d'un carré. Elles
  ouvrent la porte à Pythagore et aux ordres de grandeur.
niveaux: [4e]
priorite: 2
pourquoi: >-
  Outil de Pythagore, des grands nombres en sciences, et de toute la 3e.
duree: 30 min
domaine: Nombres et calculs

notions:
  - puissance
  - exposant
  - puissance de 10
  - racine carrée
  - carré parfait

automatismes:
  colonnes: 2
  items:
    - "4e | Les carrés parfaits des entiers de 0 à 12"
    - "4e | $2^{2}=4$ \\quad $2^{3}=8$ \\quad $3^{3}=27$"
    - "4e | $10^{2}=100$ \\quad $10^{3}=1000$"
    - "4e | Multiplier et diviser par 10, 100, 1000"
    - "4e | Compléter $1\\,200 = 1{,}2\\times\\ldots$"
    - "règle | $a^{n}$ se lit « $a$ exposant $n$ » : $a$ multiplié $n$ fois par lui-même"

videos:
  - id: TrHxDAN9UmA
    titre: Calculer avec des puissances
    chaine: Paul Olivier
    duree: "4:58"
    vues: "141 000"
  - id: 4CEYTrvUP0I
    titre: Puissances et nombres relatifs — 4e
    chaine: Yvan Monka
    duree: "5:36"
    vues: "442 000"
  - id: y2HlgP09Bog
    titre: Calculer une racine carrée — 4e
    chaine: Yvan Monka
    duree: "8:08"
    vues: "40 000"
---

## La puissance, une abréviation

::: definition
Pour $n$ entier positif, $a^{n}$ est le produit de $n$ facteurs tous égaux à $a$ :
$$a^{n} = \underbrace{a\times a\times\cdots\times a}_{n \text{ facteurs}}$$
Le nombre $a$ est la **base**, le nombre $n$ est l'**exposant**.
:::

Par convention, $a^{1}=a$ et $a^{0}=1$ pour tout $a$ non nul.

:cols G{24mm} Y Y
| Écriture | Développée | Valeur |
|---|---|---|
| $2^{5}$ | $2\times2\times2\times2\times2$ | 32 |
| $10^{4}$ | $10\times10\times10\times10$ | 10 000 |
| $(-3)^{2}$ | $(-3)\times(-3)$ | 9 |
| $(-3)^{3}$ | $(-3)\times(-3)\times(-3)$ | $-27$ |

::: retenir Le signe d'une puissance de nombre négatif
Un exposant **pair** donne un résultat **positif** ; un exposant **impair**
garde le signe négatif. Les moins s'annulent deux par deux.
:::

::: piege La parenthèse change tout
$(-3)^{2} = 9$, mais $-3^{2} = -9$. Dans le second cas, seul le 3 est élevé au
carré, et le signe moins reste devant. Une parenthèse oubliée inverse le résultat.
:::

## Les deux règles de calcul

::: retenir
$$a^{m}\times a^{n} = a^{m+n} \qquad\qquad (a\times b)^{n} = a^{n}\times b^{n}$$
:::

La première se lit sur les facteurs : $2^{3}\times 2^{4}$, c'est trois facteurs
2 suivis de quatre facteurs 2, donc sept en tout — $2^{7}$.

$$2^{3}\times 2^{4} = 2^{7} = 128 \qquad
  (2\times 5)^{3} = 2^{3}\times 5^{3} = 8\times 125 = 1000$$

::: piege
$a^{m}\times a^{n}$ n'est **pas** $a^{m\times n}$. On additionne les exposants,
on ne les multiplie pas. Contrôle : $2^{2}\times 2^{3} = 4\times 8 = 32 = 2^{5}$,
et non $2^{6}=64$.
:::

## Les puissances de 10

$$10^{n} = 1\underbrace{00\ldots0}_{n \text{ zéros}}$$

Elles servent à écrire commodément les très grands nombres des sciences.

:cols G{34mm} Y Y
| Grandeur | Écriture ordinaire | Avec une puissance de 10 |
|---|---|---|
| Distance Terre–Soleil | 150 000 000 km | $1{,}5\times 10^{8}$ km |
| Population mondiale | 8 200 000 000 | $8{,}2\times 10^{9}$ |
| Octets d'un disque | 1 000 000 000 000 | $10^{12}$ |

::: methode Multiplier par une puissance de 10
$1{,}2\times 10^{3} = 1\,200$ : la virgule se déplace de 3 rangs vers la droite.
C'est exactement la règle de la 6e, écrite plus court.
:::

## La racine carrée

::: definition
Pour un nombre $a$ **positif**, la **racine carrée** de $a$, notée $\sqrt{a}$,
est le nombre positif dont le carré vaut $a$ :
$$\sqrt{a}\times\sqrt{a} = a \qquad\text{et}\qquad \sqrt{a}\geqslant 0$$
:::

C'est l'opération qui remonte le fil : le carré fabrique, la racine défait.

$$\sqrt{49}=7 \quad\text{car}\quad 7^{2}=49
\qquad\qquad \sqrt{144}=12 \quad\text{car}\quad 12^{2}=144$$

::: piege
$\sqrt{a}$ n'existe pas quand $a$ est négatif : aucun nombre au carré ne donne
un résultat négatif. Et $\sqrt{9}$ vaut $3$, pas $\pm 3$ : la racine carrée est
toujours positive, par définition.
:::

::: methode Encadrer une racine qui ne tombe pas juste
C'est l'attendu du programme de 4e — pas le calcul exact.

Pour $\sqrt{54}$ : on cherche les deux carrés parfaits qui l'encadrent.
$$7^{2}=49 \qquad 54 \qquad 8^{2}=64$$
Donc $7 < \sqrt{54} < 8$. Comme 54 est plus proche de 49 que de 64,
la racine est plus proche de 7 : environ 7,35.

Connaître les carrés de 0 à 12 par cœur rend cet encadrement immédiat.
:::

::: retenir Les carrés parfaits — le socle
$1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$

Les reconnaître au premier coup d'œil est ce qui rend Pythagore rapide.
:::

::: prolongement
Le programme suggère de découvrir les **nombres irrationnels** à cette
occasion : $\sqrt{2}$, longueur de la diagonale d'un carré de côté 1, ne peut
s'écrire ni comme un décimal, ni comme une fraction. On peut le démontrer par
l'absurde en regardant le chiffre des unités. Cette découverte a, dit-on,
bouleversé l'école de Pythagore, qui croyait tout nombre exprimable par un
rapport d'entiers.
:::
