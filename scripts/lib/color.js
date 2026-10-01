/** 色の解析と WCAG 2.x コントラスト比の計算 */

const NAMED = { white: [255, 255, 255, 1], black: [0, 0, 0, 1], transparent: [0, 0, 0, 0] };

function parseColor(str) {
  const s = String(str).trim().toLowerCase();
  if (NAMED[s]) return NAMED[s].slice();
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map(c => c + c).join("");
    const n = [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return [...n, a];
  }
  m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const parts = m[1]
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map(Number);
    return [parts[0], parts[1], parts[2], parts[3] ?? 1];
  }
  throw new Error(`色として解釈できません: ${str}`);
}

/** 半透明色を背景に重ねた結果（不透明）を返す */
function composite(fg, bg) {
  const f = parseColor(fg);
  const b = Array.isArray(bg) ? bg : parseColor(bg);
  const a = f[3];
  return [0, 1, 2].map(i => Math.round(f[i] * a + b[i] * (1 - a))).concat(1);
}

function luminance(c) {
  const [r, g, b] = (Array.isArray(c) ? c : parseColor(c)).map(v => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const x = luminance(a);
  const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

module.exports = { parseColor, composite, luminance, contrast };
