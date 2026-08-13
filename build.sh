#!/usr/bin/env bash
# =====================================================================
#  Construit les PDF A4 des fiches et des feuilles d'exercices.
#
#    ./build.sh              tout ce qui a changé
#    ./build.sh 04           seulement ce dont le nom contient « 04 »
#    ./build.sh --force      tout recompiler, sans regarder les dates
#
#  Chaîne :
#    design.yaml   --(tools/design.mjs)-->   latex/design.tex
#    fiches/*.md   --(tools/fiche2tex.mjs)--> build/*.tex
#    build/*.tex   --(tectonic, XeLaTeX)-->   pdf/*.pdf
#
#  Les .tex écrits à la main dans fiches/ sont compilés directement.
#
#  Un document n'est reconstruit que si sa source — ou l'un des fichiers
#  du socle : classe, figures, jetons de design, précompilateur — est plus
#  récent que son PDF. En développement, une retouche sur une fiche ne
#  relance donc qu'une compilation, pas vingt-sept.
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

FORCE=0
FILTRE=""
for arg in "$@"; do
  case "$arg" in
    --force|-f) FORCE=1 ;;
    -*) echo "option inconnue : $arg" >&2; exit 1 ;;
    *)  FILTRE="$arg" ;;
  esac
done

mkdir -p build pdf

# Fichiers dont dépend TOUT document : les toucher invalide tous les PDF.
SOCLE=(build.sh design.yaml latex/fiche.cls latex/figures.sty
       tools/design.mjs tools/fiche2tex.mjs tools/recueil.mjs tools/sommaire.mjs)

# a_jour <pdf> <sources…> — vrai si le PDF existe et qu'aucune source, ni
# aucun fichier du socle, n'est plus récent que lui.
a_jour() {
  local pdf="$1"; shift
  [ "$FORCE" -eq 0 ] || return 1
  [ -e "$pdf" ] || return 1
  local s
  for s in "$@" "${SOCLE[@]}"; do
    [ -e "$s" ] || continue
    [ "$s" -nt "$pdf" ] && return 1
  done
  return 0
}

retenu() { [ -z "$FILTRE" ] || [[ "$1" == *"$FILTRE"* ]]; }

A_FAIRE=()      # chemins des .tex à compiler
IGNORES=0

echo "→ jetons de design"
node tools/design.mjs

echo "→ précompilation"
for src in fiches/*.md problemes/*.md; do
  [ -e "$src" ] || continue
  base="$(basename "$src" .md)"
  retenu "$base" || continue
  if a_jour "pdf/$base.pdf" "$src"; then IGNORES=$((IGNORES+1)); continue; fi
  node tools/fiche2tex.mjs "$src" "build/$base.tex"
  A_FAIRE+=("build/$base.tex")
  printf '  · %s\n' "$base.md"
done

# Le sommaire est engendré depuis les en-têtes de TOUS les documents : il
# vieillit dès qu'une priorité, un niveau ou une durée bouge quelque part.
if retenu "00-sommaire"; then
  if a_jour pdf/00-sommaire.pdf fiches/*.md problemes/*.md \
       problemes/recueil problemes/recueil/_recueil.yaml; then
    IGNORES=$((IGNORES+1))
  else
    echo "→ sommaire"
    node tools/sommaire.mjs fiches problemes build/00-sommaire.tex
    A_FAIRE+=("build/00-sommaire.tex")
  fi
fi

if [ -d problemes/recueil ] && retenu "recueil"; then
  if a_jour pdf/recueil.pdf problemes/recueil problemes/recueil/*.md &&
     a_jour pdf/recueil-corrige.pdf problemes/recueil problemes/recueil/*.md; then
    IGNORES=$((IGNORES+2))
  else
    echo "→ assemblage du recueil"
    node tools/recueil.mjs problemes/recueil build/recueil.tex build/recueil-corrige.tex
    A_FAIRE+=("build/recueil.tex" "build/recueil-corrige.tex")
  fi
fi

# Le classeur complet : les mêmes sources, reliées, avec un sommaire paginé.
if retenu "00-complet"; then
  if a_jour pdf/00-complet.pdf fiches/*.md problemes/*.md \
       problemes/recueil problemes/recueil/*.md tools/complet.mjs; then
    IGNORES=$((IGNORES+1))
  else
    echo "→ classeur complet"
    node tools/complet.mjs fiches problemes build/00-complet.tex
    A_FAIRE+=("build/00-complet.tex")
  fi
fi

# Les .tex écrits à la main, sans passage par le précompilateur.
for src in fiches/*.tex problemes/*.tex; do
  [ -e "$src" ] || continue
  base="$(basename "$src" .tex)"
  retenu "$base" || continue
  [ -e "build/$base.tex" ] && continue
  if a_jour "pdf/$base.pdf" "$src"; then IGNORES=$((IGNORES+1)); continue; fi
  A_FAIRE+=("$src")
done

statut=0
compiler() {
  local src="$1" base
  base="$(basename "$src" .tex)"
  local journal pages poids
  if journal="$("$TECTONIC" -X compile "$src" --outdir pdf -Z search-path=latex 2>&1)"; then
    pages="$(pdfinfo "pdf/$base.pdf" 2>/dev/null | awk '/^Pages/{print $2}')"
    poids="$(du -h "pdf/$base.pdf" | cut -f1)"
    printf '  ✓ %-40s %3s p.  %s\n' "$base" "${pages:-?}" "$poids"
    # Une compilation peut réussir en posant des carrés vides à la place des
    # caractères absents des polices. Le journal le dit ; personne ne le lisait.
    # Le « || true » n'est pas décoratif : sous pipefail, un grep qui ne trouve
    # rien — le cas normal — ferait échouer la fonction, donc tout le build.
    { echo "$journal" | grep -o "Missing character: There is no [^ ]*" | sort -u |
      sed 's/^/      ⚠ /'; } || true
    return 0
  else
    printf '  ✗ %-40s ÉCHEC\n' "$base"
    echo "$journal" | grep -E '^(error|!)|^l\.[0-9]' | head -6 | sed 's/^/      /'
    return 1
  fi
}
export -f compiler
export TECTONIC

# Les documents sont indépendants les uns des autres : rien n'empêche de les
# compiler de front. JOBS=1 pour retrouver un journal dans l'ordre.
JOBS="${JOBS:-$(nproc 2>/dev/null || echo 4)}"

if [ ${#A_FAIRE[@]} -gt 0 ]; then
  echo "→ compilation"
  # Le premier document est compilé seul : Tectonic télécharge à cette
  # occasion les paquets TeX manquants, et son cache n'aime pas être garni
  # par plusieurs processus à la fois.
  compiler "${A_FAIRE[0]}" || statut=1
  if [ ${#A_FAIRE[@]} -gt 1 ]; then
    printf '%s\0' "${A_FAIRE[@]:1}" |
      xargs -0 -P "$JOBS" -I{} bash -c 'compiler "$1"' _ {} || statut=1
  fi
fi

# Purge des fichiers engendrés dont la source a disparu : sans cela, un
# document renommé ou supprimé laisserait derrière lui un .tex et un PDF.
if [ -z "$FILTRE" ]; then
  for vieux in pdf/*.pdf build/*.tex; do
    [ -e "$vieux" ] || continue
    base="$(basename "$vieux")"; base="${base%.*}"
    case "$base" in
      00-sommaire|00-complet) [ -d fiches ] && continue ;;
      recueil|recueil-corrige) [ -d problemes/recueil ] && continue ;;
    esac
    if [ ! -e "fiches/$base.md" ] && [ ! -e "problemes/$base.md" ] &&
       [ ! -e "fiches/$base.tex" ] && [ ! -e "problemes/$base.tex" ]; then
      rm -f "$vieux"
      printf '  ⌫ %-40s supprimé (source disparue)\n' "$vieux"
    fi
  done
fi

echo
if [ "$IGNORES" -gt 0 ]; then
  echo "PDF dans ./pdf/  —  $IGNORES déjà à jour (./build.sh --force pour tout refaire)"
else
  echo "PDF dans ./pdf/"
fi
exit $statut
