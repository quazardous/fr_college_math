/**
 * Analyse du Markdown étendu des fiches — la grammaire, sans le rendu.
 *
 * Le format est volontairement étroit : il ne couvre que ce dont les fiches
 * ont besoin. Ce module en produit un arbre de blocs ; c'est à chaque sortie
 * — LaTeX pour l'impression, HTML pour le site — de décider comment le rendre.
 *
 * Le texte en ligne (**gras**, $maths$, [[5e]], `->`…) n'est PAS analysé ici :
 * il traverse tel quel dans les nœuds. Les règles d'échappement n'ont rien de
 * commun entre LaTeX et HTML, et les maths se traitent aux deux bouts de façon
 * radicalement différente — LaTeX les laisse passer, le HTML les fait rendre
 * par KaTeX. Chaque sortie fait donc sa propre passe en ligne.
 *
 * Types de nœuds :
 *   {t:'vide'}                                  ligne blanche (le LaTeX s'en sert)
 *   {t:'titre',    niveau:2|3, texte}
 *   {t:'encadre',  genre, titre, enfants:[…]}   definition, methode, exo…
 *   {t:'liste',    numerotee, items:[texte]}
 *   {t:'tableau',  colonnes, entete:[…], rangees:[[…]]}
 *   {t:'fig',      macro}                        !fig \droitegraduee{…}
 *   {t:'brut',     genre, lignes:[…]}            ```tikz  ou  ```latex
 *   {t:'saut'}                                   !saut
 *   {t:'maths',    lignes:[…]}                   $$ … $$
 *   {t:'para',     texte}
 */

export const ENCADRES = new Set([
  'definition',
  'retenir',
  'methode',
  'piege',
  'prolongement',
  'exo',
  'solution',
]);

export function analyser(texte) {
  const lignes = String(texte ?? '').split(/\r?\n/);
  const out = [];
  let i = 0;
  let colonnes = null;

  const avaler = (test) => {
    const bloc = [];
    while (i < lignes.length && test(lignes[i])) bloc.push(lignes[i++]);
    return bloc;
  };

  const estStructure = (x) =>
    /^(#{2,3}\s|:::|\||!fig |!saut|:cols |\/\/|```)/.test(x.trim()) || x.trim() === '$$';

  while (i < lignes.length) {
    const l = lignes[i];

    if (!l.trim()) { i++; out.push({ t: 'vide' }); continue; }

    if (l.trim().startsWith('//')) { i++; continue; }

    // Largeurs de colonnes du tableau qui suit — une consigne, pas un bloc.
    if (l.startsWith(':cols ')) { colonnes = l.slice(6).trim(); i++; continue; }

    // Bloc brut : ```tikz … ``` ou ```latex … ```. Indispensable pour les
    // figures écrites à la main — hors de lui, « -> » deviendrait une flèche
    // et les « % » seraient échappés.
    const cloture = l.match(/^```(\w*)\s*$/);
    if (cloture) {
      i++;
      const dedans = avaler((x) => !/^```\s*$/.test(x.trim()));
      i++;
      out.push({ t: 'brut', genre: cloture[1], lignes: dedans });
      continue;
    }

    if (l.startsWith('!fig ')) { out.push({ t: 'fig', macro: l.slice(5).trim() }); i++; continue; }

    if (l.trim() === '!saut') { out.push({ t: 'saut' }); i++; continue; }

    const ouverture = l.match(/^:::\s*(\w+)\s*(.*)$/);
    if (ouverture && ENCADRES.has(ouverture[1])) {
      const [, genre, titre] = ouverture;
      i++;
      const dedans = avaler((x) => x.trim() !== ':::');
      i++;
      out.push({ t: 'encadre', genre, titre, enfants: analyser(dedans.join('\n')) });
      continue;
    }

    const titre = l.match(/^(#{2,3})\s+(.*)$/);
    if (titre) {
      out.push({ t: 'titre', niveau: titre[1].length, texte: titre[2] });
      i++;
      continue;
    }

    if (l.trim() === '$$') {
      i++;
      const dedans = avaler((x) => x.trim() !== '$$');
      i++;
      out.push({ t: 'maths', lignes: dedans });
      continue;
    }

    if (l.trim().startsWith('|')) {
      const bloc = avaler((x) => x.trim().startsWith('|'));
      const cellules = (x) => x.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      // La ligne de tirets ne sert qu'à l'œil dans la source.
      const rangees = bloc.filter((x) => !/^\s*\|?\s*:?-{2,}/.test(x)).map(cellules);
      const entete = rangees.shift();
      out.push({ t: 'tableau', colonnes, entete, rangees });
      colonnes = null;
      continue;
    }

    if (/^\s*(?:[-*]|\d+\.)\s+/.test(l)) {
      const bloc = avaler((x) => x.trim() !== '' && !estStructure(x));
      // On accumule le texte brut de chaque item : sinon un **gras** à cheval
      // sur deux lignes ne serait plus reconnu par la passe en ligne.
      const items = [];
      let courant = null;
      for (const x of bloc) {
        const debut = x.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
        if (debut) {
          if (courant !== null) items.push(courant);
          courant = debut[1];
        } else if (courant !== null) courant += ' ' + x.trim();
      }
      if (courant !== null) items.push(courant);
      out.push({ t: 'liste', numerotee: /^\s*\d+\.\s/.test(bloc[0]), items });
      continue;
    }

    out.push({ t: 'para', texte: avaler((x) => x.trim() !== '' && !estStructure(x)).join('\n') });
  }

  return out;
}
