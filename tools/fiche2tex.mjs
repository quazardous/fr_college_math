#!/usr/bin/env node
/**
 * Précompilation : fiche en Markdown étendu  ->  LaTeX.
 *
 *   node tools/fiche2tex.mjs fiches/04-relatifs.md build/04-relatifs.tex
 *
 * Le format est volontairement étroit — il ne couvre que ce dont les fiches
 * ont besoin — mais tout ce qu'il ne reconnaît pas est transmis tel quel à
 * LaTeX. On peut donc toujours redescendre d'un cran quand c'est nécessaire.
 *
 * En-tête YAML : titre, surtitre, accroche, niveaux, priorite, pourquoi,
 * duree, domaine, automatismes {colonnes, items}, videos [...]
 *
 *   ## Titre       -> section          ### Titre -> sous-section
 *   **gras**   *italique*   `code`     $maths$   et   $$ maths centrés $$
 *   - liste    1. liste numérotée
 *   ::: piege Titre facultatif … :::   encadrés (definition, retenir,
 *                                      methode, piege, prolongement)
 *   :cols G{30mm} Y Y                  largeurs du tableau qui suit
 *   | a | b |                          tableau, 1re ligne = en-tête
 *   !fig \droitegraduee{0}{5}{1}{}{}   figure centrée
 *   !saut                              saut de page
 *   [[5e]]                             pastille de niveau
 *   ->                                 flèche
 *   6e 5e 4e 3e                        exposant « e » automatique
 *   // commentaire                     absent du PDF
 */

import fs from 'node:fs';
import * as yaml from 'js-yaml';

const [, , entree, sortie] = process.argv;
if (!entree) {
  console.error('usage: fiche2tex.mjs source.md [sortie.tex]');
  process.exit(1);
}

const source = fs.readFileSync(entree, 'utf8');

/* ------------------------------------------------------------------ *
 * En-tête YAML
 * ------------------------------------------------------------------ */
const separe = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
if (!separe) {
  console.error(`${entree} : en-tête YAML manquant (bloc --- … ---)`);
  process.exit(1);
}
const meta = yaml.load(separe[1]) ?? {};
const corps = separe[2];

/* ------------------------------------------------------------------ *
 * Transformations en ligne
 * ------------------------------------------------------------------ */

// Caractères réservés de LaTeX, hors mathématiques. La contre-oblique est
// volontairement épargnée : elle laisse la porte ouverte au LaTeX brut.
const echapper = (t) => t.replace(/(?<!\\)([%&#])/g, '\\$1');

const NIVEAUX = /\b([3-6])e\b/g;

function texteEnLigne(t) {
  let s = echapper(t);
  // [[5e]] -> \niv{5} : la classe se charge du libellé et de la teinte.
  s = s.replace(/\[\[\s*([3-6])e\s*\]\]/g, '\\niv{$1}');
  s = s.replace(/\*\*([^*]+)\*\*/g, '\\textbf{$1}');
  s = s.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '\\emph{$1}');
  s = s.replace(/`([^`]+)`/g, '\\texttt{$1}');
  s = s.replace(/(?<![-<=])->(?!>)/g, '\\fleche{}');
  s = s.replace(NIVEAUX, '$1\\ieme{}');
  return s;
}

// Ce qui est entre $…$ est déjà du LaTeX et doit traverser intact. On le met
// de côté derrière un jeton plutôt que de découper la chaîne : sinon un
// **gras** qui enjambe un segment mathématique ne serait plus reconnu.
function enLigne(ligne) {
  const maths = [];
  let s = String(ligne ?? '').replace(/\$[^$]*\$/g, (m) => {
    maths.push(m);
    return `\u0000${maths.length - 1}\u0000`;
  });
  s = texteEnLigne(s);
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => maths[Number(i)]);
}

/* ------------------------------------------------------------------ *
 * Compilateur du corps — réentrant, pour pouvoir traiter l'intérieur
 * d'un encadré comme un document à part entière.
 * ------------------------------------------------------------------ */
const ENCADRES = new Set(['definition', 'retenir', 'methode', 'piege', 'prolongement', 'exo', 'solution']);

function compiler(texte) {
  const lignes = texte.split(/\r?\n/);
  const out = [];
  let i = 0;
  let colonnes = null;

  const avaler = (test) => {
    const bloc = [];
    while (i < lignes.length && test(lignes[i])) bloc.push(lignes[i++]);
    return bloc;
  };

  const estStructure = (x) =>
    /^(#{2,3}\s|:::|\||!fig |!saut|:cols |\/\/)/.test(x.trim()) || x.trim() === '$$';

  const rendreListe = (bloc) => {
    const numerotee = /^\s*\d+\.\s/.test(bloc[0]);
    const env = numerotee ? 'enumerate' : 'itemize';
    const opts = numerotee ? '[leftmargin=6mm,label=\\textbf{\\arabic*.}]' : '';
    out.push(`\\begin{${env}}${opts}`);
    // On accumule le texte brut de chaque item, et on ne le transforme
    // qu'une fois complet : sinon un **gras** à cheval sur deux lignes
    // ne serait pas reconnu.
    let courant = null;
    for (const l of bloc) {
      const debut = l.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
      if (debut) {
        if (courant !== null) out.push(`  \\item ${enLigne(courant)}`);
        courant = debut[1];
      } else if (courant !== null) {
        courant += ' ' + l.trim();
      }
    }
    if (courant !== null) out.push(`  \\item ${enLigne(courant)}`);
    out.push(`\\end{${env}}`);
  };

  const rendreTableau = (bloc) => {
    const cellules = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    const rangees = bloc.filter((l) => !/^\s*\|?\s*:?-{2,}/.test(l)).map(cellules);
    const entete = rangees.shift();
    const spec = colonnes ?? `@{}${entete.map(() => 'Y').join(' ')}@{}`;
    colonnes = null;
    out.push(`\\begin{tableaufiche}{${spec}}`);
    out.push(`\\ligneentete ${entete.map((c) => `\\entetecell{${enLigne(c)}}`).join(' & ')}\\\\`);
    for (const r of rangees) out.push(`${r.map(enLigne).join(' & ')}\\\\`);
    out.push(`\\end{tableaufiche}`);
  };

  while (i < lignes.length) {
    const l = lignes[i];

    if (!l.trim()) { i++; out.push(''); continue; }

    if (l.trim().startsWith('//')) { i++; continue; }

    if (l.startsWith(':cols ')) {
      const s = l.slice(6).trim();
      colonnes = s.startsWith('@{}') ? s : `@{}${s}@{}`;
      i++;
      continue;
    }

    if (l.startsWith('!fig ')) {
      out.push('\\begin{center}', l.slice(5).trim(), '\\end{center}');
      i++;
      continue;
    }

    if (l.trim() === '!saut') { out.push('\\clearpage'); i++; continue; }

    const ouverture = l.match(/^:::\s*(\w+)\s*(.*)$/);
    if (ouverture && ENCADRES.has(ouverture[1])) {
      const [, type, titre] = ouverture;
      i++;
      const dedans = avaler((x) => x.trim() !== ':::');
      i++;
      out.push(`\\begin{${type}}${titre ? `[${enLigne(titre)}]` : ''}`);
      out.push(compiler(dedans.join('\n')).join('\n').trim());
      out.push(`\\end{${type}}`);
      continue;
    }

    const titre = l.match(/^(#{2,3})\s+(.*)$/);
    if (titre) {
      out.push(`\\${titre[1].length === 2 ? 'section' : 'subsection'}{${enLigne(titre[2])}}`);
      i++;
      continue;
    }

    if (l.trim() === '$$') {
      i++;
      const dedans = avaler((x) => x.trim() !== '$$');
      i++;
      out.push(`\\[${dedans.join('\n')}\\]`);
      continue;
    }

    if (l.trim().startsWith('|')) {
      rendreTableau(avaler((x) => x.trim().startsWith('|')));
      continue;
    }

    if (/^\s*(?:[-*]|\d+\.)\s+/.test(l)) {
      rendreListe(avaler((x) => x.trim() !== '' && !estStructure(x)));
      continue;
    }

    out.push(enLigne(avaler((x) => x.trim() !== '' && !estStructure(x)).join('\n')));
  }

  return out;
}

/* ------------------------------------------------------------------ *
 * Assemblage du document
 * ------------------------------------------------------------------ */
const txt = (v) => String(v ?? '');
const niveauxTex = (v) =>
  (Array.isArray(v) ? v.join(' · ') : txt(v)).replace(NIVEAUX, '$1\\ieme{}');

const document = [];
const pousser = (...x) => document.push(...x);

pousser('% Fichier engendré depuis ' + entree + ' — ne pas modifier à la main.');
pousser('\\documentclass{fiche}', '');
pousser(`\\surtitre{${enLigne(meta.surtitre)}}`);
pousser(`\\titrefiche{${enLigne(meta.titre)}}`);
if (meta.accroche) pousser(`\\accroche{${enLigne(meta.accroche)}}`);
pousser(`\\niveaux{${niveauxTex(meta.niveaux)}}`);
pousser(`\\priorite{${meta.priorite ?? 2}}`);
if (meta.pourquoi) pousser(`\\pourquoi{${enLigne(meta.pourquoi)}}`);
pousser(`\\duree{${enLigne(meta.duree)}}`);
pousser(`\\domaine{${enLigne(meta.domaine)}}`);
pousser('', '\\begin{document}', '\\entetefiche', '');

if (meta.automatismes?.items?.length) {
  pousser(`\\begin{automatismes}[${meta.automatismes.colonnes ?? 2}]`);
  for (const it of meta.automatismes.items) {
    let niveau = '';
    let contenu = '';
    if (typeof it === 'string') {
      const sep = it.indexOf('|');
      if (sep > -1 && sep <= 10) {
        niveau = it.slice(0, sep).trim();
        contenu = it.slice(sep + 1).trim();
      } else contenu = it;
    } else {
      niveau = txt(it.n ?? it.niveau);
      contenu = txt(it.t ?? it.texte);
    }
    const n = niveau ? `[${niveau.replace(NIVEAUX, '$1\\ieme{}')}]` : '';
    pousser(`  \\auto${n}{${enLigne(contenu)}}`);
  }
  pousser('\\end{automatismes}', '');
}

pousser(...compiler(corps));

if (meta.videos?.length) {
  pousser('', '\\begin{videos}');
  for (const v of meta.videos) {
    pousser(
      `  \\video{${txt(v.id)}}{${enLigne(v.titre)}}{${txt(v.chaine)}}{${txt(v.duree)}}{${txt(v.vues)}}`
    );
  }
  pousser('\\end{videos}');
}

pousser('', '\\end{document}');

const resultat = document.join('\n') + '\n';
if (sortie) fs.writeFileSync(sortie, resultat);
else process.stdout.write(resultat);
