---
name: system-architecture
description: "Designs modules, API contracts, security boundaries, and a technical decision record from an approved brief. Use when writing PROJECT_ROOT/docs/architecture/ARCHITECTURE.md."
---

# System architecture

## When to use

Use when Gate 1 is open, the user has reviewed research and feasibility, and the architecture document does not yet exist or must be revised. The software architect owns this procedure.

## Inputs

- `PROJECT_ROOT/docs/requirements/PRD.md`
- `PROJECT_ROOT/docs/research/RESEARCH.md`
- `PROJECT_ROOT/docs/research/FEASIBILITY.md`
- The current source tree and existing architecture notes

## Steps

1. Stop when the feasibility verdict is `stop` or the user has not reviewed the research.
2. Restate the scope in the design. Leave out features that are out of scope.
3. Define modules and which role owns each one.
4. Write API contracts for each new or changed operation: method, path, auth, request, response, and important errors.
5. Point at the data model from the `database-design` skill.
6. Define authentication, authorization, and trust boundaries.
7. Record one decision record per choice that rejects a real alternative.
8. Write the implementation order and the file ownership table.
9. List open decisions as questions. Stop for the user at Gate 2.

## Outputs

- `PROJECT_ROOT/docs/architecture/ARCHITECTURE.md`
- `PROJECT_ROOT/docs/architecture/DATABASE_DESIGN.md`

## Validation

- Every acceptance criterion in the brief maps to a module or an explicit exclusion.
- Every file area has one owner.
- API errors and auth rules are specified for protected operations.
- No application code, migration, or pipeline file was changed.
