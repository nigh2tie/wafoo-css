#!/usr/bin/env bash
# wafoo-css 実装状況チェックスクリプト

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
    PASSED=$((PASSED + 1))
    return 0
  else
    echo "[NG] $desc: $file (見つかりません)"
    FAILED=$((FAILED + 1))
    return 0
  fi
}

check_grep() {
  local pattern="$1"
  local file="$2"
  local desc="$3"
  if grep -qE "$pattern" "$file" 2>/dev/null; then
    echo "[OK] $desc: $file に存在"
    PASSED=$((PASSED + 1))
    return 0
  else
    echo "[NG] $desc: $file に見つかりません"
    FAILED=$((FAILED + 1))
    return 0
  fi
}

check_count() {
  local pattern="$1"
  local file="$2"
  local desc="$3"
  local expected="$4"
  local count=$(grep -c "$pattern" "$file" 2>/dev/null || echo "0")
  if [ "$count" -ge "$expected" ]; then
    echo "[OK] $desc: ${count}個 (期待値: ${expected}以上)"
    PASSED=$((PASSED + 1))
    return 0
  else
    echo "[NG] $desc: ${count}個 (期待値: ${expected}以上)"
    FAILED=$((FAILED + 1))
    return 0
  fi
}

echo "=== Phase 1: ユーティリティクラスの拡充 ==="
echo ""

# スペーシング値の確認
check_grep "\.wf-mt-1|\.wf-mt-3|\.wf-mt-16" "src/utilities-core.css" "スペーシング値 (wf-mt-1, wf-mt-3, wf-mt-16)"
check_grep "space-16" "src/tokens.css" "CSS変数 (--wf-space-16)"
check_grep "values: \[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20\]" "scripts/generate-utilities.js" "generate-utilities.jsの設定"

# カラーユーティリティの確認
check_grep "\.wf-text-accent|\.wf-bg-primary|\.wf-border-accent" "src/utilities-core.css" "カラーユーティリティ"
check_grep "generateColorUtilities" "scripts/generate-utilities.js" "generateColorUtilities関数"

# シャドウユーティリティの確認
check_grep "\.wf-shadow-sm|\.wf-shadow-md|\.wf-shadow-lg|\.wf-shadow-xl" "src/utilities-core.css" "シャドウユーティリティ"
check_grep "generateShadowUtilities" "scripts/generate-utilities.js" "generateShadowUtilities関数"

echo ""
echo "=== Phase 2: ドキュメントの改善 ==="
echo ""

check_file "guides/accessibility.md" "アクセシビリティガイド"
check_grep "## アクセシビリティ" "guides/reference.md" "reference.mdのアクセシビリティセクション"
check_count "#### 基本的な使用例" "guides/reference.md" "使用例の追加" 3

echo ""
echo "=== Phase 3: 命名規則の標準化 ==="
echo ""

# 命名規則は CONTRIBUTING.md に統合済み（a25055c）
check_grep "### CSS命名規則" "CONTRIBUTING.md" "CONTRIBUTING.mdの命名規則セクション"
check_grep "## 命名規則" "guides/reference.md" "reference.mdの命名規則セクション"
check_grep "\.wf-w-full|\.wf-h-full|\.wf-w-screen" "src/utilities-core.css" "Tailwind互換クラス名"

echo ""
echo "=== Phase 4: AI対応ドキュメント ==="
echo ""

check_file "guides/ai-prompts.md" "AIプロンプトテンプレート"

echo ""
echo "=== Phase 5: 新規コンポーネント ==="
echo ""

check_file "src/components/data-table.css" "データテーブルCSS"
check_file "src/components/autocomplete.css" "オートコンプリートCSS"
check_file "src/components/snackbar.css" "スナックバーCSS"
check_grep "WFUI\.dataTable|WFUI\.autocomplete|WFUI\.snackbar" "dist/wafoo.js" "JavaScript API"
# examples/ は Git 管理外（41470cb）のため、リファレンス内の使用例を確認する
check_grep "WFUI\.dataTable" "guides/reference.md" "データテーブル使用例"
check_grep "WFUI\.autocomplete" "guides/reference.md" "オートコンプリート使用例"
check_grep "WFUI\.snackbar" "guides/reference.md" "スナックバー使用例"

echo ""
echo "=== ビルド統合確認 ==="
echo ""

check_grep "data-table.css|autocomplete.css|snackbar.css" "scripts/build.sh" "ビルドスクリプト統合"
check_file "dist/wafoo.css" "ビルド済みCSS"
check_file "dist/wafoo.js" "ビルド済みJavaScript"

echo ""
echo "=== ドキュメント整合性確認 ==="
echo ""

# 改善案ドキュメントは private_docs/（.gitignore 対象のローカル専用）にあるため、存在するときだけ確認する
IMPROVEMENT_DOC="private_docs/改善案_20251119.md"
if [ -f "$IMPROVEMENT_DOC" ]; then
  # 絵文字チェック（Pythonを使用）
  if command -v python3 &> /dev/null; then
    EMOJI_COUNT=$(python3 - "$IMPROVEMENT_DOC" << 'PYTHON'
import re
import sys
with open(sys.argv[1], "r", encoding="utf-8") as f:
    content = f.read()
emoji_pattern = re.compile(r"[\U0001F300-\U0001F9FF\U0001F1E0-\U0001F1FF\U00002600-\U000027BF]")
print(len(emoji_pattern.findall(content)))
PYTHON
    )
    if [ "$EMOJI_COUNT" -eq 0 ]; then
      echo "[OK] 改善案ドキュメントの絵文字: 0個（除去済み）"
      PASSED=$((PASSED + 1))
    else
      echo "[NG] 改善案ドキュメントの絵文字: ${EMOJI_COUNT}個（除去が必要）"
      FAILED=$((FAILED + 1))
    fi
  else
    echo "[SKIP] Python3が見つかりません（絵文字チェックをスキップ）"
  fi

  check_count "\[実装済み\]" "$IMPROVEMENT_DOC" "実装状況の注記" 20
  check_count "実装ファイル:" "$IMPROVEMENT_DOC" "参考リンク" 15
else
  echo "[SKIP] $IMPROVEMENT_DOC がありません（ローカル専用のため、改善案ドキュメントのチェックをスキップ）"
fi

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

