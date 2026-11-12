"use strict";

const fs = require("fs");
const path = require("path");
const { redact } = require("./secret-patterns");

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.on("data", (chunk) => chunks.push(chunk));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    process.stdin.on("error", reject);
  });
}

function summarize(input) {
  const task = redact(input && input.task ? input.task : "").slice(0, 180);
  const files = Array.isArray(input && input.modified_files) ? input.modified_files : [];
  return {
    at: new Date().toISOString(),
    subagent_type: input && input.subagent_type ? input.subagent_type : "unknown",
    status: input && input.status ? input.status : "unknown",
    duration_ms: input && input.duration_ms ? input.duration_ms : 0,
    loop_count: input && typeof input.loop_count === "number" ? input.loop_count : 0,
    task,
    modified_files: files.slice(0, 20),
  };
}

function writeLog(entry) {
  const dir = path.join(process.cwd(), ".cursor", "hooks", "logs");
  fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(
    path.join(dir, "agent-tasks.jsonl"),
    `${JSON.stringify(entry)}\n`,
    "utf8"
  );
}

async function main() {
  try {
    const raw = await readStdin();
    const input = raw.trim() ? JSON.parse(raw) : {};
    writeLog(summarize(input));
  } catch (error) {
    // A logging failure must not continue the agent loop.
  }
  process.stdout.write("{}");
}

if (require.main === module) {
  main();
}

module.exports = { summarize };
