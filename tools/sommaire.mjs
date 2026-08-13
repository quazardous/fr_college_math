#!/usr/bin/env node
/**
 * Engendre le sommaire — la carte des priorités — à partir des en-têtes YAML
 * de toutes les fiches. Rien n'est saisi deux fois : changer la priorité dans
 * une fiche met le sommaire à jour au prochain build.
 *
 *   node tools/sommaire.mjs fiches problemes build/00-sommaire.tex
 *
 * Le fichier sert aussi de bibliothèque : `tools/complet.mjs` importe
 * `contexte()` et `corpsSommaire()` pour rebâtir les mêmes tableaux en tête du
 * document complet, avec en plus une colonne de numéros de page.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';
import { enHeures, formaterDuree } from './duree.mjs';

export const ORDRE_NIVEAUX = ['6e', '5e', '4e', '3e'];

export const ech = (s) => String(s ?? '').replace(/([%&#])/g, '\\$1');
export const niv = (v) =>
  (Array.isArray(v) ? v.join(' · ') : String(v ?? '')).replace(/\b([3-6])e\b/g, '$1\\ieme{}');

/** Nom de base d'un document, tel que le portent build/<base>.tex et pdf/<base>.pdf. */
export const base = (d) => d.fichier.replace(/\.md$/, '');

export function lireEntetes(dossier) {
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

/** Le recueil n'est pas un .md : son chapeau vit dans _recueil.yaml, et son
 *  nombre de problèmes se compte sur le disque. */
export function lireRecueil(dossierProblemes) {
  const dossier = path.join(dossierProblemes ?? '', 'recueil');
  const chapeau = path.join(dossier, '_recueil.yaml');
  if (!fs.existsSync(chapeau)) return null;
  const r = yaml.load(fs.readFileSync(chapeau, 'utf8'));
  r.dossier = dossier;
  r.nombre = fs.readdirSync(dossier).filter((f) => f.endsWith('.md') && !f.startsWith('_')).length;
  return r;
}

export function contexte(dossierFiches, dossierProblemes) {
  const fiches = lireEntetes(dossierFiches);
  const problemes = lireEntetes(dossierProblemes);
  const recueil = lireRecueil(dossierProblemes);

  // Les niveaux couverts par le projet : l'union de ceux que déclarent les
  // documents, du plus ancien au plus récent.
  const declares = new Set(
    [...fiches, ...problemes, ...(recueil ? [recueil] : [])]
      .flatMap((d) => (Array.isArray(d.niveaux) ? d.niveaux : d.niveaux ? [d.niveaux] : []))
      .map(String)
  );
  const niveaux = ORDRE_NIVEAUX.filter((n) => declares.has(n));
  return { fiches, problemes, recueil, niveaux };
}

export { enHeures, formaterDuree };

export const dureeTotale = (fiches) =>
  enHeures(fiches.reduce((s, f) => s + (parseInt(f.duree) || 0), 0));

const porte = (d, n) => (Array.isArray(d.niveaux) ? d.niveaux : [d.niveaux]).includes(n);

/**
 * Le corps du sommaire.
 *   avecPages : ajoute une colonne « Page » remplie par \pageref{doc:<base>}.
 *               Réservé au document complet, seul endroit où ces ancres existent.
 */
export function corpsSommaire({ fiches, problemes, recueil, niveaux }, { avecPages = false } = {}) {
  const l = [];
  const p = (...x) => l.push(...x);
  const colPage = avecPages ? ' G{11mm}' : '';
  const enttPage = avecPages ? ' & \\entetecell{Page}' : '';
  const page = (b) => (avecPages ? ` & \\pageref{doc:${b}}` : '');

  /* ------------------------------------------------------- légende */
  p('\\section{Comment lire la priorité}');
  p('\\begin{tableaufiche}{@{}G{26mm} G{28mm} Y@{}}');
  p('\\ligneentete \\entetecell{Repère} & \\entetecell{Niveau} & \\entetecell{Ce que ça veut dire}\\\\');
  p('\\jaugen{prioritetrois}{3}{3} & \\textbf{Incontournable} & Sert dans toutes les autres leçons. À revoir en premier, sans exception.\\\\');
  p('\\jaugen{prioritedeux}{2}{3} & \\textbf{Important} & Attendu du programme, à savoir faire seul.\\\\');
  p('\\jaugen{prioriteun}{1}{3} & \\textbf{Complément} & Utile, mais secondaire si le temps manque.\\\\');
  p('\\end{tableaufiche}', '');

  /* ------------------------------------------------------- les fiches */
  // Le titre suit la donnée : pas de « trois » codé en dur qui mentirait
  // dès qu'une fiche change de priorité.
  const nombres = ['aucune', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];
  const titres = (n) => ({
    3: `Les ${nombres[n] ?? n} leçons qui portent tout le reste`,
    2: 'À maîtriser ensuite',
    1: 'Si le temps le permet',
  });

  for (const niveau of [3, 2, 1]) {
    const lot = fiches.filter((f) => (f.priorite ?? 2) === niveau);
    if (!lot.length) continue;
    p(`\\section{${titres(lot.length)[niveau]}}`);
    p(`\\begin{tableaufiche}{@{}G{7mm} Y G{16mm} G{14mm} G{17mm}${colPage}@{}}`);
    p(
      '\\ligneentete \\entetecell{Nº} & \\entetecell{Fiche} & \\entetecell{Niveau} & ' +
        `\\entetecell{Durée} & \\entetecell{Priorité}${enttPage}\\\\`
    );
    for (const f of lot) {
      const coul = niveau === 3 ? 'prioritetrois' : niveau === 2 ? 'prioritedeux' : 'prioriteun';
      p(
        `${f.fichier.slice(0, 2)} & \\textbf{${ech(f.titre)}} \\newline ` +
          `{\\fsBadgeSource\\color{encredouce}${ech(f.pourquoi)}} & ${niv(f.niveaux)} & ` +
          `${ech(formaterDuree(f.duree))} & \\jaugen{${coul}}{${niveau}}{3}${page(base(f))}\\\\`
      );
    }
    p('\\end{tableaufiche}', '');
  }

  /* ------------------------------------------------------- s'entraîner */
  // Un corrigé n'est pas un document qu'on choisit de réviser : il accompagne
  // son énoncé. Le lister sur sa propre ligne doublait le tableau pour rien —
  // il est replié sous l'énoncé, avec sa page quand le document en a.
  const estCorrige = (d) => /-corrige\.md$/.test(d.fichier);
  // Les séances suivent les classes, de la 6e à la 3e, comme le tableau qui
  // suit — et non l'ordre alphabétique des fichiers, qui mettrait la 3e en tête.
  const rangNiveau = (d) => {
    const n = (Array.isArray(d.niveaux) ? d.niveaux : [d.niveaux]).map(String);
    const i = ORDRE_NIVEAUX.findIndex((x) => n.includes(x));
    return i === -1 ? 99 : i;
  };
  const enonces = problemes
    .filter((d) => !estCorrige(d))
    .sort((a, b) => rangNiveau(a) - rangNiveau(b) || a.fichier.localeCompare(b.fichier));
  const corrigeDe = (d) =>
    problemes.find((x) => x.fichier === d.fichier.replace(/\.md$/, '-corrige.md'));

  if (enonces.length || recueil) {
    p("\\section{S'entraîner}");
    p(`\\begin{tableaufiche}{@{}Y G{16mm} G{14mm}${colPage}@{}}`);
    p(
      `\\ligneentete \\entetecell{Document} & \\entetecell{Niveau} & \\entetecell{Durée}${enttPage}\\\\`
    );
    const mentionCorrige = (b) =>
      ` \\newline {\\fsBadgeSource\\color{encredouce}corrigé ${avecPages ? `p.~\\pageref{doc:${b}}` : 'inclus'}}`;
    for (const d of enonces) {
      const c = corrigeDe(d);
      p(
        `\\textbf{${ech(d.titre)}}${c ? mentionCorrige(base(c)) : ''} & ` +
          `${niv(d.niveaux)} & ${ech(formaterDuree(d.duree))}${page(base(d))}\\\\`
      );
    }
    if (recueil) {
      p(
        `\\textbf{${ech(recueil.titre)}} \\newline ` +
          `{\\fsBadgeSource\\color{encredouce}${recueil.nombre} problèmes, du guidé vers l'ouvert · ` +
          `corrigé ${avecPages ? 'p.~\\pageref{doc:recueil-corrige}' : 'inclus'}} & ` +
          `${niv(recueil.niveaux)} & ${ech(formaterDuree(recueil.duree))}${page('recueil')}\\\\`
      );
    }
    p('\\end{tableaufiche}', '');
  }

  /* ------------------------------------------------------- plan par niveau */
  // Rien n'est nommé à la main : le plan se recalcule quand une fiche change
  // de priorité ou de niveau, et quand une séance apparaît.
  p('\\section{Par où commencer selon ta classe}');
  p('\\begin{tableaufiche}{@{}G{13mm} Y G{40mm}@{}}');
  p(
    '\\ligneentete \\entetecell{Classe} & \\entetecell{Fiches à revoir en premier} & ' +
      '\\entetecell{Séance chronométrée}\\\\'
  );
  for (const n of niveaux) {
    const nums = fiches
      .filter((f) => porte(f, n) && (f.priorite ?? 2) === 3)
      .map((f) => f.fichier.slice(0, 2));
    const seance = enonces.find((d) => porte(d, n));
    p(
      `${niv([n])} & ${nums.length ? nums.join(' · ') : '\\emph{aucune}'} & ` +
        `${seance ? ech(seance.titre) : '—'}\\\\`
    );
  }
  p('\\end{tableaufiche}', '');

  p('\\begin{methode}[Si tu ne disposes que de trois heures]');
  p('\\begin{enumerate}[leftmargin=6mm,label=\\textbf{\\arabic*.}]');
  p("  \\item \\textbf{Soir 1} — les fiches de ta ligne dans le tableau ci-dessus. Sans elles, le reste ne tient pas.");
  p("  \\item \\textbf{Soir 2} — la séance chronométrée de ton niveau, puis, pour chaque série qui a coincé, la fiche correspondante.");
  p("  \\item \\textbf{Soir 3} — le recueil de problèmes, en commençant par la partie qui correspond à ton aisance.");
  p('\\end{enumerate}');
  p('\\end{methode}', '');

  p('\\begin{retenir}[La règle qui vaut pour toutes les fiches]');
  p("Lis l'encadré \\textbf{Automatismes} en premier, et vérifie que chaque ligne sort sans réfléchir. Si l'une résiste, c'est là qu'il faut travailler — pas ailleurs.");
  p('\\end{retenir}');

  return l;
}

/* ------------------------------------------------------------------ *
 * En ligne de commande : le sommaire autonome, pdf/00-sommaire.pdf
 * ------------------------------------------------------------------ */
const appeleDirectement =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (appeleDirectement) {
  const [, , dossierFiches, dossierProblemes, sortie] = process.argv;
  const ctx = contexte(dossierFiches, dossierProblemes);

  const l = [];
  const p = (...x) => l.push(...x);
  p('% Fichier engendré par tools/sommaire.mjs — ne pas modifier à la main.');
  p('\\documentclass{fiche}', '');
  p('\\surtitre{Par où commencer}');
  p('\\titrefiche{Carte des révisions}');
  p("\\accroche{Toutes les leçons ne se valent pas. Cette page dit lesquelles rapportent le plus, et dans quel ordre les reprendre quand le temps manque.}");
  p(`\\niveaux{${niv(ctx.niveaux)}}`);
  p('\\priorite{3}');
  p("\\pourquoi{Réviser dans le désordre coûte du temps : trois leçons portent tout le reste.}");
  p(`\\duree{${dureeTotale(ctx.fiches)}}`);
  p('\\domaine{Toutes les fiches}');
  p('\\nomcourt{Carte des révisions}');
  p('\\versiondoc{1.0}');
  p('', '\\begin{document}', '\\entetefiche', '');
  p(...corpsSommaire(ctx));
  p('', '\\end{document}');

  fs.writeFileSync(sortie, l.join('\n') + '\n');
  console.log(
    `sommaire : ${ctx.fiches.length} fiches, ${ctx.problemes.length + (ctx.recueil ? 1 : 0)} documents d'entraînement`
  );
}
