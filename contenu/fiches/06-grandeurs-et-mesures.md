---
titre: Grandeurs et mesures
surtitre: Fiche 6 · Périmètres, aires, volumes, durées
accroche: >-
  Périmètre, aire, volume : trois grandeurs différentes, trois unités
  différentes. Les confondre est l'erreur la plus coûteuse de tout le collège,
  bien avant les erreurs de calcul.
niveaux: [6e, 5e, 4e]
priorite: 3
pourquoi: >-
  Toutes les questions concrètes du brevet et de la vie courante passent par là.
duree: 30 min
domaine: Grandeurs et mesures

notions:
  - grandeur
  - longueur
  - périmètre
  - aire
  - volume
  - conversion d'unités
  - pi
  - cercle
  - disque
  - prisme droit
  - cylindre
  - pyramide
  - cône
  - capacité
  - durée

automatismes:
  colonnes: 2
  items:
    - "6e | Les préfixes du kilo- au milli-, et les conversions de longueurs"
    - "6e | Périmètre du carré et du rectangle"
    - "6e | $1$ cm² est l'aire d'un carré de 1 cm de côté"
    - "6e | $1$ m² $= 100$ dm² \\quad $1$ dm² $= 100$ cm²"
    - "6e | Lire l'heure, et les relations jour / heure / minute / seconde"
    - "6e | Une demi-heure $=30$ min, un quart d'heure $=15$ min"
    - "5e | Les unités d'aire et de volume"
    - "règle | Périmètre en cm, aire en cm², volume en cm³"

videos:
  - id: KIg0armGkwE
    titre: Le périmètre d'un cercle en 1 minute
    chaine: Hedacademy
    duree: "1:24"
    vues: "115 000"
  - id: y-PV5LNmqsM
    titre: Calculer l'aire d'un disque — 5e
    chaine: Yvan Monka
    duree: "6:06"
    vues: "371 000"
  - id: XciTFhpXIL0
    titre: Calculer l'aire d'un triangle — 5e
    chaine: Yvan Monka
    duree: "4:06"
    vues: "16 000"
  - id: ZV7VG7NzDwE
    titre: Convertir les unités de temps — 6e
    chaine: Yvan Monka
    duree: "6:09"
    vues: "216 000"
---

## Ne pas confondre les trois grandeurs

::: retenir La distinction fondatrice
- Le **périmètre** est une **longueur** : celle du contour. Il se mesure en cm, m, km.
- L'**aire** est une **surface** : la place occupée. Elle se mesure en cm², m², km².
- Le **volume** est une **capacité** : ce que ça contient. Il se mesure en cm³, m³, L.

Une réponse sans unité, ou avec la mauvaise unité, est fausse.
:::

## Les longueurs et les périmètres

:cols G{40mm} Y Y
| Figure | Formule | Exemple |
|---|---|---|
| Carré de côté $c$ | $P = 4\times c$ | $c=5$ cm donne $P=20$ cm |
| Rectangle $L$ et $\ell$ | $P = (L+\ell)\times 2$ | $7{,}5$ et $4$ donnent $23$ cm |
| **Disque** de rayon $R$ | $P = 2\times\pi\times R$ | $R=5$ cm donne $31{,}4$ cm |

!fig \disqueraye{2}{cm}

::: definition Le nombre $\pi$
Le programme de 6e demande de savoir que **le périmètre d'un disque est
proportionnel à son diamètre**. Le coefficient de proportionnalité est $\pi$ :
$$P = \pi\times D = \pi\times 2R$$
On prend $\pi \approx 3{,}14$ sauf indication contraire.
:::

::: piege
Le rayon est la **moitié** du diamètre. Si l'énoncé donne un diamètre de 10 cm,
le rayon vaut 5 cm — recopier 10 dans la formule double le résultat.
:::

## Les aires

:cols G{40mm} Y Y
| Figure | Formule | Niveau |
|---|---|---|
| Carré de côté $c$ | $\mathcal{A} = c\times c$ | [[6e]] |
| Rectangle | $\mathcal{A} = L\times \ell$ | [[6e]] |
| **Triangle** | $\mathcal{A} = \dfrac{\text{base}\times\text{hauteur}}{2}$ | [[5e]] |
| **Disque** | $\mathcal{A} = \pi\times R^{2}$ | [[5e]] |
| **Parallélogramme** | $\mathcal{A} = \text{base}\times\text{hauteur}$ | [[5e]] |

::: piege L'oubli le plus fréquent de la 5e
Dans l'aire du triangle, **le $\div 2$ s'oublie une fois sur trois**.
Contrôle simple : un triangle occupe toujours moins de place que le rectangle
qui l'entoure. Si ton résultat égale $\text{base}\times\text{hauteur}$, tu as oublié le $\div 2$.
:::

::: methode Une figure compliquée
On la découpe en figures connues, on calcule chaque aire, puis on additionne —
ou on soustrait, quand il s'agit d'un trou.
:::

## Les conversions d'aires

::: retenir On change de rang deux fois
Entre deux unités de longueur voisines, le facteur est $10$.
Entre deux unités d'**aire** voisines, il est $100$ : $10\times 10$.
$$1 \text{ m}^2 = 100 \text{ dm}^2 = 10\,000 \text{ cm}^2$$
:::

::: piege
$1$ m² n'est **pas** $100$ cm² mais $10\,000$ cm². L'erreur d'un facteur 100
transforme une chambre en timbre-poste.
:::

## Les volumes

:cols G{44mm} Y Y
| Solide | Formule | Niveau |
|---|---|---|
| Cube d'arête $a$ | $V = a\times a\times a$ | [[5e]] |
| Pavé droit | $V = L\times \ell\times h$ | [[5e]] |
| **Prisme droit** | $V = \mathcal{A}_{\text{base}}\times h$ | [[5e]] |
| **Cylindre de révolution** | $V = \pi\times R^{2}\times h$ | [[5e]] |

!fig \pavedroit{5}{3}{3}{cm}\hspace{10mm}\cylindrerev{2}{4}{cm}

::: retenir Prisme et cylindre, une seule idée
Dans les deux cas : **aire de la base $\times$ hauteur**. Le cylindre n'est
qu'un prisme dont la base est un disque. Une formule à retenir, pas deux.
:::

::: retenir En 4e — la pyramide et le cône : le tiers
$$V_{\text{pyramide}} = \frac{\mathcal{A}_{\text{base}}\times h}{3}
\qquad
V_{\text{cône}} = \frac{\pi R^{2}\times h}{3}$$
Même base et même hauteur qu'un prisme ou un cylindre, mais **trois fois moins
de volume**. Voir la fiche 13.
:::

::: retenir Volumes et capacités
$$1 \text{ dm}^3 = 1 \text{ L} \qquad 1 \text{ cm}^3 = 1 \text{ mL}
\qquad 1 \text{ m}^3 = 1\,000 \text{ L}$$
Entre deux unités de volume voisines, le facteur est $1\,000$.
:::

## Les durées

Les durées ne sont **pas** décimales : elles comptent en base 60.

:cols G{40mm} Y
| Écriture en heures et minutes | Écriture décimale |
|---|---|
| 2 h 30 | $2{,}5$ h |
| 2 h 15 | $2{,}25$ h |
| 1 h 45 | $1{,}75$ h |
| 3 h 20 | $3{,}33\ldots$ h |

::: piege L'erreur la plus rentable à corriger
2 h 30 ne s'écrit **jamais** $2{,}30$ h. Trente minutes, c'est une demi-heure,
donc $2{,}5$ h. Cette seule erreur fausse la plupart des calculs de vitesse.
:::

::: methode Calculer une durée entre deux horaires
On avance jusqu'à l'heure ronde suivante, puis jusqu'à l'heure d'arrivée.

De 9 h 45 à 13 h 15 : de 9 h 45 à 10 h, il y a 15 min ; de 10 h à 13 h 15,
il y a 3 h 15. Total : **3 h 30**.
:::

::: prolongement
Le système sexagésimal des heures et des minutes vient de la numération
babylonienne, vieille de quatre mille ans. Le programme suggère aussi d'explorer
les calendriers — solaires, lunaires — et l'écart entre le calendrier julien et
le grégorien, qui tient à une approximation de la durée de l'année.
:::
