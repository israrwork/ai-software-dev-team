# Validation report

Validation date: 2026-11-12

This check covers the team configuration after the upgrade. It does not claim that a product was designed, implemented, or deployed. No product effort was started.

## Result

`node scripts/validate-ai-team.mjs` completed with exit code 0 and printed:

```text
OK agents=11 skills=15 hooks=4
```

The script checked frontmatter, skill sections, gate language, hook files, and sample hook input. The sample secret was a synthetic access-key shape built in memory. The secret log recorded `aws-access-key` and the subagent log stored `[redacted]`. Those log lines were deleted after the check. `.cursor/hooks/logs/` is gitignored, which the script also checked.

Cursor's Hooks settings tab was not observed. The scripts were tested by launching them with Node. That does not by itself prove the desktop app has loaded `hooks.json`.

## Existing files improved

- `.cursor/rules/ai-team-workflow.mdc` now states principles, collaboration, completion, safety, and Gates 1–4, including local review before production. It points at the detailed docs.
- All eleven agent files. Each kept its role, file ownership, and stop conditions. Each now names the skill to follow, returns the 13-field handoff, and tells the specialist not to spawn other agents.

## New files created

- `README.md`
- `.gitignore`
- `scripts/validate-ai-team.mjs`
- `.cursor/hooks.json`
- `.cursor/hooks/guard-shell.js`
- `.cursor/hooks/scan-edit.js`
- `.cursor/hooks/after-edit.js`
- `.cursor/hooks/log-subagent.js`
- `.cursor/hooks/secret-patterns.js`
- `docs/ai-team/AUDIT_REPORT.md`
- `docs/ai-team/WORKFLOW.md`
- `docs/ai-team/AGENT_HANDOFF_PROTOCOL.md`
- `docs/ai-team/DEFINITION_OF_DONE.md`
- `docs/ai-team/APPROVAL_POLICY.md`
- `docs/ai-team/TASK_BOARD.md`
- `docs/ai-team/HOOKS.md`
- `docs/ai-team/INTEGRATIONS.md`
- `docs/ai-team/FINAL_DELIVERY_REPORT.md` was created here at first, then removed. Application closeout now lives only in the generated project.
- Fifteen `SKILL.md` files under `.cursor/skills/`

Placeholder `.gitkeep` files in the feature doc folders were left in place. No application source files existed, and none were added.

## Skills added

`project-discovery`, `project-planning`, `website-reverse-engineering`, `technical-research`, `system-architecture`, `database-design`, `frontend-development`, `backend-development`, `integration-development`, `code-review`, `testing-and-debugging`, `security-audit`, `deployment-workflow`, `documentation-generation`, and `start-new-project`.

`start-new-project` sets `disable-model-invocation: true`, so it loads when invoked as `/start-new-project`. The other skills stay available for the agent to apply when their description matches the task.

## Agents improved

The same eleven specialists remain. Descriptions still say when to delegate. `model: inherit` is set explicitly. No agent was duplicated, and none was marked read-only, because each one must write its deliverable.

The parent session launches specialists with the Task tool. The project manager returns a delegation request and does not call other agents. That matches Cursor's one-level subagent model.

## Rules updated

The always-apply rule keeps the slug convention, four approval gates, the local demonstration requirement, the destructive-command rule, and the ban on claiming unrun tests. Procedure details live in `docs/ai-team/WORKFLOW.md` and the skills.

## Hooks configured

| Event | Purpose | Tested behavior |
| --- | --- | --- |
| `beforeShellExecution` | Ask before destructive or deploy-shaped commands | `git status` and `git push origin main` return `allow`. Force-push, hard reset, `DROP TABLE`, `DELETE` without `WHERE`, `rm -rf`, `npm run deploy`, and `prisma migrate reset` return `ask`. |
| `afterFileEdit` | Record secret-pattern ids | Sample edit wrote a log line without the matched value and printed `{}`. |
| `postToolUse` | Warn on secrets and remind the agent to run tests for source files | A `.ts` edit includes a test reminder. A normal Markdown edit returns `{}`. |
| `subagentStop` | Append a redacted delegation log | The script returns `{}` and does not send `followup_message`. |

Formatting and automatic test execution were not configured. The reason is in `docs/ai-team/HOOKS.md`: this repository has no formatter, package manifest, or test suite.

## MCP recommendations

No MCP server was installed. This repository has no MCP config file. Recommendations for GitHub, browser checks, documentation search, read-only database inspection, and issue tracking are in `docs/ai-team/INTEGRATIONS.md`.

The local `user-rea` tools are a reverse-engineering setup outside this repository. They were not connected to the delivery workflow.

## Checks performed

| Check | Result |
| --- | --- |
| Eleven agents have `name` matching the filename and a description | Pass |
| Fifteen skills have the required sections and a matching `name` | Pass |
| `start-new-project` is explicit-invocation only and stops before implementation | Pass |
| Workflow rule contains Gates 1, 2, 3, and 4 | Pass, rechecked after the local-review policy |
| Hook commands point at existing Node scripts | Pass |
| Sample hook stdin returns valid JSON | Pass |
| Hook logs are gitignored | Pass |
| `git status` shows agent, rule, skill, hook, doc, script, README, and gitignore changes only | Pass |
| Cursor Hooks tab shows the new hooks | Not observed |
| `/start-new-project` run end to end on a product idea | Not run |

## Decisions

- Application documents belong in each generated project's `docs/` directory. The scaffold is `templates/project/`. The AI team repository does not store a generated application's PRD, research, task board, or delivery report.
- `AGENTS.md` and `.cursor/commands/` were not added. The always-apply rule and the skill cover those roles.
- The team stays in this repository. Each application is a separate directory created by `scripts/new-project.mjs`. A user-level copy was not installed.
- Overlapping implementation stays sequential on this checkout. A cloud subagent or other isolated worktree is used only after you ask for it.

## Remaining limitations

- Opening another repository does not load these agents or `/start-new-project`.
- Approval gates are instructions plus the shell `ask` hook. A plain file write is not blocked by a gate hook.
- The shell guard matches command text. It can miss a destructive action hidden inside a script, and it can ask about a safe command that merely contains a matching phrase.
- Secret detection covers a few high-confidence patterns. It is a warning, not a complete secret scan.
- The test reminder depends on the `postToolUse` matcher seeing `Write`, `StrReplace`, or `EditNotebook`. Secret accounting on `afterFileEdit` does not depend on that matcher.
- Local parallel subagents share the working tree and can overwrite each other's files.
- The task board has no rows yet. `DONE` stays unused until a real deliverable is reviewed.
- The final delivery stub is `NOT_STARTED`. No release has been prepared or deployed.
