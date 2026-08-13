#!/usr/bin/env node
/**
 * Assemble un recueil de problèmes à partir d'un fichier par problème.
 *
 *   node tools/recueil.mjs problemes/recueil build/recueil.tex build/recueil-corrige.tex
 *
 * Chaque problème vit dans son propre fichier `problemes/recueil/NN-nom.md`,
 * avec son en-tête YAML (titre, difficulte, duree, notions) et, à la fin,
 * un bloc `::: solution … :::`.
 *
 * L'outil en tire DEUX documents depuis la même source :
 *   · le recueil d'énoncés, sans les corrigés ;
 *   · le corrigé seul, dans le même ordre.
 *
 * L'ordre est celui des noms de fichiers. Le chapeau du recueil et la liste
 * ordonnée des types de problèmes sont décrits dans `<dossier>/_recueil.yaml`.
 *
 * Chaque problème déclare son `type` ; le recueil ouvre une partie à chaque
 * changement de type, ce qui donne la progression guidé -> ouvert.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';

const ici = path.dirname(fileURLToPath(import.meta.url));
const [, , dossier, sortieEnonces, sortieCorrige] = process.argv;
if (!dossier) {
  console.error('usage: recueil.mjs <dossier> <énoncés.tex> [corrigé.tex]');
  process.exit(1);
}

/* ------------------------------------------------------------------ *
 * Lecture des problèmes
 * ------------------------------------------------------------------ */
const chapeau = yaml.load(fs.readFileSync(path.join(dossier, '_recueil.yaml'), 'utf8'));

const fichiers = fs
  .readdirSync(dossier)
  .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  .sort();

if (!fichiers.length) {
  console.error(`${dossier} : aucun problème trouvé.`);
  process.exit(1);
}

const problemes = fichiers.map((f) => {
  const brut = fs.readFileSync(path.join(dossier, f), 'utf8');
  const m = brut.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) {
    console.error(`${f} : en-tête YAML manquant.`);
    process.exit(1);
  }
  const meta = yaml.load(m[1]) ?? {};
  const corps = m[2];

  // sépare l'énoncé du bloc ::: solution … :::
  const i = corps.search(/^:::\s*solution\b/m);
  const enonce = i === -1 ? corps : corps.slice(0, i);
  const solution = i === -1 ? '' : corps.slice(i);

  return { fichier: f, meta, enonce: enonce.trimEnd(), solution: solution.trimEnd() };
});

/* ------------------------------------------------------------------ *
 * Réutilise le précompilateur Markdown pour le corps de chaque problème
 * ------------------------------------------------------------------ */
const tmp = path.join(path.dirname(sortieEnonces), '.recueil-tmp.md');

function versTex(markdown, metaBidon) {
  fs.writeFileSync(
    tmp,
    `---\ntitre: x\nniveaux: [6e]\npriorite: 2\nduree: x\ndomaine: x\nsurtitre: x\n---\n${markdown}\n`
  );
  const tex = execFileSync('node', [path.join(ici, 'fiche2tex.mjs'), tmp], {
    encoding: 'utf8',
  });
  // ne garde que ce qui est entre \entetefiche et \end{document}
  const debut = tex.indexOf('\\entetefiche') + '\\entetefiche'.length;
  const fin = tex.lastIndexOf('\\end{document}');
  return tex.slice(debut, fin).trim();
}

const echapper = (s) => String(s ?? '').replace(/([%&#])/g, '\\$1');

function document(titre, accroche, duree, contenus) {
  const l = [];
  l.push('% Fichier engendré par tools/recueil.mjs — ne pas modifier à la main.');
  l.push('\\documentclass{fiche}', '');
  l.push(`\\surtitre{${echapper(chapeau.surtitre)}}`);
  l.push(`\\titrefiche{${echapper(titre)}}`);
  l.push(`\\accroche{${echapper(accroche)}}`);
  l.push(`\\niveaux{${(chapeau.niveaux ?? ['6e', '5e']).join(' · ').replace(/\b([3-6])e\b/g, '$1\\ieme{}')}}`);
  l.push(`\\priorite{${chapeau.priorite ?? 3}}`);
  if (chapeau.pourquoi) l.push(`\\pourquoi{${echapper(chapeau.pourquoi)}}`);
  l.push(`\\duree{${echapper(duree)}}`);
  l.push(`\\domaine{${echapper(chapeau.domaine)}}`);
  l.push(`\\nomcourt{${echapper(titre)}}`);
  l.push(`\\versiondoc{${echapper(chapeau.version ?? '1.0')}}`);
  l.push('', '\\begin{document}', '\\entetefiche', '');
  l.push(...contenus);
  l.push('', '\\end{document}');
  return l.join('\n') + '\n';
}

/* ------------------------------------------------------------------ *
 * Recueil d'énoncés
 * ------------------------------------------------------------------ */
const corpsEnonces = [];

// sommaire du recueil : une ligne par problème, avec sa jauge de difficulté
corpsEnonces.push('\\begin{tableaufiche}{@{}G{7mm} Y G{30mm} G{15mm}@{}}');
corpsEnonces.push(
  '\\ligneentete \\entetecell{Nº} & \\entetecell{Problème} & \\entetecell{Notions} & \\entetecell{Difficulté}\\\\'
);
problemes.forEach((p, i) => {
  const d = p.meta.difficulte ?? 3;
  corpsEnonces.push(
    `${i + 1} & ${echapper(p.meta.titre)} & ${echapper((p.meta.notions ?? []).join(', '))} & ` +
      `\\jaugen{\\couleurdifficulte{${d}}}{${d}}{5}\\\\`
  );
});
corpsEnonces.push('\\end{tableaufiche}', '');

let typeCourant = null;
problemes.forEach((p, i) => {
  const d = p.meta.difficulte ?? 3;
  if (p.meta.type && p.meta.type !== typeCourant) {
    typeCourant = p.meta.type;
    const t = chapeau.types?.[typeCourant];
    if (t) {
      corpsEnonces.push(`\\section{${echapper(t.titre)}}`);
      if (t.intro) corpsEnonces.push(versTex(t.intro), '');
    }
  }
  corpsEnonces.push(
    `\\enteteprobleme{${i + 1}}{${echapper(p.meta.titre)}}{${d}}{${echapper(p.meta.duree)}}{${echapper((p.meta.notions ?? []).join(' · '))}}`
  );
  corpsEnonces.push(versTex(p.enonce), '');
});

fs.writeFileSync(
  sortieEnonces,
  document(chapeau.titre, chapeau.accroche, chapeau.duree, corpsEnonces)
);

/* ------------------------------------------------------------------ *
 * Corrigé
 * ------------------------------------------------------------------ */
if (sortieCorrige) {
  const corpsCorrige = [];
  problemes.forEach((p, i) => {
    if (!p.solution) return;
    const d = p.meta.difficulte ?? 3;
    corpsCorrige.push(
      `\\enteteprobleme{${i + 1}}{${echapper(p.meta.titre)}}{${d}}{${echapper(p.meta.duree)}}{${echapper((p.meta.notions ?? []).join(' · '))}}`
    );
    corpsCorrige.push(versTex(p.solution), '');
  });
  fs.writeFileSync(
    sortieCorrige,
    document(
      chapeau.titre_corrige ?? `${chapeau.titre} — corrigé`,
      chapeau.accroche_corrige ?? chapeau.accroche,
      chapeau.duree,
      corpsCorrige
    )
  );
}

fs.rmSync(tmp, { force: true });
console.log(`recueil : ${problemes.length} problèmes assemblés`);
