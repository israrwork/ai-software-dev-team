---
name: backend-development
description: "Implements business logic, APIs, authentication, authorization, and server error handling within assigned backend files. Use for backend tasks from an approved design."
---

# Backend development

## When to use

Use for a backend task with an approved file list. Stop when Gate 2 is closed, the contract is missing, or the change belongs in schema or integration files.

## Inputs

- Approved brief, task, and API contract.
- Existing server layout, auth middleware, and error pattern.
- Schema and integration contracts owned by other roles.

## Steps

1. Read the existing module that should own the behavior. Extend it when it already fits.
2. Put domain rules in one place. Keep handlers thin.
3. Validate untrusted input on the server.
4. Enforce the design's authentication and authorization on each protected action.
5. Return the status codes and error shapes from the contract.
6. Add a job, queue, or event only when the design names it. Use the repository's existing mechanism.
7. Run the backend tests that cover this behavior. Record the command and result.
8. Write `PROJECT_ROOT/docs/development/backend.md` with the implemented behavior and any contract gap.

## Outputs

- Assigned server files and their tests.
- `PROJECT_ROOT/docs/development/backend.md`
- Handoff with verification evidence.

## Validation

- Protected actions deny unauthenticated or unauthorized callers.
- Input that breaks a stated rule is rejected on the server.
- Logs and errors omit secrets.
- The change does not edit schema, UI, or third-party client files owned by someone else.
