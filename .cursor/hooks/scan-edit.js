"use strict";

const fs = require("fs");
const path = require("path");
const { findSecrets } = require("./secret-patterns");

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.on("data", (chunk) => chunks.push(chunk));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    process.stdin.on("error", reject);
  });
}

function collectText(input) {
  const edits = Array.isArray(input && input.edits) ? input.edits : [];
  return edits
    .map((edit) => (edit && typeof edit.new_string === "string" ? edit.new_string : ""))
    .join("\n");
}

function recordFindings(filePath, ids) {
  if (ids.length === 0) {
    return;
  }
  const dir = path.join(process.cwd(), ".cursor", "hooks", "logs");
  fs.mkdirSync(dir, { recursive: true });
  const line = `${new Date().toISOString()}\t${ids.join(",")}\t${filePath || "unknown"}\n`;
  fs.appendFileSync(path.join(dir, "secret-scan.log"), line, "utf8");
}

async function main() {
  try {
    const raw = await readStdin();
    const input = raw.trim() ? JSON.parse(raw) : {};
    const ids = findSecrets(collectText(input));
    recordFindings(input.file_path, ids);
  } catch (error) {
    // Logging must not block the edit. This event has no permission output.
  }
  process.stdout.write("{}");
}

if (require.main === module) {
  main();
}

module.exports = { collectText, recordFindings };
