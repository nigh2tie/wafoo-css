#!/usr/bin/env bash
# wafoo-css 実装状況チェックスクリプト
# 改善案_20251119.mdの実装状況を確認します

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "=========================================="
echo "wafoo-css 実装状況チェック"
echo "=========================================="
echo ""

# カウンター
PASSED=0
FAILED=0

# チェック関数
check_file() {
  local file="$1"
  local desc="$2"
  if [ -f "$file" ]; then
    echo "[OK] $desc: $file"
    ((PASSED++))
    return 0
  else
    echo "[NG] $desc: $file (見つかりません)"
    ((FAILED++))
    return 1
  fi
}

check_grep() {
  local pattern="$1"
  local file="$2"
  local desc="$3"
  if grep -qE "$pattern" "$file" 2>/dev/null; then
    echo "[OK] $desc: $file に存在"
    ((PASSED++))
    return 0
  else
    echo "[NG] $desc: $file に見つかりません"
    ((FAILED++))
    return 1
  fi
}

check_count() {
  local pattern="$1"
  local file="$2"
  local desc="$3"
  local expected="$4"
  local count=$(grep -c "$pattern" "$file" 2>/dev/null || echo "0")
  if [ "$count" -ge "$expected" ]; then
    echo "[OK] $desc: $count個 (期待値: ${expected}以上)"
    ((PASSED++))
    return 0
  else
    echo "[NG] $desc: $count個 (期待値: ${expected}以上)"
    ((FAILED++))
    return 1
  fi
}

echo "=== Phase 1: ユーティリティクラスの拡充 ==="
echo ""

# スペーシング値の確認
check_grep "\.wf-mt-1|\.wf-mt-3|\.wf-mt-16" "src/utilities.css" "スペーシング値 (wf-mt-1, wf-mt-3, wf-mt-16)"
check_grep "space-16" "src/tokens.css" "CSS変数 (--wf-space-16)"
check_grep "values: \[0, 1, 2, 3, 4, 6, 8, 10, 12, 16\]" "scripts/generate-utilities.js" "generate-utilities.jsの設定"

# カラーユーティリティの確認
check_grep "\.wf-text-accent|\.wf-bg-primary|\.wf-border-accent" "src/utilities.css" "カラーユーティリティ"
check_grep "generateColorUtilities" "scripts/generate-utilities.js" "generateColorUtilities関数"

# シャドウユーティリティの確認
check_grep "\.wf-shadow-sm|\.wf-shadow-md|\.wf-shadow-lg|\.wf-shadow-xl" "src/utilities.css" "シャドウユーティリティ"
check_grep "generateShadowUtilities" "scripts/generate-utilities.js" "generateShadowUtilities関数"

echo ""
echo "=== Phase 2: ドキュメントの改善 ==="
echo ""

check_file "docs/accessibility.md" "アクセシビリティガイド"
check_grep "## アクセシビリティ" "REFERENCE.md" "REFERENCE.mdのアクセシビリティセクション"
check_count "#### 基本的な使用例" "REFERENCE.md" "使用例の追加" 3

echo ""
echo "=== Phase 3: 命名規則の標準化 ==="
echo ""

check_file "docs/naming-conventions.md" "命名規則ドキュメント"
check_grep "## 命名規則" "REFERENCE.md" "REFERENCE.mdの命名規則セクション"
check_grep "\.wf-w-full|\.wf-h-full|\.wf-w-screen" "src/utilities.css" "Tailwind互換クラス名"

echo ""
echo "=== Phase 4: AI対応ドキュメント ==="
echo ""

check_file "docs/components-schema.json" "コンポーネントスキーマ"
check_file "docs/ai-prompts.md" "AIプロンプトテンプレート"

echo ""
echo "=== Phase 5: 新規コンポーネント ==="
echo ""

check_file "src/components/data-table.css" "データテーブルCSS"
check_file "src/components/autocomplete.css" "オートコンプリートCSS"
check_file "src/components/snackbar.css" "スナックバーCSS"
check_grep "WFUI\.dataTable|WFUI\.autocomplete|WFUI\.snackbar" "dist/wafoo.js" "JavaScript API"
check_file "examples/data-table-enhanced.html" "データテーブル使用例"
check_file "examples/autocomplete.html" "オートコンプリート使用例"
check_file "examples/snackbar.html" "スナックバー使用例"

echo ""
echo "=== ビルド統合確認 ==="
echo ""

check_grep "data-table.css|autocomplete.css|snackbar.css" "scripts/build.sh" "ビルドスクリプト統合"
check_file "dist/wafoo.css" "ビルド済みCSS"
check_file "dist/wafoo.js" "ビルド済みJavaScript"

echo ""
echo "=== ドキュメント整合性確認 ==="
echo ""

# 絵文字チェック（Pythonを使用）
if command -v python3 &> /dev/null; then
  EMOJI_COUNT=$(python3 << 'PYTHON'
import re
try:
    with open('private_docs/改善案_20251119.md', 'r', encoding='utf-8') as f:
        content = f.read()
    emoji_pattern = re.compile(r'[\U0001F300-\U0001F9FF\U0001F1E0-\U0001F1FF\U00002600-\U000027BF]')
    matches = emoji_pattern.findall(content)
    print(len(matches))
except:
    print("0")
PYTHON
  )
  if [ "$EMOJI_COUNT" -eq 0 ]; then
    echo "[OK] 改善案ドキュメントの絵文字: 0個（除去済み）"
    ((PASSED++))
  else
    echo "[NG] 改善案ドキュメントの絵文字: ${EMOJI_COUNT}個（除去が必要）"
    ((FAILED++))
  fi
else
  echo "[SKIP] Python3が見つかりません（絵文字チェックをスキップ）"
fi

check_count "\[実装済み\]" "private_docs/改善案_20251119.md" "実装状況の注記" 20
check_count "実装ファイル:" "private_docs/改善案_20251119.md" "参考リンク" 15

echo ""
echo "=========================================="
echo "チェック結果サマリー"
echo "=========================================="
echo "成功: $PASSED"
echo "失敗: $FAILED"
echo ""

if [ $FAILED -eq 0 ]; then
  echo "すべてのチェックが成功しました！"
  exit 0
else
  echo "一部のチェックが失敗しました。上記を確認してください。"
  exit 1
fi

