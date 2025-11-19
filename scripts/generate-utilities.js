#!/usr/bin/env node
/**
 * Utility class generator for wafoo-css
 * Generates repetitive utility classes from config
 */

const fs = require("fs");
const path = require("path");

const config = {
  spacing: {
    values: [0, 1, 2, 3, 4, 6, 8, 10, 12, 16],
    properties: {
      m: "margin",
      mt: "margin-top",
      mr: "margin-right",
      mb: "margin-bottom",
      ml: "margin-left",
      mx: ["margin-left", "margin-right"],
      my: ["margin-top", "margin-bottom"],
      p: "padding",
      pt: "padding-top",
      pr: "padding-right",
      pb: "padding-bottom",
      pl: "padding-left",
      px: ["padding-left", "padding-right"],
      py: ["padding-top", "padding-bottom"]
    }
  },
  gap: {
    values: [0, 1, 2, 3, 4, 6, 8, 10, 12, 16]
  },
  display: [
    { class: "block", value: "block" },
    { class: "inline", value: "inline" },
    { class: "inline-block", value: "inline-block" },
    { class: "flex", value: "flex" },
    { class: "inline-flex", value: "inline-flex" },
    { class: "grid", value: "grid" },
    { class: "hidden", value: "none" }
  ],
  flex: {
    items: ["start", "center", "end", "stretch", "baseline"],
    justify: ["start", "center", "end", "between", "around", "evenly"],
    wrap: ["wrap", "nowrap", "wrap-reverse"]
  },
  grid: {
    cols: [1, 2, 3, 4, 6, 12]
  },
  text: {
    sizes: ["xs", "sm", "md", "lg", "xl"],
    align: ["left", "center", "right", "justify"]
  }
};

function generateSpacing() {
  let css = "/* Spacing */\n";
  const { spacing } = config;

  for (const [prefix, properties] of Object.entries(spacing.properties)) {
    for (const value of spacing.values) {
      const className = `.wf-${prefix}-${value}`;
      const varName = value === 0 ? "0" : `var(--wf-space-${value})`;

      if (Array.isArray(properties)) {
        css += `${className} { ${properties.map(p => `${p}: ${varName}`).join("; ")}; }\n`;
      } else {
        css += `${className} { ${properties}: ${varName}; }\n`;
      }
    }
  }

  return css;
}

function generateGap() {
  let css = "\n/* Gap */\n";
  for (const value of config.gap.values) {
    const varName = value === 0 ? "0" : `var(--wf-space-${value})`;
    css += `.wf-gap-${value} { gap: ${varName}; }\n`;
  }
  return css;
}

function generateDisplay() {
  let css = "\n/* Display */\n";
  for (const { class: className, value } of config.display) {
    css += `.wf-${className} { display: ${value}; }\n`;
  }
  return css;
}

function generateFlex() {
  let css = "\n/* Flex helpers */\n";

  // items
  for (const value of config.flex.items) {
    const cssValue = value === "start" || value === "end" ? `flex-${value}` : value;
    css += `.wf-items-${value} { align-items: ${cssValue}; }\n`;
  }

  // justify
  for (const value of config.flex.justify) {
    const cssValue =
      value === "start" || value === "end"
        ? `flex-${value}`
        : value === "between"
          ? "space-between"
          : value === "around"
            ? "space-around"
            : value === "evenly"
              ? "space-evenly"
              : value;
    css += `.wf-justify-${value} { justify-content: ${cssValue}; }\n`;
  }

  // wrap
  for (const value of config.flex.wrap) {
    css += `.wf-flex-${value} { flex-wrap: ${value}; }\n`;
  }

  return css;
}

function generateGrid() {
  let css = "\n/* Grid helpers */\n";
  for (const cols of config.grid.cols) {
    css += `.wf-grid-cols-${cols} { grid-template-columns: repeat(${cols}, minmax(0, 1fr)); }\n`;
  }
  return css;
}

function generateText() {
  let css = "\n/* Text helpers */\n";

  // sizes
  for (const size of config.text.sizes) {
    const varName = size === "xs" ? "calc(var(--wf-font-sm) - 2px)" : `var(--wf-font-${size})`;
    css += `.wf-text-${size} { font-size: ${varName}; }\n`;
  }

  css += `.wf-nowrap { white-space: nowrap; }\n`;

  // align
  for (const align of config.text.align) {
    css += `.wf-text-${align} { text-align: ${align}; }\n`;
  }

  css += `.wf-font-bold { font-weight: 700; }\n`;

  return css;
}

function generateColorUtilities() {
  let css = "\n/* Color utilities (theme-aware) */\n";

  // Text colors
  css += `.wf-text-accent { color: var(--wf-color-accent); }\n`;
  css += `.wf-text-primary { color: var(--wf-primary-bg); }\n`;
  css += `.wf-text-muted { color: var(--wf-color-muted); }\n`;
  css += `.wf-text-success { color: var(--wf-success); }\n`;
  css += `.wf-text-warning { color: var(--wf-warning); }\n`;
  css += `.wf-text-danger { color: var(--wf-danger); }\n`;
  css += `.wf-text-link { color: var(--wf-link-color); }\n`;

  // Background colors
  css += `.wf-bg-accent { background-color: var(--wf-color-accent); }\n`;
  css += `.wf-bg-primary { background-color: var(--wf-primary-bg); }\n`;
  css += `.wf-bg-surface { background-color: var(--wf-surface-base); }\n`;
  css += `.wf-bg-surface-subtle { background-color: var(--wf-surface-subtle); }\n`;
  css += `.wf-bg-surface-muted { background-color: var(--wf-surface-muted); }\n`;
  css += `.wf-bg-success { background-color: var(--wf-success); }\n`;
  css += `.wf-bg-warning { background-color: var(--wf-warning); }\n`;
  css += `.wf-bg-danger { background-color: var(--wf-danger); }\n`;

  // Border colors
  css += `.wf-border-accent { border-color: var(--wf-color-accent); }\n`;
  css += `.wf-border-primary { border-color: var(--wf-primary-bg); }\n`;
  css += `.wf-border-subtle { border-color: var(--wf-color-border-subtle); }\n`;
  css += `.wf-border-strong { border-color: var(--wf-color-border-strong); }\n`;
  css += `.wf-border { border-color: var(--wf-color-border); }\n`;

  return css;
}

function generateShadowUtilities() {
  let css = "\n/* Shadow utilities */\n";

  css += `.wf-shadow-sm { box-shadow: var(--wf-shadow-sm); }\n`;
  css += `.wf-shadow-md { box-shadow: var(--wf-shadow-md); }\n`;
  css += `.wf-shadow-lg { box-shadow: var(--wf-shadow-lg); }\n`;
  css += `.wf-shadow-xl { box-shadow: var(--wf-shadow-xl); }\n`;
  css += `.wf-shadow-none { box-shadow: none; }\n`;

  return css;
}

function generateResponsive() {
  let css = "\n/* Responsive (min-width) */\n";
  const breakpoints = ["sm", "md", "lg"]; // extend to lg

  for (const bp of breakpoints) {
    css += `@media (min-width: var(--wf-breakpoint-${bp})) {\n`;

    // Display
    css += `  .wf-${bp}-hidden { display: none; }\n`;
    css += `  .wf-${bp}-flex { display: flex; }\n`;
    css += `  .wf-${bp}-grid { display: grid; }\n`;
    css += `  .wf-${bp}-inline-flex { display: inline-flex; }\n`;

    // Flex
    for (const value of ["start", "center", "end", "between"]) {
      const cssValue =
        value === "start" || value === "end"
          ? `flex-${value}`
          : value === "between"
            ? "space-between"
            : value;
      css += `  .wf-${bp}-justify-${value} { justify-content: ${cssValue}; }\n`;
    }

    for (const value of ["start", "center", "end"]) {
      const cssValue = value === "start" || value === "end" ? `flex-${value}` : value;
      css += `  .wf-${bp}-items-${value} { align-items: ${cssValue}; }\n`;
    }

    // Text alignment
    for (const align of ["left", "center", "right", "justify"]) {
      css += `  .wf-${bp}-text-${align} { text-align: ${align}; }\n`;
    }

    css += `}\n`;
  }

  return css;
}

function generateStaticUtilities() {
  return `
/* Accessibility */
.wf-sr-only { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; clip-path: inset(50%); }

/* Size helpers */
.wf-w-100 { width: 100%; }
.wf-max-w-sm { max-width: 480px; }
.wf-max-w-md { max-width: 720px; }
.wf-max-w-lg { max-width: 960px; }
.wf-max-w-xl { max-width: 1200px; }
.wf-container-fluid { max-width: none !important; }
/* Full-height helpers */
.wf-h-100 { height: 100%; }
.wf-h-screen { height: 100vh; }
.wf-min-h-screen { min-height: 100vh; }

/* Overflow */
.wf-overflow-hidden { overflow: hidden; }
.wf-overflow-auto { overflow: auto; }
.wf-overflow-scroll { overflow: scroll; }

/* Position */
.wf-relative { position: relative; }
.wf-absolute { position: absolute; }
.wf-fixed { position: fixed; }
.wf-sticky { position: sticky; }

/* Z-index (small scale) */
.wf-z-0 { z-index: 0; }
.wf-z-10 { z-index: 10; }
.wf-z-100 { z-index: 100; }
.wf-z-1000 { z-index: 1000; }

/* Opacity */
.wf-opacity-0 { opacity: 0; }
.wf-opacity-50 { opacity: 0.5; }
.wf-opacity-100 { opacity: 1; }

/* Visibility */
.wf-visible { visibility: visible; }
.wf-invisible { visibility: hidden; }

/* Link helper */
.wf-link { color: var(--wf-link-color); text-decoration: none; border-bottom: 1px solid transparent; cursor: pointer; }
.wf-link:hover, .wf-link:focus-visible { color: var(--wf-link-color-hover); border-bottom-color: currentColor; }

/* Text handling */
.wf-text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.wf-text-break { overflow-wrap: anywhere; word-break: break-word; }
.wf-line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.wf-line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

/* Cursor */
.wf-cursor-pointer { cursor: pointer; }
.wf-cursor-not-allowed { cursor: not-allowed; }
.wf-cursor-wait { cursor: wait; }
.wf-cursor-grab { cursor: grab; }

/* Aspect ratio */
.wf-aspect-square { aspect-ratio: 1 / 1; }
.wf-aspect-video { aspect-ratio: 16 / 9; }
.wf-aspect-4-3 { aspect-ratio: 4 / 3; }

/* Scroll snap */
.wf-snap-x { scroll-snap-type: x mandatory; }
.wf-snap-y { scroll-snap-type: y mandatory; }
.wf-snap-start { scroll-snap-align: start; }

/* Animations */
@keyframes wf-fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes wf-slide-up { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes wf-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
.wf-fade-in { animation: wf-fade-in var(--wf-duration-fast) var(--wf-ease-out); }
.wf-slide-up { animation: wf-slide-up var(--wf-duration-fast) var(--wf-ease-out); }
.wf-pulse { animation: wf-pulse var(--wf-pulse-duration, 4s) infinite; }

/* Transitions */
.wf-transition { transition: all var(--wf-duration-fast) var(--wf-ease-out); }
.wf-transition-colors { transition: color var(--wf-duration-fast) var(--wf-ease-out), background-color var(--wf-duration-fast) var(--wf-ease-out), border-color var(--wf-duration-fast) var(--wf-ease-out); }

@media (prefers-reduced-motion: reduce) {
  .wf-fade-in, .wf-slide-up, .wf-pulse { animation: none !important; }
  .wf-transition, .wf-transition-colors { transition: none !important; }
}
`;
}

function generate() {
  const output =
    "@layer utilities {\n" +
    "/* Utilities */\n" +
    generateSpacing() +
    generateGap() +
    generateDisplay() +
    generateFlex() +
    generateGrid() +
    generateText() +
    generateColorUtilities() +
    generateShadowUtilities() +
    generateStaticUtilities() +
    generateResponsive() +
    "}\n";

  const outputPath = path.join(__dirname, "..", "src", "utilities.css");
  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`Generated: ${outputPath}`);
}

// Run if called directly
if (require.main === module) {
  generate();
}

module.exports = { generate };
