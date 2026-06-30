import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative } from "node:path";

const rootDir = process.cwd();
const require = createRequire(import.meta.url);
const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".runwise",
  ".turbo",
  "coverage",
  "dist",
  "node_modules"
]);

const esbuild = await loadEsbuild();
const tsFiles = collectFiles(rootDir, (filePath) => filePath.endsWith(".ts"));
const jsonFiles = collectFiles(rootDir, (filePath) => filePath.endsWith("package.json"));

for (const filePath of tsFiles) {
  const source = readFileSync(filePath, "utf8");
  esbuild.transformSync(source, {
    loader: "ts",
    format: "esm",
    target: "es2022",
    sourcefile: relative(rootDir, filePath)
  });
}

for (const filePath of jsonFiles) {
  JSON.parse(readFileSync(filePath, "utf8"));
}

console.log(`Workspace check passed: ${tsFiles.length} TypeScript files, ${jsonFiles.length} package files.`);

async function loadEsbuild() {
  const directCandidate = join(rootDir, "node_modules", "esbuild");
  if (existsSync(directCandidate)) {
    return require(directCandidate);
  }

  const pnpmDir = join(rootDir, "node_modules", ".pnpm");
  const candidate = readdirSync(pnpmDir)
    .filter((entry) => entry.startsWith("esbuild@"))
    .sort()
    .at(-1);

  if (!candidate) {
    throw new Error("esbuild is required for workspace checks but was not found.");
  }

  return require(join(pnpmDir, candidate, "node_modules", "esbuild"));
}

function collectFiles(directory, predicate) {
  const results = [];

  function walk(currentDirectory) {
    for (const entry of readdirSync(currentDirectory)) {
      if (ignoredDirectories.has(entry)) {
        continue;
      }

      const entryPath = join(currentDirectory, entry);
      const stat = statSync(entryPath);

      if (stat.isDirectory()) {
        walk(entryPath);
        continue;
      }

      if (stat.isFile() && predicate(entryPath)) {
        results.push(entryPath);
      }
    }
  }

  walk(directory);
  return results.sort();
}
