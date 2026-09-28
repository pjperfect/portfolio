#!/usr/bin/env node

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
