#!/usr/bin/env node
// Generates right-sized WebP + JPEG variants for portfolio images.
//
// The portfolio was serving full-resolution originals (2-2.2MB each) into
// boxes as small as 320x240px, so `loading="lazy"` only delayed the download
// -- it never reduced it. This script fixes the actual cause: it resizes each
// original down to the widths the site actually needs and re-encodes them as
// WebP (plus one JPEG fallback), so what gets downloaded is close to what's
// displayed.
//
// Usage:
//   npm run optimize-images -- --in ./originals --out ./optimized
//
// 1. Put your ORIGINAL, full-resolution image files in --in (default:
//    ./originals). Not the ones currently on S3 -- the source files.
// 2. Run the script. It writes, for every image found:
//      <stem>-400w.webp   <stem>-800w.webp   <stem>-1600w.webp   <stem>-1600w.jpg
//    into --out (default: ./optimized).
// 3. Upload everything in --out to the philip-portfolio-assets S3 bucket
//    (same bucket, flat, alongside the existing files).
// 4. If any filename changed, update the matching `responsive(...)` call in
//    src/config/assets.ts.

import { readdir, mkdir } from 'node:fs/promises';
import { extname, basename, join } from 'node:path';
import sharp from 'sharp';

const WIDTHS = [400, 800, 1600];
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function parseArgs(argv) {
  const args = { in: './originals', out: './optimized' };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--in') args.in = argv[++i];
    if (argv[i] === '--out') args.out = argv[++i];
  }
  return args;
}

async function main() {
  const { in: inDir, out: outDir } = parseArgs(process.argv.slice(2));
  await mkdir(outDir, { recursive: true });

  let entries;
  try {
    entries = await readdir(inDir, { withFileTypes: true });
  } catch {
    console.log(`Couldn't find "${inDir}". Create it and drop your original images in first.`);
    return;
  }

  const files = entries
    .filter((e) => e.isFile() && IMAGE_EXTENSIONS.has(extname(e.name).toLowerCase()))
    .map((e) => e.name);

  if (files.length === 0) {
    console.log(`No images found in ${inDir}. Drop your original, full-resolution files there first.`);
    return;
  }

  for (const file of files) {
    const stem = basename(file, extname(file));
    const inputPath = join(inDir, file);

    for (const width of WIDTHS) {
      const outPath = join(outDir, `${stem}-${width}w.webp`);
      await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78 })
        .toFile(outPath);
      console.log(`wrote ${outPath}`);
    }

    // Single JPEG fallback (for the <img> inside <picture>, and any tool that
    // doesn't understand <source>), sized to the widest breakpoint.
    const fallbackPath = join(outDir, `${stem}-1600w.jpg`);
    await sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(fallbackPath);
    console.log(`wrote ${fallbackPath}`);
  }

  console.log(`\nDone -- ${files.length} image(s) processed.`);
  console.log(`Upload everything in "${outDir}" to the philip-portfolio-assets S3 bucket, then run "npm run deploy".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
