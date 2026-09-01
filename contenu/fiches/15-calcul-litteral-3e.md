---
titre: Identités remarquables et équations produit
surtitre: Fiche 15 · Nombres et calculs — 3e
accroche: >-
  Trois égalités à connaître par cœur, et une équation qui se résout sans
  calcul. C'est le chapitre le plus rentable de l'année : il tombe au brevet,
  et il ne s'arrête plus jusqu'au bac.
niveaux: [3e]
priorite: 3
pourquoi: Développer et factoriser conditionnent tout le calcul du lycée.
duree: 35 min
domaine: Nombres et calculs

notions:
  - double distributivité
  - identité remarquable
  - développer
  - factoriser
  - différence de deux carrés
  - équation produit
  - mise en équation

automatismes:
  colonnes: 2
  items:
    - "5e | Distribuer un facteur sur une somme"
    - "4e | Réduire une somme de termes semblables"
    - "3e | $(a+b)^2 = a^2+2ab+b^2$"
    - "3e | $(a-b)^2 = a^2-2ab+b^2$"
    - "3e | $(a+b)(a-b) = a^2-b^2$"
    - "règle | Un produit est nul si et seulement si un facteur est nul"

videos:
  - id: 6j0oMQlaBYg
    titre: Développer avec l'identité $(a-b)(a+b)$
    chaine: Yvan Monka
    duree: "7:50"
    vues: "635 000"
  - id: APj1WPPNUgo
    titre: Résoudre une équation-produit
    chaine: Yvan Monka
    duree: "4:38"
    vues: "614 000"
---

## La double distributivité

::: retenir
$$(a+b)(c+d) = ac+ad+bc+bd$$
Chaque terme de la première parenthèse rencontre chaque terme de la seconde :
**quatre** produits, jamais deux.
:::

::: methode
$$(2x-1)(x+4) = 2x\times x+2x\times 4+(-1)\times x+(-1)\times 4$$
$$= 2x^{2}+8x-x-4 = 2x^{2}+7x-4$$

Le signe voyage avec le terme : c'est $-1$ qu'on distribue, pas $1$.
:::

## Les trois identités remarquables

::: retenir Les trois égalités
$$(a+b)^{2} = a^{2}+2ab+b^{2}$$
$$(a-b)^{2} = a^{2}-2ab+b^{2}$$
$$(a+b)(a-b) = a^{2}-b^{2}$$

Ce ne sont pas des règles nouvelles : ce sont les résultats de la double
distributivité, appris par cœur pour aller vite.
:::

Le carré de côté $a+b$ se découpe en quatre morceaux, et le double produit
saute aux yeux : ce sont les **deux** rectangles.

!fig \carreidentite

::: piege L'erreur la plus fréquente du brevet
$$(x+5)^{2} \neq x^{2}+25$$
Il manque le double produit $2\times x\times 5 = 10x$. La bonne réponse est
$x^{2}+10x+25$.

Contrôle en dix secondes : pour $x = 1$, $(1+5)^{2} = 36$, tandis que
$1+25 = 26$. Une valeur numérique suffit à démasquer l'erreur.
:::

::: methode Développer
$$(3x+2)^{2} = (3x)^{2}+2\times 3x\times 2+2^{2} = 9x^{2}+12x+4$$

Attention à $(3x)^{2} = 9x^{2}$ : le carré porte aussi sur le 3.
:::

## Factoriser

Factoriser, c'est lire les identités **de droite à gauche**.

::: methode Trois réflexes, dans cet ordre
1. **Un facteur commun ?** $7x+21 = 7(x+3)$, et
   $(x-2)(x+5)+(x-2) = (x-2)(x+6)$.
2. **Une différence de deux carrés ?** $x^{2}-49 = (x-7)(x+7)$, et
   $4x^{2}-9 = (2x)^{2}-3^{2} = (2x-3)(2x+3)$.
3. **Un carré parfait ?** $x^{2}+6x+9 = (x+3)^{2}$, après avoir vérifié que le
   terme du milieu est bien le double produit : $2\times x\times 3 = 6x$. ✔
:::

::: piege
$x^{2}+49$ ne se factorise pas. Seule la **différence** de deux carrés le peut :
une somme de carrés reste telle quelle.
:::

## Les équations produit

::: retenir La propriété
Un produit de facteurs est nul **si et seulement si** au moins l'un des
facteurs est nul.
$$A\times B = 0 \iff A = 0 \ \text{ ou } \ B = 0$$
:::

::: methode
$$(x-2)(3x+9) = 0$$
$$x-2 = 0 \quad\text{ou}\quad 3x+9 = 0$$
$$x = 2 \quad\text{ou}\quad x = -3$$

**Les solutions sont $2$ et $-3$.**
:::

::: piege
Développer d'abord serait une faute de méthode : on obtiendrait
$3x^{2}+3x-18 = 0$, une équation du second degré qu'on ne sait pas résoudre en
3e. La forme factorisée **est** la réponse en cours de route — il ne faut
surtout pas la détruire.
:::

::: methode Quand l'équation n'est pas encore un produit
$$x^{2}-16 = 0$$
On factorise le membre de gauche : $(x-4)(x+4) = 0$, d'où $x = 4$ ou $x = -4$.

Retenir qu'une telle équation a **deux** solutions, et pas seulement la
positive.
:::

## Mettre en équation

::: methode La démarche, toujours la même
On augmente le côté d'un carré de 3 cm ; l'aire devient 64 cm².

1. **Nommer** : soit $c$ le côté de départ, en cm.
2. **Traduire** : le nouveau côté vaut $c+3$, donc $(c+3)^{2} = 64$.
3. **Résoudre** : $c+3$ est une longueur, donc positive, d'où $c+3 = 8$ et
   $c = 5$.
4. **Contrôler** : $(5+3)^{2} = 64$. ✔ Et répondre par une phrase.
:::

::: prolongement
La même équation, traitée par factorisation, donne les deux solutions
algébriques : $(c+3)^{2}-64 = 0$, soit $(c+3-8)(c+3+8) = 0$, d'où $c = 5$ ou
$c = -11$. La seconde est rejetée parce qu'une longueur ne peut pas être
négative — c'est le contexte, et non le calcul, qui tranche.
:::
