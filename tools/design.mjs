#!/usr/bin/env node
/**
 * design.yaml  ->  latex/design.tex
 *
 * Traduit les jetons de design (polices, tailles, couleurs, marges) en
 * commandes LaTeX consommées par latex/fiche.cls. Aucune valeur de style
 * n'est écrite en dur dans la classe : tout passe par ici.
 *
 *   node tools/design.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';

const racine = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const conf = yaml.load(fs.readFileSync(path.join(racine, 'design.yaml'), 'utf8'));

const lignes = [];
const ecrire = (s = '') => lignes.push(s);

/* ------------------------------------------------------------------ *
 * Sortie web : les mêmes jetons, en propriétés CSS personnalisées
 *
 * Les tailles sont converties en multiples du corps : le PDF pose un corps
 * à 11 pt et une section à 13,4 pt ; le site pose un corps à 17 px et une
 * section à 1,218 rem. Le rapport est le même, l'échelle suit l'écran.
 * ------------------------------------------------------------------ */
function versCss() {
  const w = conf.web ?? {};
  const corps = conf.polices.tailles.corps;
  const l = [];
  const e = (s = '') => l.push(s);

  e('/* =====================================================================');
  e(' *  FICHIER ENGENDRÉ — ne pas modifier à la main.');
  e(' *  Source : design.yaml   Générateur : tools/design.mjs --css');
  e(' * ===================================================================== */');
  e();
  e(':root {');
  e(`  --base: ${w.base ?? 17}px;`);
  e(`  --largeur-lecture: ${w.largeur_lecture ?? 40}rem;`);
  e();
  for (const [nom, pile] of Object.entries(w.familles ?? {})) {
    e(`  --pile-${nom}: ${pile};`);
  }
  e();
  for (const [nom, hex] of Object.entries(conf.couleurs)) {
    e(`  --c-${nomCouleur(nom)}: #${hex};`);
  }
  e();
  for (const [nom, valeur] of Object.entries(conf.polices.tailles)) {
    const taille = typeof valeur === 'object' ? valeur.taille : valeur;
    const inter = typeof valeur === 'object' && valeur.interligne ? valeur.interligne : facteur;
    e(`  --fs-${nomCouleur(nom)}: ${+(taille / corps).toFixed(4)}rem;`);
    e(`  --lh-${nomCouleur(nom)}: ${inter};`);
  }
  e('}');
  return l.join('\n') + '\n';
}

ecrire('% =====================================================================');
ecrire('%  FICHIER ENGENDRÉ — ne pas modifier à la main.');
ecrire('%  Source : design.yaml   Générateur : tools/design.mjs');
ecrire('% =====================================================================');
ecrire();

/* ------------------------------------------------------------------ polices */
const f = conf.polices.familles;
const opts = (fam) => {
  const o = [`Extension=${fam.extension}`, `UprightFont=${fam.normal}`];
  if (fam.gras) o.push(`BoldFont=${fam.gras}`);
  if (fam.italique) o.push(`ItalicFont=${fam.italique}`);
  if (fam.gras_italique) o.push(`BoldItalicFont=${fam.gras_italique}`);
  if (fam.echelle) o.push(`Scale=${fam.echelle}`);
  o.push('Ligatures=TeX');
  return o.join(', ');
};

ecrire('% ---------------------------------------------------------------- polices');
ecrire(`\\setmainfont{${f.texte.fichier}}[${opts(f.texte)}]`);
ecrire(`\\setsansfont{${f.titres.fichier}}[${opts(f.titres)}]`);
ecrire(`\\setmonofont{${f.machine.fichier}}[${opts(f.machine)}]`);
ecrire(`\\setmathfont{${f.math}}`);
ecrire();

/* ------------------------------------------------------------------ tailles */
// nom_yaml -> \fsNomYaml  (une commande \selectfont prête à l'emploi)
const chameau = (s) =>
  s.split('_').map((m, i) => (i === 0 ? m : m[0].toUpperCase() + m.slice(1))).join('');

const facteur = conf.polices.interligne;
ecrire('% ---------------------------------------------------------------- tailles');
for (const [nom, valeur] of Object.entries(conf.polices.tailles)) {
  const taille = typeof valeur === 'object' ? valeur.taille : valeur;
  const inter = typeof valeur === 'object' && valeur.interligne ? valeur.interligne : facteur;
  const saut = +(taille * inter).toFixed(2);
  ecrire(`\\newcommand{\\fs${chameau(nom)[0].toUpperCase()}${chameau(nom).slice(1)}}{\\fontsize{${taille}}{${saut}}\\selectfont}`);
}
ecrire();

/* ------------------------------------------------------------------ couleurs */
// nom_yaml -> nom LaTeX sans souligné (priorite_3_fond -> prioritetroisfond)
const CHIFFRES = { 1: 'un', 2: 'deux', 3: 'trois' };
const nomCouleur = (s) =>
  s.replace(/_(\d)/g, (_, d) => CHIFFRES[d] ?? d).replace(/_/g, '');

ecrire('% ---------------------------------------------------------------- couleurs');
for (const [nom, hex] of Object.entries(conf.couleurs)) {
  ecrire(`\\definecolor{${nomCouleur(nom)}}{HTML}{${hex}}`);
}
ecrire();

/* -------------------------------------------------------------- mise en page */
const m = conf.mise_en_page;
ecrire('% ---------------------------------------------------------------- mise en page');
ecrire(
  `\\geometry{${m.format},top=${m.marges.haut}mm,bottom=${m.marges.bas}mm,` +
    `left=${m.marges.gauche}mm,right=${m.marges.droite}mm,` +
    `headsep=${m.ecart_entete}mm,footskip=${m.ecart_pied}mm}`
);
ecrire(`\\setlength{\\parskip}{${m.interligne_paragraphe}ex plus 0.3ex}`);
ecrire(`\\newcommand{\\filetsection}{${m.filet_section}pt}`);
ecrire(`\\newcommand{\\filetencart}{${m.filet_encart}pt}`);
ecrire();
ecrire('\\endinput');

/* ------------------------------------------------------------------ *
 * Écriture — LaTeX par défaut, CSS sur demande
 * ------------------------------------------------------------------ */
const css = process.argv.indexOf('--css');
const sortie =
  css > -1
    ? process.argv[css + 1] ?? path.join(racine, 'site', 'design.css')
    : path.join(racine, 'latex', 'design.tex');

fs.mkdirSync(path.dirname(sortie), { recursive: true });
fs.writeFileSync(sortie, css > -1 ? versCss() : lignes.join('\n') + '\n');
console.log(
  `design.yaml → ${path.relative(racine, sortie)}  (${Object.keys(conf.polices.tailles).length} tailles, ${Object.keys(conf.couleurs).length} couleurs)`
);
