const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const LIMITS = {
  "dist/wafoo-core.min.css": 12 * 1024, // 12KB
  "dist/wafoo.min.css": 25 * 1024, // 25KB
  "dist/wafoo.min.js": 15 * 1024 // 15KB
};

let hasError = false;

console.log("Checking file sizes...");
console.log("----------------------------------------");

for (const [file, limit] of Object.entries(LIMITS)) {
  const filePath = path.join(__dirname, "..", file);

  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] File not found: ${file}`);
    hasError = true;
    continue;
  }

  const content = fs.readFileSync(filePath);
  const gzipped = zlib.gzipSync(content);
  const size = gzipped.length;
  const limitKB = (limit / 1024).toFixed(2);
  const sizeKB = (size / 1024).toFixed(2);

  if (size > limit) {
    console.error(`[FAIL] ${file}: ${sizeKB}KB > ${limitKB}KB limit`);
    hasError = true;
  } else {
    console.log(`[PASS] ${file}: ${sizeKB}KB < ${limitKB}KB limit`);
  }
}

console.log("----------------------------------------");

if (hasError) {
  console.error("Size check failed!");
  process.exit(1);
} else {
  console.log("All checks passed!");
  process.exit(0);
}
