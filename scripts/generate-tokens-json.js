#!/usr/bin/env node
/**
 * Generate tokens.json files from src/tokens.css
 *
 * light-dark() と var() を解決した「そのまま使える値」を出力する。
 * - dist/tokens.light.json: ライトモードの値
 * - dist/tokens.dark.json: ダークモードの値
 * - dist/tokens.json: 後方互換用（light と同じ）
 */

const fs = require("fs");
const path = require("path");
const { getTokens } = require("./lib/tokens");

const distDir = path.join(__dirname, "../dist");
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log("🔍 Extracting tokens from src/tokens.css...\n");

const lightTokens = getTokens(null, "light");
const darkTokens = getTokens(null, "dark");

const lightPath = path.join(distDir, "tokens.light.json");
const darkPath = path.join(distDir, "tokens.dark.json");
const legacyPath = path.join(distDir, "tokens.json");

fs.writeFileSync(lightPath, JSON.stringify(lightTokens, null, 2) + "\n");
fs.writeFileSync(darkPath, JSON.stringify(darkTokens, null, 2) + "\n");
fs.writeFileSync(legacyPath, JSON.stringify(lightTokens, null, 2) + "\n");

const diff = Object.keys(lightTokens).filter(k => lightTokens[k] !== darkTokens[k]);

console.log(`✅ Generated token files:\n`);
console.log(`  - tokens.light.json: ${Object.keys(lightTokens).length} tokens`);
console.log(`  - tokens.dark.json: ${Object.keys(darkTokens).length} tokens`);
console.log(`  - tokens.json (legacy): same as light\n`);
console.log(`📊 Tokens that differ in dark mode: ${diff.length}\n`);

if (Object.keys(lightTokens).length === 0) {
  console.error("❌ Error: No tokens extracted!");
  process.exit(1);
}

console.log("✅ Token generation complete!");
