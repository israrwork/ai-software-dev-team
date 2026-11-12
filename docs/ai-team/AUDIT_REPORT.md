# AI team audit

Audit date: 2026-11-12

This report records the repository configuration as inspected before the upgrade. It does not describe the files added after this audit.

## Existing configuration

### Agents

Eleven project subagents exist in `.cursor/agents/`. Each file has YAML frontmatter with `name` and `description`. The `name` matches the filename. Descriptions are specific enough for the parent session to delegate. Optional fields `model`, `readonly`, and `is_background` are omitted; Cursor defaults those to `inherit`, `false`, and `false`.

| Agent | File | Writes |
| --- | --- | --- |
| Project manager | `.cursor/agents/project-manager.md` | `docs/requirements/<slug>-brief.md`, status, tasks, delivery report |
| Researcher | `.cursor/agents/researcher.md` | `docs/research/<slug>-research.md` |
| Feasibility analyst | `.cursor/agents/feasibility-analyst.md` | `docs/research/<slug>-feasibility.md` |
| Software architect | `.cursor/agents/software-architect.md` | `docs/architecture/<slug>-design.md` |
| Frontend developer | `.cursor/agents/frontend-developer.md` | Assigned UI files and `docs/development/<slug>-frontend.md` |
| Backend developer | `.cursor/agents/backend-developer.md` | Assigned server files and `docs/development/<slug>-backend.md` |
| Database engineer | `.cursor/agents/database-engineer.md` | Assigned schema files and `docs/development/<slug>-database.md` |
| Integration specialist | `.cursor/agents/integration-specialist.md` | Assigned integration files and `docs/development/<slug>-integration.md` |
| QA engineer | `.cursor/agents/qa-engineer.md` | Tests and `docs/testing/<slug>-qa.md` |
| Security auditor | `.cursor/agents/security-auditor.md` | `docs/testing/<slug>-security.md` |
| DevOps engineer | `.cursor/agents/devops-engineer.md` | Release config and `docs/deployment/<slug>-release.md` |

The parent session can delegate to these agents. Their descriptions are the delegation signal, and Cursor loads project agents from `.cursor/agents/`.

### Rules

`.cursor/rules/ai-team-workflow.mdc` always applies. It defines the 12-step sequence, five safety gates, and a five-field handoff example. It tells specialists to use the feature slug in filenames.

### Documentation placeholders

These directories exist and contain only `.gitkeep`:

- `docs/architecture/`
- `docs/deployment/`
- `docs/development/`
- `docs/requirements/`
- `docs/research/`
- `docs/testing/`

### Not present

- `.cursor/skills/`
- `.cursor/commands/`
- `.cursor/hooks/`
- `.cursor/hooks.json`
- `AGENTS.md`
- Project MCP configuration (no `.cursor/mcp.json` and no `mcp.json`)
- Application source, package manifest, formatter, or test suite
- Scripts or CI automation
- `.gitignore`

The user environment exposes a reverse-engineering MCP namespace (`user-rea`) and Cursor platform tools. Neither is configured by this repository. This audit did not install servers or read user credential files.

## What already works

- Responsibilities are separated by role and, for implementers, by file ownership.
- Research and feasibility use different filenames, so they can run in parallel.
- Architecture, implementation, release, and destructive database commands have explicit stop conditions.
- QA must record commands and must not treat an unrun suite as a pass.
- The security auditor reviews the change independently and must not add exploit procedures.
- The DevOps engineer must not deploy without an explicit user approval.
- Agents end with assumptions, risks, blockers, and incomplete work.
- No duplicate agent files were found.

## Problems identified

1. Procedures live only in the agent prompts and one rule. There are no reusable skills.
2. The rule omits the requested engineering principles: read existing code first, preserve technology choices, avoid needless rewrites, record assumptions, and keep docs aligned with code.
3. Completion is not tied to a task registry. A specialist reply can be mistaken for a finished task.
4. The handoff example has goal, slug, reads, allowed files, and next agent. It does not require task id, verification, remaining work, or a recommended next agent as separate fields.
5. Approval gates are stated, but there is no approval policy the team can cite, and requirements approval is weaker than the requested Gate 1.
6. There is no kickoff entry such as `/start-new-project`.
7. There are no hooks for destructive-command approval, secret warnings, or delegation logging.
8. Bash examples in the public hooks documentation are a poor fit for this Windows workspace. Node.js is installed. Python is not on `PATH`.
9. There is no formatter and no test suite, so an automatic format or test hook would have nothing safe to run.
10. Backend authentication and integration OAuth are easy to collide on unless the architecture assigns the file. The current prompts already tell the specialist to stop on that conflict.
11. The project manager is described as the orchestrator. Cursor subagents share the parent conversation only by returning a result; nested specialist delegation is not the supported path. The parent session has to launch specialists.
12. Local subagents share this checkout. The current rule allows parallel implementation when files do not overlap, and it does not warn that overlapping parallel edits can overwrite each other.
13. A single `docs/research/FEASIBILITY_REPORT.md` would collide across features. The existing slug filenames are the useful convention and should stay.
14. `AGENTS.md` is absent. Adding it beside an always-apply rule would duplicate the same instructions.
15. `.cursor/commands/` is absent. Current Cursor slash commands are skills, so a legacy command file is unnecessary.

## Recommended improvements

- Keep all eleven agents. Extend their prompts with the missing duties, the handoff protocol, and an explicit ban on nested delegation.
- Add project skills for repeatable procedures, plus `/start-new-project` as an explicitly invoked skill.
- Replace the workflow rule with a short principles, collaboration, done, and safety rule that points at the detailed docs.
- Add the workflow, handoff protocol, definition of done, approval policy, task board, hooks notes, and integration notes under `docs/ai-team/`.
- Keep slug-scoped deliverables. Map the requested feasibility report and final delivery report onto those paths.
- Add Node hook scripts for destructive-command approval, secret warnings, a source-edit test reminder, and subagent logging. Do not auto-format and do not auto-run tests.
- Do not install MCP servers. Document optional GitHub, browser, docs search, database, and issue-tracking integrations.
- Do not copy this team into the user profile unless the user asks. Project files apply to this repository.

## Files that need modification

- `.cursor/rules/ai-team-workflow.mdc`
- `.cursor/agents/project-manager.md`
- `.cursor/agents/researcher.md`
- `.cursor/agents/feasibility-analyst.md`
- `.cursor/agents/software-architect.md`
- `.cursor/agents/frontend-developer.md`
- `.cursor/agents/backend-developer.md`
- `.cursor/agents/database-engineer.md`
- `.cursor/agents/integration-specialist.md`
- `.cursor/agents/qa-engineer.md`
- `.cursor/agents/security-auditor.md`
- `.cursor/agents/devops-engineer.md`

## New files that need creation

- `.cursor/skills/*/SKILL.md` for the fifteen procedures, including `start-new-project`
- `.cursor/hooks.json` and `.cursor/hooks/*.js`
- `docs/ai-team/WORKFLOW.md`
- `docs/ai-team/AGENT_HANDOFF_PROTOCOL.md`
- `docs/ai-team/DEFINITION_OF_DONE.md`
- `docs/ai-team/APPROVAL_POLICY.md`
- `docs/ai-team/TASK_BOARD.md`
- `docs/ai-team/HOOKS.md`
- `docs/ai-team/INTEGRATIONS.md`
- `docs/ai-team/FINAL_DELIVERY_REPORT.md` as a not-started closeout stub
- `docs/ai-team/VALIDATION_REPORT.md` after the upgrade is checked
- `scripts/validate-ai-team.mjs`
- `.gitignore` for hook logs
- `README.md` so the kickoff command is discoverable

Application source was not present and is out of scope.
