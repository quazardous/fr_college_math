#!/usr/bin/env node
// Recherche YouTube sans clé API : on lit ytInitialData de la page de résultats.
// Usage : node tools/yt-search.mjs "requête" [nbRésultats]

const query = process.argv[2];
const limit = Number(process.argv[3] || 8);
if (!query) {
  console.error('usage: yt-search.mjs "requête" [n]');
  process.exit(1);
}

const url =
  'https://www.youtube.com/results?search_query=' +
  encodeURIComponent(query) +
  '&sp=EgIQAQ%253D%253D'; // filtre : vidéos uniquement

const res = await fetch(url, {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
    'Accept-Language': 'fr-FR,fr;q=0.9',
  },
});
const html = await res.text();

const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
if (!m) {
  console.error('ytInitialData introuvable (page bloquée ?)');
  process.exit(2);
}
const data = JSON.parse(m[1]);

const out = [];
const walk = (node) => {
  if (out.length >= limit) return;
  if (Array.isArray(node)) return node.forEach(walk);
  if (!node || typeof node !== 'object') return;
  if (node.videoRenderer) {
    const v = node.videoRenderer;
    out.push({
      id: v.videoId,
      titre: v.title?.runs?.[0]?.text ?? '',
      chaine: v.ownerText?.runs?.[0]?.text ?? v.longBylineText?.runs?.[0]?.text ?? '',
      vues: v.viewCountText?.simpleText ?? '',
      duree: v.lengthText?.simpleText ?? '',
      publie: v.publishedTimeText?.simpleText ?? '',
    });
    return;
  }
  Object.values(node).forEach(walk);
};
walk(data);

for (const v of out) {
  console.log(
    `${v.id}  ${(v.duree || '--:--').padStart(7)}  ${(v.vues || '').padEnd(18)}  ${v.chaine.padEnd(24).slice(0, 24)}  ${v.titre}`
  );
}
