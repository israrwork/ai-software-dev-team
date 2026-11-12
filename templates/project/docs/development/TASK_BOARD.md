# Task board

Project: {{PROJECT_NAME}}

The parent session and the project manager maintain this registry. Specialists do not edit it.

Do not mark a task `DONE` because an agent replied. `DONE` requires the checks in the AI team's definition of done and evidence in the last column.

## Statuses

| Status | Meaning |
| --- | --- |
| `BACKLOG` | Captured, not ready to start |
| `READY` | Inputs and ownership are clear, and the required gate is open |
| `IN_PROGRESS` | The assigned agent is doing the work |
| `BLOCKED` | A decision, dependency, or file conflict stops the work |
| `REVIEW` | A deliverable exists and is waiting for the parent to review it |
| `TESTING` | QA or security verification is in progress |
| `DONE` | Definition of done passed and evidence is recorded |
| `REJECTED` | The deliverable failed review and returns to its owner |

## Registered tasks

| Task ID | Description | Assigned agent | Priority | Status | Dependencies | Acceptance criteria | Verification evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

## Update rules

- Add a row when work is planned. Use the next `T-###` id.
- Set one assigned agent. Split the work when two agents would edit the same file.
- Keep `READY` work behind its gate. Implementation rows stay `BACKLOG` until Gate 2 is open.
- Move an agent's returned work to `REVIEW`, then to `DONE` or `REJECTED` after the parent checks the files.
- Put the command, result, or document path in `Verification evidence`.
