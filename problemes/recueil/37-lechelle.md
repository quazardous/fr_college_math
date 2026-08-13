---
titre: L'échelle du pompier
type: ouvert
difficulte: 4
duree: 15 min
notions: [Pythagore, proportionnalité, sécurité]
---

Une échelle de 13 m est posée contre un mur. Le pied de l'échelle est à 5 m
du mur.

```tikz
\begin{tikzpicture}[x=9mm,y=9mm]
  \fill[trait,opacity=0.5] (0,0) rectangle (0.35,4.2);
  \draw[fig] (0,0) -- (0,4.2);
  \draw[fig,line width=1pt] (-0.6,0) -- (5.2,0);
  \draw[figfort,line width=1.4pt] (2.6,0) -- (0.35,4.05)
    node[figcote,text=prioritetrois,midway,sloped,above] {13 m};
  \draw[fig] (0.35,0.3) -- (0.65,0.3) -- (0.65,0);
  \draw[figaccent,{Stealth[length=1.8mm]}-{Stealth[length=1.8mm]}] (0.35,-0.7) -- (2.6,-0.7)
    node[figcote,midway,below] {5 m};
  \node[figleg,left] at (0,2.1) {mur};
\end{tikzpicture}
```

Le règlement de sécurité impose que le sommet d'une échelle dépasse d'au moins
1 m le rebord sur lequel on veut monter.

Un pompier doit atteindre un balcon situé à 11,50 m du sol.

Cette échelle convient-elle ?

::: solution
**Hauteur atteinte par l'échelle.** Le mur, le sol et l'échelle forment un
triangle rectangle dont l'échelle est l'**hypoténuse** :
$$h^{2} = 13^{2}-5^{2} = 169-25 = 144$$
$$h = \sqrt{144} = 12 \text{ m}$$

**Vérification du règlement.** Le balcon est à 11,50 m, et l'échelle atteint
12 m. Le dépassement vaut :
$$12-11{,}50 = 0{,}50 \text{ m}$$

Or le règlement exige au moins 1 m.

**L'échelle ne convient pas** : il manque 50 cm de dépassement.

*Pour aller plus loin.* Pour atteindre 11,50 m avec 1 m de dépassement, il
faudrait toucher le mur à 12,50 m. Avec le pied toujours à 5 m, l'échelle
devrait mesurer $\sqrt{12{,}50^{2}+5^{2}} = \sqrt{156{,}25+25} = \sqrt{181{,}25}
\approx 13{,}5$ m.
:::
