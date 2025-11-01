#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT_DIR/dist"
CSS_OUT="$OUT_DIR/wafoo.css"
MIN_OUT="$OUT_DIR/wafoo.min.css"

FILES=(
  "$ROOT_DIR/src/tokens.css"
  "$ROOT_DIR/src/themes.css"
  "$ROOT_DIR/src/base.css"
  "$ROOT_DIR/src/components/buttons.css"
  "$ROOT_DIR/src/components/stamp.css"
  "$ROOT_DIR/src/components/cards.css"
  "$ROOT_DIR/src/components/forms.css"
  "$ROOT_DIR/src/components/header.css"
  "$ROOT_DIR/src/components/steps.css"
  "$ROOT_DIR/src/components/alerts.css"
  "$ROOT_DIR/src/components/table.css"
  "$ROOT_DIR/src/components/tabs.css"
  "$ROOT_DIR/src/components/modal.css"
  "$ROOT_DIR/src/components/grid.css"
  "$ROOT_DIR/src/components/navbar.css"
  "$ROOT_DIR/src/components/dropdown.css"
  "$ROOT_DIR/src/components/pagination.css"
  "$ROOT_DIR/src/components/breadcrumb.css"
  "$ROOT_DIR/src/components/accordion.css"
  "$ROOT_DIR/src/components/offcanvas.css"
  "$ROOT_DIR/src/components/progress.css"
  "$ROOT_DIR/src/components/spinner.css"
  "$ROOT_DIR/src/components/input-group.css"
  "$ROOT_DIR/src/components/switch.css"
  "$ROOT_DIR/src/components/range.css"
  "$ROOT_DIR/src/components/file.css"
  "$ROOT_DIR/src/components/floating-label.css"
  "$ROOT_DIR/src/components/tooltip.css"
  "$ROOT_DIR/src/components/popover.css"
  "$ROOT_DIR/src/utilities.css"
)

mkdir -p "$OUT_DIR"
echo "/* wafoo.css (built) */" > "$CSS_OUT"
for f in "${FILES[@]}"; do
  echo "/* from: ${f#"$ROOT_DIR/"} */" >> "$CSS_OUT"
  cat "$f" >> "$CSS_OUT"
  echo >> "$CSS_OUT"
done

# PostCSS minify (autoprefixer + cssnano)
if command -v npx &> /dev/null; then
  npx postcss "$CSS_OUT" -o "$MIN_OUT"
  echo "Built: $CSS_OUT"
  echo "Built: $MIN_OUT (PostCSS)"
else
  echo "Warning: PostCSS not found. Falling back to naive minify..."
  MIN_CONTENT=$(cat "$CSS_OUT" \
    | sed -E 's:/\*[^*]*\*+([^/*][^*]*\*+)*/::g' \
    | tr '\n' ' ' \
    | sed -E 's/[[:space:]]+/ /g' \
    | sed -E 's/ ?([{}:;,]) ?/\1/g' \
    | sed -E 's/;}/}/g')
  printf "%s" "$MIN_CONTENT" > "$MIN_OUT"
  echo "Built: $CSS_OUT"
  echo "Built: $MIN_OUT (fallback)"
fi
