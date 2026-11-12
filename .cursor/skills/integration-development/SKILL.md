---
name: integration-development
description: "Implements OAuth, REST clients, webhooks, retries, and synchronization for a cited third-party contract. Use for integration tasks from an approved design."
---

# Integration development

## When to use

Use for an integration task with an approved file list and a cited provider contract. Stop when the contract cannot be confirmed or Gate 2 is closed.

## Inputs

- Approved design section for the external system.
- Provider documentation URL and the feasibility notes.
- Environment variable names. Secret values are not an input.

## Steps

1. Confirm the auth method, endpoint, payload, and error cases from the cited source.
2. Read configuration from the named environment variables. Never write a key, token, or client secret into source, docs, tests, or logs.
3. Map external data at the edge. Call backend-owned domain rules instead of reimplementing them.
4. Retry transient failures with a bounded attempt count. Do not retry a caller error forever.
5. Honor the documented rate limit. Record how the code backs off.
6. Verify webhook signatures or the provider's stated authenticity check when the provider defines one.
7. Make synchronization safe to run again: a repeated event must not create duplicate business records.
8. Do not call a production provider endpoint unless the user approves that call.
9. Write `PROJECT_ROOT/docs/development/integration.md` with variable names, failure behavior, and the verification you ran.

## Outputs

- Assigned client, OAuth, webhook, or sync files.
- `PROJECT_ROOT/docs/development/integration.md`

## Validation

- The implementation matches a cited contract.
- Secret values are absent from the diff and the note.
- Retry and duplicate delivery behavior are described.
- Domain files owned by the backend were not edited.
