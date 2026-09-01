---
titre: Les rails du tramway
type: etapes
difficulte: 3
duree: 10 min
notions: [angles alternes-internes, droites parallèles, triangle]
---

Deux rails parallèles sont traversés par une passerelle rectiligne.

```tikz
\begin{tikzpicture}[x=10mm,y=10mm]
  \draw[figaccent,line width=1pt] (0,2.6) -- (7,2.6) node[figleg,right] {rail $(d_1)$};
  \draw[figaccent,line width=1pt] (0,0)   -- (7,0)   node[figleg,right] {rail $(d_2)$};
  \draw[fig] (1.1,-0.9) -- (5.6,3.5) node[figleg,above right] {passerelle};
  \coordinate (P) at (intersection of 1.1,-0.9--5.6,3.5 and 0,2.6--7,2.6);
  \coordinate (Q) at (intersection of 1.1,-0.9--5.6,3.5 and 0,0--7,0);
  \fill[prioritetrois] (P) circle (0.9mm) node[figleg,above left=0.6mm,text=prioritetrois] {$P$};
  \fill[prioritetrois] (Q) circle (0.9mm) node[figleg,below right=0.6mm,text=prioritetrois] {$Q$};
  \coordinate (Qd) at ($(Q)+(1.4,0)$);
  \pic[draw=prioritedeux,line width=0.8pt,angle radius=8mm,
       "{\footnotesize$62^\circ$}",angle eccentricity=1.5] {angle=P--Q--Qd};
\end{tikzpicture}
```

L'angle marqué mesure $62°$.

a) Détermine la mesure de l'angle que la passerelle forme avec le rail $(d_1)$,
du côté opposé. Nomme la propriété utilisée.

b) Quelle serait la mesure de l'angle adjacent à celui de $62°$ sur le rail
$(d_2)$ ?

::: solution
a) Les deux rails sont **parallèles**, et la passerelle est une sécante.
L'angle cherché et l'angle de $62°$ sont **alternes-internes**.

Or, si deux droites parallèles sont coupées par une sécante, alors les angles
alternes-internes ont la même mesure.

Donc l'angle vaut $\mathbf{62°}$.

b) Les deux angles sont **supplémentaires** puisqu'ils forment ensemble un
angle plat le long du rail :
$$180-62 = \mathbf{118°}$$
:::
