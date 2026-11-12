---
name: code-review
description: "Reviews a change for correctness, maintainability, performance, and project conventions. Use when the user asks for a code review or before implementation is handed to QA."
---

# Code review

## When to use

Use on a completed implementation diff before QA, or when the user asks for a review. This is a quality review. The security auditor still performs the independent security review.

## Inputs

- The task's acceptance criteria and file list.
- The architecture section for this change.
- The diff or the changed files.

## Steps

1. Read the surrounding code so the review judges the change in context.
2. Check behavior against the acceptance criteria and the API contract.
3. Look for duplicated domain rules, dead branches, and error paths that swallow failures.
4. Note performance costs that the design did not ask for, such as unbounded queries or work repeated per item.
5. Check that names, module boundaries, and dependencies match the repository.
6. Confirm tests exist for the new behavior or that the handoff explains why they were not run.
7. Report findings first, ordered by severity. Include the file and the change you recommend. Keep praise brief.

## Outputs

- A review note in the handoff, or a short section the parent can paste into the task evidence.
- Findings marked critical, suggestion, or note.

## Validation

- Each finding names a file and the expected change.
- The review does not edit files owned by another agent unless the parent assigned those fixes.
- Security exploit steps are left out. Point security concerns at the security auditor.
