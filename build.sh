#!/usr/bin/env bash
# =====================================================================
#  Construit les PDF A4 des fiches et des feuilles d'exercices.
#
#    ./build.sh              tout
#    ./build.sh 03           seulement les fichiers dont le nom contient « 03 »
#
#  Étapes : design.yaml → latex/design.tex → XeLaTeX (tectonic) → pdf/
# =====================================================================
set -euo pipefail
cd "$(dirname "$0")"

TECTONIC="${TECTONIC:-$HOME/.local/bin/tectonic}"
command -v "$TECTONIC" >/dev/null 2>&1 || TECTONIC="$(command -v tectonic || true)"
if [ -z "$TECTONIC" ]; then
  echo "tectonic introuvable. Installer avec :" >&2
  echo "  curl --proto '=https' --tlsv1.2 -fsSL https://drop-sh.fullyjustified.net | sh" >&2
  exit 1
fi

FILTRE="${1:-}"

echo "→ jetons de design"
node tools/design.mjs

mkdir -p pdf
echo "→ compilation"
statut=0
for src in fiches/*.tex problemes/*.tex; do
  [ -e "$src" ] || continue
  base="$(basename "$src" .tex)"
  if [ -n "$FILTRE" ] && [[ "$base" != *"$FILTRE"* ]]; then continue; fi

  if journal="$("$TECTONIC" -X compile "$src" --outdir pdf -Z search-path=latex 2>&1)"; then
    pages="$(pdfinfo "pdf/$base.pdf" 2>/dev/null | awk '/^Pages/{print $2}')"
    poids="$(du -h "pdf/$base.pdf" | cut -f1)"
    printf '  ✓ %-42s %s p.  %s\n' "$base" "${pages:-?}" "$poids"
  else
    printf '  ✗ %-42s ÉCHEC\n' "$base"
    echo "$journal" | grep -E '^(error|!)' | head -6 | sed 's/^/      /'
    statut=1
  fi
done

echo
echo "PDF dans ./pdf/"
exit $statut
