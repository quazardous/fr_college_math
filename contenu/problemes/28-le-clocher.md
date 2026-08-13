---
titre: La hauteur du clocher
type: etapes
difficulte: 3
duree: 10 min
notions: [trigonométrie, arrondi, schéma]
---

Un géomètre veut mesurer la hauteur d'un clocher sans y monter. Il se place à
40 m du pied de l'édifice. Sa lunette est à 1,60 m du sol et vise le sommet
sous un angle de $35°$ au-dessus de l'horizontale.

```tikz
\begin{tikzpicture}[x=9mm,y=9mm]
  \coordinate (T)  at (0,0.4);
  \coordinate (Hz) at (4.2,0.4);
  \coordinate (S)  at (10.6,7.4);
  \draw[fig,line width=1pt] (-1.2,0) -- (12.2,0);
  \fill[fondtendre] (10,0) rectangle (11.2,6.6);
  \draw[fig] (10,0) rectangle (11.2,6.6);
  \draw[fig] (9.7,6.6) -- (10.6,7.4) -- (11.5,6.6);
  \draw[fig] (0,0) -- (T);
  \fill[encre] (T) circle (0.8mm);
  \draw[figtrait,dashed] (T) -- (10,0.4);
  \draw[figfort,line width=1.1pt] (T) -- (S);
  \pic[draw=accent,line width=0.8pt,angle radius=10mm,
       "{\footnotesize$35^\circ$}",angle eccentricity=1.5] {angle=Hz--T--S};
  \draw[figaccent,{Stealth[length=1.8mm]}-{Stealth[length=1.8mm]}]
    (0,-0.75) -- (10,-0.75) node[figcote,midway,below] {40 m};
  \node[figleg,below=1mm] at (0,0) {lunette, 1,60 m};
  \fill[prioritetrois] (S) circle (0.9mm);
  \node[figleg,text=prioritetrois,above right=0.3mm] at (S) {sommet};
\end{tikzpicture}
```

a) Calcule la hauteur du sommet **au-dessus de la lunette**, arrondie au
centimètre.

b) Déduis-en la hauteur du clocher, arrondie au décimètre.

::: solution
a) L'horizontale, la verticale du clocher et la ligne de visée forment un
triangle rectangle. Vu de l'angle de $35°$, la hauteur cherchée $h$ est le côté
**opposé**, et les 40 m le côté **adjacent** : c'est la tangente.
$$\tan(35°) = \frac{h}{40} \qquad\text{donc}\qquad h = 40\times\tan(35°)$$
$$h \approx 40\times 0{,}7002 \approx 28{,}01 \text{ m}$$

b) La lunette est elle-même à 1,60 m du sol, hauteur qu'il faut rajouter :
$$28{,}01+1{,}60 = 29{,}61 \text{ m}$$

**Le clocher mesure environ 29,6 m.**

*Le piège.* Oublier les 1,60 m donne 28,0 m : l'erreur est petite en pourcentage,
mais elle trahit une lecture trop rapide du schéma. La visée part de la lunette,
pas du sol.
:::
