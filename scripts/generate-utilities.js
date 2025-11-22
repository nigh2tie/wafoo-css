#!/usr/bin/env node
/**
 * Utility class generator for wafoo-css
 * Generates repetitive utility classes from config
 */

const fs = require("fs");
const path = require("path");

const config = {
  spacing: {
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20],
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
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20]
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
    sizes: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    align: ["left", "center", "right", "justify"]
  },
  border: {
    widths: [0, 1, 2, 4, 8],
    radius: ["none", "sm", "md", "lg", "full"]
  },
  sizing: {
    widths: ["1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "full", "screen", "auto"],
    heights: ["1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "full", "screen", "auto"],
    fixed: [0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96], // Added 96 (384px)
    minMax: ["0", "full", "screen", "min", "max", "fit", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"]
  },
  effects: {
    opacity: [0, 50, 100],
    scale: [0, 50, 75, 90, 95, 100, 105, 110],
    ringWidths: [0, 1, 2, 4, 8],
    outlineWidths: [0, 1, 2, 4, 8]
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
    // Simple mapping for now, ideally should be in tokens
    let val;
    if (["xs", "sm", "md", "lg", "xl"].includes(size)) {
       val = size === "xs" ? "calc(var(--wf-font-sm) - 2px)" : `var(--wf-font-${size})`;
    } else {
       // Fallback for larger sizes if not in tokens
       const map = { "2xl": "1.5rem", "3xl": "1.875rem", "4xl": "2.25rem" };
       val = map[size];
    }
    if (val) css += `.wf-text-${size} { font-size: ${val}; }\n`;
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

  const textColors = {
    accent: "var(--wf-color-accent)",
    primary: "var(--wf-primary-bg)",
    muted: "var(--wf-color-muted)",
    success: "var(--wf-success)",
    warning: "var(--wf-warning)",
    danger: "var(--wf-danger)",
    link: "var(--wf-link-color)",
    white: "#ffffff",
    black: "#000000"
  };

  const bgColors = {
    accent: "var(--wf-color-accent)",
    primary: "var(--wf-primary-bg)",
    surface: "var(--wf-surface-base)",
    "surface-subtle": "var(--wf-surface-subtle)",
    "surface-muted": "var(--wf-surface-muted)",
    success: "var(--wf-success)",
    warning: "var(--wf-warning)",
    danger: "var(--wf-danger)",
    white: "#ffffff",
    black: "#000000",
    transparent: "transparent"
  };

  const borderColors = {
    accent: "var(--wf-color-accent)",
    primary: "var(--wf-primary-bg)",
    subtle: "var(--wf-color-border-subtle)",
    strong: "var(--wf-color-border-strong)",
    DEFAULT: "var(--wf-color-border)",
    transparent: "transparent"
  };

  // Text colors
  for (const [name, value] of Object.entries(textColors)) {
    css += `.wf-text-${name} { color: ${value}; }\n`;
    css += `.wf-hover\\:text-${name}:hover { color: ${value}; }\n`;
    css += `.wf-focus\\:text-${name}:focus-visible { color: ${value}; }\n`;
    css += `.wf-active\\:text-${name}:active { color: ${value}; }\n`;
    css += `.wf-disabled\\:text-${name}:disabled { color: ${value}; }\n`;
  }

  // Background colors
  for (const [name, value] of Object.entries(bgColors)) {
    css += `.wf-bg-${name} { background-color: ${value}; }\n`;
    css += `.wf-hover\\:bg-${name}:hover { background-color: ${value}; }\n`;
    css += `.wf-focus\\:bg-${name}:focus-visible { background-color: ${value}; }\n`;
    css += `.wf-active\\:bg-${name}:active { background-color: ${value}; }\n`;
    css += `.wf-disabled\\:bg-${name}:disabled { background-color: ${value}; }\n`;
  }

  // Border colors
  for (const [name, value] of Object.entries(borderColors)) {
    const className = name === "DEFAULT" ? "border" : `border-${name}`;
    css += `.wf-${className} { border-color: ${value}; }\n`;
    css += `.wf-hover\\:${className}:hover { border-color: ${value}; }\n`;
    css += `.wf-focus\\:${className}:focus-visible { border-color: ${value}; }\n`;
    css += `.wf-active\\:${className}:active { border-color: ${value}; }\n`;
    css += `.wf-disabled\\:${className}:disabled { border-color: ${value}; }\n`;
  }
  
  // Ring/Outline Colors (reusing border colors for simplicity)
  for (const [name, value] of Object.entries(borderColors)) {
     css += `.wf-ring-${name} { --wf-ring-color: ${value}; }\n`;
     css += `.wf-outline-${name} { outline-color: ${value}; }\n`;
  }

  return css;
}

function generateBorderUtilities() {
  let css = "\n/* Border utilities */\n";

  // Widths
  for (const width of config.border.widths) {
    const className = width === 1 ? "border" : `border-${width}`;
    const value = width === 0 ? "0" : `${width}px`;
    const style = width === 0 ? "none" : "solid";
    
    css += `.wf-${className} { border-width: ${value}; border-style: ${style}; }\n`;
    
    // Side specific borders
    if (width > 0) {
      css += `.wf-border-t-${width} { border-top-width: ${value}; border-top-style: ${style}; }\n`;
      css += `.wf-border-r-${width} { border-right-width: ${value}; border-right-style: ${style}; }\n`;
      css += `.wf-border-b-${width} { border-bottom-width: ${value}; border-bottom-style: ${style}; }\n`;
      css += `.wf-border-l-${width} { border-left-width: ${value}; border-left-style: ${style}; }\n`;
    }
  }

  // Radius
  for (const radius of config.border.radius) {
    const varName = radius === "none" ? "0" : `var(--wf-radius-${radius})`;
    css += `.wf-rounded-${radius} { border-radius: ${varName}; }\n`;
    
    // Side specific radius
    if (radius !== "none") {
      css += `.wf-rounded-t-${radius} { border-top-left-radius: ${varName}; border-top-right-radius: ${varName}; }\n`;
      css += `.wf-rounded-r-${radius} { border-top-right-radius: ${varName}; border-bottom-right-radius: ${varName}; }\n`;
      css += `.wf-rounded-b-${radius} { border-bottom-right-radius: ${varName}; border-bottom-left-radius: ${varName}; }\n`;
      css += `.wf-rounded-l-${radius} { border-bottom-left-radius: ${varName}; border-top-left-radius: ${varName}; }\n`;
    }
  }
  // Default rounded
  css += `.wf-rounded { border-radius: var(--wf-radius-md); }\n`;

  return css;
}

function generateSizingUtilities() {
  let css = "\n/* Sizing utilities */\n";

  // Percentage Widths
  for (const width of config.sizing.widths) {
    let value;
    if (width === "full") value = "100%";
    else if (width === "screen") value = "100vw";
    else if (width === "auto") value = "auto";
    else {
      const [num, den] = width.split("/");
      value = `${(parseInt(num) / parseInt(den)) * 100}%`;
    }
    const className = width.replace("/", "\\/");
    css += `.wf-w-${className} { width: ${value}; }\n`;
  }

  // Percentage Heights
  for (const height of config.sizing.heights) {
    let value;
    if (height === "full") value = "100%";
    else if (height === "screen") value = "100vh";
    else if (height === "auto") value = "auto";
    else {
      const [num, den] = height.split("/");
      value = `${(parseInt(num) / parseInt(den)) * 100}%`;
    }
    const className = height.replace("/", "\\/");
    css += `.wf-h-${className} { height: ${value}; }\n`;
  }

  // Fixed Sizing
  for (const size of config.sizing.fixed) {
    const value = size === 0 ? "0" : `${size * 4}px`; // 4px scale
    css += `.wf-w-${size} { width: ${value}; }\n`;
    css += `.wf-h-${size} { height: ${value}; }\n`;
  }

  // Min/Max Width/Height
  const sizeMap = {
      "0": "0px", "full": "100%", "screen": "100vh", "min": "min-content", "max": "max-content", "fit": "fit-content",
      "xs": "20rem", "sm": "24rem", "md": "28rem", "lg": "32rem", "xl": "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem"
  };

  for (const val of config.sizing.minMax) {
    let value = sizeMap[val] || val;
    if (val === "screen") {
        css += `.wf-min-w-screen { min-width: 100vw; }\n`;
        css += `.wf-min-h-screen { min-height: 100vh; }\n`;
        css += `.wf-max-w-screen { max-width: 100vw; }\n`;
        css += `.wf-max-h-screen { max-height: 100vh; }\n`;
    } else {
        css += `.wf-min-w-${val} { min-width: ${value}; }\n`;
        css += `.wf-min-h-${val} { min-height: ${value}; }\n`;
        css += `.wf-max-w-${val} { max-width: ${value}; }\n`;
        css += `.wf-max-h-${val} { max-height: ${value}; }\n`;
    }
  }

  return css;
}

function generateEffectUtilities() {
    let css = "\n/* Effect utilities (Opacity, Scale, Ring, Outline) */\n";
    
    // Opacity
    for (const val of config.effects.opacity) {
        css += `.wf-opacity-${val} { opacity: ${val / 100}; }\n`;
        css += `.wf-hover\\:opacity-${val}:hover { opacity: ${val / 100}; }\n`;
        css += `.wf-focus\\:opacity-${val}:focus-visible { opacity: ${val / 100}; }\n`;
        css += `.wf-disabled\\:opacity-${val}:disabled { opacity: ${val / 100}; }\n`;
    }

    // Scale
    for (const val of config.effects.scale) {
        css += `.wf-scale-${val} { transform: scale(${val / 100}); }\n`;
        css += `.wf-hover\\:scale-${val}:hover { transform: scale(${val / 100}); }\n`;
    }

    // Ring
    css += `.wf-ring { box-shadow: 0 0 0 var(--wf-ring-width, 3px) var(--wf-ring-color, rgba(59, 130, 246, 0.5)); }\n`;
    css += `.wf-focus\\:ring:focus-visible { box-shadow: 0 0 0 var(--wf-ring-width, 3px) var(--wf-ring-color, rgba(59, 130, 246, 0.5)); outline: none; }\n`;
    css += `.wf-active\\:ring:active { box-shadow: 0 0 0 var(--wf-ring-width, 3px) var(--wf-ring-color, rgba(59, 130, 246, 0.5)); outline: none; }\n`;
    css += `.wf-disabled\\:ring:disabled { box-shadow: none; }\n`;
    
    for (const width of config.effects.ringWidths) {
        const val = width + "px";
        css += `.wf-ring-${width} { --wf-ring-width: ${val}; }\n`;
    }

    // Outline
    css += `.wf-outline { outline-style: solid; }\n`;
    for (const width of config.effects.outlineWidths) {
        css += `.wf-outline-${width} { outline-width: ${width}px; }\n`;
    }
    css += `.wf-outline-none { outline: 2px solid transparent; outline-offset: 2px; }\n`;
    css += `.wf-focus\\:outline-none:focus-visible { outline: 2px solid transparent; outline-offset: 2px; }\n`;

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
    css += `  .wf-${bp}-block { display: block; }\n`;
    css += `  .wf-${bp}-inline { display: inline; }\n`;
    css += `  .wf-${bp}-inline-block { display: inline-block; }\n`;

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
    
    // Widths (responsive)
    for (const width of ["full", "1/2", "1/3", "2/3", "1/4"]) {
       let value;
       if (width === "full") value = "100%";
       else {
         const [num, den] = width.split("/");
         value = `${(parseInt(num) / parseInt(den)) * 100}%`;
       }
       const className = width.replace("/", "\\/");
       css += `  .wf-${bp}-w-${className} { width: ${value}; }\n`;
    }

    css += `}\n`;
  }

  return css;
}

function generateCoreStaticUtilities() {
  return `
/* Accessibility */
.wf-sr-only { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; clip-path: inset(50%); }

/* Size helpers (Legacy & Static) */
.wf-w-100 { width: 100%; }
.wf-max-w-sm { max-width: 480px; }
.wf-max-w-md { max-width: 720px; }
.wf-max-w-lg { max-width: 960px; }
.wf-max-w-xl { max-width: 1200px; }
.wf-container-fluid { max-width: none !important; }
.wf-h-100 { height: 100%; }
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

/* Transitions */
.wf-transition { transition: all var(--wf-duration-fast) var(--wf-ease-out); }
.wf-transition-colors { transition: color var(--wf-duration-fast) var(--wf-ease-out), background-color var(--wf-duration-fast) var(--wf-ease-out), border-color var(--wf-duration-fast) var(--wf-ease-out); }

@media (prefers-reduced-motion: reduce) {
  .wf-transition, .wf-transition-colors { transition: none !important; }
}
`;
}



function generate() {
  // Core Utilities
  const coreOutput =
    "@layer utilities {\n" +
    "/* Core Utilities */\n" +
    generateSpacing() +
    generateGap() +
    generateDisplay() +
    generateFlex() +
    generateGrid() +
    generateText() +
    generateColorUtilities() +
    generateCoreBorderUtilities() + // New function for core borders
    generateCoreSizingUtilities() + // New function for core sizing
    generateShadowUtilities() +
    generateCoreStaticUtilities() + // Core static
    generateResponsive() +
    "}\n";

  const corePath = path.join(__dirname, "..", "src", "utilities-core.css");
  fs.writeFileSync(corePath, coreOutput, "utf8");
  console.log(`Generated: ${corePath}`);

  // Extras Utilities
  const extrasOutput =
    "@layer utilities {\n" +
    "/* Extras Utilities */\n" +
    generateExtendedBorderUtilities() + // Extended borders
    generateExtendedSizingUtilities() + // Extended sizing
    generateEffectUtilities() + // Effects
    "}\n";

  const extrasPath = path.join(__dirname, "..", "src", "utilities-extras.css");
  fs.writeFileSync(extrasPath, extrasOutput, "utf8");
  console.log(`Generated: ${extrasPath}`);
}

// Helper functions for split generation

function generateCoreBorderUtilities() {
  let css = "\n/* Border utilities (Core) */\n";
  // Widths (simple)
  for (const width of config.border.widths) {
    const className = width === 1 ? "border" : `border-${width}`;
    const value = width === 0 ? "0" : `${width}px`;
    const style = width === 0 ? "none" : "solid";
    css += `.wf-${className} { border-width: ${value}; border-style: ${style}; }\n`;
  }
  // Radius (simple)
  for (const radius of config.border.radius) {
    const varName = radius === "none" ? "0" : `var(--wf-radius-${radius})`;
    css += `.wf-rounded-${radius} { border-radius: ${varName}; }\n`;
  }
  css += `.wf-rounded { border-radius: var(--wf-radius-md); }\n`;
  return css;
}

function generateExtendedBorderUtilities() {
  let css = "\n/* Border utilities (Extras) */\n";
  // Side specific borders
  for (const width of config.border.widths) {
    if (width > 0) {
      const value = `${width}px`;
      const style = "solid";
      css += `.wf-border-t-${width} { border-top-width: ${value}; border-top-style: ${style}; }\n`;
      css += `.wf-border-r-${width} { border-right-width: ${value}; border-right-style: ${style}; }\n`;
      css += `.wf-border-b-${width} { border-bottom-width: ${value}; border-bottom-style: ${style}; }\n`;
      css += `.wf-border-l-${width} { border-left-width: ${value}; border-left-style: ${style}; }\n`;
    }
  }
  // Side specific radius
  for (const radius of config.border.radius) {
    if (radius !== "none") {
      const varName = `var(--wf-radius-${radius})`;
      css += `.wf-rounded-t-${radius} { border-top-left-radius: ${varName}; border-top-right-radius: ${varName}; }\n`;
      css += `.wf-rounded-r-${radius} { border-top-right-radius: ${varName}; border-bottom-right-radius: ${varName}; }\n`;
      css += `.wf-rounded-b-${radius} { border-bottom-right-radius: ${varName}; border-bottom-left-radius: ${varName}; }\n`;
      css += `.wf-rounded-l-${radius} { border-bottom-left-radius: ${varName}; border-top-left-radius: ${varName}; }\n`;
    }
  }
  
  // Add state variants to borders (missing in previous implementation)
  // Note: Adding states to all border utilities might be too heavy, sticking to requested scope.
  // User asked for "disabled:border-*".
  // Let's add generic disabled border utility
  css += `.wf-disabled\\:border-transparent:disabled { border-color: transparent; }\n`;
  
  return css;
}

function generateCoreSizingUtilities() {
  let css = "\n/* Sizing utilities (Core) */\n";
  // Percentage Widths (Common only)
  const commonWidths = ["full", "screen", "1/2", "1/3", "2/3", "1/4"];
  for (const width of commonWidths) {
    let value;
    if (width === "full") value = "100%";
    else if (width === "screen") value = "100vw";
    else {
      const [num, den] = width.split("/");
      value = `${(parseInt(num) / parseInt(den)) * 100}%`;
    }
    const className = width.replace("/", "\\/");
    css += `.wf-w-${className} { width: ${value}; }\n`;
  }
  
  // Fixed Sizing (Small set)
  const coreFixed = [0, 1, 2, 4, 8, 16, 32];
  for (const size of coreFixed) {
    const value = size === 0 ? "0" : `${size * 4}px`;
    css += `.wf-w-${size} { width: ${value}; }\n`;
    css += `.wf-h-${size} { height: ${value}; }\n`;
  }
  
  return css;
}

function generateExtendedSizingUtilities() {
  let css = "\n/* Sizing utilities (Extras) */\n";
  
  // Remaining Percentage Widths
  const allWidths = config.sizing.widths;
  const commonWidths = ["full", "screen", "1/2", "1/3", "2/3", "1/4"];
  const extraWidths = allWidths.filter(w => !commonWidths.includes(w));
  
  for (const width of extraWidths) {
    let value;
    if (width === "auto") value = "auto";
    else {
      const [num, den] = width.split("/");
      value = `${(parseInt(num) / parseInt(den)) * 100}%`;
    }
    const className = width.replace("/", "\\/");
    css += `.wf-w-${className} { width: ${value}; }\n`;
  }

  // All Heights (Core had none except fixed)
  for (const height of config.sizing.heights) {
    let value;
    if (height === "full") value = "100%";
    else if (height === "screen") value = "100vh";
    else if (height === "auto") value = "auto";
    else {
      const [num, den] = height.split("/");
      value = `${(parseInt(num) / parseInt(den)) * 100}%`;
    }
    const className = height.replace("/", "\\/");
    css += `.wf-h-${className} { height: ${value}; }\n`;
  }

  // Remaining Fixed Sizing
  const coreFixed = [0, 1, 2, 4, 8, 16, 32];
  const extraFixed = config.sizing.fixed.filter(s => !coreFixed.includes(s));
  for (const size of extraFixed) {
    const value = size === 0 ? "0" : `${size * 4}px`;
    css += `.wf-w-${size} { width: ${value}; }\n`;
    css += `.wf-h-${size} { height: ${value}; }\n`;
  }

  // Min/Max Width/Height
  const sizeMap = {
      "0": "0px", "full": "100%", "screen": "100vh", "min": "min-content", "max": "max-content", "fit": "fit-content",
      "xs": "20rem", "sm": "24rem", "md": "28rem", "lg": "32rem", "xl": "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem"
  };

  for (const val of config.sizing.minMax) {
    let value = sizeMap[val] || val;
    const isScale = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"].includes(val);

    if (val === "screen") {
        css += `.wf-min-w-screen { min-width: 100vw; }\n`;
        css += `.wf-min-h-screen { min-height: 100vh; }\n`;
        css += `.wf-max-w-screen { max-width: 100vw; }\n`;
        css += `.wf-max-h-screen { max-height: 100vh; }\n`;
    } else {
        css += `.wf-min-w-${val} { min-width: ${value}; }\n`;
        css += `.wf-max-w-${val} { max-width: ${value}; }\n`;
        
        if (!isScale) {
            css += `.wf-min-h-${val} { min-height: ${value}; }\n`;
            css += `.wf-max-h-${val} { max-height: ${value}; }\n`;
        }
    }
  }

  return css;
}

// Run if called directly
if (require.main === module) {
  generate();
}

module.exports = { generate };
