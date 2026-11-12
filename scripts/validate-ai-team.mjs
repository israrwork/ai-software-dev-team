import { createRequire } from "module";
import fs from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));

const root = path.resolve(scriptDir, "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    fail(`Missing ${rel}`);
    return "";
  }
  return fs.readFileSync(full, "utf8");
}

function frontmatter(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return null;
  }
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return null;
  }
  const body = {};
  for (const line of normalized.slice(4, end).split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    body[match[1]] = value;
  }
  return body;
}

const agents = [
  "project-manager",
  "researcher",
  "feasibility-analyst",
  "software-architect",
  "frontend-developer",
  "backend-developer",
  "database-engineer",
  "integration-specialist",
  "qa-engineer",
  "security-auditor",
  "devops-engineer",
];

const skills = [
  "project-discovery",
  "project-planning",
  "website-reverse-engineering",
  "technical-research",
  "system-architecture",
  "database-design",
  "frontend-development",
  "backend-development",
  "integration-development",
  "code-review",
  "testing-and-debugging",
  "security-audit",
  "deployment-workflow",
  "documentation-generation",
  "start-new-project",
];

const docs = [
  "docs/ai-team/AUDIT_REPORT.md",
  "docs/ai-team/WORKFLOW.md",
  "docs/ai-team/AGENT_HANDOFF_PROTOCOL.md",
  "docs/ai-team/DEFINITION_OF_DONE.md",
  "docs/ai-team/APPROVAL_POLICY.md",
  "docs/ai-team/TASK_BOARD.md",
  "docs/ai-team/HOOKS.md",
  "docs/ai-team/INTEGRATIONS.md",
  "docs/ai-team/PROJECT_LAYOUT.md",
  "README.md",
  ".gitignore",
  ".cursor/hooks.json",
  ".cursor/rules/ai-team-workflow.mdc",
];

for (const doc of docs) {
  read(doc);
}

for (const agent of agents) {
  const rel = `.cursor/agents/${agent}.md`;
  const text = read(rel);
  const meta = frontmatter(text);
  if (!meta) {
    fail(`${rel} is missing YAML frontmatter`);
    continue;
  }
  if (meta.name !== agent) {
    fail(`${rel} name is ${meta.name || "empty"}`);
  }
  if (!meta.description || meta.description.length > 1024) {
    fail(`${rel} description is missing or longer than 1024 characters`);
  }
  if (!/^[a-z0-9-]{1,64}$/.test(meta.name || "")) {
    fail(`${rel} name has invalid characters`);
  }
  if (!text.includes("docs/ai-team/AGENT_HANDOFF_PROTOCOL.md")) {
    fail(`${rel} does not reference the handoff protocol`);
  }
  if (!/do not spawn other agents/i.test(text)) {
    fail(`${rel} does not forbid nested delegation`);
  }
}

const headings = ["## When to use", "## Inputs", "## Steps", "## Outputs", "## Validation"];
for (const skill of skills) {
  const rel = `.cursor/skills/${skill}/SKILL.md`;
  const text = read(rel);
  const meta = frontmatter(text);
  if (!meta) {
    fail(`${rel} is missing YAML frontmatter`);
    continue;
  }
  if (meta.name !== skill) {
    fail(`${rel} name does not match the folder`);
  }
  if (!meta.description || meta.description.length > 1024) {
    fail(`${rel} description is missing or too long`);
  }
  for (const heading of headings) {
    if (!text.includes(heading)) {
      fail(`${rel} is missing ${heading}`);
    }
  }
}

const kickoff = read(".cursor/skills/start-new-project/SKILL.md");
if (!kickoff.includes("disable-model-invocation: true")) {
  fail("start-new-project is not restricted to explicit invocation");
}
if (!kickoff.includes("Ask one question at a time") && !kickoff.includes("one question at a time")) {
  fail("start-new-project does not require one question at a time");
}
if (!kickoff.includes("Do not start implementation before the user approves the architecture.")) {
  fail("start-new-project does not keep the architecture gate");
}
if (!kickoff.includes("Do not prepare production until the user explicitly approves the running local application.")) {
  fail("start-new-project does not keep the local review gate");
}
if (!kickoff.includes("Never claim the application is ready for review if it has not successfully started.")) {
  fail("start-new-project can present an application that has not started");
}

const rule = read(".cursor/rules/ai-team-workflow.mdc");
for (const phrase of ["alwaysApply: true", "Gate 1", "Gate 2", "Gate 3", "Gate 4"]) {
  if (!rule.includes(phrase)) {
    fail(`Workflow rule is missing ${phrase}`);
  }
}

const hooks = JSON.parse(read(".cursor/hooks.json") || "{}");
if (hooks.version !== 1) {
  fail("hooks.json version is not 1");
}
const expectedHooks = ["beforeShellExecution", "afterFileEdit", "postToolUse", "subagentStop"];
for (const event of expectedHooks) {
  const entries = hooks.hooks && hooks.hooks[event];
  if (!Array.isArray(entries) || entries.length === 0) {
    fail(`hooks.json is missing ${event}`);
    continue;
  }
  for (const entry of entries) {
    const command = entry.command || "";
    const script = command.replace(/^node\s+/, "");
    if (!fs.existsSync(path.join(root, script))) {
      fail(`Hook script missing for ${event}: ${script}`);
    }
  }
}

function runHook(script, payload) {
  const result = spawnSync("node", [path.join(root, script)], {
    input: JSON.stringify(payload),
    encoding: "utf8",
    cwd: root,
  });
  if (result.status !== 0) {
    fail(`${script} exited ${result.status}: ${result.stderr}`);
    return null;
  }
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    fail(`${script} printed invalid JSON: ${result.stdout}`);
    return null;
  }
}

const { decide } = require(path.join(root, ".cursor/hooks/guard-shell.js"));
const allowCases = [
  "git status",
  "npm test",
  "git push origin main",
  "git push --tags",
  "DELETE FROM users WHERE id = 1",
];
const askCases = [
  "git push --force origin main",
  "git push -f origin HEAD",
  "git reset --hard HEAD~1",
  "DROP TABLE users",
  "DELETE FROM users",
  "npm run deploy",
  "rm -rf tmp",
  "npx prisma migrate reset",
];
for (const command of allowCases) {
  if (decide(command).permission !== "allow") {
    fail(`Expected allow for: ${command}`);
  }
}
for (const command of askCases) {
  if (decide(command).permission !== "ask") {
    fail(`Expected ask for: ${command}`);
  }
}

const guardOut = runHook(".cursor/hooks/guard-shell.js", { command: "git status", cwd: root });
if (!guardOut || guardOut.permission !== "allow") {
  fail("guard-shell stdin smoke test did not allow git status");
}

const sampleKey = ["AKIA", "IOSFODNN7EXAMPLE"].join("");
const scanOut = runHook(".cursor/hooks/scan-edit.js", {
  file_path: "F:/example/app.ts",
  edits: [{ old_string: "", new_string: `const key = "${sampleKey}";` }],
});
if (!scanOut || Object.keys(scanOut).length !== 0) {
  fail("scan-edit should print an empty object");
}
const secretLog = path.join(root, ".cursor/hooks/logs/secret-scan.log");
const secretText = fs.existsSync(secretLog) ? fs.readFileSync(secretLog, "utf8") : "";
if (!secretText.includes("aws-access-key") || secretText.includes(sampleKey)) {
  fail("secret log should record the pattern id and omit the matched value");
}

const { buildContext } = require(path.join(root, ".cursor/hooks/after-edit.js"));
const sourceReminder = buildContext({
  path: "src/app.ts",
  contents: "export const ready = true;\n",
});
if (!sourceReminder.additional_context || !sourceReminder.additional_context.includes("tests")) {
  fail("source edits should remind the agent to run tests");
}
const markdown = buildContext({ path: "docs/ai-team/WORKFLOW.md", contents: "hello" });
if (Object.keys(markdown).length !== 0) {
  fail("markdown edits should not add context");
}
const secretReminder = buildContext({
  path: "docs/note.md",
  contents: `token: "${sampleKey}"`,
});
if (!secretReminder.additional_context || !secretReminder.additional_context.includes("aws-access-key")) {
  fail("secret-bearing edits should warn");
}
if (secretReminder.additional_context.includes(sampleKey)) {
  fail("secret warning should not echo the value");
}

const subOut = runHook(".cursor/hooks/log-subagent.js", {
  subagent_type: "researcher",
  status: "completed",
  task: `inspect ${sampleKey}`,
  duration_ms: 5,
  loop_count: 0,
  modified_files: ["docs/research/example-research.md"],
});
if (!subOut || Object.keys(subOut).length !== 0) {
  fail("log-subagent should not return a follow-up");
}
const taskLog = fs.readFileSync(path.join(root, ".cursor/hooks/logs/agent-tasks.jsonl"), "utf8");
if (!taskLog.includes('"subagent_type":"researcher"') || taskLog.includes(sampleKey)) {
  fail("subagent log should record the agent and redact secret-like text");
}

const ignored = spawnSync("git", ["check-ignore", "-q", ".cursor/hooks/logs/secret-scan.log"], {
  cwd: root,
  encoding: "utf8",
});
if (ignored.status !== 0) {
  fail("hook logs are not gitignored");
}

if (fs.existsSync(path.join(root, "package.json")) || fs.existsSync(path.join(root, "src"))) {
  console.log("Note: application files are present. This validator does not treat them as team-config errors.");
}

for (const forbidden of [
  "docs/requirements",
  "docs/research",
  "docs/architecture",
  "docs/development",
  "docs/testing",
  "docs/security",
  "docs/deployment",
  "docs/project",
]) {
  if (fs.existsSync(path.join(root, forbidden))) {
    fail(`Application docs directory must not live in the team repository: ${forbidden}`);
  }
}

function walk(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git" || entry.name === "templates") {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, found);
    } else if (/\.(md|mdc)$/.test(entry.name)) {
      found.push(full);
    }
  }
  return found;
}

for (const file of walk(root)) {
  const relative = path.relative(root, file);
  if (relative.endsWith(`docs${path.sep}ai-team${path.sep}AUDIT_REPORT.md`)) {
    continue;
  }
  const text = fs.readFileSync(file, "utf8");
  if (text.includes("<slug>")) {
    fail(`${relative} still uses a <slug> deliverable path`);
  }
}

for (const agent of agents) {
  const text = read(`.cursor/agents/${agent}.md`);
  if (!text.includes("PROJECT_ROOT")) {
    fail(`${agent} does not mention PROJECT_ROOT`);
  }
}

const created = [];
function cleanupProjects() {
  for (const dir of created) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

try {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), "ai-team-project-"));
  created.push(parent);
  const createdRun = spawnSync(
    process.execPath,
    [path.join(root, "scripts", "new-project.mjs"), "--name", "sample-app", "--parent", parent],
    { cwd: root, encoding: "utf8" }
  );
  if (createdRun.status !== 0) {
    fail(`new-project failed: ${createdRun.stderr || createdRun.stdout}`);
  }
  const project = path.join(parent, "sample-app");
  const toplevel = spawnSync("git", ["rev-parse", "--show-toplevel"], {
    cwd: project,
    encoding: "utf8",
  });
  if (toplevel.status !== 0 || path.resolve(toplevel.stdout.trim()) !== path.resolve(project)) {
    fail("new-project did not initialize Git in the generated project");
  }
  for (const required of [
    "README.md",
    ".gitignore",
    "docs/requirements/PRD.md",
    "docs/research/RESEARCH.md",
    "docs/research/FEASIBILITY.md",
    "docs/architecture/ARCHITECTURE.md",
    "docs/architecture/DATABASE_DESIGN.md",
    "docs/development/TASK_BOARD.md",
    "docs/testing/QA.md",
    "docs/security/SECURITY_AUDIT.md",
    "docs/deployment/LOCAL.md",
    "docs/deployment/PRODUCTION.md",
    "docs/project/PROJECT_STATUS.md",
    "docs/project/FINAL_DELIVERY_REPORT.md",
  ]) {
    if (!fs.existsSync(path.join(project, required))) {
      fail(`generated project is missing ${required}`);
    }
  }
  const refused = spawnSync(
    process.execPath,
    [path.join(root, "scripts", "new-project.mjs"), "--name", "inside-team", "--parent", root],
    { cwd: root, encoding: "utf8" }
  );
  if (refused.status === 0) {
    fail("new-project allowed a folder inside the AI team repository");
  }
} finally {
  cleanupProjects();
}

if (failures.length > 0) {
  for (const message of failures) {
    console.error(`FAIL ${message}`);
  }
  process.exit(1);
}

console.log(`OK agents=${agents.length} skills=${skills.length} hooks=${expectedHooks.length}`);
