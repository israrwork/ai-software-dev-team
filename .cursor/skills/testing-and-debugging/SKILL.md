---
name: testing-and-debugging
description: "Plans and runs tests, records command evidence, reproduces failures, and verifies fixes against acceptance criteria. Use for QA, bug investigation, and revalidation."
---

# Testing and debugging

## When to use

Use after assigned implementation exists, when a check fails, and again after fixes. The QA engineer owns the report. Developers use the reproduction steps to fix their own files.

## Inputs

- Acceptance criteria, design, and implementation notes.
- The current test commands in the repository.
- The previous QA report during revalidation.

## Steps

1. Map each acceptance criterion to a check: unit, integration, feature, end-to-end, or inspection.
2. Use the test layout the repository already has. Add a test only where that layer already lives.
3. Run the checks. Save the command, exit result, and the relevant failure output.
4. For a failure, record owner, steps, expected result, and actual result. Reproduce it once before filing it.
5. When a named check cannot run, record why. Do not call it passed.
6. After a fix, rerun the failed checks and the closest regression checks. Say what is still open.
7. Leave production code unchanged. Return defects to the file owner.

## Outputs

- `PROJECT_ROOT/docs/testing/QA.md`
- Test files added beside the existing convention
- Handoff evidence with commands and results

## Validation

- Every acceptance criterion is passed, failed, or not run.
- Every pass cites a command result or a specific inspection.
- Defects name one owning role.
- Production behavior was not edited by the QA pass.
