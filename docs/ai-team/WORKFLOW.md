# AI software team workflow

The parent Cursor session runs this lifecycle. Specialist agents in `.cursor/agents/` do the focused work and return a handoff. The parent reviews that handoff before changing task status.

Skills in `.cursor/skills/` hold the procedures. This document holds the order and the gates. Application files are written only under `PROJECT_ROOT`, described in `docs/ai-team/PROJECT_LAYOUT.md`.

## Roles

| Agent | Subagent type | Owns |
| --- | --- | --- |
| Project manager | `project-manager` | PRD, status, tasks, review notes, delivery report |
| Researcher | `researcher` | `PROJECT_ROOT/docs/research/RESEARCH.md` |
| Feasibility analyst | `feasibility-analyst` | `PROJECT_ROOT/docs/research/FEASIBILITY.md` |
| Software architect | `software-architect` | `PROJECT_ROOT/docs/architecture/` |
| Frontend developer | `frontend-developer` | Assigned UI files inside `PROJECT_ROOT` |
| Backend developer | `backend-developer` | Assigned server files inside `PROJECT_ROOT` |
| Database engineer | `database-engineer` | Assigned schema and query files inside `PROJECT_ROOT` |
| Integration specialist | `integration-specialist` | Assigned external clients inside `PROJECT_ROOT` |
| QA engineer | `qa-engineer` | Feature tests and `PROJECT_ROOT/docs/testing/QA.md` |
| Security auditor | `security-auditor` | `PROJECT_ROOT/docs/security/SECURITY_AUDIT.md` |
| DevOps engineer | `devops-engineer` | Local runbook, then production guide after Gate 3 |

Skip a role only when the approved design says the work does not need it. Say which role was skipped and why.

The project manager prepares delegation requests. The parent session launches them with the Task tool. Specialists do not launch other specialists.

## Deliverable map

Application documents live under `PROJECT_ROOT`, never in this repository. The canonical list is `docs/ai-team/PROJECT_LAYOUT.md`.

| Work product | Path |
| --- | --- |
| PRD and scope | `PROJECT_ROOT/docs/requirements/PRD.md` |
| Status and gates | `PROJECT_ROOT/docs/project/PROJECT_STATUS.md` |
| Research | `PROJECT_ROOT/docs/research/RESEARCH.md` |
| Feasibility report | `PROJECT_ROOT/docs/research/FEASIBILITY.md` |
| Architecture | `PROJECT_ROOT/docs/architecture/ARCHITECTURE.md` |
| Database design | `PROJECT_ROOT/docs/architecture/DATABASE_DESIGN.md` |
| Task plan | `PROJECT_ROOT/docs/development/TASKS.md` |
| Task registry | `PROJECT_ROOT/docs/development/TASK_BOARD.md` |
| Implementation notes | `PROJECT_ROOT/docs/development/<role>.md` |
| QA evidence | `PROJECT_ROOT/docs/testing/QA.md` |
| Security review | `PROJECT_ROOT/docs/security/SECURITY_AUDIT.md` |
| Local runbook | `PROJECT_ROOT/docs/deployment/LOCAL.md` |
| Review feedback | `PROJECT_ROOT/docs/project/REVIEW.md` |
| Production guide | `PROJECT_ROOT/docs/deployment/PRODUCTION.md` |
| Final delivery report | `PROJECT_ROOT/docs/project/FINAL_DELIVERY_REPORT.md` |

## Lifecycle

### Stage 1. Discovery

Ask for the project name, then for the parent directory if the user has not chosen one. The default parent is the folder that contains this AI team repository, so the application is a sibling.

Create the project with:

```text
node scripts/new-project.mjs --name <project-name> --parent <parent-directory>
```

The script copies `templates/project`, initializes Git in the new directory, and does not commit, push, or create a GitHub repository. If the destination is inside this AI team repository, the script refuses.

Then use `project-discovery` and delegate the PRD to `project-manager`. The PRD is `PROJECT_ROOT/docs/requirements/PRD.md`.

Outputs: PRD, scope, user roles, features, and acceptance criteria.

Gate 1: stop until the user approves the requirements. See `docs/ai-team/APPROVAL_POLICY.md`.

### Stage 2. Research

After Gate 1, and only when the brief has no blocking questions, launch `researcher` and `feasibility-analyst` together. Their files do not overlap.

The parent then delegates to `project-manager` to consolidate both files without adding scope.

Stop and show the consolidation to the user before architecture starts.

### Stage 3. Architecture

Delegate to `software-architect`. The design includes modules, an ER diagram, schema, API contracts, security boundaries, file ownership, and an implementation plan.

Gate 2: stop until the user approves the architecture.

### Stage 4. Development planning

Delegate to `project-manager` for milestones, task assignments, dependencies, acceptance criteria, and file ownership. The parent records those tasks on `PROJECT_ROOT/docs/development/TASK_BOARD.md` with status `READY`. Status values are defined on that board.

### Stage 5. Implementation

Delegate only assigned tasks to `frontend-developer`, `backend-developer`, `database-engineer`, and `integration-specialist`.

Launch independent owners in one turn when the ownership table gives them different files. Run shared files or dependent tasks one after another.

Local subagents share this working tree. Do not parallelize overlapping edits here. Ask the user before using a cloud subagent or another isolated worktree.

### Stage 6. Quality assurance

The parent may apply the `code-review` skill to the implementation diff before QA. That review does not replace QA or the security audit.

Delegate to `qa-engineer` for functional, unit, integration, regression, and end-to-end checks that this repository can actually run.

Delegate to `security-auditor` for an independent review. QA and security may run together: QA may edit tests, and the auditor writes only the security report.

Send each failed check back to the owner of that file. Do not ask a different specialist to edit that file.

### Stage 7. Revalidation

After fixes, delegate revalidation to `qa-engineer` and `security-auditor`. Continue only when no critical QA defect or critical security finding remains open. Record residual warnings and the user decision that accepts them.

### Stage 8. Local deployment

After revalidation, delegate the local run to `devops-engineer`. Developers fix startup errors in the files they own. The database engineer applies local migrations.

The local runbook at `PROJECT_ROOT/docs/deployment/LOCAL.md` includes the start and stop commands, the local URL, development-only test accounts or "no login", implemented features, known gaps, and links to the QA and security reports. Seed only safe fake data.

The parent confirms the server started. When browser tools are available, open the local URL and exercise the main user journeys. Record what was checked. When browser tools are unavailable, say so. A URL is ready for review only after a successful startup result.

Do not tell the user the application is ready when startup failed.

### Stage 9. User review

Stop. Give the user the local URL, login details, start and stop instructions, implemented features, known issues, and test results.

Gate 3: wait for explicit approval of this running application. Silence does not approve it. A passing test suite does not approve the UI.

When the user requests changes, the project manager records them, assigns each issue to its file owner, and the team returns through implementation, QA, and another local demonstration. Gate 3 closes again until the user approves the updated build.

### Stage 10. Production preparation

Start this stage only after Gate 3 is open. Delegate to `devops-engineer` for the production checklist, environment variable names, CI/CD changes this feature needs, backup, rollback, and health checks.

Gate 4: present the deployment plan and stop before any production command. Local approval does not open Gate 4.

After an approved production action, verify production health and record the result.

### Stage 11. Final delivery

Delegate to `project-manager` for `PROJECT_ROOT/docs/project/FINAL_DELIVERY_REPORT.md`.

The report includes completed features, architecture summary, implementation summary, testing results, security findings, the local review state, deployment status, known limitations, and remaining issues.

## Delegation prompt

Give every specialist this context:

```text
Goal: <one sentence>
Project root: <absolute PROJECT_ROOT>
Task ID: <T-###>
Read: <docs and code paths inside PROJECT_ROOT>
May change: <explicit files inside PROJECT_ROOT>
Open: <gate state and unanswered questions>
Return: the handoff in docs/ai-team/AGENT_HANDOFF_PROTOCOL.md
```

Review the files they changed before trusting the handoff. Then update the task board.

## Existing applications

When the user names an existing application directory, that directory is `PROJECT_ROOT`. Inspect it before proposing changes. Follow its stack, layout, and conventions. Do not create a second project, and do not reuse another project's documents, tasks, credentials, or source unless the user explicitly authorizes that reuse. The same gates apply. Do not start implementation before Gate 2.

## Kickoff

Invoke `/start-new-project` to start this lifecycle. The skill is `.cursor/skills/start-new-project/SKILL.md`.
