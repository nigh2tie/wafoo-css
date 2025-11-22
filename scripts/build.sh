#!/bin/bash

# メインビルドスクリプト（Core + Extras + Full）

set -e

echo "Starting wafoo-css build process..."

# 1. Core をビルド
bash scripts/build-core.sh

# 2. Extras をビルド
bash scripts/build-extras.sh

# 3. Full（既存互換性維持）をビルド
echo "Building wafoo.css (full)..."

# 全ファイルリスト（既存のFILES配列を使用）
FILES=(
  "src/tokens.css"
  "src/themes.css"
  "src/base.css"
  "src/components/buttons.css"
  "src/components/stamp.css"
  "src/components/cards.css"
  "src/components/forms.css"
  "src/components/header.css"
  "src/components/steps.css"
  "src/components/alerts.css"
  "src/components/table.css"
  "src/components/modal.css"
  "src/components/tooltip.css"
  "src/components/popover.css"
  "src/components/dropdown.css"
  "src/components/navbar.css"
  "src/components/breadcrumb.css"
  "src/components/pagination.css"
  "src/components/tabs.css"
  "src/components/accordion.css"
  "src/components/offcanvas.css"
  "src/components/grid.css"
  "src/components/progress.css"
  "src/components/spinner.css"
  "src/components/list-group.css"
  "src/components/toast.css"
  "src/components/message.css"
  "src/components/calendar.css"
  "src/components/schedule.css"
  "src/components/avatar.css"
  "src/components/skeleton.css"
  "src/components/empty.css"
  "src/components/divider.css"
  "src/components/code.css"
  "src/components/rating.css"
  "src/components/timeline.css"
  "src/components/sidebar.css"
  "src/components/carousel.css"
  "src/components/switch.css"
  "src/components/range.css"
  "src/components/input-group.css"
  "src/components/floating-label.css"
  "src/components/file.css"
  "src/utilities-core.css"
  "src/utilities-extras.css"
)

cat "${FILES[@]}" > dist/wafoo.css

npx postcss dist/wafoo.css -o dist/wafoo.min.css

echo "[OK] wafoo.css (full) built successfully"

# 4. JavaScriptもビルド
echo "Building wafoo.js..."
if [ -f "src/js/wafoo.js" ]; then
  cp src/js/wafoo.js dist/wafoo.js
  npx terser dist/wafoo.js -o dist/wafoo.min.js --compress --mangle
  echo "[OK] wafoo.js built successfully"
else
  echo "[WARN] src/js/wafoo.js not found, skipping JS build"
fi

# 5. docs/にコピー
echo "Copying to docs/..."
cp dist/wafoo.css docs/
cp dist/wafoo.min.css docs/
if [ -f "dist/wafoo.js" ]; then
  cp dist/wafoo.js docs/
  cp dist/wafoo.min.js docs/
fi

echo "[OK] Files copied to docs/"

# 6. 最終サイズレポート
echo ""
echo "Build Summary:"
echo "----------------------------------------"
echo "wafoo-core.min.css:   $(gzip -c dist/wafoo-core.min.css | wc -c | awk '{print $1/1024}') KB (gzipped)"
echo "wafoo-extras.min.css: $(gzip -c dist/wafoo-extras.min.css | wc -c | awk '{print $1/1024}') KB (gzipped)"
echo "wafoo.min.css:        $(gzip -c dist/wafoo.min.css | wc -c | awk '{print $1/1024}') KB (gzipped)"
if [ -f "dist/wafoo.min.js" ]; then
  echo "wafoo.min.js:         $(gzip -c dist/wafoo.min.js | wc -c | awk '{print $1/1024}') KB (gzipped)"
fi
echo "----------------------------------------"

echo ""
echo "[OK] Build completed successfully!"
