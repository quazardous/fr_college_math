---
titre: Le vitrail
type: application
difficulte: 2
duree: 5 min
notions: [angles, triangle isocèle, lecture de figure]
---

Voici un motif de vitrail. **Les seules données sont celles codées sur la
figure** : les angles indiqués, l'angle droit en $B$, et les deux traits qui
marquent $BC = BD$.

```tikz
\begin{tikzpicture}[x=13mm,y=13mm]
  \coordinate (A) at (0,0);
  \coordinate (B) at (3,0);
  \coordinate (C) at (2.110,1.424);
  \coordinate (D) at (3.000,1.679);
  \fill[accentclair,opacity=0.7] (A)--(B)--(C)--cycle;
  \fill[prioritetroisfond,opacity=0.9] (B)--(D)--(C)--cycle;
  \draw[fig] (A)--(B)--(C)--cycle;
  \draw[fig] (B)--(D)--(C);
  % angle droit en B, entre [BA) et [BD)
  \pic[draw=encre,line width=0.7pt,angle radius=4.5mm] {right angle=A--B--D};
  \pic[draw=accent,angle radius=7mm,"{\footnotesize$34^\circ$}",angle eccentricity=1.55] {angle=B--A--C};
  \pic[draw=accent,angle radius=7mm,"{\footnotesize$58^\circ$}",angle eccentricity=1.55] {angle=C--B--A};
  % codage des deux côtés égaux
  \foreach \P/\Q in {B/C, B/D}{
    \draw[prioritetrois,line width=0.8pt]
      ($(\P)!0.5!(\Q)!1.2mm!90:(\Q)$) -- ($(\P)!0.5!(\Q)!1.2mm!-90:(\Q)$);}
  \node[figleg,below left]  at (A) {$A$};
  \node[figleg,below right] at (B) {$B$};
  \node[figleg,above left]  at (C) {$C$};
  \node[figleg,above right] at (D) {$D$};
\end{tikzpicture}
```

a) Calcule la mesure de l'angle $\widehat{ACB}$.

b) Calcule la mesure de l'angle $\widehat{CBD}$.

c) Quelle est la nature du triangle $BCD$ ? Déduis-en la mesure de
l'angle $\widehat{BCD}$.

::: solution
a) Dans le triangle $ABC$, la somme des angles vaut $180°$ :
$$\widehat{ACB} = 180-(34+58) = 180-92 = \mathbf{88°}$$

b) L'angle $\widehat{ABD}$ est droit d'après le codage, donc il mesure $90°$.
Comme $\widehat{ABC} = 58°$ :
$$\widehat{CBD} = 90-58 = \mathbf{32°}$$

c) Le codage indique $BC = BD$ : le triangle $BCD$ est donc **isocèle en $B$**.

Ses deux angles à la base, $\widehat{BCD}$ et $\widehat{BDC}$, sont égaux :
$$\widehat{BCD} = \frac{180-32}{2} = \frac{148}{2} = \mathbf{74°}$$

*Ce que teste ce problème :* n'utiliser que ce qui est **codé**. Rien sur la
figure ne dit que $A$, $C$ et $D$ sont alignés, même si l'œil pourrait le croire.
:::
