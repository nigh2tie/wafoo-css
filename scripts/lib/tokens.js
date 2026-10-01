/**
 * src/tokens.css / src/themes.css からカスタムプロパティを読み取り、
 * モード（light / dark）とテーマごとに最終的な値へ解決するユーティリティ。
 *
 * - var(--x, fallback) を再帰的に展開する
 * - light-dark(a, b) をモードに応じて a / b に置き換える
 */

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "..", "src");

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** 指定セレクタだけを持つルールブロックの中身を返す（ネストした @media 内は対象外） */
function findBlock(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(^|[{};\\s])${escaped}\\s*\\{`, "m");
  const m = re.exec(css);
  if (!m) return null;
  let i = m.index + m[0].length;
  let depth = 1;
  const start = i;
  while (i < css.length && depth > 0) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") depth--;
    i++;
  }
  return css.slice(start, i - 1);
}

function parseDeclarations(block) {
  const tokens = {};
  const re = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    tokens[m[1]] = m[2].trim().replace(/\s+/g, " ");
  }
  return tokens;
}

/** トップレベルのカンマで分割 */
function splitArgs(str) {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of str) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur.trim());
  return out;
}

/** fn( ... ) の対応する閉じ括弧までを置換する */
function replaceFn(value, name, replacer) {
  let idx;
  let guard = 0;
  while ((idx = value.indexOf(`${name}(`)) !== -1) {
    if (guard++ > 1000) throw new Error(`解決できない値: ${value}`);
    let i = idx + name.length + 1;
    let depth = 1;
    while (i < value.length && depth > 0) {
      if (value[i] === "(") depth++;
      else if (value[i] === ")") depth--;
      i++;
    }
    const inner = value.slice(idx + name.length + 1, i - 1);
    value = value.slice(0, idx) + replacer(inner) + value.slice(i);
  }
  return value;
}

function resolveValue(name, tokens, mode, seen = new Set()) {
  if (seen.has(name)) throw new Error(`循環参照: ${[...seen, name].join(" -> ")}`);
  const raw = tokens[name];
  if (raw === undefined) return undefined;
  const nextSeen = new Set(seen).add(name);
  let value = replaceFn(raw, "var", inner => {
    const [ref, ...fallback] = splitArgs(inner);
    const key = ref.replace(/^--/, "");
    const resolved = resolveValue(key, tokens, mode, nextSeen);
    if (resolved !== undefined) return resolved;
    if (fallback.length) return fallback.join(", ");
    throw new Error(`未定義のトークン --${key}（--${name} から参照）`);
  });
  value = replaceFn(value, "light-dark", inner => {
    const [light, dark] = splitArgs(inner);
    return mode === "dark" ? dark : light;
  });
  return value;
}

function resolveAll(tokens, mode) {
  const out = {};
  for (const key of Object.keys(tokens)) out[key] = resolveValue(key, tokens, mode);
  return out;
}

function loadSources() {
  const tokensCss = stripComments(fs.readFileSync(path.join(SRC, "tokens.css"), "utf8"));
  const themesCss = stripComments(fs.readFileSync(path.join(SRC, "themes.css"), "utf8"));
  const root = parseDeclarations(findBlock(tokensCss, ":root"));
  // :root とテーマ要素の両方で宣言される導出トークン
  const derivedBlock = findBlock(
    tokensCss.replace(/:root,\s*\[class\*="theme-"\]/, "@derived"),
    "@derived"
  );
  const derived = derivedBlock ? parseDeclarations(derivedBlock) : {};
  const themes = {};
  for (const m of themesCss.matchAll(/\.theme-([a-z]+)\s*\{/g)) {
    themes[m[1]] = parseDeclarations(findBlock(themesCss, `.theme-${m[1]}`));
  }
  return { root, derived, themes };
}

/**
 * テーマ名（null なら既定）とモードから解決済みトークンを返す。
 * ブラウザと同じく、:root で宣言された var() は :root の値で確定させ、
 * テーマ要素では「テーマの宣言 + 導出トークン」だけを再計算する。
 */
function getTokens(themeName, mode) {
  const { root, derived, themes } = loadSources();
  const rootResolved = resolveAll({ ...root, ...derived }, mode);
  if (!themeName) return rootResolved;
  return resolveAll({ ...rootResolved, ...derived, ...themes[themeName] }, mode);
}

module.exports = { loadSources, getTokens, resolveAll, splitArgs };
