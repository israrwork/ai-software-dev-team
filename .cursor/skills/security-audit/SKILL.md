---
name: security-audit
description: "Reviews a change independently for authentication, authorization, injection, XSS, CSRF, secrets, and sensitive data exposure. Use for security review and revalidation. Reports fixes without exploit procedures."
---

# Security audit

## When to use

Use after implementation notes and the diff exist, and again after security fixes. The security auditor owns the report and does not implement fixes.

## Inputs

- Approved security boundaries in the architecture.
- The feature diff and the code it calls.
- QA report, as context. Developer claims are not evidence.

## Steps

1. Read the changed paths and the auth path they use.
2. Check each protected action for an authentication and authorization decision.
3. Check queries, commands, templates, and redirects for untrusted input joined into the operation.
4. Check rendered output and client-controlled HTML for XSS exposure.
5. Check state-changing browser requests for CSRF protection when the framework does not already provide it.
6. Check responses, logs, docs, and client code for secrets and sensitive data.
7. When dependencies changed, review those dependency changes. Skip a full dependency audit when none changed.
8. Rank findings critical, warning, or note. Name the file, impact, owner, and fix.
9. On revalidation, mark each prior finding resolved or still open, with the evidence you checked.

## Outputs

- `PROJECT_ROOT/docs/security/SECURITY_AUDIT.md`
- Handoff listing open owners

## Validation

- The report is based on files the auditor opened.
- Findings contain no exploit payload or attack procedure.
- Secret values are omitted. Variable names or file locations identify the issue.
- Critical findings stay open until revalidation checks the fix.
