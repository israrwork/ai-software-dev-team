"use strict";

const RULES = [
  {
    id: "git-force-push",
    re: /\bgit(?:\.exe)?\s+push\b[\s\S]*(?:--force\b|--force-with-lease\b|(?:\s|^)-[a-z]*f[a-z]*\b)/i,
  },
  { id: "git-reset-hard", re: /\bgit(?:\.exe)?\s+reset\b[\s\S]*--hard\b/i },
  {
    id: "git-clean-force",
    re: /\bgit(?:\.exe)?\s+clean\b[\s\S]*(?:--force\b|(?:\s|^)-[a-z]*f[a-z]*\b)/i,
  },
  {
    id: "recursive-delete",
    re: /\brm\s+(?:-[a-z]*[rfd][a-z]*|--recursive)\b|\bRemove-Item\b[\s\S]*-Recurse\b|\brmdir\s+\/s\b/i,
  },
  {
    id: "sql-destructive",
    re: /\bDROP\s+(?:DATABASE|TABLE|SCHEMA)\b|\bTRUNCATE\b|\bDELETE\s+FROM\b(?![\s\S]*\bWHERE\b)/i,
  },
  { id: "terraform-destroy", re: /\bterraform(?:\.exe)?\s+destroy\b/i },
  { id: "kubectl-delete", re: /\bkubectl(?:\.exe)?\s+delete\b/i },
  {
    id: "database-reset",
    re: /\bprisma\b[\s\S]*\bmigrate\s+reset\b|\bprisma\b[\s\S]*--(?:force-reset|accept-data-loss)\b|\bmigrate:fresh\b|\bdrizzle-kit\s+drop\b/i,
  },
  {
    id: "production-deploy",
    re: /\b(?:npm|pnpm|yarn)\s+run\s+deploy\b|\b(?:vercel|netlify|fly|flyctl|wrangler|firebase|railway|heroku)\b[\s\S]*\b(?:deploy|--prod)\b|\bserverless\s+deploy\b/i,
  },
];

function decide(command) {
  const text = String(command || "");
  const hits = RULES.filter((rule) => rule.re.test(text)).map((rule) => rule.id);
  if (hits.length === 0) {
    return { permission: "allow" };
  }
  const names = hits.join(", ");
  return {
    permission: "ask",
    user_message: `Approval needed (${names}). This command looks destructive or like a production deploy.`,
    agent_message:
      "A hook asked the user to approve this command. Wait for that approval. Do not deploy, drop data, or force-push unless the user approves this exact command.",
  };
}

function readStdin() {
  return new Promise((resolve, reject) => {
    const chunks = [];
    process.stdin.on("data", (chunk) => chunks.push(chunk));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    process.stdin.on("error", reject);
  });
}

async function main() {
  try {
    const raw = await readStdin();
    const input = raw.trim() ? JSON.parse(raw) : {};
    process.stdout.write(JSON.stringify(decide(input.command)));
  } catch (error) {
    process.stdout.write(JSON.stringify({ permission: "allow" }));
  }
}

if (require.main === module) {
  main();
}

module.exports = { decide };
