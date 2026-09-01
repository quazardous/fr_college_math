#!/usr/bin/env node
/**
 * Le lexique inversé — d'un mot vers la leçon qui en parle.
 *
 *   node tools/lexique.mjs contenu/fiches contenu/seances contenu/problemes sortie.tex
 *
 * Le sommaire répond à « par où commencer ? ». Le lexique répond à l'autre
 * question, celle qu'on se pose une fois le classeur ouvert : « où est-ce
 * qu'on parle de ça ? ». Sans lui, chercher la notation scientifique ou le
 * PGCD suppose de savoir d'avance dans quelle fiche regarder — c'est-à-dire
 * de savoir ce qu'on cherche.
 *
 * La source est le champ `notions:` de chaque en-tête YAML. Il est tenu à la
 * main, et c'est voulu : une extraction automatique du texte ramasserait tous
 * les mots employés, pas ceux dont la fiche traite. Une notion citée en
 * passant n'est pas une notion enseignée.
 *
 * Les problèmes du recueil déclarent le même champ. Un terme renvoie donc à
 * la leçon qui l'explique ET aux problèmes qui l'exercent.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { contexte, ech, niv, base as baseDe } from './sommaire.mjs';

/** Tri français, insensible à la casse et aux accents. */
export const compareFr = (a, b) =>
  a.localeCompare(b, 'fr', { sensitivity: 'base', numeric: true });

const listeNotions = (d) =>
  (Array.isArray(d.notions) ? d.notions : d.notions ? [d.notions] : []).map((n) => String(n).trim());

/**
 * L'index inversé : terme → { fiches, problemes }.
 * Les fiches gardent leur numéro, les problèmes leur rang dans le recueil.
 */
export function lexique(ctx, problemesRecueil = []) {
  const table = new Map();
  const entree = (terme) => {
    if (!table.has(terme)) table.set(terme, { terme, fiches: [], problemes: [] });
    return table.get(terme);
  };

  for (const f of ctx.fiches) {
    for (const n of listeNotions(f)) {
      entree(n).fiches.push({ numero: f.fichier.slice(0, 2), titre: f.titre, base: baseDe(f) });
    }
  }
  for (const [i, p] of problemesRecueil.entries()) {
    for (const n of listeNotions(p)) entree(n).problemes.push(i + 1);
  }

  return [...table.values()].sort((a, b) => compareFr(a.terme, b.terme));
}

/** Les en-têtes des problèmes du recueil, dans l'ordre du document. */
export function lireProblemes(dossier) {
  if (!fs.existsSync(dossier)) return [];
  return fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort()
    .map((f) => {
      const m = fs.readFileSync(path.join(dossier, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!m) return null;
      const meta = {};
      // Un analyseur YAML complet serait de trop : seul `notions:` nous
      // intéresse, et il tient sur une ligne dans ces fichiers.
      const n = m[1].match(/^notions: \[(.*)\]$/m);
      meta.notions = n ? n[1].split(',').map((x) => x.trim()).filter(Boolean) : [];
      return meta;
    })
    .filter(Boolean);
}

/* ------------------------------------------------------------------ *
 * En ligne de commande : le lexique en PDF
 * ------------------------------------------------------------------ */
const appeleDirectement =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (appeleDirectement) {
  const [, , dFiches, dSeances, dProblemes, sortie] = process.argv;
  const ctx = contexte(dFiches, dSeances, dProblemes);
  const entrees = lexique(ctx, lireProblemes(dProblemes));

  const l = [];
  const p = (...x) => l.push(...x);
  p('% Fichier engendré par tools/lexique.mjs — ne pas modifier à la main.');
  p('\\documentclass{fiche}', '');
  p('\\surtitre{Où est-ce qu\'on parle de ça}');
  p('\\titrefiche{Lexique}');
  p(
    "\\accroche{Un mot, et la fiche qui l'explique. Les numéros de la dernière " +
      "colonne sont ceux des problèmes du recueil, pour s'entraîner ensuite.}"
  );
  p(`\\niveaux{${niv(ctx.niveaux)}}`);
  p('\\priorite{2}');
  p("\\pourquoi{Chercher une notion sans savoir d'avance dans quelle fiche regarder.}");
  p(`\\duree{${entrees.length} entrées}`);
  p('\\domaine{Toutes les fiches}');
  p('\\nomcourt{Lexique}');
  p('\\versiondoc{1.0}');
  p('', '\\begin{document}', '\\entetefiche', '');

  // Une entrée par ligne, sur deux colonnes de page : la liste est longue et
  // chaque ligne est courte.
  p('\\begin{multicols}{2}');
  p('\\raggedcolumns');
  let initiale = '';
  for (const e of entrees) {
    const i = e.terme[0].normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
    if (i !== initiale) {
      initiale = i;
      p(`\\lexinitiale{${i}}`);
    }
    const ou = e.fiches.map((f) => f.numero).join(', ');
    const pb = e.problemes.length ? `\\lexpb{${e.problemes.join(', ')}}` : '';
    p(`\\lexterme{${ech(e.terme)}}{${ou}}{${pb}}`);
  }
  p('\\end{multicols}');
  p('', '\\end{document}');

  fs.writeFileSync(sortie, l.join('\n') + '\n');
  const orphelines = entrees.filter((e) => !e.fiches.length);
  console.log(
    `lexique : ${entrees.length} entrées` +
      (orphelines.length
        ? ` — ⚠ ${orphelines.length} sans fiche : ${orphelines.map((e) => e.terme).join(', ')}`
        : '')
  );
}
