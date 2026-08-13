#!/usr/bin/env node
/**
 * Contrôle des PDF produits — ce que la compilation ne dit pas.
 *
 *   node tools/verifier.mjs pdf/*.pdf
 *   npm run check
 *
 * Tectonic peut réussir en laissant passer des défauts silencieux : un renvoi
 * non résolu, une police non embarquée, ou des commandes LaTeX recrachées
 * telles quelles dans les signets du PDF — ce dernier cas ne se voit que dans
 * le panneau de navigation d'un lecteur, jamais à l'impression.
 *
 * S'appuie uniquement sur poppler (pdfinfo, pdftotext, pdffonts, pdftohtml),
 * déjà nécessaire au journal de build.sh.
 */

import { execFileSync } from 'node:child_process';

const fichiers = process.argv.slice(2);
if (!fichiers.length) {
  console.error('usage: verifier.mjs <fichier.pdf…>');
  process.exit(1);
}

const lire = (cmd, args) => {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', maxBuffer: 64e6 });
  } catch (e) {
    return e.stdout ?? '';
  }
};

// Ce qu'on ne veut jamais voir dans un signet : des restes d'expansion LaTeX.
// hyperref écrit les titres en texte pur ; toute commande qui n'a pas été
// neutralisée par \pdfstringdefDisableCommands finit lisible ici.
const SIGNET_SUSPECT = /color push|color pop|towidthheight|\\[a-zA-Z]+|rgb \d/;

let defauts = 0;
const signaler = (fichier, quoi, detail) => {
  defauts++;
  console.log(`  ✗ ${fichier.padEnd(34)} ${quoi}`);
  if (detail) console.log(`      ${detail}`);
};

for (const f of fichiers) {
  const infos = lire('pdfinfo', [f]);
  const pages = Number(infos.match(/^Pages:\s+(\d+)/m)?.[1] ?? 0);
  if (!pages) {
    signaler(f, 'illisible ou vide');
    continue;
  }

  const ennuis = [];

  // 1. Renvois non résolus : un \ref ou \pageref que LaTeX n'a jamais comblé.
  const texte = lire('pdftotext', [f, '-']);
  const nonResolus = (texte.match(/\?\?/g) ?? []).length;
  if (nonResolus) ennuis.push([`${nonResolus} renvoi(s) non résolu(s) « ?? »`, null]);

  // 2. Polices non embarquées : le PDF ne s'afficherait pas pareil ailleurs.
  // Les colonnes de pdffonts glissent dès qu'un nom de police est long : on
  // compte donc depuis la fin, où « emb sub uni object ID » est régulier.
  const polices = lire('pdffonts', [f])
    .split('\n')
    .slice(2)
    .filter((l) => l.trim())
    .filter((l) => {
      const champs = l.trim().split(/\s+/);
      return champs.length >= 5 && champs[champs.length - 5] === 'no';
    });
  if (polices.length)
    ennuis.push([`${polices.length} police(s) non embarquée(s)`, polices[0].trim()]);

  // 3. Signets pollués par des commandes LaTeX.
  const signets = [...lire('pdftohtml', ['-stdout', '-xml', '-i', f]).matchAll(/<item[^>]*>([^<]*)<\/item>/g)]
    .map((m) => m[1])
    .filter((t) => SIGNET_SUSPECT.test(t));
  if (signets.length)
    ennuis.push([`${signets.length} signet(s) pollué(s)`, `« ${signets[0].slice(0, 70)}… »`]);

  if (ennuis.length) for (const [quoi, detail] of ennuis) signaler(f, quoi, detail);
  else console.log(`  ✓ ${f.padEnd(34)} ${String(pages).padStart(3)} p.`);
}

console.log();
if (defauts) {
  console.log(`${defauts} défaut(s) — voir ci-dessus.`);
  process.exit(1);
}
console.log(`${fichiers.length} PDF vérifiés, rien à signaler.`);
