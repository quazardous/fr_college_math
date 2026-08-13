#!/usr/bin/env node
/**
 * Assemble TOUS les documents en un seul PDF, depuis les mêmes sources.
 *
 *   node tools/complet.mjs contenu/fiches contenu/seances contenu/problemes sortie.tex
 *
 * Le principe : chaque source sait déjà se compiler seule, et le
 * précompilateur en produit un document autonome. On récupère de chacun
 *   · son préambule, c'est-à-dire ses métadonnées (\titrefiche, \niveaux…) ;
 *   · son corps, entre \begin{document} et \end{document} ;
 * puis on rejoue les métadonnées avant chaque \entetefiche. Le cartouche de
 * tête, le pied de page et la jauge de priorité suivent donc document par
 * document, exactement comme dans les PDF séparés.
 *
 * Le sommaire est celui de tools/sommaire.mjs, avec en plus une colonne de
 * numéros de page : chaque document pose une ancre \label{doc:<base>}, que
 * \pageref rattrape à la deuxième passe de compilation.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ORDRE_NIVEAUX, base, contexte, corpsSommaire, dureeTotale, niv } from './sommaire.mjs';

const ici = path.dirname(fileURLToPath(import.meta.url));
const [, , dossierFiches, dossierSeances, dossierProblemes, sortie] = process.argv;
if (!sortie) {
  console.error('usage: complet.mjs <fiches> <seances> <problemes> <sortie.tex>');
  process.exit(1);
}

const ctx = contexte(dossierFiches, dossierSeances, dossierProblemes);

/* ------------------------------------------------------------------ *
 * Découpe d'un document autonome en préambule + corps
 * ------------------------------------------------------------------ */
function decouper(tex, origine) {
  const i = tex.indexOf('\\begin{document}');
  const j = tex.lastIndexOf('\\end{document}');
  if (i === -1 || j === -1) {
    console.error(`${origine} : \\begin{document} ou \\end{document} introuvable.`);
    process.exit(1);
  }
  const preambule = tex
    .slice(0, i)
    .split('\n')
    // On ne garde que les métadonnées : \documentclass et les commentaires
    // engendrés n'ont rien à faire au milieu d'un document.
    .filter((s) => /^\\(surtitre|titrefiche|accroche|niveaux|priorite|pourquoi|duree|domaine|nomcourt|versiondoc|licencedoc)\{/.test(s));
  // Le corps commence par \entetefiche : on le retire, il est rejoué après
  // les métadonnées et l'ancre de page.
  const corps = tex.slice(i + '\\begin{document}'.length, j).replace(/^\s*\\entetefiche/, '');
  return { preambule, corps: corps.trim() };
}

const precompiler = (src) =>
  execFileSync('node', [path.join(ici, 'fiche2tex.mjs'), src], { encoding: 'utf8', maxBuffer: 32e6 });

/* ------------------------------------------------------------------ *
 * L'ordre du document complet
 * ------------------------------------------------------------------ */
// Les fiches suivent leur numéro. Les séances suivent les classes, de la 6e
// à la 3e, énoncé puis corrigé — et non l'ordre alphabétique, qui mettrait
// la 3e en tête et séparerait mal les corrigés.
const rang = (d) => {
  const n = (Array.isArray(d.niveaux) ? d.niveaux : [d.niveaux]).map(String);
  const i = ORDRE_NIVEAUX.findIndex((x) => n.includes(x));
  return [(i === -1 ? 99 : i), /-corrige\.md$/.test(d.fichier) ? 1 : 0];
};
const problemesTries = [...ctx.problemes].sort((a, b) => {
  const [ra, ca] = rang(a);
  const [rb, cb] = rang(b);
  return ra - rb || ca - cb || a.fichier.localeCompare(b.fichier);
});

const morceaux = [];

for (const f of ctx.fiches) {
  morceaux.push({ base: base(f), ...decouper(precompiler(path.join(dossierFiches, f.fichier)), f.fichier) });
}
for (const d of problemesTries) {
  morceaux.push({ base: base(d), ...decouper(precompiler(path.join(dossierSeances, d.fichier)), d.fichier) });
}

if (ctx.recueil) {
  // recueil.mjs écrit deux documents ; on les fabrique dans un dossier
  // temporaire pour ne pas marcher sur ceux de build/.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'recueil-'));
  const enonces = path.join(tmp, 'recueil.tex');
  const corrige = path.join(tmp, 'recueil-corrige.tex');
  execFileSync('node', [path.join(ici, 'recueil.mjs'), ctx.recueil.dossier, enonces, corrige], {
    stdio: 'ignore',
  });
  morceaux.push({ base: 'recueil', ...decouper(fs.readFileSync(enonces, 'utf8'), 'recueil.tex') });
  morceaux.push({
    base: 'recueil-corrige',
    ...decouper(fs.readFileSync(corrige, 'utf8'), 'recueil-corrige.tex'),
  });
  fs.rmSync(tmp, { recursive: true, force: true });
}

/* ------------------------------------------------------------------ *
 * Le document
 * ------------------------------------------------------------------ */
const l = [];
const p = (...x) => l.push(...x);

// L'auteur et l'adresse du dépôt ne sont pas saisis ici : ils vivent dans
// package.json, seul endroit du projet qui les déclare déjà.
const paquet = JSON.parse(fs.readFileSync(path.join(ici, '..', 'package.json'), 'utf8'));
const leJour = new Date().toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const nbSeances = problemesTries.filter((d) => !/-corrige\.md$/.test(d.fichier)).length;

p('% Fichier engendré par tools/complet.mjs — ne pas modifier à la main.');
p('\\documentclass{fiche}', '');
// \urldef lit l'adresse avec des catcodes neutres : sans lui, le souligné de
// « fr_college_math » ferait échouer la compilation.
if (paquet.homepage) p(`\\urldef{\\lienprojet}\\url{${paquet.homepage}}`);
p('\\surtitre{Tout le classeur}');
p(`\\titrefiche{Mathématiques ${niv(ctx.niveaux[0])} à ${niv(ctx.niveaux.at(-1))}}`);
p(
  `\\accroche{Les ${ctx.fiches.length} fiches de cours, les ${nbSeances} séances chronométrées et leurs corrigés, ` +
    `et le recueil de problèmes — réunis en un seul document, dans l'ordre où les reprendre. Le sommaire donne les pages.}`
);
p(`\\niveaux{${niv(ctx.niveaux)}}`);
p('\\priorite{3}');
p("\\pourquoi{Une seule impression, un seul classeur, et le sommaire pour s'y retrouver.}");
p(`\\duree{${dureeTotale(ctx.fiches)}}`);
p('\\domaine{Tout le programme}');
p('\\nomcourt{Classeur complet}');
p('\\versiondoc{1.0}');
p(`\\datedoc{${leJour}}`);
if (paquet.author) p(`\\auteur{${paquet.author}}`);
if (paquet.homepage) p('\\depot{\\lienprojet}');
p('', '\\begin{document}');
// Le pied de page « version · licence » n'a de sens que sur une feuille
// détachée. Ici la page de garde le dit une fois, et chaque première page de
// document garde son titre en pied.
p('\\sanspiedversion');
p('\\pagedegarde', '');

// Le sommaire reprend son identité propre : c'est un document parmi les
// autres, pas la suite de la page de garde.
p('\\surtitre{Par où commencer}');
p('\\titrefiche{Carte des révisions}');
p("\\accroche{Toutes les leçons ne se valent pas. Cette page dit lesquelles rapportent le plus, et dans quel ordre les reprendre quand le temps manque.}");
p("\\pourquoi{Réviser dans le désordre coûte du temps : quelques leçons portent tout le reste.}");
p('\\domaine{Toutes les fiches}');
p('\\nomcourt{Carte des révisions}');
p('\\entetefiche', '');
p(...corpsSommaire(ctx, { avecPages: true }));

for (const m of morceaux) {
  p('', '\\clearpage');
  // Chaque document repart de sa section 1 : la numérotation est locale,
  // comme dans le PDF séparé.
  p('\\setcounter{section}{0}');
  p(...m.preambule);
  p(`\\phantomsection\\label{doc:${m.base}}`);
  p('\\entetefiche', '');
  p(m.corps);
}

p('', '\\end{document}');

fs.writeFileSync(sortie, l.join('\n') + '\n');
console.log(`complet : ${morceaux.length} documents assemblés`);
