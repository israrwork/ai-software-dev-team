---
name: project-planning
description: "Breaks an approved architecture into owned tasks, dependencies, priorities, milestones, and acceptance criteria. Use after architecture approval to write the task list and the project task board."
---

# Project planning

## When to use

Use after the user approves the architecture. The project manager writes the plan inside `PROJECT_ROOT`. Implementers do not invent extra tasks.

## Inputs

- Approved `PROJECT_ROOT/docs/requirements/PRD.md`
- Approved `PROJECT_ROOT/docs/architecture/ARCHITECTURE.md`, including the file ownership table
- `PROJECT_ROOT/docs/development/TASK_BOARD.md`
- `docs/ai-team/DEFINITION_OF_DONE.md`

## Steps

1. Confirm Gate 2 is open in `PROJECT_ROOT/docs/project/PROJECT_STATUS.md`. Stop when it is closed.
2. Split the implementation plan into tasks that one agent can finish.
3. Give each task a `T-###` id, owner, priority, dependency list, file list, and acceptance check. File paths stay inside `PROJECT_ROOT`.
4. Keep database schema tasks ahead of server tasks that depend on them. Keep API tasks ahead of UI tasks that call those APIs.
5. Mark tasks with different files and no dependency as parallelizable. Mark shared files as sequential.
6. Write `PROJECT_ROOT/docs/development/TASKS.md`.
7. Add rows to `PROJECT_ROOT/docs/development/TASK_BOARD.md` with status `READY` only when their dependencies and gate are satisfied. Leave the rest `BACKLOG`.
8. Tell the parent which independent tasks can be launched together.

## Outputs

- `PROJECT_ROOT/docs/development/TASKS.md`
- Updated `PROJECT_ROOT/docs/development/TASK_BOARD.md`
- Updated gate and phase notes in `PROJECT_ROOT/docs/project/PROJECT_STATUS.md`

## Validation

- Every implementation file in the design appears under exactly one owner.
- Every task has an acceptance check that QA can run or inspect.
- No implementation task is `READY` while Gate 2 is closed.
- Parallel tasks do not share a file.
- No task was written into the AI team repository.
