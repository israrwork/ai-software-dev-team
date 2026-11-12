# Hooks

Project hooks live in `.cursor/hooks.json` and `.cursor/hooks/`. Cursor loads schema version 1. The event names and output fields follow the Cursor hooks reference at <https://cursor.com/docs/hooks>.

Commands use `node` because this workspace is Windows and Node.js is installed. Python is not on `PATH`. The scripts read JSON from stdin and write JSON to stdout. They exit 0. `failClosed` is `false`, so a crashed hook does not freeze ordinary shell or tool use. `beforeShellExecution` still blocks the command if the script prints invalid JSON. The scripts wrap their work and emit a valid allow or empty object on internal failure.

Hook logs under `.cursor/hooks/logs/` are gitignored. They are local audit traces, not deliverables.

## Configured hooks

| Event | Script | Behavior |
| --- | --- | --- |
| `beforeShellExecution` | `.cursor/hooks/guard-shell.js` | Returns `ask` for force-push, hard reset, forced clean, recursive delete, DROP/TRUNCATE, DELETE without WHERE, database reset, terraform destroy, kubectl delete, and deploy-shaped commands. Other commands receive `allow`. |
| `afterFileEdit` | `.cursor/hooks/scan-edit.js` | Scans agent edit text for high-confidence secret patterns. Appends the file path and pattern id to the secret log. Does not write the matched value. This event has no documented output fields; the script prints `{}`. |
| `postToolUse` | `.cursor/hooks/after-edit.js` | Matcher `Write\|StrReplace\|EditNotebook`. Adds `additional_context` when a secret pattern is in the tool input, and a one-line test reminder when the edited path looks like application source. Prints `{}` when there is nothing to add. |
| `subagentStop` | `.cursor/hooks/log-subagent.js` | Appends subagent type, status, duration, and a redacted task excerpt to `agent-tasks.jsonl`. Does not return `followup_message`, so it does not start another agent loop. |

## Intentionally omitted

| Request | Decision |
| --- | --- |
| Post-edit formatting | This repository has no formatter and no package manifest. Installing one would add a dependency the audit said not to add. A formatter hook would also rewrite Markdown and agent files. |
| Automatic test execution | This repository has no test suite. Running tests after every edit would slow ordinary work and fail closed on an empty project. The `postToolUse` reminder tells the agent to run tests before claiming a source change is done. |
| Automatic production or database commands | No hook runs deploy, migration, or cleanup commands. The shell guard only asks the user. |

## Verification

`scripts/validate-ai-team.mjs` feeds sample stdin to each script and checks the JSON decision. That verifies the scripts. It does not prove Cursor has loaded the hooks in the Hooks settings tab. Reload the window if Cursor does not list them after `hooks.json` changes.

## Safety notes

`ask` leaves the decision with the user. A legitimate deploy or migration can proceed after that approval. The guard looks at command text, so a dangerous command hidden inside an unrelated binary is outside its coverage. Secret detection looks for a few high-confidence patterns. It misses many real secrets and can warn on example values. Treat a warning as a review prompt, not a complete scan.
