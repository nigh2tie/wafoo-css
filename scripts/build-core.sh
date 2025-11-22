#!/bin/bash

# wafoo-core.css のビルドスクリプト

set -e

echo "Building wafoo-core.css..."

# Core用のファイルリスト
FILES=(
  "src/tokens.css"
  "src/themes.css"
  "src/base.css"
  "src/components/buttons.css"
  "src/components/cards.css"
  "src/components/forms.css"
  "src/components/alerts.css"
  "src/components/table.css"
  "src/components/grid.css"
  "src/components/navbar.css"
  "src/components/breadcrumb.css"
  "src/utilities-core.css"
)

# 結合
cat "${FILES[@]}" > dist/wafoo-core.css

# Minify（PostCSS）
npx postcss dist/wafoo-core.css -o dist/wafoo-core.min.css

echo "[OK] wafoo-core.css built successfully"

# サイズ確認
echo "File sizes:"
ls -lh dist/wafoo-core.css dist/wafoo-core.min.css
echo "Gzipped size:"
gzip -c dist/wafoo-core.min.css | wc -c | awk '{print $1/1024 " KB"}'
