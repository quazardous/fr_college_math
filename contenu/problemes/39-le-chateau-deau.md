---
titre: Le château d'eau
type: ouvert
difficulte: 5
duree: 15 min
notions: [volumes, agrandissement, conversions, proportionnalité]
---

Le château d'eau d'une commune est une cuve cylindrique de 6 m de diamètre et
8 m de hauteur.

!fig \cylindrerev{3}{8}{m}

La commune compte 1 200 habitants, qui consomment en moyenne 150 litres d'eau
par jour et par habitant.

Pour anticiper la sécheresse, le conseil municipal fait remplacer la cuve par
une cuve **semblable à la première, agrandie dans le rapport 1,5**. L'adjoint
au maire annonce en séance que la nouvelle réserve tiendra « quatre jours pleins
sans un seul remplissage ».

A-t-il raison ? On prendra $\pi \approx 3{,}14$.

::: solution
**Volume de la cuve actuelle.** Le rayon vaut $6\div 2 = 3$ m :
$$V = \pi\times r^{2}\times h \approx 3{,}14\times 3^{2}\times 8
= 3{,}14\times 72 = 226{,}08 \text{ m}^{3}$$

**Volume de la nouvelle cuve.** Dans un agrandissement de rapport $k$, les
volumes sont multipliés par $k^{3}$, et non par $k$ :
$$1{,}5^{3} = 3{,}375$$
$$V' = 226{,}08\times 3{,}375 = 763{,}02 \text{ m}^{3}$$

**Consommation quotidienne.** $1\,200\times 150 = 180\,000$ L, soit, puisque
$1$ m³ vaut $1\,000$ L :
$$180\,000 \text{ L} = 180 \text{ m}^{3} \text{ par jour}$$

**Comparaison.** Quatre jours demandent $4\times 180 = 720$ m³.

Or $763{,}02 > 720$.

**L'adjoint a raison** : la nouvelle cuve couvre quatre jours, et il reste même
$763{,}02-720 = 43{,}02$ m³, soit environ six heures de consommation
supplémentaires.

$$\frac{763{,}02}{180} \approx 4{,}24 \text{ jours}$$

*Le piège.* Multiplier le volume par 1,5 au lieu de $1{,}5^{3}$ donnerait
339,12 m³, soit moins de deux jours — et ferait conclure l'inverse. Un rapport
d'agrandissement agit sur les longueurs ; il faut le cuber pour les volumes.

*Contrôle par l'autre chemin.* La nouvelle cuve a un rayon de $3\times 1{,}5 =
4{,}5$ m et une hauteur de $8\times 1{,}5 = 12$ m, d'où
$3{,}14\times 4{,}5^{2}\times 12 = 3{,}14\times 243 = 763{,}02$ m³. ✔
:::
