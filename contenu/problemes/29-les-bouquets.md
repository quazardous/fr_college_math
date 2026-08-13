---
titre: Les bouquets du fleuriste
type: etapes
difficulte: 3
duree: 10 min
notions: [PGCD, nombres premiers, divisibilité]
---

Un fleuriste a reçu 126 roses et 210 tulipes. Il veut composer des bouquets
**tous identiques**, en utilisant absolument toutes les fleurs — aucune ne doit
rester.

a) Décompose 126 et 210 en produits de facteurs premiers.

b) Quel est le plus grand nombre de bouquets qu'il peut composer ?

c) Donne alors la composition d'un bouquet.

::: solution
a) $126 = 2\times 63 = 2\times 3^{2}\times 7$

$210 = 2\times 105 = 2\times 3\times 5\times 7$

b) Le nombre de bouquets doit diviser 126 **et** 210 : c'est un diviseur commun,
et on le veut le plus grand possible. On garde les facteurs communs, chacun à
son plus petit exposant :
$$\text{PGCD}(126\,;210) = 2\times 3\times 7 = 42$$

**Le fleuriste peut composer au plus 42 bouquets.**

c) $126\div 42 = 3$ et $210\div 42 = 5$.

**Chaque bouquet contient 3 roses et 5 tulipes.**

Contrôle : $42\times 3 = 126$ et $42\times 5 = 210$. Aucune fleur ne reste. ✔

*Ce qui se trompe.* Répondre 42 roses et 42 tulipes, ou confondre le nombre de
bouquets avec le contenu d'un bouquet. Le PGCD compte les **paquets**, jamais ce
qu'il y a dedans.
:::
