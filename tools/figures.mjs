/**
 * Figures TikZ → SVG, pour le site.
 *
 * TikZ ne tourne pas dans un navigateur : chaque figure est compilée par
 * Tectonic puis convertie en SVG par `pdftocairo`. Le texte y est vectorisé
 * en tracés — le SVG ne dépend donc d'aucune police, et rend à l'identique
 * partout, y compris hors ligne. **Le bloc TikZ de la source reste la seule
 * source** : le SVG est un produit dérivé, jamais édité à la main, et
 * `site/` est ignoré par git au même titre que `build/` et `pdf/`.
 *
 * Trois choix qui comptent :
 *
 *   · **une seule compilation** pour toutes les figures. Le paquet `preview`
 *     en mode `tightpage` donne une page par figure, rognée au trait près ;
 *     `pdftocairo` en extrait ensuite chaque page. Lancer Tectonic trente-six
 *     fois coûterait trente-six démarrages pour le même travail ;
 *
 *   · **un cache par empreinte**. Le nom du SVG porte le condensé de la figure
 *     et de son socle de rendu (figures.sty, fiche.cls, design.yaml) :
 *     retoucher une fiche ne recompile que ses figures, et changer une couleur
 *     les recompile toutes — ce qui est le comportement voulu ;
 *
 *   · **la provenance dans le fichier**. Un SVG mal rendu ne dit rien de sa
 *     source si son nom est un condensé nu. Le nom porte donc le document
 *     d'origine et la macro, et le SVG lui-même embarque le LaTeX exact qui
 *     l'a produit, dans ses balises <title> et <desc>. Ouvrir le SVG suffit à
 *     savoir quoi corriger, et où.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { analyser } from './balisage.mjs';

const ici = path.dirname(fileURLToPath(import.meta.url));
const racine = path.resolve(ici, '..');

const condense = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 16);

// Le socle de rendu : tout ce qui change l'aspect d'une figure sans que sa
// source à elle ne bouge.
export const socle = () =>
  condense(
    ['latex/figures.sty', 'latex/fiche.cls', 'design.yaml']
      .map((f) => fs.readFileSync(path.join(racine, f), 'utf8'))
      .join('\0')
  );

/** Le contenu LaTeX d'un nœud de figure, ou null si ce n'en est pas un. */
export function contenuFigure(n) {
  if (n.t === 'fig') return n.macro;
  if (n.t === 'brut' && n.genre === 'tikz') return n.lignes.join('\n');
  return null;
}

/** Toutes les figures d'un arbre de balisage, en profondeur. */
export function figuresDe(noeuds, sortie = []) {
  for (const n of noeuds) {
    const c = contenuFigure(n);
    if (c !== null) sortie.push(c);
    if (n.enfants) figuresDe(n.enfants, sortie);
  }
  return sortie;
}

const glisse = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Le nom du fichier SVG : de quoi le relier à sa source d'un coup d'œil.
 * « 02-fractions-pourcentages-droitegraduee-3f2a1b9c.svg »
 */
export function nomFigure({ contenu, origine }, s) {
  const doc = glisse(path.basename(origine, '.md'));
  const macro = contenu.match(/\\([a-zA-Z]+)/)?.[1];
  const quoi = glisse(macro ?? 'tikz');
  return `${doc}-${quoi}-${condense(s + '\0' + contenu).slice(0, 8)}`;
}

/**
 * Les figures de tous les fichiers Markdown donnés, dédoublonnées par contenu.
 * Chaque figure garde le document où elle a été vue la première fois, et la
 * liste de tous ceux qui l'emploient.
 */
export function recolter(fichiers) {
  const parContenu = new Map();
  for (const f of fichiers) {
    const brut = fs.readFileSync(f, 'utf8');
    const corps = brut.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
    const relatif = path.relative(racine, path.resolve(f));
    for (const contenu of figuresDe(analyser(corps))) {
      const vue = parContenu.get(contenu);
      if (vue) {
        if (!vue.employee.includes(relatif)) vue.employee.push(relatif);
      } else {
        parContenu.set(contenu, { contenu, origine: relatif, employee: [relatif] });
      }
    }
  }
  return [...parContenu.values()];
}

const echapperXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Glisse la provenance dans le SVG, juste après la balise ouvrante.
 * On passe par <title> et <desc> plutôt qu'un commentaire XML : le LaTeX des
 * figures est plein de « -- » (les tracés TikZ), interdits dans un commentaire.
 */
function signer(svg, fig) {
  const entete =
    `<title>${echapperXml(fig.origine)} — ${echapperXml(fig.contenu.match(/\\([a-zA-Z]+)/)?.[1] ?? 'tikz')}</title>\n` +
    `<desc>Figure engendrée par tools/figures.mjs — ne pas modifier à la main.\n` +
    `Employée par : ${echapperXml(fig.employee.join(', '))}\n\n` +
    `Source LaTeX :\n${echapperXml(fig.contenu)}\n</desc>\n`;
  return svg.replace(/(<svg\b[^>]*>)/, `$1\n${entete}`);
}

/**
 * Produit les SVG manquants dans `dossier`.
 * Renvoie la table { contenu → nom de fichier } pour que le générateur HTML
 * sache quoi référencer.
 */
export function produire(figures, dossier, { tectonic } = {}) {
  fs.mkdirSync(dossier, { recursive: true });
  const s = socle();
  const table = new Map(figures.map((f) => [f.contenu, nomFigure(f, s)]));

  const manquantes = figures.filter(
    (f) => !fs.existsSync(path.join(dossier, `${table.get(f.contenu)}.svg`))
  );
  if (!manquantes.length) return { table, produites: 0, reprises: figures.length };

  const tex = [
    '% Fichier engendré par tools/figures.mjs — ne pas modifier à la main.',
    '\\documentclass{fiche}',
    // tightpage rogne chaque page au trait près ; sans lui on obtiendrait
    // trente-six A4 avec une figure perdue en haut à gauche.
    '\\usepackage[active,tightpage]{preview}',
    '\\begin{document}',
    ...manquantes.flatMap((f) => ['\\begin{preview}', f.contenu, '\\end{preview}']),
    '\\end{document}',
  ].join('\n');

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'figures-'));
  const source = path.join(tmp, 'figures.tex');
  fs.writeFileSync(source, tex);

  const bin = tectonic || process.env.TECTONIC || path.join(os.homedir(), '.local/bin/tectonic');
  execFileSync(
    bin,
    ['-X', 'compile', source, '--outdir', tmp, '-Z', `search-path=${path.join(racine, 'latex')}`],
    { stdio: 'pipe' }
  );

  const pdf = path.join(tmp, 'figures.pdf');

  // L'appariement page ↔ figure est positionnel : si preview rendait deux
  // pages pour une figure, ou aucune, tout le lot glisserait d'un cran et
  // chaque fiche afficherait la figure de la suivante. Le décalage serait
  // parfaitement silencieux, d'où cette vérification.
  const pages = Number(
    execFileSync('pdfinfo', [pdf], { encoding: 'utf8' }).match(/^Pages:\s+(\d+)/m)?.[1] ?? 0
  );
  if (pages !== manquantes.length) {
    fs.rmSync(tmp, { recursive: true, force: true });
    throw new Error(
      `figures : ${manquantes.length} figures compilées mais ${pages} pages produites — ` +
        `l'appariement serait décalé. Vérifier qu'aucune figure n'est vide ni multi-pages.`
    );
  }

  manquantes.forEach((f, i) => {
    const cible = path.join(dossier, `${table.get(f.contenu)}.svg`);
    execFileSync('pdftocairo', ['-svg', '-f', String(i + 1), '-l', String(i + 1), pdf, cible]);
    fs.writeFileSync(cible, signer(fs.readFileSync(cible, 'utf8'), f));
  });

  fs.rmSync(tmp, { recursive: true, force: true });
  return { table, produites: manquantes.length, reprises: figures.length - manquantes.length };
}
