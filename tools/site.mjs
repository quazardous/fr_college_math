#!/usr/bin/env node
/**
 * Assemble le site — troisième sortie des mêmes sources, après le PDF séparé
 * et le classeur relié.
 *
 *   node tools/site.mjs [dossier de sortie]   (défaut : build/site/)
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
import { ORDRE_NIVEAUX, contexte, base as baseDe } from './sommaire.mjs';
import { formaterDuree } from './duree.mjs';
import { recolter, produire } from './figures.mjs';
import { lexique, lireProblemes, compareFr } from './lexique.mjs';
import { versHtml, enLigne, niveaux } from './fiche2html.mjs';
import * as yaml from 'js-yaml';
import crypto from 'node:crypto';

const ici = path.dirname(fileURLToPath(import.meta.url));
const racine = path.resolve(ici, '..');
const sortie = path.resolve(process.argv[2] ?? path.join(racine, 'build', 'site'));

const paquet = JSON.parse(fs.readFileSync(path.join(racine, 'package.json'), 'utf8'));
const DEPOT = paquet.homepage ?? '';
const SITE = 'Maths au collège';
const conf = yaml.load(fs.readFileSync(path.join(racine, 'design.yaml'), 'utf8'));
const ACCENT = `#${conf.couleurs.accent}`;
const PDF = (base) => `${DEPOT}/releases/latest/download/${base}.pdf`;

const ctx = contexte(
  path.join(racine, 'contenu', 'fiches'),
  path.join(racine, 'contenu', 'seances'),
  path.join(racine, 'contenu', 'problemes')
);

/* ------------------------------------------------------------------ *
 * Feuilles de style et scripts
 *
 * Écrits d'abord, pour que leur empreinte entre dans les URL des pages :
 * « style.css?v=3f2a1b ». Sans elle, un navigateur qui a déjà vu le site
 * ressert obstinément l'ancienne feuille après un déploiement — et, en
 * développement, transforme chaque retouche en énigme.
 * ------------------------------------------------------------------ */
execFileSync('node', [path.join(ici, 'design.mjs'), '--css', path.join(sortie, 'design.css')], {
  stdio: 'pipe',
});
for (const f of ['style.css', 'recherche.js']) {
  fs.copyFileSync(path.join(racine, 'web', f), path.join(sortie, f));
}

const empreintes = {};
for (const f of ['design.css', 'style.css', 'recherche.js']) {
  empreintes[f] = crypto
    .createHash('sha1')
    .update(fs.readFileSync(path.join(sortie, f)))
    .digest('hex')
    .slice(0, 8);
}
/** L'URL d'une ressource, marquée de l'empreinte de son contenu. */
const res = (f) => `${f}?v=${empreintes[f]}`;

// Le lexique sert à deux endroits — sa propre page, et un renvoi depuis
// l'accueil : il se calcule donc avant l'un comme l'autre.
const entreesLexique = lexique(ctx, lireProblemes(ctx.recueil?.dossier ?? ''));

/* ------------------------------------------------------------------ *
 * Le gabarit d'une page
 * ------------------------------------------------------------------ */
const BURGER =
  '<svg class="burger" viewBox="0 0 18 14" width="18" height="14" aria-hidden="true">' +
  '<rect width="18" height="2"/><rect y="6" width="18" height="2"/><rect y="12" width="18" height="2"/></svg>';

const CROIX =
  '<svg class="burger" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">' +
  '<path d="M1.4 0 8 6.6 14.6 0 16 1.4 9.4 8l6.6 6.6-1.4 1.4L8 9.4 1.4 16 0 14.6 6.6 8 0 1.4Z"/></svg>';

const CHEVRON =
  '<svg class="chevron" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">' +
  '<path d="M4 1 9 6l-5 5" fill="none" stroke="currentColor" stroke-width="2"/></svg>';

/**
 * La liste de navigation — une seule, que la barre latérale des écrans larges
 * et le menu déroulant des écrans étroits habillent différemment. Deux
 * fabrications séparées finiraient par diverger, et c'est déjà arrivé.
 *
 * Un item peut porter des sous-items : ils se déplient sous un chevron posé à
 * droite de la ligne, le lien restant cliquable à côté. Imbriquer l'un dans
 * l'autre rendrait l'une des deux cibles inatteignable au doigt.
 */
const listeNavigation = (items) =>
  '<ol class="nav-liste">' +
  items
    .map((x) => {
      const lien = `<a class="nav-lien" href="#${x.id}">${x.texte}</a>`;
      if (!x.sous?.length) return `<li class="nav-ligne">${lien}</li>`;
      return (
        `<li class="nav-ligne">${lien}` +
        `<details class="nav-sous"><summary aria-label="Sections">${CHEVRON}</summary><ol>` +
        x.sous.map((y) => `<li><a href="#${y.id}">${y.texte}</a></li>`).join('') +
        '</ol></details></li>'
      );
    })
    .join('') +
  '</ol>';

const barreLaterale = (titre, items) =>
  items.length
    ? `<aside class="plan"><p class="plan-titre">${titre}</p>${listeNavigation(items)}</aside>`
    : '';

const menuDeroulant = (titre, items) =>
  items.length
    ? `<details class="menu"><summary>` +
      `<span class="menu-etat menu-ouvrir">${BURGER}<span>${titre}</span></span>` +
      `<span class="menu-etat menu-fermer">${CROIX}<span>Fermer</span></span>` +
      `</summary>${listeNavigation(items)}</details>`
    : '';

const echapperAttr = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function page({ titre, description, corps, plan = '', menu = '', fil, pdf, accueil = false, scripts = '' }) {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${echapperAttr(titre === SITE ? titre : `${titre} · ${SITE}`)}</title>
<meta name="description" content="${echapperAttr(description ?? '')}">
<meta name="theme-color" content="${ACCENT}">
<link rel="manifest" href="manifest.json">
<link rel="stylesheet" href="${res('design.css')}">
<link rel="stylesheet" href="${res('style.css')}">
</head>
<body>
${accueil ? '' : `<nav>${menu}<a href="index.html">← Toutes les fiches</a>${fil ? ` <span class="fil">· ${fil}</span>` : ''}</nav>`}
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
${scripts}
<script>
// Un lien du menu referme le menu : en écran étroit il couvre toute la page,
// et le laisser ouvert masquerait justement ce qu'on vient d'atteindre.
document.addEventListener('click', (e) => {
  const a = e.target.closest('.menu a');
  if (a) a.closest('.menu').open = false;
});

// Le hors ligne, et rien d'autre. Pas en développement : un cache qui sert
// obstinément la version précédente transforme chaque retouche de style en
// énigme. La production est en https, le serveur local en http — la
// distinction suffit.
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js');
}
</script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ *
 * Figures
 * ------------------------------------------------------------------ */
const sources = [
  ...ctx.fiches.map((f) => path.join(racine, 'contenu', 'fiches', f.fichier)),
  ...ctx.problemes.map((d) => path.join(racine, 'contenu', 'seances', d.fichier)),
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

const documents = [];
let fragments = 0; // pour préfixer les compteurs de chaque problème du recueil

const rangSeance = (d) => {
  const n = (Array.isArray(d.niveaux) ? d.niveaux : [d.niveaux]).map(String);
  const i = ORDRE_NIVEAUX.findIndex((x) => n.includes(x));
  return [i === -1 ? 99 : i, /-corrige\.md$/.test(d.fichier) ? 1 : 0];
};
const seances = [...ctx.problemes].sort((a, b) => {
  const [ra, ca] = rangSeance(a);
  const [rb, cb] = rangSeance(b);
  return ra - rb || ca - cb || a.fichier.localeCompare(b.fichier);
});

for (const [dossier, docs] of [
  ['contenu/fiches', ctx.fiches],
  ['contenu/seances', seances],
]) {
  for (const d of docs) {
    const b = baseDe(d);
    const r = versHtml(path.join(racine, dossier, d.fichier), { figures, vignettes, prefixe: b });
    manquantes.push(...r.manquantes);

    // Le renvoi entre un énoncé et son corrigé appartient à la page, pas au
    // sommaire : c'est en finissant la séance qu'on veut le corrigé.
    const corrige = docs.find((x) => x.fichier === d.fichier.replace(/\.md$/, '-corrige.md'));
    const enonce = /-corrige\.md$/.test(d.fichier)
      ? docs.find((x) => x.fichier === d.fichier.replace(/-corrige\.md$/, '.md'))
      : null;
    const renvoi = corrige
      ? `<p><a class="impression" href="${baseDe(corrige)}.html">Voir le corrigé →</a></p>`
      : enonce
        ? `<p><a class="impression" href="${baseDe(enonce)}.html">← Revenir à l'énoncé</a></p>`
        : '';
    documents.push({
      base: b,
      titre: d.titre,
      numero: /^\d\d-/.test(b) ? b.slice(0, 2) : '',
      meta: `${niveaux(d.niveaux)} · ${enLigne(formaterDuree(d.duree))}`,
      niv: niveaux(d.niveaux),
      prio: d.priorite ?? 2,
      notions: d.notions ?? [],
      genre: dossier.endsWith('fiches')
        ? 'fiche'
        : /-corrige\.md$/.test(d.fichier)
          ? 'corrige'
          : 'seance',
      duree: enLigne(formaterDuree(d.duree)),
      sections: r.sections,
      html: r.html,
    });
    fs.writeFileSync(
      path.join(sortie, `${b}.html`),
      page({
        titre: d.titre,
        description: d.accroche,
        corps: r.html + renvoi,
        plan: barreLaterale('Dans cette page', r.sections),
        menu: menuDeroulant('Dans cette page', r.sections),
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

  const partiesRecueil = [];
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
        const idPartie = `partie-${typeCourant}`;
        partiesRecueil.push({ id: idPartie, texte: enLigne(t.titre), sous: [] });
        l.push(`<h2 id="${idPartie}">${enLigne(t.titre)}</h2>`);
        if (t.intro) l.push(`<p>${enLigne(t.intro)}</p>`);
      }
    }

    const d = meta.difficulte ?? 3;
    const idPb = `pb-${i + 1}`;
    partiesRecueil.at(-1)?.sous.push({ id: idPb, texte: `${i + 1}. ${enLigne(meta.titre)}` });
    l.push(`<article class="probleme" id="${idPb}">`);
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

  documents.push({
    base: 'recueil',
    titre: ctx.recueil.titre,
    numero: '',
    meta: `${niveaux(ctx.recueil.niveaux)} · ${enLigne(formaterDuree(ctx.recueil.duree))} · ${ctx.recueil.nombre} problèmes`,
    niv: niveaux(ctx.recueil.niveaux),
    prio: ctx.recueil.priorite ?? 3,
    genre: 'recueil',
    duree: enLigne(formaterDuree(ctx.recueil.duree)),
    sections: [],
    html: l.join('\n'),
  });
  fs.writeFileSync(
    path.join(sortie, 'recueil.html'),
    page({
      titre: ctx.recueil.titre,
      description: ctx.recueil.accroche,
      corps: l.join('\n'),
      plan: barreLaterale('Les problèmes', partiesRecueil),
      menu: menuDeroulant('Les problèmes', partiesRecueil),
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
  // Chaque fragment repart de zéro pour ses compteurs : sans préfixe, tous
  // les problèmes du recueil nommeraient leur première figure « fig1 ».
  const r = versHtml(tmp, { figures, prefixe: `r${++fragments}` });
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

// La recherche répond à la question qu'on se pose vraiment : « où est-ce
// qu'on parle de ça ? ». Elle remplace la liste tant qu'on tape.
idx.push('<form class="chercher" role="search" onsubmit="return false">');
// Le lexique se propose là où l'on cherche : à côté du champ, pas dans une
// section plus bas qu'on ne lit qu'après avoir renoncé.
idx.push('<div class="chercher-tete">');
idx.push('<label for="recherche">Chercher une notion</label>');
idx.push('<a class="chercher-lexique" href="lexique.html">(lexique)</a>');
idx.push('</div>');
idx.push('<div class="chercher-champ">');
idx.push(
  '<input type="search" id="recherche" autocomplete="off" ' +
    'placeholder="notation scientifique, Thalès, médiane…">'
);
// La croix du navigateur ne prévient pas toujours qu'on a vidé le champ : on
// pose la nôtre, qui a en outre une cible convenable au doigt.
idx.push(
  '<button type="button" id="effacer" class="effacer" aria-label="Effacer la recherche" hidden>' +
    '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">' +
    '<path d="M1.4 0 8 6.6 14.6 0 16 1.4 9.4 8l6.6 6.6-1.4 1.4L8 9.4 1.4 16 0 14.6 6.6 8 0 1.4Z"/>' +
    '</svg></button>'
);
idx.push('</div>');
idx.push('</form>');
idx.push('<div id="resultats" class="sommaire" hidden></div>');
idx.push('<div id="sommaire">');

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
    idx.push(
      lien(
        baseDe(d),
        enLigne(d.titre),
        `${niveaux(d.niveaux)} · ${enLigne(formaterDuree(d.duree))}` +
          (c ? ' · corrigé inclus' : '')
      )
    );
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
idx.push('</div>');

fs.writeFileSync(
  path.join(sortie, 'index.html'),
  page({
    titre: SITE,
    accueil: true,
    scripts: `<script src="${res('recherche.js')}"></script>`,
    description: `Fiches de révision de mathématiques 6e à 3e : ${ctx.fiches.length} fiches, ${enonces.length} séances chronométrées et un recueil de problèmes.`,
    corps: idx.join('\n'),
  })
);

/* ------------------------------------------------------------------ *
 * Feuilles de style et ressources
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * Le lexique — d'un mot vers la leçon
 *
 * Le sommaire répond à « par où commencer ? », la recherche à « où est-ce
 * qu'on parle de ça ? » quand on sait taper. Le lexique répond à la même
 * question en se parcourant des yeux, et c'est le seul des trois qui existe
 * aussi sur le papier.
 * ------------------------------------------------------------------ */
{
  const l = [];
  l.push('<header class="tete">');
  l.push('<p class="surtitre">Où est-ce qu\'on parle de ça</p>');
  l.push('<h1>Lexique</h1>');
  l.push("<p class=\"accroche\">Un mot, la classe où il est au programme, et la fiche qui l'explique. Les numéros en petit renvoient aux problèmes du recueil, pour s'entraîner ensuite.</p>");
  l.push('</header>');

  let initiale = '';
  for (const e of entreesLexique) {
    const i = e.terme[0].normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
    if (i !== initiale) {
      // Fermer avant d'ouvrir : sans cela on empilait dix-neuf conteneurs
      // multi-colonnes les uns dans les autres, et le moteur de rendu du
      // navigateur y restait bloqué.
      if (initiale) l.push('</div>');
      initiale = i;
      l.push(`<h2 id="lex-${i}">${i}</h2><div class="lexique">`);
    }
    const fiches = e.fiches
      .map((f) => `<a class="lex-fiche" href="${f.base}.html">${f.numero}</a>`)
      .join(' ');
    const pb = e.problemes.length
      ? `<span class="lex-pb"><a href="recueil.html">problèmes ${e.problemes.join(', ')}</a></span>`
      : '';
    l.push(
      `<p class="lex-entree"><span class="lex-terme">${enLigne(e.terme)}</span>` +
        `<span class="lex-ou">${niveaux(e.niveaux)}${fiches}</span>${pb}</p>`
    );
  }
  if (initiale) l.push('</div>');

  const initiales = [
    ...new Set(
      entreesLexique.map((e) => e.terme[0].normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase())
    ),
  ].sort(compareFr);

  fs.writeFileSync(
    path.join(sortie, 'lexique.html'),
    page({
      titre: 'Lexique',
      description: `Les ${entreesLexique.length} notions du corpus et la fiche qui les explique.`,
      corps: l.join('\n'),
      plan: barreLaterale('Alphabet', initiales.map((i) => ({ id: `lex-${i}`, texte: i }))),
      menu: menuDeroulant('Alphabet', initiales.map((i) => ({ id: `lex-${i}`, texte: i }))),
      fil: `${entreesLexique.length} notions`,
      pdf: PDF('00-lexique'),
    })
  );
  console.log(`lexique : ${entreesLexique.length} notions`);
}

/* ------------------------------------------------------------------ *
 * L'index de recherche
 *
 * Découpé par SECTION et non par page : chercher « notation scientifique »
 * doit mener au paragraphe qui en parle, pas seulement à la fiche qui le
 * contient quelque part. On le bâtit depuis le HTML déjà produit — c'est
 * exactement ce que le lecteur verra, sans qu'un second parcours des sources
 * puisse en diverger.
 * ------------------------------------------------------------------ */
const texteNu = (html) =>
  html
    .replace(/<(script|style|math)\b[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Deux tables plutôt qu'une : les métadonnées d'un document — ses niveaux, sa
// priorité — ne sont écrites qu'une fois, et non répétées sur chacune de ses
// sections. L'index reste maigre, ce qui compte pour un site qu'on met en
// cache sur un téléphone.
const idxDocs = [];
const idxSections = [];

for (const d of documents) {
  const rang = idxDocs.length;
  idxDocs.push({
    titre: d.titre,
    numero: d.numero ?? '',
    niv: d.niv ?? '',
    prio: d.prio ?? null,
    genre: d.genre ?? 'fiche',
    duree: d.duree ?? '',
  });

  const morceaux = d.html.split(/<h2 id="([^"]+)"[^>]*>/);
  // Ce qui précède le premier h2 : l'en-tête et son accroche, rattachés au
  // document lui-même.
  // Les notions déclarées rejoignent le texte indexé : « PGCD » doit trouver
  // sa fiche même si le sigle n'y apparaît que deux fois. Elles passent DEVANT
  // le chapeau, et non derrière : la troncature qui suit emportait les
  // dernières, et « équation produit » tombait juste au-delà.
  const chapeau = [
    (d.notions ?? []).join(', '),
    texteNu(morceaux[0]).slice(0, 600),
  ]
    .filter(Boolean)
    .join(' — ');
  if (chapeau) {
    idxSections.push({ d: rang, url: `${d.base}.html`, section: d.titre, texte: chapeau });
  }
  for (let i = 1; i < morceaux.length; i += 2) {
    const id = morceaux[i];
    const suite = morceaux[i + 1] ?? '';
    const titre = texteNu(suite.split('</h2>')[0]);
    const corps = texteNu(suite.split('</h2>').slice(1).join('</h2>'));
    idxSections.push({
      d: rang,
      url: `${d.base}.html#${id}`,
      section: titre || d.titre,
      texte: corps.slice(0, 900),
    });
  }
}

const index = { docs: idxDocs, sections: idxSections };
fs.writeFileSync(path.join(sortie, 'recherche.json'), JSON.stringify(index));
console.log(
  `recherche : ${idxSections.length} sections indexées ` +
    `(${(fs.statSync(path.join(sortie, 'recherche.json')).size / 1024).toFixed(0)} Ko)`
);

/* ------------------------------------------------------------------ *
 * La page unique — un seul fichier HTML, à copier sur une clé
 *
 * Tout le monde n'a pas Internet à la maison. Ce fichier contient l'intégralité
 * du contenu, figures et vignettes comprises : il s'ouvre par un double-clic,
 * depuis une clé USB ou une pièce jointe, et ne demande rien à personne.
 *
 * C'est un actif de release, pas une page du site : il double le contenu, et
 * n'a donc rien à faire dans ce qui est déployé sur Pages.
 * ------------------------------------------------------------------ */

// Les identifiants des SVG doivent être renommés figure par figure. pdftocairo
// nomme ses glyphes « glyph-0-0 » dans chaque fichier : réunis dans un même
// document, tous les <use> pointeraient vers les glyphes de la PREMIÈRE figure,
// et les autres afficheraient n'importe quoi.
let compteurFig = 0;
function incorporerSvg(html) {
  return html.replace(/<img src="figures\/([^"]+)\.svg"[^>]*>/g, (_, nom) => {
    const chemin = path.join(sortie, 'figures', `${nom}.svg`);
    if (!fs.existsSync(chemin)) return '';
    const prefixe = `f${++compteurFig}-`;
    return fs
      .readFileSync(chemin, 'utf8')
      .replace(/<\?xml[^>]*\?>\s*/g, '')
      .replace(/<!DOCTYPE[^>]*>\s*/g, '')
      .replace(/\bid="([^"]+)"/g, (_m, id) => `id="${prefixe}${id}"`)
      .replace(/href="#([^"]+)"/g, (_m, id) => `href="#${prefixe}${id}"`)
      .replace(/url\(#([^)]+)\)/g, (_m, id) => `url(#${prefixe}${id})`)
      .replace(/<svg /, '<svg class="fig-incorporee" ');
  });
}

function incorporerVignettes(html) {
  return html.replace(/<img class="video-vignette" src="vignettes\/([^"]+)\.jpg"/g, (m, id) => {
    const chemin = path.join(sortie, 'vignettes', `${id}.jpg`);
    if (!fs.existsSync(chemin)) return m;
    const b64 = fs.readFileSync(chemin).toString('base64');
    return `<img class="video-vignette" src="data:image/jpeg;base64,${b64}"`;
  });
}

const styles =
  fs.readFileSync(path.join(sortie, 'design.css'), 'utf8') +
  '\n' +
  fs.readFileSync(path.join(sortie, 'style.css'), 'utf8') +
  `
/* Une figure incorporée porte ses dimensions en points : on les borne. */
.fig-incorporee { max-width: 100%; height: auto; }
.doc-separateur { margin: 4rem 0 0; border: 0; border-top: 1px solid var(--c-trait); }
`;

// La page unique reprend la structure du site — bandeau collant, plan latéral,
// grille adaptative — et hérite donc du même CSS. Son plan liste les documents
// plutôt que les sections : à vingt-neuf documents, c'est la bonne échelle.
const itemsUnique = [
  { id: 'haut', texte: '↑ Sommaire' },
  ...documents.map((d) => ({
    id: `doc-${d.base}`,
    texte: `${d.numero ? `${d.numero}. ` : ''}${enLigne(d.titre)}`,
    sous: d.sections ?? [],
  })),
];
const planUnique = barreLaterale('Les documents', itemsUnique);
const menuUnique = menuDeroulant('Les documents', itemsUnique);

const unique = [];
unique.push('<header class="tete" id="haut">');
unique.push('<p class="surtitre">Tout le contenu, hors ligne</p>');
unique.push(`<h1>${SITE}</h1>`);
unique.push(
  `<p class="accroche">Les ${ctx.fiches.length} fiches, les séances et le recueil, ` +
    `réunis dans un seul fichier — figures comprises. Rien à installer, rien à ` +
    `télécharger de plus : il s'ouvre depuis une clé USB comme depuis un disque dur.</p>`
);
unique.push('</header>');
unique.push('<h2 id="sommaire">Sommaire</h2><div class="sommaire">');
for (const d of documents) {
  unique.push(
    `<a class="doc" href="#doc-${d.base}"><span class="doc-titre">` +
      `${d.numero ? `<span class="doc-num">${d.numero}</span>` : ''}${enLigne(d.titre)}</span>` +
      `<span class="doc-meta">${d.meta ?? ''}</span></a>`
  );
}
unique.push('</div>');
for (const d of documents) {
  unique.push('<hr class="doc-separateur">');
  unique.push(`<article id="doc-${d.base}">`);
  unique.push(incorporerVignettes(incorporerSvg(d.html)));
  unique.push('<p class="retour"><a href="#sommaire">↑ Retour au sommaire</a></p>');
  unique.push('</article>');
}

const dossierHtml = path.join(racine, 'build', 'html');
fs.mkdirSync(dossierHtml, { recursive: true });
const cibleUnique = path.join(dossierHtml, 'math-college-fr-hors-ligne.html');
fs.writeFileSync(
  cibleUnique,
  `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${SITE} — tout le contenu, hors ligne</title>
<style>
${styles}
</style>
</head>
<body>
<nav>${menuUnique}<span class="fil">${SITE} · tout le contenu, hors ligne</span></nav>
<main class="page page--plan">
${planUnique}
<div class="corps">
${unique.join('\n')}
</div>
</main>
<footer class="page">
<p>Contenu sous licence CC BY-SA 4.0 · sources : ${DEPOT}</p>
</footer>
<script>
// Un lien du menu referme le menu : en écran étroit il couvre toute la page,
// et le laisser ouvert masquerait justement ce qu'on vient d'atteindre.
document.addEventListener('click', (e) => {
  const a = e.target.closest('.menu a');
  if (a) a.closest('.menu').open = false;
});
</script>
</body>
</html>
`
);
console.log(
  `page unique : ${path.relative(racine, cibleUnique)} ` +
    `(${(fs.statSync(cibleUnique).size / 1e6).toFixed(1)} Mo, ${compteurFig} figures incorporées)`
);

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
//
// « ignoreSearch » parce que les pages demandent « style.css?v=3f2a1b » alors
// que le cache tient « style.css » : sans lui, chaque ressource marquée
// manquerait le cache et le site cesserait de fonctionner hors ligne.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request))
  );
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
