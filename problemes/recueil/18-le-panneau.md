---
titre: Le panneau de signalisation
type: application
difficulte: 2
duree: 5 min
notions: [aires, disque, figures composées]
---

Un panneau est formé d'un rectangle surmonté d'un demi-disque.

```tikz
\begin{tikzpicture}[x=10mm,y=10mm]
  \fill[accentclair,opacity=0.7] (0,0) rectangle (4,2.5);
  \begin{scope}
    \clip (0,2.5) rectangle (4,4.6);
    \fill[accentclair,opacity=0.7] (2,2.5) circle (2);
  \end{scope}
  \draw[fig] (0,0) -- (4,0) -- (4,2.5);
  \draw[fig] (0,0) -- (0,2.5);
  \draw[fig] (0,2.5) arc (180:0:2);
  \draw[figaccent,dashed] (0,2.5) -- (4,2.5);
  \draw[figfort,{Stealth[length=1.8mm]}-{Stealth[length=1.8mm]}] (0,-0.6) -- (4,-0.6)
    node[figcote,midway,below,text=prioritetrois] {4 m};
  \draw[figfort,{Stealth[length=1.8mm]}-{Stealth[length=1.8mm]}] (-0.6,0) -- (-0.6,2.5)
    node[figcote,midway,left,text=prioritetrois] {2,5 m};
\end{tikzpicture}
```

Calcule l'aire totale du panneau, puis la longueur de son contour.
On prendra $\pi \approx 3{,}14$.

::: solution
**Aire.** Le rectangle : $4\times 2{,}5 = 10$ m².

Le demi-disque a pour rayon $4\div 2 = 2$ m :
$$\frac{\pi\times 2^{2}}{2} = \frac{3{,}14\times 4}{2} = 6{,}28 \text{ m}^{2}$$

Aire totale : $10+6{,}28 = \mathbf{16{,}28}$ **m²**.

**Contour.** Attention : le segment horizontal en pointillés est *intérieur*,
il ne fait pas partie du contour.

Trois côtés du rectangle : $4+2{,}5+2{,}5 = 9$ m.

Demi-cercle : $\dfrac{2\times 3{,}14\times 2}{2} = 6{,}28$ m.

Contour total : $9+6{,}28 = \mathbf{15{,}28}$ **m**.
:::
