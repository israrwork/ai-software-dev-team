---
name: documentation-generation
description: "Writes technical documentation, API notes, setup instructions, and release notes that match the implementation. Use when a deliverable requires documentation or a closeout report."
---

# Documentation generation

## When to use

Use when a task requires a durable document: architecture, API notes, setup, release notes, or the final delivery report. Update an existing document when one already covers the topic.

## Inputs

- The approved brief, design, or implementation notes that are the source of truth.
- The current document, when it exists.
- Command results or review findings that the document must cite.

## Steps

1. Read the source of truth. Do not document behavior the code or design does not contain.
2. Update the existing page instead of creating a second page for the same topic.
3. For API notes, include method, path, auth, request, response, and the errors callers must handle.
4. For setup notes, include prerequisites, environment variable names, local start and stop commands, and the local URL. Include development-only demo accounts. Omit production secret values.
5. For release notes, include what changed, the local review state, verification evidence, backup, rollback, and whether production deploy is still waiting.
6. For the delivery report, fill every section in `PROJECT_ROOT/docs/project/FINAL_DELIVERY_REPORT.md`. Use "not run" or "not approved" where that is the truth.
7. Remove or rewrite statements the change made false.

## Outputs

- The assigned document path from `docs/ai-team/WORKFLOW.md`
- A handoff listing docs updated and claims that still lack evidence

## Validation

- A reader can follow the setup or API note without the chat history.
- Commands and results in the doc match what was actually run.
- Gate and deployment statements match `docs/ai-team/APPROVAL_POLICY.md`.
- Secrets are absent.
