#!/usr/bin/env node
/**
 * Assemble le site — troisième sortie des mêmes sources, après le PDF séparé
 * et le classeur relié.
 *
 *   node tools/site.mjs [dossier de sortie]      (défaut : site/)
 *
 * Ce que le site fait mieux que le PDF, et qui justifie qu'il existe :
 *
 *   · il se lit **au doigt** — une colonne, rien qui déborde, des cibles
 *     larges ;
 *   · les QR codes deviennent des **liens** — on ne scanne pas l'écran qu'on
 *     tient ;
 *   · les corrigés du recueil se **replient** sous leur énoncé, au lieu de
 *     vivre dans un second document qu'il faut ouvrir en parallèle ;
 *   · il fonctionne **hors ligne** une fois visité.
 *
 * Ce que le PDF fait mieux, et qu'on ne cherche donc pas à imiter : s'imprimer.
 * Chaque page renvoie vers son PDF dans la dernière release.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { contexte, base as baseDe } from './sommaire.mjs';
import { formaterDuree } from './duree.mjs';
import { recolter, produire } from './figures.mjs';
import { versHtml, enLigne, niveaux } from './fiche2html.mjs';
import * as yaml from 'js-yaml';
import crypto from 'node:crypto';

const ici = path.dirname(fileURLToPath(import.meta.url));
const racine = path.resolve(ici, '..');
const sortie = path.resolve(process.argv[2] ?? path.join(racine, 'site'));

const paquet = JSON.parse(fs.readFileSync(path.join(racine, 'package.json'), 'utf8'));
const DEPOT = paquet.homepage ?? '';
const SITE = 'Maths au collège';
const conf = yaml.load(fs.readFileSync(path.join(racine, 'design.yaml'), 'utf8'));
const ACCENT = `#${conf.couleurs.accent}`;
const PDF = (base) => `${DEPOT}/releases/latest/download/${base}.pdf`;

const ctx = contexte(path.join(racine, 'fiches'), path.join(racine, 'problemes'));

/* ------------------------------------------------------------------ *
 * Le gabarit d'une page
 * ------------------------------------------------------------------ */
const echapperAttr = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function page({ titre, description, corps, plan = '', fil, pdf, accueil = false }) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${echapperAttr(titre === SITE ? titre : `${titre} · ${SITE}`)}</title>
<meta name="description" content="${echapperAttr(description ?? '')}">
<meta name="theme-color" content="${ACCENT}">
<link rel="manifest" href="manifest.json">
<link rel="stylesheet" href="design.css">
<link rel="stylesheet" href="style.css">
</head>
<body>
${accueil ? '' : `<nav><a href="index.html">← Toutes les fiches</a>${fil ? ` <span class="fil">· ${fil}</span>` : ''}</nav>`}
<main class="page${plan ? ' page--plan' : ''}">
${plan}
<div class="corps">
${corps}
${pdf ? `<p><a class="impression" href="${pdf}">⬇ Version imprimable (PDF)</a></p>` : ''}
</div>
</main>
<footer class="page">
<p>Contenu sous licence <a href="${DEPOT}/blob/main/LICENSE-CONTENU.md">CC BY-SA 4.0</a> ·
chaîne de production sous licence MIT · <a href="${DEPOT}">sources sur GitHub</a></p>
</footer>
<script>
// Le seul script du site, et il ne sert qu'à une chose : rendre les pages
// déjà visitées lisibles sans réseau.
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
</script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ *
 * Figures
 * ------------------------------------------------------------------ */
const sources = [
  ...ctx.fiches.map((f) => path.join(racine, 'fiches', f.fichier)),
  ...ctx.problemes.map((d) => path.join(racine, 'problemes', d.fichier)),
  ...(ctx.recueil
    ? fs
        .readdirSync(ctx.recueil.dossier)
        .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
        .sort()
        .map((f) => path.join(ctx.recueil.dossier, f))
    : []),
];

fs.mkdirSync(sortie, { recursive: true });
const rf = produire(recolter(sources), path.join(sortie, 'figures'));
const figures = rf.table;
console.log(
  `figures : ${rf.produites} produites, ${rf.reprises} du cache` +
    (rf.purges ? `, ${rf.purges} périmées supprimées` : '')
);

/* ------------------------------------------------------------------ *
 * Vignettes des vidéos
 *
 * Servies depuis le site, jamais depuis YouTube : la page ne déclenche aucune
 * requête vers un tiers, et les cartes restent visibles hors ligne. Une
 * vignette qu'on n'arrive pas à récupérer n'est pas une erreur — la carte
 * retombe simplement sur sa forme textuelle.
 * ------------------------------------------------------------------ */
const dossierVignettes = path.join(sortie, 'vignettes');
fs.mkdirSync(dossierVignettes, { recursive: true });

const idsVideos = [
  ...new Set(
    [...ctx.fiches, ...ctx.problemes].flatMap((d) => (d.videos ?? []).map((v) => String(v.id)))
  ),
];
const vignettes = new Set();
let telechargees = 0;
for (const id of idsVideos) {
  const cible = path.join(dossierVignettes, `${id}.jpg`);
  if (fs.existsSync(cible)) {
    vignettes.add(id);
    continue;
  }
  try {
    const r = await fetch(`https://i.ytimg.com/vi/${id}/mqdefault.jpg`);
    if (!r.ok) throw new Error(String(r.status));
    fs.writeFileSync(cible, Buffer.from(await r.arrayBuffer()));
    vignettes.add(id);
    telechargees++;
  } catch {
    // tant pis : la carte reste en texte seul
  }
}
// Les vignettes de vidéos retirées d'une fiche n'ont plus lieu d'être.
for (const f of fs.readdirSync(dossierVignettes)) {
  if (f.endsWith('.jpg') && !vignettes.has(f.slice(0, -4))) {
    fs.rmSync(path.join(dossierVignettes, f));
  }
}
console.log(
  `vignettes : ${telechargees} téléchargées, ${vignettes.size - telechargees} du cache` +
    (idsVideos.length - vignettes.size ? `, ${idsVideos.length - vignettes.size} indisponibles` : '')
);

/* ------------------------------------------------------------------ *
 * Les documents : une page chacun
 * ------------------------------------------------------------------ */
const manquantes = [];

for (const [dossier, docs] of [
  ['fiches', ctx.fiches],
  ['problemes', ctx.problemes],
]) {
  for (const d of docs) {
    const b = baseDe(d);
    const r = versHtml(path.join(racine, dossier, d.fichier), { figures, vignettes });
    manquantes.push(...r.manquantes);
    fs.writeFileSync(
      path.join(sortie, `${b}.html`),
      page({
        titre: d.titre,
        description: d.accroche,
        corps: r.html,
        plan: r.plan,
        fil: d.surtitre ? enLigne(d.surtitre) : '',
        pdf: PDF(b),
      })
    );
  }
}

/* ------------------------------------------------------------------ *
 * Le recueil : une seule page, corrigés repliés sous leur énoncé
 *
 * C'est le seul endroit où le site s'écarte franchement du PDF, et c'est
 * délibéré : sur papier, énoncés et corrigés doivent être séparés pour qu'on
 * ne les lise pas avant d'avoir cherché ; sur un écran, un <details> fermé
 * remplit exactement le même office, sans obliger à jongler entre deux
 * documents.
 * ------------------------------------------------------------------ */
if (ctx.recueil) {
  const dossier = ctx.recueil.dossier;
  const fichiers = fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort();

  const l = [];
  l.push('<header class="tete">');
  l.push(`<p class="surtitre">${enLigne(ctx.recueil.surtitre ?? '')}</p>`);
  l.push(`<h1>${enLigne(ctx.recueil.titre)}</h1>`);
  l.push(`<p class="accroche">${enLigne(ctx.recueil.accroche ?? '')}</p>`);
  l.push('</header>');

  let typeCourant = null;
  fichiers.forEach((f, i) => {
    const brut = fs.readFileSync(path.join(dossier, f), 'utf8');
    const m = brut.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    const meta = yaml.load(m[1]) ?? {};
    const corps = m[2];
    const coupe = corps.search(/^:::\s*solution\b/m);
    const enonce = coupe === -1 ? corps : corps.slice(0, coupe);
    const solution = coupe === -1 ? '' : corps.slice(coupe);

    if (meta.type && meta.type !== typeCourant) {
      typeCourant = meta.type;
      const t = ctx.recueil.types?.[typeCourant];
      if (t) {
        l.push(`<h2>${enLigne(t.titre)}</h2>`);
        if (t.intro) l.push(`<p>${enLigne(t.intro)}</p>`);
      }
    }

    const d = meta.difficulte ?? 3;
    l.push('<article class="probleme">');
    l.push(`<h3>${i + 1}. ${enLigne(meta.titre)}</h3>`);
    l.push(
      `<p class="doc-meta">difficulté ${d}/5 · ${enLigne(formaterDuree(meta.duree))}` +
        `${meta.notions?.length ? ` · ${enLigne(meta.notions.join(' · '))}` : ''}</p>`
    );
    l.push(rendreFragment(enonce));
    if (solution) {
      l.push('<details class="corrige"><summary>Voir le corrigé</summary>');
      l.push(rendreFragment(solution));
      l.push('</details>');
    }
    l.push('</article>');
  });

  fs.writeFileSync(
    path.join(sortie, 'recueil.html'),
    page({
      titre: ctx.recueil.titre,
      description: ctx.recueil.accroche,
      corps: l.join('\n'),
      fil: `${fichiers.length} problèmes`,
      pdf: PDF('recueil'),
    })
  );
}

/**
 * Rend un fragment de Markdown sans en-tête YAML, en réutilisant le
 * générateur de fiches — qui en attend un. On lui en fabrique un minimal
 * plutôt que de dédoubler l'émetteur.
 */
function rendreFragment(markdown) {
  const tmp = path.join(sortie, '.fragment.md');
  fs.writeFileSync(tmp, `---\ntitre: x\n---\n${markdown}\n`);
  const r = versHtml(tmp, { figures });
  manquantes.push(...r.manquantes);
  fs.rmSync(tmp, { force: true });
  // On retire l'en-tête fabriqué : seul le corps nous intéresse.
  return r.html.replace(/^[\s\S]*?<\/header>\n?/, '');
}

/* ------------------------------------------------------------------ *
 * L'index
 * ------------------------------------------------------------------ */
const lien = (b, titre, meta) =>
  `<a class="doc" href="${b}.html"><span class="doc-titre">${titre}</span>` +
  `<span class="doc-meta">${meta}</span></a>`;

const idx = [];
idx.push('<header class="tete">');
idx.push('<p class="surtitre">Par où commencer</p>');
idx.push('<h1>Maths au collège</h1>');
idx.push(
  '<p class="accroche">Fiches de révision, séances chronométrées et problèmes, ' +
    `de la ${niveaux(['6e'])} à la ${niveaux(['3e'])}. Toutes les leçons ne se valent pas : ` +
    'celles-ci sont rangées par ce qu\'elles rapportent à réviser.</p>'
);
idx.push('</header>');

const nombres = ['aucune', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];
const titrePrio = (n, combien) =>
  ({
    3: `Les ${nombres[combien] ?? combien} leçons qui portent tout le reste`,
    2: 'À maîtriser ensuite',
    1: 'Si le temps le permet',
  })[n];

for (const prio of [3, 2, 1]) {
  const lot = ctx.fiches.filter((f) => (f.priorite ?? 2) === prio);
  if (!lot.length) continue;
  idx.push(`<h2>${titrePrio(prio, lot.length)}</h2>`);
  idx.push('<div class="sommaire">');
  for (const f of lot) {
    idx.push(
      lien(
        baseDe(f),
        `<span class="doc-num">${f.fichier.slice(0, 2)}</span>${enLigne(f.titre)}`,
        `${niveaux(f.niveaux)} · ${enLigne(formaterDuree(f.duree))} · ${enLigne(f.pourquoi ?? '')}`
      )
    );
  }
  idx.push('</div>');
}

const estCorrige = (d) => /-corrige\.md$/.test(d.fichier);
const enonces = ctx.problemes.filter((d) => !estCorrige(d));
if (enonces.length || ctx.recueil) {
  idx.push("<h2>S'entraîner</h2>");
  idx.push('<div class="sommaire">');
  for (const d of enonces) {
    const c = ctx.problemes.find((x) => x.fichier === d.fichier.replace(/\.md$/, '-corrige.md'));
    idx.push('<div class="doc-groupe">');
    idx.push(
      lien(baseDe(d), enLigne(d.titre), `${niveaux(d.niveaux)} · ${enLigne(formaterDuree(d.duree))}`)
    );
    if (c) idx.push(`<a class="doc-annexe" href="${baseDe(c)}.html">Voir le corrigé →</a>`);
    idx.push('</div>');
  }
  if (ctx.recueil) {
    idx.push(
      lien(
        'recueil',
        enLigne(ctx.recueil.titre),
        `${niveaux(ctx.recueil.niveaux)} · ${enLigne(formaterDuree(ctx.recueil.duree))} · ` +
          `${ctx.recueil.nombre} problèmes, corrigés repliés`
      )
    );
  }
  idx.push('</div>');
}

idx.push('<h2>Tout imprimer</h2>');
idx.push(
  `<p>Le classeur entier — ${ctx.fiches.length} fiches, les séances et le recueil — ` +
    `en un seul PDF paginé, ou fiche par fiche depuis chaque page.</p>`
);
idx.push(`<p><a class="impression" href="${PDF('math-college-fr-complet')}">⬇ Le classeur complet (PDF)</a></p>`);

fs.writeFileSync(
  path.join(sortie, 'index.html'),
  page({
    titre: SITE,
    accueil: true,
    description: `Fiches de révision de mathématiques 6e à 3e : ${ctx.fiches.length} fiches, ${enonces.length} séances chronométrées et un recueil de problèmes.`,
    corps: idx.join('\n'),
  })
);

/* ------------------------------------------------------------------ *
 * Feuilles de style et ressources
 * ------------------------------------------------------------------ */
execFileSync('node', [path.join(ici, 'design.mjs'), '--css', path.join(sortie, 'design.css')], {
  stdio: 'pipe',
});
fs.copyFileSync(path.join(racine, 'web', 'style.css'), path.join(sortie, 'style.css'));

/* ------------------------------------------------------------------ *
 * Hors ligne
 *
 * Le cas d'usage est celui d'un élève dans les transports : la page doit
 * s'ouvrir sans réseau. Un service worker met tout le site en cache à la
 * première visite ; le nom du cache porte l'empreinte du contenu, si bien
 * qu'une nouvelle version remplace l'ancienne au lieu de coexister avec elle.
 * ------------------------------------------------------------------ */

// L'icône reprend la jauge de priorité, signe le plus reconnaissable du
// projet, dans la couleur d'accent de design.yaml.
fs.writeFileSync(
  path.join(sortie, 'icon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="104" fill="${ACCENT}"/>
  <circle cx="146" cy="256" r="44" fill="#fff"/>
  <circle cx="256" cy="256" r="44" fill="#fff"/>
  <circle cx="366" cy="256" r="44" fill="#fff"/>
</svg>
`
);

fs.writeFileSync(
  path.join(sortie, 'manifest.json'),
  JSON.stringify(
    {
      name: `${SITE} — fiches de révision`,
      short_name: 'Maths collège',
      description: `Fiches de révision de mathématiques de la 6e à la 3e.`,
      start_url: 'index.html',
      scope: './',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: ACCENT,
      lang: 'fr',
      icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
    },
    null,
    2
  ) + '\n'
);

const aCacher = [];
(function parcourir(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const complet = path.join(d, e.name);
    if (e.isDirectory()) parcourir(complet);
    else if (e.name !== 'sw.js') aCacher.push(path.relative(sortie, complet).split(path.sep).join('/'));
  }
})(sortie);
aCacher.sort();

const empreinte = crypto
  .createHash('sha1')
  .update(aCacher.map((f) => fs.readFileSync(path.join(sortie, f))).reduce((a, b) => Buffer.concat([a, b]), Buffer.alloc(0)))
  .digest('hex')
  .slice(0, 12);

fs.writeFileSync(
  path.join(sortie, 'sw.js'),
  `// Fichier engendré par tools/site.mjs — ne pas modifier à la main.
const CACHE = 'maths-college-${empreinte}';
const FICHIERS = ${JSON.stringify(aCacher, null, 0)};

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

// Une nouvelle version efface les précédentes : deux caches concurrents
// serviraient un site à moitié à jour.
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Le cache d'abord : le contenu ne change qu'entre deux versions, et la
// lecture doit rester instantanée même sans réseau.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
`
);
console.log(`hors ligne : ${aCacher.length} fichiers en cache (${empreinte})`);

const pages = fs.readdirSync(sortie).filter((f) => f.endsWith('.html'));
console.log(`site : ${pages.length} pages dans ${path.relative(racine, sortie)}/`);
if (manquantes.length) {
  console.error(`\n⚠ ${manquantes.length} figure(s) sans SVG :`);
  for (const m of [...new Set(manquantes)]) console.error(`   ${m}`);
  process.exit(1);
}
