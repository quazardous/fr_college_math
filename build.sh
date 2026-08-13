#!/usr/bin/env bash
# =====================================================================
#  Construit les PDF A4 des fiches et des feuilles d'exercices.
#
#    ./build.sh              tout
#    ./build.sh 04           seulement ce dont le nom contient « 04 »
#
#  Chaîne :
#    design.yaml   --(tools/design.mjs)-->   latex/design.tex
#    fiches/*.md   --(tools/fiche2tex.mjs)--> build/*.tex
#    build/*.tex   --(tectonic, XeLaTeX)-->   pdf/*.pdf
#
#  Les .tex écrits à la main dans fiches/ sont compilés directement.
# =====================================================================
set -euo pipefail
cd "$(dirname "$0")"

TECTONIC="${TECTONIC:-$HOME/.local/bin/tectonic}"
[ -x "$TECTONIC" ] || TECTONIC="$(command -v tectonic || true)"
if [ -z "$TECTONIC" ]; then
  echo "tectonic introuvable. Installer avec :" >&2
  echo "  curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh" >&2
  exit 1
fi

FILTRE="${1:-}"
mkdir -p build pdf

echo "→ jetons de design"
node tools/design.mjs

echo "→ précompilation"
for src in fiches/*.md problemes/*.md; do
  [ -e "$src" ] || continue
  base="$(basename "$src" .md)"
  [ -z "$FILTRE" ] || [[ "$base" == *"$FILTRE"* ]] || continue
  node tools/fiche2tex.mjs "$src" "build/$base.tex"
  printf '  · %s\n' "$base.md"
done

if [ -z "$FILTRE" ] || [[ "00-sommaire" == *"$FILTRE"* ]]; then
  echo "→ sommaire"
  node tools/sommaire.mjs fiches problemes build/00-sommaire.tex
fi

if [ -d problemes/recueil ] && { [ -z "$FILTRE" ] || [[ "recueil" == *"$FILTRE"* ]]; }; then
  echo "→ assemblage du recueil"
  node tools/recueil.mjs problemes/recueil build/recueil.tex build/recueil-corrige.tex
fi

echo "→ compilation"
statut=0
compiler() {
  local src="$1" base="$2"
  if journal="$("$TECTONIC" -X compile "$src" --outdir pdf -Z search-path=latex 2>&1)"; then
    pages="$(pdfinfo "pdf/$base.pdf" 2>/dev/null | awk '/^Pages/{print $2}')"
    poids="$(du -h "pdf/$base.pdf" | cut -f1)"
    printf '  ✓ %-40s %3s p.  %s\n' "$base" "${pages:-?}" "$poids"
  else
    printf '  ✗ %-40s ÉCHEC\n' "$base"
    echo "$journal" | grep -E '^(error|!)|^l\.[0-9]' | head -6 | sed 's/^/      /'
    statut=1
  fi
}

for src in build/*.tex fiches/*.tex problemes/*.tex; do
  [ -e "$src" ] || continue
  base="$(basename "$src" .tex)"
  [ -z "$FILTRE" ] || [[ "$base" == *"$FILTRE"* ]] || continue
  # une fiche écrite en .md a déjà été compilée depuis build/ : on ne la refait pas
  if [[ "$src" != build/* ]] && [ -e "build/$base.tex" ]; then continue; fi
  compiler "$src" "$base"
done

echo
echo "PDF dans ./pdf/"
exit $statut
