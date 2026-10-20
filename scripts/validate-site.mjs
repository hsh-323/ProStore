import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, extname } from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([".git", "node_modules"]);
const files = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    if (ignoredDirectories.has(name)) continue;
    const fullPath = join(directory, name);
    if (statSync(fullPath).isDirectory()) walk(fullPath);
    else files.push(relative(root, fullPath).replaceAll("\\", "/"));
  }
}

function localPath(fromFile, rawPath) {
  const withoutQuery = rawPath.split(/[?#]/, 1)[0];
  if (!withoutQuery || /^(?:[a-z]+:|\/\/|#|data:|javascript:|mailto:|tel:)/i.test(withoutQuery)) return null;
  const decoded = decodeURIComponent(withoutQuery);
  return resolve(root, fromFile.startsWith("/") ? decoded.slice(1) : join(root, fromFile.includes("/") ? fromFile.slice(0, fromFile.lastIndexOf("/")) : "", decoded));
}

walk(root);
const known = new Set(files.map(path => resolve(root, path)));
const problems = [];
const htmlFiles = files.filter(path => path.endsWith(".html"));
for (const file of htmlFiles) {
  const source = readFileSync(resolve(root, file), "utf8");
  if (!/<html[^>]*lang=["']fa["']/i.test(source)) problems.push(`${file}: missing Persian document language`);
  if (!/<title>\s*[^<]+\s*<\/title>/i.test(source)) problems.push(`${file}: missing page title`);

  for (const match of source.matchAll(/(?:href|src)=["']([^"'#]+)["']/gi)) {
    const raw = match[1];
    const target = localPath(file, raw);
    if (!target) continue;
    if (!known.has(target)) problems.push(`${file}: missing local asset "${raw}"`);
  }
}

for (const file of files.filter(path => path.endsWith(".css"))) {
  const source = readFileSync(resolve(root, file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const match of source.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
    const raw = match[2].trim();
    const target = localPath(file, raw);
    if (!target) continue;
    if (!known.has(target)) problems.push(`${file}: missing CSS asset "${raw}"`);
  }
}

if (problems.length) {
  console.error("Site validation failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed: ${htmlFiles.length} HTML pages, local links/assets checked.`);
}
