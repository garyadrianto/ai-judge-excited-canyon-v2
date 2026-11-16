// main.ts — contest entry for make.fun "ai-excited-01".
//
// Copies the bundled artwork entry.png (sitting next to this file) to
// <outputDir>/entry.png, where outputDir is MAKEFUN_OUTPUT_DIR when set and
// non-empty, otherwise "/output". The output directory is created recursively.
//
// Safety checks, in order:
//   1. the source file exists,
//   2. the source file is not empty and holds at least a PNG signature,
//   3. the source bytes start with the 8-byte PNG signature,
//   4. after copying, the written file is not empty,
//   5. after copying, the written file's size equals the source file's size.
//
// The output is deterministic: the same entry.png bytes are copied verbatim on
// every run, so repeated runs write byte-identical files.
//
// Node standard library only (node:fs, node:path, node:url), no network, no
// dependencies.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PNG_SIGNATURE: Buffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here: string = path.dirname(fileURLToPath(import.meta.url));
const sourcePath: string = path.join(here, "entry.png");

const configuredDir: string | undefined = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir: string =
  configuredDir !== undefined && configuredDir.length > 0 ? configuredDir : "/output";
const targetPath: string = path.join(outputDir, "entry.png");

function fail(message: string): never {
  throw new Error(`main.ts: ${message}`);
}

// 1. The source image must be present.
if (!fs.existsSync(sourcePath)) {
  fail(`source image is missing: ${sourcePath}`);
}

const sourceStats: fs.Stats = fs.statSync(sourcePath);

// 2. The source image must not be empty.
if (sourceStats.size === 0) {
  fail(`source image is empty (0 bytes): ${sourcePath}`);
}

const bytes: Buffer = fs.readFileSync(sourcePath);

if (bytes.length === 0) {
  fail(`source image read back as empty: ${sourcePath}`);
}
if (bytes.length < 8) {
  fail(`source image is too small to hold a PNG signature (${bytes.length} bytes): ${sourcePath}`);
}

// 3. The source bytes must begin with the PNG signature.
if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  fail(`source image does not start with the PNG signature: ${sourcePath}`);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(targetPath, bytes);

const writtenStats: fs.Stats = fs.statSync(targetPath);

// 4. The written image must not be empty.
if (writtenStats.size === 0) {
  fail(`written image is empty: ${targetPath}`);
}

// 5. The written image must be exactly as large as the source.
if (writtenStats.size !== bytes.length) {
  fail(
    `written image size ${writtenStats.size} does not match source size ${bytes.length}: ${targetPath}`,
  );
}

process.stdout.write(`wrote ${targetPath} (${writtenStats.size} bytes)\n`);
process.exit(0);