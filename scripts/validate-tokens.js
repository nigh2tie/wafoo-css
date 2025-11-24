#!/usr/bin/env node
/**
 * Token validation script for wafoo-css v2.0.0
 *
 * Validates that light/dark/theme token files are consistent and complete.
 * Run this as part of CI to ensure token integrity.
 */

const fs = require("fs");
const path = require("path");

// 必須キー一覧
const REQUIRED_KEYS = [
  // セマンティック基本色
  "wf-color-bg",
  "wf-color-text",
  "wf-color-muted",
  "wf-color-accent",
  "wf-color-border",

  // ステータス色（ベースの 500 のみ必須）
  "wf-success-500",
  "wf-warning-500",
  "wf-danger-500",

  // 日本の伝統色
  "wf-koubai",
  "wf-fuji",
  "wf-sakura",
  "wf-shirayuri",
  "wf-sumi",

  // スペーシング
  "wf-space-1",
  "wf-space-2",
  "wf-space-4",
  "wf-space-8",

  // タイポグラフィ
  "wf-font-sm",
  "wf-font-md",
  "wf-font-lg"
];

// 階調を持つ色
const COLOR_SCALES = ["success", "warning", "danger", "ink", "accent"];
const SCALE_VALUES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// エラー収集用
let errors = [];
let warnings = [];

/**
 * ファイルが存在するかチェック
 */
function checkFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    errors.push(`ファイルが見つかりません: ${filePath}`);
    return false;
  }
  return true;
}

/**
 * JSON ファイルを読み込み
 */
function loadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (e) {
    errors.push(`JSON パースエラー (${filePath}): ${e.message}`);
    return null;
  }
}

/**
 * キーセットが一致しているかチェック
 */
function checkKeySetsMatch(name1, tokens1, name2, tokens2) {
  const keys1 = Object.keys(tokens1).sort();
  const keys2 = Object.keys(tokens2).sort();

  if (JSON.stringify(keys1) !== JSON.stringify(keys2)) {
    const only1 = keys1.filter(k => !keys2.includes(k));
    const only2 = keys2.filter(k => !keys1.includes(k));

    if (only1.length > 0) {
      errors.push(
        `${name1} にのみ存在するキー: ${only1.slice(0, 5).join(", ")}${only1.length > 5 ? "..." : ""}`
      );
    }
    if (only2.length > 0) {
      errors.push(
        `${name2} にのみ存在するキー: ${only2.slice(0, 5).join(", ")}${only2.length > 5 ? "..." : ""}`
      );
    }
    return false;
  }
  return true;
}

/**
 * 必須キーが存在するかチェック
 */
function checkRequiredKeys(name, tokens) {
  const missing = REQUIRED_KEYS.filter(key => !(key in tokens));
  if (missing.length > 0) {
    errors.push(`${name} で必須キーが欠落: ${missing.join(", ")}`);
    return false;
  }
  return true;
}

/**
 * 色階調の連続性をチェック
 */
function checkColorScales(name, tokens) {
  for (const color of COLOR_SCALES) {
    const missing = SCALE_VALUES.filter(scale => {
      const key = `wf-${color}-${scale}`;
      return !(key in tokens);
    });

    if (missing.length > 0) {
      // accent は既存実装で完全なので、他の色だけチェック
      if (color !== "accent") {
        warnings.push(
          `${name} で ${color} の階調が不完全: ${color}-${missing.join(", " + color + "-")}`
        );
      }
    }
  }
}

/**
 * 値の形式をチェック
 */
function checkValueFormat(name, tokens) {
  for (const [key, value] of Object.entries(tokens)) {
    // var(...) 参照は許可
    if (typeof value === "string" && value.startsWith("var(")) {
      continue;
    }

    // 色の形式チェック（HEX）
    if (key.includes("color") || key.match(/-(50|100|200|300|400|500|600|700|800|900)$/)) {
      if (
        typeof value === "string" &&
        !value.match(/^#[0-9a-fA-F]{3,8}$/) &&
        !value.startsWith("var(") &&
        !value.startsWith("rgb")
      ) {
        warnings.push(`${name} の ${key} の値が色形式ではありません: ${value}`);
      }
    }

    // RGB の形式チェック
    if (key.endsWith("-rgb")) {
      if (typeof value === "string" && !value.match(/^\d+,\s*\d+,\s*\d+$/)) {
        errors.push(`${name} の ${key} の値が RGB 形式ではありません: ${value}`);
      }
    }

    // サイズの形式チェック
    if (key.includes("space") || key.includes("font") || key.includes("radius")) {
      if (
        typeof value === "string" &&
        !value.match(/^[\d.]+(?:px|rem|em)$/) &&
        !value.startsWith("var(")
      ) {
        warnings.push(`${name} の ${key} の値がサイズ形式ではありません: ${value}`);
      }
    }
  }
}

/**
 * RGB 版が対応する色階調と存在一致しているかチェック
 */
function checkRgbConsistency(name, tokens) {
  const colorKeys = Object.keys(tokens).filter(k =>
    k.match(/^wf-(success|warning|danger|ink|accent)-\d+$/)
  );

  for (const colorKey of colorKeys) {
    const rgbKey = `${colorKey}-rgb`;
    if (!(rgbKey in tokens)) {
      warnings.push(`${name} で ${colorKey} に対応する ${rgbKey} がありません`);
    }
  }
}

/**
 * メイン処理
 */
function main() {
  console.log("🔍 Validating tokens...\n");

  const distDir = path.join(__dirname, "..", "dist");
  const lightPath = path.join(distDir, "tokens.light.json");
  const darkPath = path.join(distDir, "tokens.dark.json");

  // ファイル存在チェック
  if (!checkFileExists(lightPath) || !checkFileExists(darkPath)) {
    console.error("❌ 必須ファイルが見つかりません\n");
    process.exit(1);
  }

  // JSON 読み込み
  const lightTokens = loadJson(lightPath);
  const darkTokens = loadJson(darkPath);

  if (!lightTokens || !darkTokens) {
    console.error("❌ JSON の読み込みに失敗しました\n");
    if (errors.length > 0) {
      errors.forEach(e => console.error(`  - ${e}`));
    }
    process.exit(1);
  }

  // 検証実行
  console.log("📋 検証項目:\n");

  console.log("  1. キーセット一致検証...");
  checkKeySetsMatch("light", lightTokens, "dark", darkTokens);

  console.log("  2. 必須キー存在確認...");
  checkRequiredKeys("light", lightTokens);
  checkRequiredKeys("dark", darkTokens);

  console.log("  3. 色階調連続性チェック...");
  checkColorScales("light", lightTokens);
  checkColorScales("dark", darkTokens);

  console.log("  4. 値の形式検証...");
  checkValueFormat("light", lightTokens);
  checkValueFormat("dark", darkTokens);

  console.log("  5. RGB版整合性チェック...");
  checkRgbConsistency("light", lightTokens);
  checkRgbConsistency("dark", darkTokens);

  console.log("");

  // 結果表示
  if (errors.length === 0 && warnings.length === 0) {
    console.log("✅ すべての検証に合格しました！\n");
    console.log(`  - Light tokens: ${Object.keys(lightTokens).length} keys`);
    console.log(`  - Dark tokens: ${Object.keys(darkTokens).length} keys`);
    process.exit(0);
  }

  if (warnings.length > 0) {
    console.log("⚠️  警告:\n");
    warnings.forEach(w => console.log(`  - ${w}`));
    console.log("");
  }

  if (errors.length > 0) {
    console.error("❌ エラー:\n");
    errors.forEach(e => console.error(`  - ${e}`));
    console.log("");
    process.exit(1);
  }

  // 警告のみの場合は成功扱い
  console.log("✅ 検証完了（警告あり）\n");
  process.exit(0);
}

// 実行
if (require.main === module) {
  main();
}

module.exports = {
  checkKeySetsMatch,
  checkRequiredKeys,
  checkColorScales,
  checkValueFormat,
  checkRgbConsistency
};
