#!/usr/bin/env node
/**
 * Engendre le sommaire — la carte des priorités — à partir des en-têtes YAML
 * de toutes les fiches. Rien n'est saisi deux fois : changer la priorité dans
 * une fiche met le sommaire à jour au prochain build.
 *
 *   node tools/sommaire.mjs fiches problemes build/00-sommaire.tex
 */

import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';

const [, , dossierFiches, dossierProblemes, sortie] = process.argv;

function lireEntetes(dossier) {
  if (!fs.existsSync(dossier)) return [];
  return fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort()
    .map((f) => {
      const brut = fs.readFileSync(path.join(dossier, f), 'utf8');
      const m = brut.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return m ? { fichier: f, ...yaml.load(m[1]) } : null;
    })
    .filter(Boolean);
}

const fiches = lireEntetes(dossierFiches);
const problemes = lireEntetes(dossierProblemes);

const ech = (s) => String(s ?? '').replace(/([%&#])/g, '\\$1');
const niv = (v) => (Array.isArray(v) ? v.join(' · ') : String(v ?? '')).replace(/\b([3-6])e\b/g, '$1\\ieme{}');

const l = [];
const p = (...x) => l.push(...x);

p('% Fichier engendré par tools/sommaire.mjs — ne pas modifier à la main.');
p('\\documentclass{fiche}', '');
p('\\surtitre{Par où commencer}');
p('\\titrefiche{Carte des révisions}');
p("\\accroche{Toutes les leçons ne se valent pas. Cette page dit lesquelles rapportent le plus, et dans quel ordre les reprendre quand le temps manque.}");
p('\\niveaux{6\\ieme{} · 5\\ieme{}}');
p('\\priorite{3}');
p("\\pourquoi{Réviser dans le désordre coûte du temps : trois leçons portent tout le reste.}");
const total = fiches.reduce((s, f) => s + (parseInt(f.duree) || 0), 0);
p(`\\duree{${total} min}`);
p('\\domaine{Toutes les fiches}');
p('\\nomcourt{Carte des révisions}');
p('', '\\begin{document}', '\\entetefiche', '');

/* --------------------------------------------------------- légende */
p('\\section{Comment lire la priorité}');
p('\\begin{tableaufiche}{@{}G{26mm} G{28mm} Y@{}}');
p('\\ligneentete \\entetecell{Repère} & \\entetecell{Niveau} & \\entetecell{Ce que ça veut dire}\\\\');
p('\\jaugen{prioritetrois}{3}{3} & \\textbf{Incontournable} & Sert dans toutes les autres leçons. À revoir en premier, sans exception.\\\\');
p('\\jaugen{prioritedeux}{2}{3} & \\textbf{Important} & Attendu du programme, à savoir faire seul.\\\\');
p('\\jaugen{prioriteun}{1}{3} & \\textbf{Complément} & Utile, mais secondaire si le temps manque.\\\\');
p('\\end{tableaufiche}', '');

/* --------------------------------------------------------- les fiches */
const parPriorite = [3, 2, 1];
// Le titre suit la donnée : pas de « trois » codé en dur qui mentirait
// dès qu'une fiche change de priorité.
const nombres = ['aucune', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit'];
const titres = (n) => ({
  3: `Les ${nombres[n] ?? n} leçons qui portent tout le reste`,
  2: 'À maîtriser ensuite',
  1: 'Si le temps le permet',
});

for (const niveau of parPriorite) {
  const lot = fiches.filter((f) => (f.priorite ?? 2) === niveau);
  if (!lot.length) continue;
  p(`\\section{${titres(lot.length)[niveau]}}`);
  p('\\begin{tableaufiche}{@{}G{7mm} Y G{16mm} G{14mm} G{17mm}@{}}');
  p('\\ligneentete \\entetecell{Nº} & \\entetecell{Fiche} & \\entetecell{Niveau} & \\entetecell{Durée} & \\entetecell{Priorité}\\\\');
  for (const f of lot) {
    const num = f.fichier.slice(0, 2);
    const coul = niveau === 3 ? 'prioritetrois' : niveau === 2 ? 'prioritedeux' : 'prioriteun';
    p(
      `${num} & \\textbf{${ech(f.titre)}} \\newline {\\fsBadgeSource\\color{encredouce}${ech(f.pourquoi)}} & ` +
        `${niv(f.niveaux)} & ${ech(f.duree)} & \\jaugen{${coul}}{${niveau}}{3}\\\\`
    );
  }
  p('\\end{tableaufiche}', '');
}

/* --------------------------------------------------------- s'entraîner */
if (problemes.length) {
  p("\\section{S'entraîner}");
  p('\\begin{tableaufiche}{@{}Y G{16mm} G{14mm}@{}}');
  p('\\ligneentete \\entetecell{Document} & \\entetecell{Niveau} & \\entetecell{Durée}\\\\');
  for (const d of problemes) {
    p(`\\textbf{${ech(d.titre)}} & ${niv(d.niveaux)} & ${ech(d.duree)}\\\\`);
  }
  p('\\textbf{Recueil de problèmes} \\newline {\\fsBadgeSource\\color{encredouce}douze problèmes, du guidé vers l\'ouvert} & 6\\ieme{} · 5\\ieme{} & 2 h\\\\');
  p('\\end{tableaufiche}', '');
}

/* --------------------------------------------------------- plan de révision */
p("\\section{Un plan de révision qui tient en trois soirs}");
p('\\begin{methode}[Si tu ne disposes que de trois heures]');
p('\\begin{enumerate}[leftmargin=6mm,label=\\textbf{\\arabic*.}]');
p("  \\item \\textbf{Soir 1} — les fiches marquées \\emph{incontournable} ci-dessus, puis la séance d'une heure. Sans elles, le reste ne tient pas.");
p('  \\item \\textbf{Soir 2} — les fiches \\emph{important} qui correspondent au niveau : relatifs et calcul littéral en 5\\ieme{}, géométrie plane en 6\\ieme{}.');
p("  \\item \\textbf{Soir 3} — le recueil de problèmes, en commençant par la partie qui correspond à ton aisance.");
p('\\end{enumerate}');
p('\\end{methode}', '');

p('\\begin{retenir}[La règle qui vaut pour toutes les fiches]');
p("Lis l'encadré \\textbf{Automatismes} en premier, et vérifie que chaque ligne sort sans réfléchir. Si l'une résiste, c'est là qu'il faut travailler — pas ailleurs.");
p('\\end{retenir}');

p('', '\\end{document}');

fs.writeFileSync(sortie, l.join('\n') + '\n');
console.log(`sommaire : ${fiches.length} fiches, ${problemes.length + 1} documents d'entraînement`);
