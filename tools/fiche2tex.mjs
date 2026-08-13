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
 *   ```tikz … ```                     figure TikZ écrite à la main, centrée
 *   ```latex … ```                    LaTeX brut, transmis tel quel
 *   !saut                              saut de page
 *   [[5e]]                             pastille de niveau
 *   ->                                 flèche
 *   6e 5e 4e 3e                        exposant « e » automatique
 *   // commentaire                     absent du PDF
 */

import fs from 'node:fs';
import * as yaml from 'js-yaml';
import { formaterDuree } from './duree.mjs';
import { analyser } from './balisage.mjs';

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
  // Aucune police du document n'a U+2714 : on passe par la classe.
  s = s.replace(/[✔✓]/g, '\\coche{}');
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
/* ------------------------------------------------------------------ *
 * Émission du LaTeX depuis l'arbre de balisage
 * ------------------------------------------------------------------ */
function compiler(texte) {
  return emettre(analyser(texte));
}

function emettre(noeuds) {
  const out = [];
  for (const n of noeuds) {
    switch (n.t) {
      case 'vide':
        out.push('');
        break;

      case 'titre':
        out.push(`\\${n.niveau === 2 ? 'section' : 'subsection'}{${enLigne(n.texte)}}`);
        break;

      case 'encadre':
        out.push(`\\begin{${n.genre}}${n.titre ? `[${enLigne(n.titre)}]` : ''}`);
        out.push(emettre(n.enfants).join('\n').trim());
        out.push(`\\end{${n.genre}}`);
        break;

      case 'liste': {
        const env = n.numerotee ? 'enumerate' : 'itemize';
        const opts = n.numerotee ? '[leftmargin=6mm,label=\\textbf{\\arabic*.}]' : '';
        out.push(`\\begin{${env}}${opts}`);
        for (const it of n.items) out.push(`  \\item ${enLigne(it)}`);
        out.push(`\\end{${env}}`);
        break;
      }

      case 'tableau': {
        const spec = n.colonnes
          ? n.colonnes.startsWith('@{}')
            ? n.colonnes
            : `@{}${n.colonnes}@{}`
          : `@{}${n.entete.map(() => 'Y').join(' ')}@{}`;
        out.push(`\\begin{tableaufiche}{${spec}}`);
        out.push(
          `\\ligneentete ${n.entete.map((c) => `\\entetecell{${enLigne(c)}}`).join(' & ')}\\\\`
        );
        for (const r of n.rangees) out.push(`${r.map(enLigne).join(' & ')}\\\\`);
        out.push('\\end{tableaufiche}');
        break;
      }

      case 'fig':
        out.push('\\begin{center}', n.macro, '\\end{center}');
        break;

      // Le bloc TikZ est centré ; le bloc LaTeX brut est transmis tel quel.
      case 'brut':
        if (n.genre === 'tikz') out.push('\\begin{center}', ...n.lignes, '\\end{center}');
        else out.push(...n.lignes);
        break;

      case 'saut':
        out.push('\\clearpage');
        break;

      case 'maths':
        out.push(`\\[${n.lignes.join('\n')}\\]`);
        break;

      case 'para':
        out.push(enLigne(n.texte));
        break;
    }
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
pousser(`\\duree{${enLigne(formaterDuree(meta.duree))}}`);
pousser(`\\domaine{${enLigne(meta.domaine)}}`);

// Nom court du pied de page. À défaut d'être donné, on le fabrique à partir
// du surtitre : « Fiche 1 · Nombres et calculs » donne l'étiquette « Fiche 1 »,
// qu'on recolle au titre réel de la fiche.
const nomcourt =
  meta.nomcourt ??
  (meta.surtitre?.includes('·')
    ? `${meta.surtitre.split('·')[0].trim()} · ${meta.titre}`
    : meta.titre);
pousser(`\\nomcourt{${enLigne(nomcourt)}}`);
pousser(`\\versiondoc{${txt(meta.version ?? '1.0')}}`);
if (meta.licence) pousser(`\\licencedoc{${enLigne(meta.licence)}}`);
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
