// dump-source.mjs
//
// Usage (run from your project root, next to package.json):
//   node dump-source.mjs            -> dumps everything in ./src
//   node dump-source.mjs .          -> dumps the whole project
//   node dump-source.mjs src/pages  -> dumps just that folder
//
// Writes every text file's path + contents into one file
// (source-dump.txt) that you can upload here directly.

import fs from "node:fs";
import path from "node:path";

const target = process.argv[2] || "src";
const ROOT = path.resolve(process.cwd(), target);
const OUTPUT_FILE = path.resolve(process.cwd(), "source-dump.txt");

const EXCLUDE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", ".vite", ".vscode", ".idea",
]);
const EXCLUDE_FILES = new Set(["package-lock.json", "source-dump.txt"]);
const BINARY_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico",
  ".woff", ".woff2", ".ttf", ".eot", ".mp4", ".mp3", ".pdf",
]);

let output = "";
let fileCount = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
    } else {
      if (EXCLUDE_FILES.has(entry.name)) continue;
      if (BINARY_EXT.has(path.extname(entry.name).toLowerCase())) continue;

      const relPath = path.relative(process.cwd(), fullPath);
      const content = fs.readFileSync(fullPath, "utf8");
      output += `\n\n===== ${relPath} =====\n${content}`;
      fileCount++;
    }
  }
}

if (!fs.existsSync(ROOT)) {
  console.error(`No such folder: ${ROOT}`);
  process.exit(1);
}

walk(ROOT);
fs.writeFileSync(OUTPUT_FILE, output.trim(), "utf8");
console.log(
  `Wrote ${OUTPUT_FILE} — ${fileCount} files, ${(output.length / 1024).toFixed(1)} KB`
);
