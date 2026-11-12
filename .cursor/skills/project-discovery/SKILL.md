---
name: project-discovery
description: "Gathers product requirements one question at a time and writes a PRD with users, scope, and acceptance criteria. Use during discovery, brief clarification, or when creating PROJECT_ROOT/docs/requirements/PRD.md."
---

# Project discovery

## When to use

Use at the start of an application, when the PRD has open questions, or when the user describes a new idea. The project manager owns the PRD. The parent session asks the user and waits.

## Inputs

- The user's idea and any answers already given.
- `PROJECT_ROOT` when the project folder already exists. For a new application, the parent creates it first with `scripts/new-project.mjs`.
- `docs/ai-team/APPROVAL_POLICY.md` and `docs/ai-team/PROJECT_LAYOUT.md`

## Steps

1. If the user named an existing application directory, use it as `PROJECT_ROOT` and inspect its README, manifests, and source before proposing scope.
2. For a new application, ask for the project name if it is missing. Then ask for the parent directory if it is missing. Ask one question, then stop the turn. The default parent is the folder that contains the AI team repository.
3. The parent runs `node scripts/new-project.mjs --name <name> --parent <directory>` before any PRD is written. Do not place the project inside the AI team repository.
4. Record answers the user already gave. Do not ask those again.
5. Ask the single next unanswered product question, then stop the turn. Cover, in order: the problem, the users and roles, the first release, out of scope, technology constraints, and what success looks like.
6. Write `PROJECT_ROOT/docs/requirements/PRD.md` with goal, users, roles, in scope, out of scope, features, acceptance criteria, constraints, and unanswered questions.
7. Write `PROJECT_ROOT/docs/project/PROJECT_STATUS.md` with Gate 1 closed.
8. Ask the user to approve the PRD. Do not treat the draft as approved.

## Outputs

- `PROJECT_ROOT/docs/requirements/PRD.md`
- `PROJECT_ROOT/docs/project/PROJECT_STATUS.md`
- A handoff that recommends `user` until Gate 1 opens.

## Validation

- The project directory is outside the AI team repository and has its own Git repository.
- The PRD separates in scope from out of scope.
- Every acceptance criterion is testable.
- Unanswered questions are listed, not filled in.
- Gate 1 stays closed until the user approves the PRD.
- No application document was written into the AI team repository.
