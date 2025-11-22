#!/bin/bash

# wafoo-extras.css のビルドスクリプト

set -e

echo "Building wafoo-extras.css..."

# Extras用のファイルリスト
FILES=(
  "src/components/modal.css"
  "src/components/tooltip.css"
  "src/components/popover.css"
  "src/components/dropdown.css"
  "src/components/offcanvas.css"
  "src/components/tabs.css"
  "src/components/accordion.css"
  "src/components/calendar.css"
  "src/components/schedule.css"
  "src/components/carousel.css"
  "src/components/steps.css"
  "src/components/pagination.css"
  "src/components/progress.css"
  "src/components/spinner.css"
  "src/components/toast.css"
  "src/components/message.css"
  "src/components/list-group.css"
  "src/components/avatar.css"
  "src/components/skeleton.css"
  "src/components/empty.css"
  "src/components/divider.css"
  "src/components/code.css"
  "src/components/rating.css"
  "src/components/timeline.css"
  "src/components/sidebar.css"
  "src/components/switch.css"
  "src/components/range.css"
  "src/components/input-group.css"
  "src/components/floating-label.css"
  "src/components/file.css"
  "src/utilities-extras.css"
  "src/components/stamp.css"
  "src/components/header.css"
)

# 結合
cat "${FILES[@]}" > dist/wafoo-extras.css

# Minify（PostCSS）
npx postcss dist/wafoo-extras.css -o dist/wafoo-extras.min.css

echo "[OK] wafoo-extras.css built successfully"

# サイズ確認
echo "File sizes:"
ls -lh dist/wafoo-extras.css dist/wafoo-extras.min.css
echo "Gzipped size:"
gzip -c dist/wafoo-extras.min.css | wc -c | awk '{print $1/1024 " KB"}'
