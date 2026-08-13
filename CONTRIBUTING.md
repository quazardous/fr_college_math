# Contribuer

Merci d'y songer. Ce dépôt accepte volontiers trois sortes de contributions,
qui ne demandent pas le même effort.

## Signaler une erreur

C'est la contribution la plus utile, et elle ne demande aucun outil.
[Ouvre une issue](../../issues/new) en indiquant :

- le **document** et la **page** — le nom court est en pied de chaque page,
  par exemple `Fiche 12 · Le théorème de Pythagore` ;
- ce qui est écrit, et ce qui devrait l'être.

Les erreurs de mathématiques passent avant tout le reste : un corrigé faux est
pire que pas de corrigé. Les coquilles, les tournures confuses et les figures
illisibles comptent aussi.

## Proposer une correction

1. **Fork** puis une branche : `git checkout -b corrige-fiche-12`.
2. Modifie la **source**, jamais le PDF — les PDF sont engendrés, et toute
   retouche directe serait écrasée à la construction suivante.
   Les sources vivent dans `contenu/fiches/`, `contenu/problemes/` et `contenu/problemes/recueil/`.
3. Vérifie que tout se construit :

   ```bash
   ./build.sh && npm run check
   ```

4. Commit, puis ouvre une pull request.

Le format des sources, la syntaxe du balisage et le fonctionnement de la chaîne
sont décrits dans **[DEVEL.md](DEVEL.md)**.

## Proposer une fiche

Une fiche neuve est bienvenue, à trois conditions.

- **Une notion par fiche**, et une durée de révision réaliste — les fiches
  existantes tiennent entre 15 et 35 minutes.
- **Calée sur le programme officiel** de la classe visée, en reprenant le
  vocabulaire des textes : *Automatismes*, *Objectifs d'apprentissage*,
  *Prolongements possibles*.
- **Écrite pour être relue vite** : ce qui compte en encadré `retenir`, la
  démarche en `methode`, et au moins un encadré `piege` — ce qui se trompe une
  fois sur trois est la partie la plus utile d'une fiche de révision.

Le sommaire, la carte des révisions et le classeur complet se mettent à jour
tout seuls : il n'y a rien à déclarer ailleurs que dans l'en-tête YAML de la
fiche.

### Les vidéos

Si tu ajoutes des vidéos, **les identifiants doivent être réels et vérifiés**.
`tools/yt-search.mjs "requête"` liste des candidats avec leur durée et leur
nombre de vues ; l'API oEmbed de YouTube permet de recouper chaîne et titre.
Un identifiant reconstitué de mémoire mène à une vidéo qui n'existe pas, ou
pire, à une autre vidéo — c'est un QR code imprimé sur une feuille que
personne ne pourra corriger.

Critères de choix : chaîne de référence, format court — autour de cinq
minutes, dix au plus.

## Conventions

- **Le dépôt est en français**, code et commentaires compris. Les messages de
  commit aussi : une ligne de sujet à l'impératif ou au présent, qui dit ce que
  le changement produit plutôt que ce qu'il touche.
- **Aucune valeur de style dans le LaTeX.** Polices, tailles, couleurs et
  marges vivent dans `design.yaml`. Une couleur écrite en dur dans `fiche.cls`
  sera refusée.
- **Rien n'est saisi deux fois.** Si une information existe déjà quelque part —
  une durée dans un en-tête YAML, un nombre de problèmes sur le disque — elle
  se déduit, elle ne se recopie pas.
- `./build.sh && npm run check` doivent passer avant toute pull request. La CI
  les rejoue de toute façon.

## Licence des contributions

En proposant une contribution, tu acceptes qu'elle soit publiée sous les
licences du dépôt : **CC BY-SA 4.0** pour le contenu pédagogique, **MIT** pour
le code et la chaîne de production. Voir [`LICENSE-CONTENU.md`](LICENSE-CONTENU.md)
et [`LICENSE`](LICENSE).
