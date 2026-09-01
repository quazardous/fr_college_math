/* =====================================================================
 *  Recherche — sur l'accueil, hors ligne comme en ligne.
 *
 *  L'index est découpé par SECTION, pas par page : chercher « notation
 *  scientifique » doit mener au paragraphe qui en parle, pas seulement à la
 *  fiche qui le contient quelque part.
 *
 *  Les résultats sont classés d'abord par NATURE, ensuite par PRIORITÉ.
 *  Qui cherche une notion cherche la leçon qui l'explique, pas la feuille
 *  d'exercices qui la teste : les fiches passent donc devant les séances, et
 *  un corrigé vient en dernier. À nature égale, c'est la priorité qui tranche
 *  — celle-là même qu'affiche la carte des révisions.
 *
 *  Aucune dépendance, et une comparaison insensible aux accents : un élève
 *  tape « mediane », pas « médiane ».
 * ===================================================================== */

(() => {
  const champ = document.getElementById('recherche');
  const effacer = document.getElementById('effacer');
  const sortie = document.getElementById('resultats');
  const sommaire = document.getElementById('sommaire');
  if (!champ || !sortie) return;

  const plat = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const MOT_PRIORITE = { 3: 'Incontournable', 2: 'Important', 1: 'Complément' };
  const RANG_GENRE = { fiche: 0, recueil: 1, seance: 2, corrige: 3 };

  // Même jauge que dans le cartouche des fiches : trois pastilles, pleines
  // jusqu'au cran atteint.
  const jauge = (p) =>
    `<span class="jauge" role="img" aria-label="${p} sur 3">` +
    [1, 2, 3].map((i) => `<i class="${i <= p ? 'plein' : ''}"></i>`).join('') +
    '</span>';

  let docs = [];
  let sections = [];
  // L'index n'a pas d'empreinte dans son URL — il n'est référencé nulle part
  // dans le HTML. « no-cache » le fait revalider aupres du serveur, ce qui ne
  // coute qu'une requete conditionnelle ; hors ligne, c'est le service worker
  // qui repond de toute facon.
  const charger = fetch('recherche.json', { cache: 'no-cache' })
    .then((r) => r.json())
    .then((d) => {
      docs = d.docs;
      sections = d.sections.map((e) => ({
        ...e,
        cle: plat(`${docs[e.d].titre} ${e.section} ${e.texte}`),
      }));
    })
    .catch(() => {});

  const extrait = (texte, mots) => {
    const p = plat(texte);
    const i = p.indexOf(mots[0]);
    if (i === -1) return texte.slice(0, 110);
    const d = Math.max(0, i - 45);
    return (d ? '…' : '') + texte.slice(d, d + 130).trim() + '…';
  };

  const rendre = (mots) => {
    if (!mots.length) {
      sortie.hidden = true;
      if (sommaire) sommaire.hidden = false;
      return;
    }
    if (sommaire) sommaire.hidden = true;
    sortie.hidden = false;

    const trouves = sections
      .filter((e) => mots.every((m) => e.cle.includes(m)))
      .sort((a, b) => {
        const da = docs[a.d];
        const db = docs[b.d];
        return (
          (RANG_GENRE[da.genre] ?? 9) - (RANG_GENRE[db.genre] ?? 9) ||
          (db.prio ?? 0) - (da.prio ?? 0) ||
          String(da.numero).localeCompare(String(db.numero))
        );
      });

    if (!trouves.length) {
      sortie.innerHTML =
        '<p class="rien">Rien trouvé. Essaie un mot plus court, ou le nom de la notion seule.</p>';
      return;
    }

    sortie.innerHTML =
      `<p class="compte">${trouves.length} résultat${trouves.length > 1 ? 's' : ''}` +
      ', les leçons d\'abord</p>' +
      trouves
        .slice(0, 40)
        .map((e) => {
          const d = docs[e.d];
          const prio = d.prio
            ? `<span class="prio prio--${d.prio}">${jauge(d.prio)} <b>${MOT_PRIORITE[d.prio]}</b></span>`
            : '';
          return (
            `<a class="doc" href="${e.url}">` +
            `<span class="doc-titre">${e.section}</span>` +
            `<span class="doc-repere">${d.niv} ${prio}</span>` +
            `<span class="doc-meta">${d.numero ? `${d.numero}. ` : ''}${d.titre}` +
            ` — ${extrait(e.texte, mots)}</span></a>`
          );
        })
        .join('');
  };

  const chercher = () => {
    if (effacer) effacer.hidden = champ.value === '';
    const mots = plat(champ.value).split(/\s+/).filter((m) => m.length > 1);
    if (!sections.length) charger.then(() => rendre(mots));
    else rendre(mots);
  };

  champ.addEventListener('input', chercher);
  champ.addEventListener('search', chercher);

  // La croix native de <input type="search"> ne prévient pas de façon fiable
  // qu'on a vidé le champ : la nôtre appelle directement la recherche.
  if (effacer) {
    effacer.addEventListener('click', () => {
      champ.value = '';
      champ.focus();
      chercher();
    });
  }
})();
