"use strict";

const { findSecrets } = require("./secret-patterns");

const SOURCE_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".py",
  ".go",
  ".rs",
  ".java",
  ".cs",
  ".php",
  ".rb",
  ".vue",
  ".svelte",
  ".sql",
  ".kt",
  ".swift",
]);

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.on("data", (chunk) => chunks.push(chunk));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    process.stdin.on("error", reject);
  });
}

function editedPath(toolInput) {
  if (!toolInput || typeof toolInput !== "object") {
    return "";
  }
  return (
    toolInput.path ||
    toolInput.file_path ||
    toolInput.target_notebook ||
    ""
  );
}

function editedText(toolInput) {
  if (!toolInput || typeof toolInput !== "object") {
    return "";
  }
  return [toolInput.contents, toolInput.new_string, toolInput.new_cell]
    .filter((value) => typeof value === "string")
    .join("\n");
}

function extensionOf(filePath) {
  const match = String(filePath).toLowerCase().match(/(\.[a-z0-9]+)$/);
  return match ? match[1] : "";
}

function buildContext(toolInput) {
  const notes = [];
  const secrets = findSecrets(editedText(toolInput));
  if (secrets.length > 0) {
    notes.push(
      `Secret-like content was written (${secrets.join(", ")}). Remove the value and refer to the environment variable name instead.`
    );
  }
  if (SOURCE_EXT.has(extensionOf(editedPath(toolInput)))) {
    notes.push(
      "If this source change affects behavior, run the project's relevant tests and record the command and result before calling the task done."
    );
  }
  if (notes.length === 0) {
    return {};
  }
  return { additional_context: notes.join(" ") };
}

async function main() {
  try {
    const raw = await readStdin();
    const input = raw.trim() ? JSON.parse(raw) : {};
    const toolInput =
      input.tool_input && typeof input.tool_input === "object" ? input.tool_input : {};
    process.stdout.write(JSON.stringify(buildContext(toolInput)));
  } catch (error) {
    process.stdout.write("{}");
  }
}

if (require.main === module) {
  main();
}

module.exports = { buildContext };
