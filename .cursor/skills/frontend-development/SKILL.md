---
name: frontend-development
description: "Implements responsive UI, components, client validation, and accessibility within assigned frontend files. Use for frontend tasks from an approved design."
---

# Frontend development

## When to use

Use for a frontend task whose file list is in the approved task plan. Stop when Gate 2 is closed or the file belongs to another owner.

## Inputs

- Approved brief, task, and architecture, including the API contract.
- Existing UI components, routes, and styles.
- Acceptance criteria for this task.

## Steps

1. Read the surrounding UI before adding a component. Match the existing patterns.
2. Build only the screens and states named in the design, including empty and error states the contract can return.
3. Keep layout usable at a narrow and a wide viewport when the design is responsive.
4. Validate input on the client and show the server errors the contract defines.
5. Use semantic structure, labels, and keyboard access for the interactions you add.
6. Connect the UI to the approved endpoints. Do not invent a path or payload.
7. Run the frontend checks the application already has. Record the command and result.
8. Write `PROJECT_ROOT/docs/development/frontend.md` with how to exercise the change and any browser you could not run.

## Outputs

- Assigned UI files and their tests.
- `PROJECT_ROOT/docs/development/frontend.md`
- Handoff with verification evidence.

## Validation

- The change stays inside the assigned files.
- Visible controls needed to meet the acceptance criteria can be reached and submitted.
- Client secrets are absent.
- Unrun checks are reported as not run.
