"use strict";

const PATTERNS = [
  { id: "aws-access-key", re: /\bAKIA[0-9A-Z]{16}\b/ },
  { id: "private-key", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/ },
  { id: "github-token", re: /\b(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}\b/ },
  { id: "slack-token", re: /\bxox[baprs]-[A-Za-z0-9-]{10,}/ },
  { id: "stripe-live-key", re: /\bsk_live_[A-Za-z0-9]{16,}\b/ },
  {
    id: "assigned-secret",
    re: /\b(?:api[_-]?key|client[_-]?secret|secret|token|password)\b\s*[:=]\s*['"][^'"\s]{12,}['"]/i,
  },
];

function findSecrets(text) {
  if (!text || typeof text !== "string") {
    return [];
  }
  const found = [];
  for (const pattern of PATTERNS) {
    if (pattern.re.test(text)) {
      found.push(pattern.id);
    }
  }
  return found;
}

function redact(text) {
  let output = String(text || "");
  for (const pattern of PATTERNS) {
    output = output.replace(pattern.re, "[redacted]");
  }
  return output;
}

module.exports = { findSecrets, redact };
