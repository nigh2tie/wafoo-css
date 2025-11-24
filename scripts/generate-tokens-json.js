#!/usr/bin/env node
/**
 * Generate tokens.json files from src/tokens.css
 *
 * v2.0.0: Generates separate light/dark token files
 * - dist/tokens.light.json: Light mode tokens (:root)
 * - dist/tokens.dark.json: Dark mode tokens (@media (prefers-color-scheme: dark))
 * - dist/tokens.json: Legacy file (same as light, for backward compatibility)
 */

const fs = require("fs");
const path = require("path");

const tokensPath = path.join(__dirname, "../src/tokens.css");
const distDir = path.join(__dirname, "../dist");

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const cssContent = fs.readFileSync(tokensPath, "utf8");

// Regex to capture CSS variables
const varRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;

/**
 * Extract tokens from a specific CSS block
 */
function extractTokens(cssBlock) {
  const tokens = {};
  let match;
  const regex = new RegExp(varRegex.source, "g");

  while ((match = regex.exec(cssBlock)) !== null) {
    const key = match[1];
    const value = match[2].trim();
    tokens[key] = value;
  }

  return tokens;
}

/**
 * Extract :root block (light mode)
 */
function extractLightTokens(css) {
  // Match the main :root block (before any @media rules)
  const rootMatch = css.match(/@layer tokens\s*\{[\s\S]*?:root\s*\{([\s\S]*?)\n\s*\}/);

  if (!rootMatch) {
    console.error("Error: Could not find :root block in tokens.css");
    process.exit(1);
  }

  return extractTokens(rootMatch[1]);
}

/**
 * Extract @media (prefers-color-scheme: dark) block
 */
function extractDarkTokens(css) {
  // Match the dark mode @media block
  const darkMatch = css.match(
    /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[\s\S]*?:root\s*\{([\s\S]*?)\n\s*\}/
  );

  if (!darkMatch) {
    console.warn("Warning: Could not find dark mode block. Using light tokens.");
    return {};
  }

  return extractTokens(darkMatch[1]);
}

// Extract tokens
console.log("🔍 Extracting tokens from src/tokens.css...\n");

const lightTokens = extractLightTokens(cssContent);
const darkOverrides = extractDarkTokens(cssContent);

// Dark tokens = light tokens + dark overrides
const darkTokens = { ...lightTokens, ...darkOverrides };

// Output paths
const lightPath = path.join(distDir, "tokens.light.json");
const darkPath = path.join(distDir, "tokens.dark.json");
const legacyPath = path.join(distDir, "tokens.json");

// Write files
fs.writeFileSync(lightPath, JSON.stringify(lightTokens, null, 2));
fs.writeFileSync(darkPath, JSON.stringify(darkTokens, null, 2));
fs.writeFileSync(legacyPath, JSON.stringify(lightTokens, null, 2)); // Legacy: same as light

console.log(`✅ Generated token files:\n`);
console.log(`  - tokens.light.json: ${Object.keys(lightTokens).length} tokens`);
console.log(`  - tokens.dark.json: ${Object.keys(darkTokens).length} tokens`);
console.log(
  `  - tokens.json (legacy): ${Object.keys(lightTokens).length} tokens (same as light)\n`
);

console.log(`📊 Dark mode overrides: ${Object.keys(darkOverrides).length} tokens\n`);

// Validation
if (Object.keys(lightTokens).length === 0) {
  console.error("❌ Error: No tokens extracted from light mode!");
  process.exit(1);
}

if (Object.keys(lightTokens).length !== Object.keys(darkTokens).length) {
  console.warn(
    `⚠️  Warning: Light (${Object.keys(lightTokens).length}) and Dark (${Object.keys(darkTokens).length}) have different number of tokens`
  );
}

console.log("✅ Token generation complete!");
