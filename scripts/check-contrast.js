#!/usr/bin/env node
/**
 * 配色のコントラスト検証（WCAG 2.1 AA）
 *
 * 既定テーマと全テーマについて、light / dark の両モードで
 * コンポーネントが実際に使う「前景トークン × 背景トークン」の組み合わせを検証する。
 *
 *   文字:              4.5:1 以上（1.4.3）
 *   UI 部品・図形:     3:1 以上（1.4.11）
 */

const { loadSources, getTokens } = require("./lib/tokens");
const { parseColor, composite, contrast } = require("./lib/color");

const TEXT = 4.5;
const UI = 3;

const PAGE = ["color-bg", "surface-base", "surface-subtle", "surface-muted"];
const TINTS = ["color-accent-subtle", "color-accent-muted"];
const STATUS = ["success", "warning", "danger", "info", "secondary"];

/** [前景, 背景（配列なら下から順に重ねる）, 基準, 用途] */
const PAIRS = [];
const add = (fg, bgs, min, usage) => {
  for (const bg of bgs) PAIRS.push([fg, bg, min, usage]);
};

// 本文・補助テキスト
add("color-text", [...PAGE, ...TINTS], TEXT, "本文");
add("color-muted", PAGE, TEXT, "補助テキスト");
// アクセント文字（タブ・一覧のアクティブ、見出し、フローティングラベル等）
add("color-accent", [...PAGE, ...TINTS], TEXT, "アクセント文字");
add("link-color", PAGE.slice(0, 3), TEXT, "リンク");
add("link-color-hover", PAGE.slice(0, 3), TEXT, "リンク（hover）");
add("outline-color-hover", ["surface-base"], TEXT, "outline ボタン（hover）");
// 塗りボタン・選択状態（pagination / steps / checkbox / switch / calendar 等）
add("primary-fg", ["primary-bg", "primary-bg-hover", "primary-bg-active"], TEXT, "primary 塗り");
add("gradient-fg", ["gradient-start", "gradient-end"], TEXT, "グラデーションボタン");
// 状態色
for (const s of STATUS) {
  const fill = s === "info" ? "color-info" : s === "secondary" ? "color-secondary" : s;
  add(`${s}-fg`, [fill], TEXT, `${s} 塗り（ボタン・バッジ）`);
  add(`${s}-text`, PAGE, TEXT, `${s} 文字（outline・トースト・検証メッセージ）`);
  add(
    `${s}-text`,
    [
      ["color-bg", `${s}-veil`],
      ["surface-base", `${s}-veil`]
    ],
    TEXT,
    `${s} アラート`
  );
}
add("color-text", [["color-bg", "warning-veil"]], TEXT, "mark 要素");
// 固定配色の部品
add("header-fg", ["header-bg"], TEXT, "ヘッダー");
add("surface-base", ["color-text"], TEXT, "ツールチップ");
// UI 部品・図形
add("focus", PAGE.slice(0, 2), UI, "フォーカスリング");
add(
  "color-border-strong",
  [...PAGE, ...TINTS],
  UI,
  "フォーム部品の枠線・空の評価星・range のトラック"
);
add("color-accent", ["surface-base"], UI, "選択中のページ・日付の枠線、range のつまみ");
add(
  "color-accent-fg",
  ["color-accent"],
  TEXT,
  "アクセント塗りの上の文字（steps 完了・タイムライン・info モーダル）"
);
add("color-accent-fg", ["success-text"], TEXT, "タイムラインのマーカー（完了）");
for (const s of ["success", "warning", "danger"]) {
  add(`${s}-text`, ["surface-muted"], UI, `${s} 進捗バー・スピナー`);
}

function resolveBg(tokens, bg) {
  const layers = Array.isArray(bg) ? bg : [bg];
  let color = null;
  for (const name of layers) {
    const value = tokens[name];
    if (value === undefined) throw new Error(`未定義のトークン --wf-${name}`);
    const c = parseColor(value);
    color = color ? composite(value, color) : c[3] < 1 ? composite(value, [255, 255, 255, 1]) : c;
  }
  return color;
}

function prefixed(tokens) {
  const out = {};
  for (const [k, v] of Object.entries(tokens)) out[k.replace(/^wf-/, "")] = v;
  return out;
}

function run() {
  const { themes } = loadSources();
  const targets = [null, ...Object.keys(themes)];
  const failures = [];
  let checked = 0;

  for (const theme of targets) {
    for (const mode of ["light", "dark"]) {
      const tokens = prefixed(getTokens(theme, mode));
      for (const [fg, bg, min, usage] of PAIRS) {
        const fgValue = tokens[fg];
        if (fgValue === undefined) {
          failures.push(`${theme || "default"}/${mode}: 未定義のトークン --wf-${fg}（${usage}）`);
          continue;
        }
        const bgColor = resolveBg(tokens, bg);
        const fgColor = parseColor(fgValue)[3] < 1 ? composite(fgValue, bgColor) : fgValue;
        const ratio = contrast(fgColor, bgColor);
        checked++;
        if (ratio < min) {
          const bgLabel = Array.isArray(bg) ? bg.join(" + ") : bg;
          failures.push(
            `${(theme || "default").padEnd(7)} ${mode.padEnd(5)} ${ratio.toFixed(2).padStart(5)} < ${min}  ${fg} / ${bgLabel}（${usage}）`
          );
        }
      }
    }
  }

  console.log(`コントラスト検証: ${targets.length} テーマ × 2 モード、${checked} 組み合わせ`);
  if (failures.length) {
    console.error(`\n[FAIL] ${failures.length} 件が基準を下回っています:\n`);
    failures.forEach(f => console.error("  " + f));
    process.exit(1);
  }
  console.log("[PASS] すべての組み合わせが WCAG 2.1 AA の基準を満たしています");
}

if (require.main === module) run();

module.exports = { PAIRS };
