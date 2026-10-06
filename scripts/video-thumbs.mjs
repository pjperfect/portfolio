#!/usr/bin/env node

// Makes a poster image for every video in ./originals and writes it to
// ./optimized as "<video-name>-thumb.jpg" (the naming assets.ts expects).
// Needs ffmpeg on your PATH (WSL: sudo apt install ffmpeg).
//
//   npm run video-thumbs
//   npm run video-thumbs -- --at 4          grab the frame at 4 seconds
//   npm run video-thumbs -- --in ./clips    read videos from another folder

import { readdir, mkdir } from 'node:fs/promises';
import { extname, basename, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.webm']);
const THUMB_WIDTH = 800;

function parseArgs(argv) {
  const args = { in: './originals', out: './optimized', at: 1 };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--in') args.in = argv[++i];
    if (argv[i] === '--out') args.out = argv[++i];
    if (argv[i] === '--at') args.at = Number(argv[++i]);
  }
  return args;
}

function hasFfmpeg() {
  const probe = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  return probe.status === 0;
}

async function main() {
  const { in: inDir, out: outDir, at } = parseArgs(process.argv.slice(2));

  if (!Number.isFinite(at) || at < 0) {
    console.log('--at must be a number of seconds, e.g. --at 4');
    return;
  }

  if (!hasFfmpeg()) {
    console.log('ffmpeg was not found. Install it first (WSL: sudo apt install ffmpeg).');
    process.exitCode = 1;
    return;
  }

  await mkdir(outDir, { recursive: true });

  let entries;
  try {
    entries = await readdir(inDir, { withFileTypes: true });
  } catch {
    console.log(`Couldn't find "${inDir}". Put your original videos there first.`);
    return;
  }

  const files = entries
    .filter((e) => e.isFile() && VIDEO_EXTENSIONS.has(extname(e.name).toLowerCase()))
    .map((e) => e.name);

  if (files.length === 0) {
    console.log(`No videos found in ${inDir}.`);
    return;
  }

  let done = 0;
  for (const file of files) {
    const stem = basename(file, extname(file));
    const outPath = join(outDir, `${stem}-thumb.jpg`);

    // -ss before -i seeks fast; scale keeps the aspect ratio (-2 = even height).
    const run = spawnSync(
      'ffmpeg',
      [
        '-y',
        '-loglevel', 'error',
        '-ss', String(at),
        '-i', join(inDir, file),
        '-frames:v', '1',
        '-vf', `scale='min(${THUMB_WIDTH},iw)':-2`,
        '-q:v', '4',
        outPath,
      ],
      { encoding: 'utf8' }
    );

    if (run.status !== 0) {
      console.log(`failed ${file}: ${run.stderr.trim() || 'ffmpeg error'}`);
      continue;
    }
    console.log(`wrote ${outPath}`);
    done += 1;
  }

  console.log(`\nDone -- ${done} of ${files.length} thumbnail(s) made.`);
  console.log(`Upload the "-thumb.jpg" files in "${outDir}" to the philip-portfolio-assets S3 bucket next to the videos, then run "npm run deploy".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
