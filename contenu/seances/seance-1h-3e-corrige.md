---
titre: Séance 3e — corrigé
surtitre: Une heure · 3e
accroche: >-
  Le résultat seul ne sert à rien : ce qui compte est la démarche. En 3e, la
  rédaction devient une partie de la réponse — une longueur trouvée sans la
  propriété citée ne vaut plus grand-chose.
niveaux: [3e]
priorite: 3
pourquoi: >-
  À lire après avoir cherché, jamais avant.
duree: 60 min
domaine: Révision générale
nomcourt: Séance 1 h · 3e — corrigé
---

## Arithmétique

::: solution Exercice 1 — Diviseurs et nombres premiers
a) $1$ ; $2$ ; $3$ ; $4$ ; $5$ ; $6$ ; $10$ ; $12$ ; $15$ ; $20$ ; $30$ ; $60$.

Douze diviseurs. On les trouve par paires — $1\times 60$, $2\times 30$,
$3\times 20$, $4\times 15$, $5\times 12$, $6\times 10$ — et on s'arrête dès que
les deux facteurs se croisent.

b) Non : $91 = 7\times 13$. Il ne suffit pas de dire « 91 est impair » : il faut
essayer les premiers successifs $2, 3, 5, 7, \dots$ jusqu'à dépasser
$\sqrt{91}\approx 9{,}5$. Le $7$ tombe juste avant.
:::

::: solution Exercice 2 — Décomposer
$84 = 2\times 42 = 2\times 2\times 21 = 2^{2}\times 3\times 7$

$180 = 2\times 90 = 2\times 2\times 45 = 2^{2}\times 3^{2}\times 5$
:::

::: solution Exercice 3 — Rendre irréductible
a) On garde les facteurs communs, chacun à son plus petit exposant :
$$\text{PGCD}(84\,;180) = 2^{2}\times 3 = 12$$

b) $\dfrac{84}{180} = \dfrac{84\div 12}{180\div 12} = \dfrac{7}{15}$.

$7$ et $15$ n'ont plus de diviseur commun autre que 1 : la fraction est
irréductible.
:::

## Calcul littéral et équations

::: solution Exercice 4 — Développer
a) $(x+3)(x-5) = x^{2}-5x+3x-15 = x^{2}-2x-15$

b) $(2x-1)(x+4) = 2x^{2}+8x-x-4 = 2x^{2}+7x-4$
:::

::: solution Exercice 5 — Les identités remarquables
a) $(x+5)^{2} = x^{2}+2\times x\times 5+5^{2} = x^{2}+10x+25$

b) $(x-3)^{2} = x^{2}-6x+9$

c) $(x+7)(x-7) = x^{2}-49$

*Le piège.* $(x+5)^{2}$ ne vaut **pas** $x^{2}+25$ : le double produit $10x$ se
perd une fois sur deux.
:::

::: solution Exercice 6 — Factoriser
a) $x^{2}-49 = x^{2}-7^{2} = (x-7)(x+7)$

b) $4x^{2}-9 = (2x)^{2}-3^{2} = (2x-3)(2x+3)$

c) $x^{2}+6x+9 = x^{2}+2\times x\times 3+3^{2} = (x+3)^{2}$

Pour c), le réflexe est de vérifier que le terme du milieu vaut bien le double
produit : $2\times x\times 3 = 6x$. ✔
:::

::: solution Exercice 7 — Équation produit
Un produit de facteurs est nul si et seulement si l'un des facteurs est nul :
$$x-2 = 0 \quad\text{ou}\quad 3x+9 = 0$$
$$x = 2 \quad\text{ou}\quad x = -3$$

**L'équation a deux solutions : $2$ et $-3$.**

Développer d'abord serait une faute de méthode : on obtiendrait une équation du
second degré qu'on ne sait pas résoudre en 3e.
:::

::: solution Exercice 8 — Mettre en équation
Soit $c$ le côté du carré de départ, en cm. Le nouveau côté vaut $c+3$, donc :
$$(c+3)^{2} = 64$$

Comme $c+3$ est une longueur, elle est positive : $c+3 = \sqrt{64} = 8$,
donc $c = 5$.

**Le carré de départ avait 5 cm de côté.**

Contrôle : $(5+3)^{2} = 8^{2} = 64$. ✔
:::

## Fonctions

::: solution Exercice 9 — Image et antécédent
a) $f(4) = 3\times 4-5 = 7$ \qquad $f(-2) = 3\times(-2)-5 = -11$

b) On résout $3x-5 = 10$, donc $3x = 15$ et $x = 5$.

**L'antécédent de 10 est 5.**

Une image se *calcule*, un antécédent se *résout* : c'est la différence à tenir.
:::

::: solution Exercice 10 — Linéaire, affine, constante
$g(x) = -3x$ est **linéaire** (de la forme $ax$).

$h(x) = 5$ est **constante** (de la forme $ax+b$ avec $a = 0$).

$f(x) = 2x+1$ est affine, sans être linéaire.

Les trois sont **affines** : linéaire et constante sont deux cas particuliers
d'affine. Leurs représentations graphiques sont donc trois droites.
:::

::: solution Exercice 11 — Lire un graphique
a) Le point de la droite d'abscisse 4 a pour ordonnée 3 : $f(4) = 3$.

b) Le point d'ordonnée 4 a pour abscisse 6 : l'antécédent de 4 est **6**.

c) La droite coupe l'axe des ordonnées en 1, donc l'ordonnée à l'origine vaut 1.
Entre $(0\,;1)$ et $(6\,;4)$, on avance de 6 et on monte de 3, d'où un
coefficient directeur de $\dfrac{3}{6} = 0{,}5$.
$$f(x) = 0{,}5x+1$$

Vérification avec a) : $0{,}5\times 4+1 = 3$. ✔
:::

::: solution Exercice 12 — Une remise, c'est une fonction
a) Baisser de 20 %, c'est garder 80 %, soit multiplier par $0{,}8$ :
$$p(x) = 0{,}8x$$

b) $p(45) = 0{,}8\times 45 = 36$ €.

c) On cherche l'antécédent de 52 : $0{,}8x = 52$, donc
$x = \dfrac{52}{0{,}8} = 65$ €.

**Le prix affiché était de 65 €.** Retirer 20 % de 52 € donnerait 41,60 € — et
répondrait à une autre question que celle posée.
:::

## Thalès et trigonométrie

::: solution Exercice 13 — Calculer avec Thalès
$M$ appartient à $[AB]$, $N$ à $[AC]$, et $(MN)$ est parallèle à $(BC)$.
D'après le théorème de Thalès :
$$\frac{AM}{AB} = \frac{AN}{AC} = \frac{MN}{BC}$$

On n'utilise que le premier et le dernier rapport :
$$\frac{4}{10} = \frac{6}{BC} \qquad\text{donc}\qquad BC = \frac{6\times 10}{4} = 15$$

**$BC = 15$ cm.**

Le rapport $\dfrac{4}{10} = 0{,}4$ est inférieur à 1 : le petit triangle est une
réduction, $BC$ doit donc être plus grand que $MN$. C'est bien le cas.
:::

::: solution Exercice 14 — Parallèles ou non
On calcule les deux rapports **séparément** :
$$\frac{AM}{AB} = \frac{3}{7{,}5} = 0{,}4 \qquad\qquad \frac{AN}{AC} = \frac{4}{10} = 0{,}4$$

Les points $A$, $M$, $B$ d'une part, $A$, $N$, $C$ d'autre part sont alignés
dans le même ordre, et les deux rapports sont égaux.

Donc, d'après la réciproque du théorème de Thalès, **$(MN)$ et $(BC)$ sont
parallèles**.

Les deux conditions comptent : des rapports égaux ne suffisent pas si l'ordre
des points n'est pas le même.
:::

::: solution Exercice 15 — Calculer un côté
Dans le triangle $ABC$ rectangle en $B$, l'hypoténuse est $[AC]$, et $[AB]$ est
le côté **adjacent** à l'angle $\widehat{BAC}$. C'est donc le cosinus :
$$\cos\big(\widehat{BAC}\big) = \frac{AB}{AC} \qquad\text{soit}\qquad
\cos(35°) = \frac{AB}{8}$$
$$AB = 8\times\cos(35°) \approx 8\times 0{,}819 \approx 6{,}55$$

**$AB \approx 6{,}6$ cm.**

Contrôle de plausibilité : $AB$ doit être plus court que l'hypoténuse de 8 cm.
:::

::: solution Exercice 16 — Calculer un angle
$RST$ est rectangle en $R$. Vu de l'angle $\widehat{RST}$, le côté $[RT]$ est
**opposé** et $[RS]$ **adjacent** : c'est la tangente.
$$\tan\big(\widehat{RST}\big) = \frac{RT}{RS} = \frac{12}{5} = 2{,}4$$

À la calculatrice, avec la touche $\tan^{-1}$ :
$$\widehat{RST} \approx 67{,}4°$$

**$\widehat{RST} \approx 67°$.**

La tangente dépasse 1, donc l'angle dépasse $45°$ : cohérent.
:::

## Puissances et grandeurs

::: solution Exercice 17 — Notation scientifique
a) $0{,}000\,45 = 4{,}5\times 10^{-4}$ — la virgule se déplace de 4 rangs vers
la droite, ce que compense l'exposant négatif.

b) $32\,000\,000 = 3{,}2\times 10^{7}$

Dans les deux cas, le premier facteur est compris entre 1 et 10, 10 exclu.
:::

::: solution Exercice 18 — Calculer avec les puissances
a) $(2\times 10^{5})\times(3\times 10^{-2}) = (2\times 3)\times 10^{5-2}
= 6\times 10^{3}$

b) $\dfrac{6\times 10^{8}}{4\times 10^{3}} = \dfrac{6}{4}\times 10^{8-3}
= 1{,}5\times 10^{5}$

On regroupe les nombres d'un côté, les puissances de 10 de l'autre.
:::

::: solution Exercice 19 — Agrandir un solide
a) $4\times 3 = 12$ cm.

b) Dans un agrandissement de rapport $k$, les **aires** sont multipliées par
$k^{2}$ et les **volumes** par $k^{3}$.

Ici $k = 3$ : l'aire d'une face est multipliée par $9$, le volume par $27$.

c) Volume de départ : $4^{3} = 64$ cm³.
$$V = 64\times 27 = 1\,728 \text{ cm}^{3}$$

Contrôle direct : $12^{3} = 1\,728$ cm³. ✔
:::

## Statistiques et probabilités

::: solution Exercice 20 — Une série de notes
**Moyenne.**
$$\frac{7+12+15+9+12+18+11+14}{8} = \frac{98}{8} = 12{,}25$$

**Médiane.** On range : $7$ ; $9$ ; $11$ ; $12$ ; $12$ ; $14$ ; $15$ ; $18$.

Huit valeurs, nombre **pair** : la médiane est la demi-somme de la quatrième et
de la cinquième, soit $\dfrac{12+12}{2} = 12$.

**Étendue.** $18-7 = 11$.
:::

::: solution Exercice 21 — Une urne
L'urne contient $5+3+2 = 10$ boules, et le tirage est équiprobable.

a) $P(\text{rouge}) = \dfrac{5}{10} = \dfrac12 = 0{,}5$

b) L'événement contraire de « bleue » :
$$P(\text{pas bleue}) = 1-\dfrac{2}{10} = \dfrac{8}{10} = 0{,}8$$

On pouvait aussi compter directement les 8 boules non bleues.
:::

::: solution Exercice 22 — Deux lancers
a) L'arbre des possibles :

```tikz
\begin{tikzpicture}[x=16mm,y=9mm]
  \coordinate (R) at (0,0);
  \node[figleg] (P)  at (1,0.95)  {P};
  \node[figleg] (F)  at (1,-0.95) {F};
  \node[figleg] (PP) at (2,1.6)   {P};
  \node[figleg] (PF) at (2,0.45)  {F};
  \node[figleg] (FP) at (2,-0.45) {P};
  \node[figleg] (FF) at (2,-1.6)  {F};
  \fill[encre] (R) circle (0.7mm);
  \draw[fig] (R)--(P) (R)--(F);
  \draw[fig] (P)--(PP) (P)--(PF);
  \draw[fig] (F)--(FP) (F)--(FF);
  \node[figval,above left=0.1mm]  at (0.55,0.5)  {$\tfrac12$};
  \node[figval,below left=0.1mm]  at (0.55,-0.5) {$\tfrac12$};
  \node[figval,right=1.6mm] at (PP) {(P\,;\,P)};
  \node[figval,right=1.6mm] at (PF) {(P\,;\,F)};
  \node[figval,right=1.6mm] at (FP) {(F\,;\,P)};
  \node[figval,right=1.6mm] at (FF) {(F\,;\,F)};
\end{tikzpicture}
```

Les quatre issues sont équiprobables, chacune de probabilité $\dfrac14$.

b) Une seule issue convient :
$$P(\text{deux fois pile}) = \dfrac12\times\dfrac12 = \dfrac14 = 0{,}25$$

c) L'événement contraire de « au moins une fois face » est « aucune fois face »,
c'est-à-dire « deux fois pile » :
$$P(\text{au moins un face}) = 1-\dfrac14 = \dfrac34 = 0{,}75$$

Passer par le contraire évite d'additionner trois cas — et c'est là que
l'énoncé « au moins » doit désormais faire réflexe.
:::
