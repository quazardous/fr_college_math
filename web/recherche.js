/* =====================================================================
 *  Recherche — sur l'index, hors ligne comme en ligne.
 *
 *  L'index est découpé par SECTION, pas par page : chercher « notation
 *  scientifique » doit mener au paragraphe qui en parle, pas seulement à la
 *  fiche qui le contient quelque part.
 *
 *  Aucune dépendance, et une comparaison insensible aux accents : un élève
 *  tape « mediane », pas « médiane ».
 * ===================================================================== */

(() => {
  const champ = document.getElementById('recherche');
  const sortie = document.getElementById('resultats');
  const sommaire = document.getElementById('sommaire');
  if (!champ || !sortie) return;

  const plat = (s) =>
    s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  let index = null;
  const charger = fetch('recherche.json')
    .then((r) => r.json())
    .then((d) => {
      index = d.map((e) => ({ ...e, cle: plat(`${e.doc} ${e.section} ${e.texte}`) }));
    })
    .catch(() => {
      index = [];
    });

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

    const trouves = (index ?? []).filter((e) => mots.every((m) => e.cle.includes(m)));

    if (!trouves.length) {
      sortie.innerHTML =
        '<p class="rien">Rien trouvé. Essaie un mot plus court, ou le nom de la notion seule.</p>';
      return;
    }

    // Une section d'abord, sa fiche ensuite : c'est l'endroit qu'on cherche.
    sortie.innerHTML =
      `<p class="compte">${trouves.length} résultat${trouves.length > 1 ? 's' : ''}</p>` +
      trouves
        .slice(0, 40)
        .map(
          (e) =>
            `<a class="doc" href="${e.url}"><span class="doc-titre">${e.section}</span>` +
            `<span class="doc-meta">${e.doc} — ${extrait(e.texte, mots)}</span></a>`
        )
        .join('');
  };

  const chercher = () => {
    const mots = plat(champ.value).split(/\s+/).filter((m) => m.length > 1);
    if (index === null) charger.then(() => rendre(mots));
    else rendre(mots);
  };

  champ.addEventListener('input', chercher);
  champ.addEventListener('search', chercher);
})();
