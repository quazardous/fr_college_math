---
titre: Le jardin japonais
type: ouvert
difficulte: 5
duree: 15 min
notions: [aires, disque, Pythagore, pourcentages]
---

Un jardin carré de 12 m de côté contient un bassin circulaire tangent aux
quatre côtés. Une allée rectiligne relie deux sommets opposés du carré, en
passant au-dessus du bassin.

```tikz
\begin{tikzpicture}[x=8.5mm,y=8.5mm]
  \fill[fondtendre] (0,0) rectangle (6,6);
  \fill[accentclair,opacity=0.85] (3,3) circle (3);
  \draw[fig] (0,0) rectangle (6,6);
  \draw[fig] (3,3) circle (3);
  \draw[figfort,line width=1.2pt] (0,0) -- (6,6);
  \fill[encre] (3,3) circle (0.7mm);
  \node[figleg,above left=0.4mm] at (3,3) {$O$};
  \draw[figaccent,{Stealth[length=1.8mm]}-{Stealth[length=1.8mm]}] (0,-0.7) -- (6,-0.7)
    node[figcote,midway,below] {12 m};
  \node[figcote,text=prioritetrois,rotate=45] at (4.6,4.1) {allée};
  \node[figleg] at (1.3,1.9) {bassin};
\end{tikzpicture}
```

Le gazon occupe tout ce qui n'est ni bassin ni allée. L'allée mesure 1,20 m de
large, et on considérera qu'elle traverse le jardin en ligne droite d'un
sommet à l'autre.

Le paysagiste annonce que le gazon couvre moins de 15 % du jardin.

A-t-il raison ? On prendra $\pi \approx 3{,}14$.

::: solution
**Aire du jardin.** $12\times 12 = 144$ m².

**Aire du bassin.** Le bassin est tangent aux quatre côtés, son diamètre vaut
donc 12 m et son rayon 6 m :
$$\mathcal{A} = 3{,}14\times 6^{2} = 3{,}14\times 36 = 113{,}04 \text{ m}^{2}$$

**Longueur de l'allée.** C'est la diagonale du carré. D'après le théorème de
Pythagore :
$$d^{2} = 12^{2}+12^{2} = 144+144 = 288 \qquad d = \sqrt{288} \approx 16{,}97 \text{ m}$$

**Aire de l'allée.** $16{,}97\times 1{,}20 \approx 20{,}36$ m².

**Aire restante.** Bassin et allée se chevauchent, mais l'énoncé demande ce qui
n'est *ni* bassin *ni* allée. La partie d'allée qui traverse le bassin est déjà
comptée dans le bassin ; il ne faut donc retrancher que la portion d'allée
située hors du bassin.

Hors du bassin, l'allée se réduit à deux petits tronçons dans les coins, de
longueur totale $16{,}97-12 = 4{,}97$ m, soit $4{,}97\times 1{,}20 \approx 5{,}96$ m².

Gazon : $144-113{,}04-5{,}96 = 25$ m².

**Proportion.** $\dfrac{25}{144} \approx 0{,}174$, soit environ $\mathbf{17{,}4\,\%}$.

**Le paysagiste a tort** : le gazon couvre un peu plus de 17 % du jardin,
et non moins de 15 %.

*Le piège.* Soustraire l'aire entière de l'allée (20,36 m²) donnerait 10,6 m²,
soit 7,4 % — et ferait conclure l'inverse. Il fallait voir que l'allée traverse
le bassin, et ne compter que ce qui n'a pas déjà été retiré.
:::
