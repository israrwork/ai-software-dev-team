# Agent handoff protocol

Every specialist returns this block to the parent session. The parent reviews the listed files before changing task status. The project manager updates `PROJECT_ROOT/docs/development/TASK_BOARD.md` from the reviewed handoff.

Specialists do not spawn other agents. The `Recommended next agent` field is a request for the parent session.

## Handoff format

```markdown
## Handoff
1. Task ID:
2. Agent name:
3. Task objective:
4. Inputs reviewed:
5. Work performed:
6. Files created or modified:
7. Deliverables:
8. Tests or verification performed:
9. Assumptions:
10. Risks:
11. Blockers:
12. Remaining work:
13. Recommended next agent:
```

## Field rules

1. **Task ID.** Use the id from the task board, such as `T-001`. Use `T-000` only while the project manager is creating the first brief and the board has no row yet.
2. **Agent name.** Use the subagent name, such as `researcher`.
3. **Task objective.** Restate the assigned outcome in one sentence.
4. **Inputs reviewed.** List the docs, code paths, and external sources actually opened. Include a title and URL for external sources.
5. **Work performed.** Summarize the actions taken. Keep this shorter than the deliverable itself.
6. **Files created or modified.** List every path. Write "none" when the task made no file changes.
7. **Deliverables.** Point to the file that holds the work. Do not claim a deliverable that was not written.
8. **Tests or verification performed.** Name the command and the result. For research and design, name the checks you could perform, such as source links opened or schema reviewed. Write "not run" with the reason when a check did not run. Do not report a pass without a result.
9. **Assumptions.** List decisions you proceeded with because the brief or design left them open. Write "none" when there are none.
10. **Risks.** Include residual product, security, data, and schedule risks.
11. **Blockers.** Include missing access, missing approval, and conflicting file ownership. Write "none" when the parent can continue.
12. **Remaining work.** List incomplete acceptance checks and follow-up tasks.
13. **Recommended next agent.** Name one parent-launched agent, or "user" when a gate is waiting. Do not name a chain the specialist intends to launch itself.

## Status after a handoff

| Evidence | Next status |
| --- | --- |
| Deliverable missing or ownership conflict | `BLOCKED` |
| Deliverable written and waiting for the parent review | `REVIEW` |
| QA or security is still executing | `TESTING` |
| Parent confirms definition of done | `DONE` |
| Deliverable rejected | `REJECTED` |

A returned handoff sets the task to `REVIEW` at most. The parent moves it to `DONE` only after `docs/ai-team/DEFINITION_OF_DONE.md` passes.

## Example

```markdown
## Handoff
1. Task ID: T-004
2. Agent name: software-architect
3. Task objective: Design password reset inside the approved brief.
4. Inputs reviewed: PROJECT_ROOT/docs/requirements/PRD.md, PROJECT_ROOT/docs/research/RESEARCH.md, PROJECT_ROOT/docs/research/FEASIBILITY.md
5. Work performed: Wrote the module boundaries, API contract, data model, and file ownership.
6. Files created or modified: PROJECT_ROOT/docs/architecture/ARCHITECTURE.md, PROJECT_ROOT/docs/architecture/DATABASE_DESIGN.md
7. Deliverables: PROJECT_ROOT/docs/architecture/ARCHITECTURE.md
8. Tests or verification performed: not run. Design only. Checked that every file area has one owner.
9. Assumptions: Email delivery uses the existing mail provider named in the brief.
10. Risks: Token storage is unspecified for existing sessions.
11. Blockers: none
12. Remaining work: User approval of the architecture (Gate 2).
13. Recommended next agent: user
```
