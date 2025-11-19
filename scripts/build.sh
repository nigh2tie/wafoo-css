#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT_DIR/dist"
CSS_OUT="$OUT_DIR/wafoo.css"
MIN_OUT="$OUT_DIR/wafoo.min.css"
JS_SRC_DIR="$ROOT_DIR/src/js"
JS_PATCH="$JS_SRC_DIR/wafoo.js"
JS_OUT="$OUT_DIR/wafoo.js"
JS_MIN_OUT="$OUT_DIR/wafoo.min.js"

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
  "$ROOT_DIR/src/components/schedule.css"
  "$ROOT_DIR/src/components/calendar.css"
  "$ROOT_DIR/src/components/list-group.css"
  "$ROOT_DIR/src/components/skeleton.css"
  "$ROOT_DIR/src/components/empty.css"
  "$ROOT_DIR/src/components/avatar.css"
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
  "$ROOT_DIR/src/components/toast.css"
  "$ROOT_DIR/src/components/divider.css"
  "$ROOT_DIR/src/components/code.css"
  "$ROOT_DIR/src/components/rating.css"
  "$ROOT_DIR/src/components/timeline.css"
  "$ROOT_DIR/src/components/message.css"
  "$ROOT_DIR/src/components/sidebar.css"
  "$ROOT_DIR/src/components/carousel.css"
  "$ROOT_DIR/src/components/data-table.css"
  "$ROOT_DIR/src/components/autocomplete.css"
  "$ROOT_DIR/src/components/snackbar.css"
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

# JS build (patching dist/wafoo.js with src/js/wafoo.js if present)
if [ -f "$JS_PATCH" ]; then
  mkdir -p "$OUT_DIR"
  if [ -f "$JS_OUT" ]; then
    # Remove previously appended patch block if present (between markers)
    awk 'BEGIN{skip=0} /\/\* WFUI PATCH BEGIN \*\//{skip=1} {if(skip==0) print $0} END{}' "$JS_OUT" > "$OUT_DIR/.wafoo.base.js"
  else
    # If no existing JS, start from empty base
    : > "$OUT_DIR/.wafoo.base.js"
  fi
  cat "$OUT_DIR/.wafoo.base.js" "$JS_PATCH" > "$JS_OUT"

  # Minify with terser (proper JavaScript minification)
  if command -v npx &> /dev/null; then
    npx terser "$JS_OUT" -o "$JS_MIN_OUT" -c -m
    echo "Built: $JS_OUT (+ patch)"
    echo "Built: $JS_MIN_OUT (terser)"
  else
    echo "Warning: terser not found. Copying non-minified version..."
    cp "$JS_OUT" "$JS_MIN_OUT"
    echo "Built: $JS_OUT (+ patch)"
    echo "Built: $JS_MIN_OUT (fallback, not minified)"
  fi
  rm -f "$OUT_DIR/.wafoo.base.js"
fi

# Copy assets into docs/ for GitHub Pages (docs folder is the site root)
DOCS_DIR="$ROOT_DIR/docs"
if [ -d "$DOCS_DIR" ]; then
  cp -f "$CSS_OUT" "$DOCS_DIR/wafoo.css" 2>/dev/null || true
  cp -f "$JS_OUT" "$DOCS_DIR/wafoo.js" 2>/dev/null || true
  # Optionally copy minified as well (not referenced by default)
  cp -f "$MIN_OUT" "$DOCS_DIR/wafoo.min.css" 2>/dev/null || true
  cp -f "$JS_MIN_OUT" "$DOCS_DIR/wafoo.min.js" 2>/dev/null || true
  echo "Synced dist assets to docs/"
fi
