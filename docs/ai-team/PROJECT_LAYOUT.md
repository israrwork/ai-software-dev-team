# Generated project layout

This repository is the AI development team. It holds agents, rules, skills, hooks, templates, and these operating documents. It is not an application.

`PROJECT_ROOT` is the absolute path of the generated application. Create it as a sibling of this repository, or in another directory the user names. Never create it inside this repository.

Resolve every application path from `PROJECT_ROOT`. Do not use a fixed absolute path such as `/application/docs/`.

## Documents

| Work product | Path |
| --- | --- |
| PRD | `PROJECT_ROOT/docs/requirements/PRD.md` |
| Project status and gates | `PROJECT_ROOT/docs/project/PROJECT_STATUS.md` |
| Research | `PROJECT_ROOT/docs/research/RESEARCH.md` |
| Feasibility report | `PROJECT_ROOT/docs/research/FEASIBILITY.md` |
| Architecture | `PROJECT_ROOT/docs/architecture/ARCHITECTURE.md` |
| Database design | `PROJECT_ROOT/docs/architecture/DATABASE_DESIGN.md` |
| Task plan | `PROJECT_ROOT/docs/development/TASKS.md` |
| Task board | `PROJECT_ROOT/docs/development/TASK_BOARD.md` |
| Implementation notes | `PROJECT_ROOT/docs/development/<role>.md` |
| QA evidence | `PROJECT_ROOT/docs/testing/QA.md` |
| Security audit | `PROJECT_ROOT/docs/security/SECURITY_AUDIT.md` |
| Local runbook | `PROJECT_ROOT/docs/deployment/LOCAL.md` |
| Production guide | `PROJECT_ROOT/docs/deployment/PRODUCTION.md` |
| Review feedback | `PROJECT_ROOT/docs/project/REVIEW.md` |
| Final delivery report | `PROJECT_ROOT/docs/project/FINAL_DELIVERY_REPORT.md` |

Source code, tests, `README.md`, and `.gitignore` also live under `PROJECT_ROOT`. The approved architecture chooses the source folders. The example names `app/`, `routes/`, and `database/` are illustrations, not a required stack.

## Git

Initialize Git inside `PROJECT_ROOT` only. The scaffold script does this and does not create a commit, remote, or GitHub repository.

Do not run `git init` in the AI team repository for an application. Do not add this repository as a submodule or remote unless the user explicitly asks. Do not push or publish until the user explicitly approves that action.

Each application keeps its own commit history, README, and `.gitignore`.

## Multiple projects

Create a new directory, documentation tree, task board, status file, and Git repository for every new application. Do not reuse another project's documents, tasks, credentials, or source unless the user explicitly authorizes that reuse.

## Team repository protection

Ordinary application work does not edit `.cursor/`, `docs/ai-team/`, `templates/`, or `scripts/` in the AI team repository. If a reusable-team improvement is worth keeping, describe it and wait for the user to approve that change before editing those files.
