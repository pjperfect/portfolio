#!/usr/bin/env node

// Converts the portfolio's visible copy to British English.
//
//   npm run british                 dry run: lists every change, writes nothing
//   npm run british:write           applies the changes
//   node scripts/britishise.mjs --check          exits 1 if anything is left to change
//   node scripts/britishise.mjs src/app/components/About.tsx README.md   specific files
//
// What it changes
//   Spelling   -ize -> -ise, -or -> -our, -er -> -re, doubled l (travelled, fulfil),
//              -ogue, -ence, ae/oe, grey, aluminium, and a few vocabulary swaps.
//   Units      "1-meter" -> "1-metre", kilometer -> kilometre, liter -> litre.
//   Dates      "October 17, 2026" -> "17 October 2026", "04th May" -> "4th May".
//   HTML       <html lang="en"> -> lang="en-GB".
//
// What it never touches
//   Code. Only text a visitor can read is rewritten: JSX text, prose strings, template
//   text and the description/title meta tags. Identifiers, CSS classes, URLs, import paths,
//   asset file names (src/config/assets.ts is skipped outright) and code samples are left alone.
//   Hyphenated compounds such as "user-centered" are also left alone, because Tailwind
//   class names are hyphenated; those are rare, so fix them by hand if they appear.
//
// Judgement calls (program/programme, license/licence, dialog, "meter" the device versus
// "metre" the length and imperial units) are never changed automatically. They are printed under "Review by hand" so you decide.
//
// Safe to run repeatedly: a second run finds nothing to change.

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname, basename, resolve } from 'node:path';

/* ------------------------------------------------------------------ */
/* 1. Word list (American -> British)                                  */
/* ------------------------------------------------------------------ */

const PAIRS = new Map();
const add = (us, uk) => PAIRS.set(us.toLowerCase(), uk.toLowerCase());
const addAll = (pairs) => pairs.forEach(([us, uk]) => add(us, uk));

// Applies a list of [usSuffix, ukSuffix] endings to each stem.
const family = (stems, endings) =>
  stems.forEach((stem) => endings.forEach(([us, uk]) => add(stem + us, stem + uk)));

// -ize -> -ise is a general rule (see IZE_RE), not a word list, so unlisted words are covered too.

// -yze -> -yse
family(
  ['analy', 'paraly', 'cataly', 'breathaly'],
  [
    ['ze', 'se'], ['zed', 'sed'], ['zes', 'ses'], ['zing', 'sing'],
    ['zer', 'ser'], ['zers', 'sers'], ['zable', 'sable'],
  ]
);

// -or -> -our
family(
  [
    'col', 'hon', 'behavi', 'fav', 'neighb', 'hum', 'flav', 'rum', 'vap', 'savi',
    'endeav', 'arm', 'od', 'tum', 'clam', 'val', 'glam', 'splend', 'parl', 'cand',
    'ferv', 'demean', 'ard',
  ],
  [
    ['or', 'our'], ['ors', 'ours'], ['ored', 'oured'], ['oring', 'ouring'],
    ['orful', 'ourful'], ['orfully', 'ourfully'], ['orless', 'ourless'],
    ['orist', 'ourist'], ['orable', 'ourable'], ['orite', 'ourite'],
    ['orites', 'ourites'], ['oral', 'oural'], ['orally', 'ourally'],
    ['orhood', 'ourhood'], ['orhoods', 'ourhoods'], ['orize', 'ourise'],
    ['orized', 'ourised'], ['orizing', 'ourising'],
  ]
);

// -er -> -re
family(
  ['cent', 'theat', 'fib', 'somb', 'spect', 'lust', 'meag', 'calib'],
  [
    ['er', 're'], ['ers', 'res'], ['ered', 'red'], ['ering', 'ring'],
    ['erpiece', 'repiece'], ['erpieces', 'repieces'], ['erglass', 'reglass'],
  ]
);
addAll([
  ['maneuver', 'manoeuvre'], ['maneuvers', 'manoeuvres'],
  ['maneuvered', 'manoeuvred'], ['maneuvering', 'manoeuvring'],
]);

// Metric units that are always lengths or volumes. Plain "meter" is handled separately,
// because the device (an electricity meter) keeps its spelling.
['kilo', 'centi', 'milli', 'deci', 'hecto', 'nano'].forEach((prefix) => {
  add(`${prefix}meter`, `${prefix}metre`);
  add(`${prefix}meters`, `${prefix}metres`);
});
['', 'kilo', 'centi', 'milli', 'deci', 'micro'].forEach((prefix) => {
  add(`${prefix}liter`, `${prefix}litre`);
  add(`${prefix}liters`, `${prefix}litres`);
});

// Doubled consonants and other -l- spellings
addAll([
  ['traveled', 'travelled'], ['traveling', 'travelling'], ['traveler', 'traveller'],
  ['travelers', 'travellers'], ['canceled', 'cancelled'], ['canceling', 'cancelling'],
  ['cancelation', 'cancellation'], ['labeled', 'labelled'], ['labeling', 'labelling'],
  ['modeled', 'modelled'], ['modeling', 'modelling'], ['modeler', 'modeller'],
  ['modelers', 'modellers'], ['signaled', 'signalled'], ['signaling', 'signalling'],
  ['fueled', 'fuelled'], ['fueling', 'fuelling'], ['leveled', 'levelled'],
  ['leveling', 'levelling'], ['channeled', 'channelled'], ['channeling', 'channelling'],
  ['counselor', 'counsellor'], ['counselors', 'counsellors'],
  ['counseling', 'counselling'], ['jeweler', 'jeweller'], ['jewelers', 'jewellers'],
  ['jewelry', 'jewellery'], ['enrollment', 'enrolment'], ['enrollments', 'enrolments'],
  ['enroll', 'enrol'], ['enrolls', 'enrols'], ['fulfill', 'fulfil'],
  ['fulfills', 'fulfils'], ['fulfillment', 'fulfilment'],
  ['fulfillments', 'fulfilments'], ['skillful', 'skilful'], ['skillfully', 'skilfully'],
  ['willful', 'wilful'], ['willfully', 'wilfully'], ['installment', 'instalment'],
  ['installments', 'instalments'], ['instill', 'instil'], ['instills', 'instils'],
  ['distill', 'distil'], ['distills', 'distils'], ['dialed', 'dialled'],
  ['dialing', 'dialling'], ['totaled', 'totalled'], ['totaling', 'totalling'],
  ['equaled', 'equalled'], ['equaling', 'equalling'], ['marvelous', 'marvellous'],
  ['tunneled', 'tunnelled'], ['tunneling', 'tunnelling'], ['paneled', 'panelled'],
  ['paneling', 'panelling'], ['worshiped', 'worshipped'], ['worshiping', 'worshipping'],
  ['worshiper', 'worshipper'], ['tranquility', 'tranquillity'],
  ['cataloged', 'catalogued'], ['cataloging', 'cataloguing'],
]);

// -ogue, -ence, ae/oe
addAll([
  ['catalog', 'catalogue'], ['catalogs', 'catalogues'], ['analog', 'analogue'],
  ['analogs', 'analogues'], ['monolog', 'monologue'], ['monologs', 'monologues'],
  ['epilog', 'epilogue'], ['defense', 'defence'], ['defenses', 'defences'],
  ['offense', 'offence'], ['offenses', 'offences'], ['pretense', 'pretence'],
  ['pretenses', 'pretences'], ['esthetic', 'aesthetic'], ['esthetics', 'aesthetics'],
  ['esthetically', 'aesthetically'], ['pediatric', 'paediatric'],
  ['pediatrician', 'paediatrician'], ['anesthesia', 'anaesthesia'],
  ['anesthetic', 'anaesthetic'], ['anemia', 'anaemia'], ['anemic', 'anaemic'],
  ['encyclopedia', 'encyclopaedia'], ['orthopedic', 'orthopaedic'],
  ['orthopedics', 'orthopaedics'], ['hemorrhage', 'haemorrhage'],
  ['leukemia', 'leukaemia'], ['diarrhea', 'diarrhoea'], ['edema', 'oedema'],
  ['fetus', 'foetus'], ['archeology', 'archaeology'], ['archeological', 'archaeological'],
  ['archeologist', 'archaeologist'], ['gynecology', 'gynaecology'],
  ['estrogen', 'oestrogen'],
]);

// Everyday spellings and vocabulary
addAll([
  ['gray', 'grey'], ['grays', 'greys'], ['grayed', 'greyed'], ['graying', 'greying'],
  ['grayish', 'greyish'], ['grayscale', 'greyscale'], ['aluminum', 'aluminium'],
  ['plow', 'plough'], ['plows', 'ploughs'], ['plowed', 'ploughed'],
  ['plowing', 'ploughing'], ['mold', 'mould'], ['molds', 'moulds'],
  ['molded', 'moulded'], ['molding', 'moulding'], ['moldy', 'mouldy'],
  ['skeptic', 'sceptic'], ['skeptics', 'sceptics'], ['skeptical', 'sceptical'],
  ['skepticism', 'scepticism'], ['skeptically', 'sceptically'], ['sulfur', 'sulphur'],
  ['pajamas', 'pyjamas'], ['mustache', 'moustache'], ['mustaches', 'moustaches'],
  ['cozy', 'cosy'], ['mom', 'mum'], ['moms', 'mums'], ['math', 'maths'],
  ['acknowledgment', 'acknowledgement'], ['acknowledgments', 'acknowledgements'],
  ['aging', 'ageing'], ['airplane', 'aeroplane'], ['airplanes', 'aeroplanes'],
  ['toward', 'towards'], ['afterward', 'afterwards'], ['sidewalk', 'pavement'],
  ['sidewalks', 'pavements'], ['soccer', 'football'], ['cell phone', 'mobile phone'],
  ['cell phones', 'mobile phones'], ['zip code', 'postcode'], ['zip codes', 'postcodes'],
  ['parking lot', 'car park'], ['parking lots', 'car parks'], ['trash can', 'bin'],
  ['trash cans', 'bins'], ['flashlight', 'torch'], ['flashlights', 'torches'],
  ['movie', 'film'], ['movies', 'films'], ['vacation', 'holiday'],
  ['vacations', 'holidays'],
]);

/* ------------------------------------------------------------------ */
/* 2. Patterns                                                          */
/* ------------------------------------------------------------------ */

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const WORD_KEYS = [...PAIRS.keys()].sort((a, b) => b.length - a.length);

// A word counts only when it stands alone: not glued to identifier characters, hyphens,
// slashes, dots (property access, file names) or colons (CSS-style "color: red").
const WORD_RE = new RegExp(
  `(?<![A-Za-z0-9_$\\-./:#@%])(${WORD_KEYS.map(escapeRe).join('|')})` +
    `(?![A-Za-z0-9_$\\-/:@#%(])(?!\\.[A-Za-z])`,
  'gi'
);

const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
// "October 17, 2026" and "October 17th 2026" -> "17 October 2026" ("17th October 2026")
const US_DATE_RE = new RegExp(`\\b(${MONTHS})\\s+(\\d{1,2})(st|nd|rd|th)?,?\\s+(\\d{4})\\b`, 'g');
// "04th" -> "4th"
const ZERO_ORDINAL_RE = /\b0([1-9])(st|nd|rd|th)\b/g;
// "1-meter", "2 meters", "0.5meter" -> metre. The digit requirement keeps electricity meters intact.
const NUMERIC_METER_RE = /(\d[\d.,]*[\s-]?)(meter)(s?)(?![A-Za-z0-9_])/gi;

// Things that need a human decision. Reported, never changed.
const REVIEW_RULES = [
  { re: /\bprograms?\b/gi, note: 'program or programme? Use "programme" for a course or scheme; keep "program" for software' },
  { re: /\blicen[cs]e[sd]?\b/gi, note: 'licence (noun) or license (verb)?' },
  { re: /\bdialogs?\b/gi, note: 'dialogue (conversation) or dialog (software window)?' },
  { re: /\btires?\b/gi, note: 'tyre (wheel) or tire (become weary)?' },
  { re: /\bcurbs?\b/gi, note: 'kerb (road edge) or curb (restrain)?' },
  { re: /\br[eé]sum[eé]s?\b/gi, note: 'say "CV" in British English' },
  { re: /\bgotten\b/gi, note: '"got" in British English' },
  { re: /\bmeters?\b/gi, note: 'meter (device) or metre (length)? Numeric cases such as "2 meters" are changed automatically' },
  {
    re: /\d[\d.,]*\s?(?:inch(?:es)?|feet|foot|ft|lbs?|pounds?|ounces?|oz|gallons?|miles?|yards?)\b/gi,
    note: 'imperial unit: convert to metric yourself, because the number changes too',
  },
];

// Any -ize word becomes -ise, except real "size" words (size, resize, oversize...) and prize, seize, maize.
// Check names in the dry run: a name such as "Elize" would be caught by the rule too.
const IZE_RE = new RegExp(
  `(?<![A-Za-z0-9_$\\-./:#@%])([A-Za-z]{3,})iz(ations?|able|ing|ers?|ed|es|e)` +
    `(?![A-Za-z0-9_$\\-/:@#%(])(?!\\.[A-Za-z])`,
  'gi'
);
const NOT_IZE_RE = /^(?:(?:re|over|under|down|up|out|super|auto|mini|max|min|font|large|small|pint|bite|king|queen|full|half|one|plus|cap|as)?siz(?:e|ed|es|ing)|prize[sd]?|prizing|seize[sd]?|seizing|maize)$/i;

/* ------------------------------------------------------------------ */
/* 3. Deciding which text is prose                                      */
/* ------------------------------------------------------------------ */

// Attribute and object-key names whose values are code, never copy.
const PROTECTED_KEYS = new Set([
  'classname', 'class', 'href', 'src', 'srcset', 'sizes', 'type', 'id', 'key', 'd',
  'viewbox', 'fill', 'stroke', 'target', 'rel', 'to', 'variant', 'loading', 'decoding',
  'as', 'htmlfor', 'style', 'xmlns', 'autocomplete', 'tabindex', 'fallback', 'url',
  'kind', 'videoid', 'thumbnail', 'poster', 'span', 'bg', 'github', 'live',
  'detailpage', 'icon', 'code', 'base', 'path', 'mode', 'align',
]);

function keyBefore(src, index) {
  const before = src.slice(Math.max(0, index - 60), index);
  const m = /([A-Za-z_$][\w$-]*)\s*(?:=\s*\{?|:)\s*$/.exec(before);
  return m ? m[1].toLowerCase() : null;
}

function isImportSpecifier(src, index) {
  return /\b(?:from|import|require)\s*\(?\s*$/.test(src.slice(Math.max(0, index - 30), index));
}

function looksLikeCode(text) {
  return /#include|;\s*\n|=>\s*\{|\bfunction\s*\(/.test(text);
}

function isProseString(inner, src, index) {
  if (isImportSpecifier(src, index)) return false;
  const key = keyBefore(src, index);
  if (key && PROTECTED_KEYS.has(key)) return false;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(inner) || /^(?:\/|\.{1,2}\/|@\/)/.test(inner)) return false;
  if (looksLikeCode(inner)) return false;
  if (/\s/.test(inner.trim())) return /[A-Za-z]{2,}/.test(inner); // several words: prose
  return /^[A-Z][a-z]+$/.test(inner); // one capitalised word, e.g. a tag or label
}

/* ------------------------------------------------------------------ */
/* 4. Fixing a piece of prose                                           */
/* ------------------------------------------------------------------ */

function matchCase(original, replacement) {
  if (original.length > 1 && original === original.toUpperCase() && /[A-Z]/.test(original)) {
    return replacement.toUpperCase();
  }
  if (/^[A-Z]/.test(original)) return replacement[0].toUpperCase() + replacement.slice(1);
  return replacement;
}

const newlines = (s) => (s.match(/\n/g) || []).length;

class Run {
  constructor(file, src) {
    this.file = file;
    this.src = src;
    this.lineStarts = [0];
    for (let i = 0; i < src.length; i += 1) if (src[i] === '\n') this.lineStarts.push(i + 1);
    this.edits = [];
    this.reviews = [];
    this.seen = new Set();
  }

  lineAt(offset) {
    let lo = 0;
    let hi = this.lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (this.lineStarts[mid] <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  }

  lineText(line) {
    const start = this.lineStarts[line - 1];
    const end = line < this.lineStarts.length ? this.lineStarts[line] - 1 : this.src.length;
    return this.src.slice(start, end).trim().slice(0, 110);
  }

  fix(text, baseOffset) {
    const baseLine = this.lineAt(baseOffset);
    let out = text;

    const apply = (re, build) => {
      out = out.replace(re, (...args) => {
        const match = args[0];
        const offset = args[args.length - 2];
        const next = build(...args);
        if (next !== match) {
          const line = baseLine + newlines(out.slice(0, offset));
          this.edits.push({ line, from: match, to: next });
        }
        return next;
      });
    };

    apply(US_DATE_RE, (_m, month, day, suffix = '', year) => `${Number(day)}${suffix} ${month} ${year}`);
    apply(ZERO_ORDINAL_RE, (_m, digit, suffix) => `${digit}${suffix}`);
    apply(NUMERIC_METER_RE, (_m, lead, word, plural) => `${lead}${matchCase(word, 'metre')}${plural}`);
    apply(WORD_RE, (match, word) => matchCase(word, PAIRS.get(word.toLowerCase())));
    apply(IZE_RE, (match, stem, ending) => (NOT_IZE_RE.test(match) ? match : `${stem}is${ending}`));

    this.review(out, baseLine);
    return out;
  }

  review(text, baseLine) {
    const note = (offset, match, message) => {
      const line = baseLine + newlines(text.slice(0, offset));
      const id = `${line}|${match.toLowerCase()}|${message}`;
      if (this.seen.has(id)) return;
      this.seen.add(id);
      this.reviews.push({ line, match, message });
    };

    for (const { re, note: message } of REVIEW_RULES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text))) {
        // "2 meters" was already rewritten to "2 metres" above, so only bare ones remain.
        note(m.index, m[0], message);
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* 5. File processors                                                   */
/* ------------------------------------------------------------------ */

// One pass over a TS/TSX file. Alternatives, tried left to right at each position:
//   1 comments (kept as they are)   2 quoted strings   3 template literals
//   4 JSX text between a ">" and the next "<" or "{"
// Text that contains code characters ( ) [ ] = ; is never treated as JSX text.
const TOKEN_RE =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(`(?:[^`\\]|\\.)*`)|(>)([^<>{}=;()[\]]*[A-Za-z][^<>{}=;()[\]]*)(?=<|\{)/g;

function processCode(run) {
  const { src } = run;
  let out = '';
  let last = 0;
  TOKEN_RE.lastIndex = 0;
  let m;
  while ((m = TOKEN_RE.exec(src))) {
    out += src.slice(last, m.index);
    last = m.index + m[0].length;

    if (m[1]) {
      out += m[0];
    } else if (m[2]) {
      const quote = m[0][0];
      const inner = m[0].slice(1, -1);
      out += isProseString(inner, src, m.index)
        ? quote + run.fix(inner, m.index + 1) + quote
        : m[0];
    } else if (m[3]) {
      const key = keyBefore(src, m.index);
      const inner = m[0].slice(1, -1);
      if ((key && PROTECTED_KEYS.has(key)) || looksLikeCode(inner)) {
        out += m[0];
      } else {
        // Rewrite the text between ${...} placeholders only.
        let offset = m.index + 1;
        const parts = inner.split(/(\$\{[^}]*\})/);
        out +=
          '`' +
          parts
            .map((part, i) => {
              const base = offset;
              offset += part.length;
              return i % 2 === 1 ? part : run.fix(part, base);
            })
            .join('') +
          '`';
      }
    } else {
      out += m[4] + run.fix(m[5], m.index + 1);
    }
  }
  return out + src.slice(last);
}

function processHtml(run) {
  // One pass over the original text keeps every offset, and so every line number, exact.
  return run.src.replace(
    /(<html\b[^>]*?\blang=")en(")|(<meta\b[^>]*>)|(<title>)([\s\S]*?)(<\/title>)/gi,
    (match, langOpen, langClose, meta, titleOpen, titleText, titleClose, offset) => {
      if (langOpen) {
        run.edits.push({ line: run.lineAt(offset), from: 'lang="en"', to: 'lang="en-GB"' });
        return `${langOpen}en-GB${langClose}`;
      }
      if (meta) {
        // The Content-Security-Policy and viewport tags are configuration, not copy.
        if (/http-equiv|name\s*=\s*"viewport"|charset/i.test(meta)) return meta;
        return meta.replace(/(\bcontent\s*=\s*")([^"]*)(")/i, (_m, open, value, close, at) =>
          open + run.fix(value, offset + at + open.length) + close
        );
      }
      return titleOpen + run.fix(titleText, offset + titleOpen.length) + titleClose;
    }
  );
}

function processProse(run) {
  return run.fix(run.src, 0);
}

/* ------------------------------------------------------------------ */
/* 6. Command line                                                      */
/* ------------------------------------------------------------------ */

const IGNORE_DIRS = new Set(['node_modules', 'dist', '.git', 'optimized', 'originals', 'coverage', '.vite']);
const IGNORE_FILES = new Set(['assets.ts', 'vite-env.d.ts']);
const CODE_EXT = new Set(['.ts', '.tsx']);

function collect(target, found) {
  if (!existsSync(target)) {
    console.error(`Not found: ${target}`);
    process.exitCode = 2;
    return;
  }
  const stats = statSync(target);
  if (stats.isFile()) {
    if (!IGNORE_FILES.has(basename(target))) found.add(resolve(target));
    return;
  }
  for (const name of readdirSync(target)) {
    if (IGNORE_DIRS.has(name)) continue;
    const full = join(target, name);
    if (statSync(full).isDirectory()) collect(full, found);
    else if (CODE_EXT.has(extname(name)) && !IGNORE_FILES.has(name)) found.add(resolve(full));
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: node scripts/britishise.mjs [--write | --check] [paths...]\nDefault paths: src index.html');
    return;
  }
  const write = args.includes('--write');
  const check = args.includes('--check');
  const paths = args.filter((a) => !a.startsWith('--'));
  const targets = paths.length ? paths : ['src', 'index.html'];

  const files = new Set();
  targets.forEach((t) => collect(t, files));

  let changeCount = 0;
  let changedFiles = 0;
  const reviewLines = [];

  for (const file of [...files].sort()) {
    const src = readFileSync(file, 'utf8');
    const run = new Run(file, src);
    const ext = extname(file);
    const out = CODE_EXT.has(ext) ? processCode(run) : ext === '.html' ? processHtml(run) : processProse(run);
    const rel = relative(process.cwd(), file).split('\\').join('/');

    if (run.edits.length) {
      changedFiles += 1;
      changeCount += run.edits.length;
      console.log(`\n${rel}`);
      for (const e of run.edits.sort((a, b) => a.line - b.line)) {
        console.log(`  L${String(e.line).padEnd(4)} ${e.from}  ->  ${e.to}`);
      }
      if (write && out !== src) writeFileSync(file, out, 'utf8');
    }
    for (const r of run.reviews.sort((a, b) => a.line - b.line)) {
      reviewLines.push(`  ${rel}:${r.line}  "${r.match}"  ${r.message}\n      ${run.lineText(r.line)}`);
    }
  }

  console.log(`\n${files.size} files scanned.`);
  if (changeCount === 0) {
    console.log('Nothing to change: the copy is already British English.');
  } else if (write) {
    console.log(`Changed ${changeCount} item(s) in ${changedFiles} file(s).`);
  } else {
    console.log(`${changeCount} change(s) pending in ${changedFiles} file(s). Nothing was written; re-run with --write to apply.`);
  }

  if (reviewLines.length) {
    console.log(`\nReview by hand (not changed): ${reviewLines.length}`);
    console.log(reviewLines.join('\n'));
  }

  if (check && changeCount > 0) process.exitCode = 1;
}

main();
