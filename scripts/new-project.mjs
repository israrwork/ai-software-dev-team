import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const teamRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templateRoot = path.join(teamRoot, "templates", "project");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) {
    return "";
  }
  return process.argv[index + 1];
}

function isInside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function copyTemplate(source, destination, projectName) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyTemplate(from, to, projectName);
      continue;
    }
    const text = fs.readFileSync(from, "utf8").replaceAll("{{PROJECT_NAME}}", projectName);
    fs.writeFileSync(to, text);
  }
}

const name = readArg("--name");
const parent = readArg("--parent");

if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/.test(name) || name.includes("..")) {
  fail("Pass --name as a single folder name using letters, numbers, dots, underscores, or hyphens.");
}
if (!parent) {
  fail("Pass --parent as the directory that will contain the new project.");
}

const parentDir = path.resolve(parent);
const target = path.resolve(parentDir, name);

if (isInside(teamRoot, target)) {
  fail("Refusing to create a project inside the AI team repository.");
}
if (fs.existsSync(target) && fs.readdirSync(target).length > 0) {
  fail(`Refusing to overwrite ${target}`);
}

fs.mkdirSync(parentDir, { recursive: true });
copyTemplate(templateRoot, target, name);

const git = spawnSync("git", ["init"], { cwd: target, encoding: "utf8" });
if (git.status !== 0) {
  fs.rmSync(target, { recursive: true, force: true });
  fail(git.stderr || "git init failed");
}

console.log(target);
