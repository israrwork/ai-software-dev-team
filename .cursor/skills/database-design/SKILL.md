---
name: database-design
description: "Defines entities, relationships, indexes, integrity rules, and migration shape from an approved architecture. Use for the architecture data model or assigned database implementation."
---

# Database design

## When to use

Use while writing the architecture data model, or while implementing schema tasks assigned to the database engineer. Implementation waits for Gate 2.

## Inputs

- Approved brief and the data described there.
- Feasibility notes on volume and access paths.
- Current schema and migrations, when the repository has them.

## Steps

1. List entities and fields that the brief and design require. Do not add entities for speculative reports.
2. Define relationships, required fields, uniqueness, and delete behavior.
3. Draw an ER diagram in Mermaid.
4. Name the indexes that support the access paths in the design.
5. Describe the migration as the smallest change that keeps existing data. Include rollback.
6. Note backup and recovery for this change: what must be restorable, and which command would be destructive.
7. During implementation, edit only assigned schema and query files. Put any DROP, TRUNCATE, or unscoped DELETE in the note and wait for approval of that exact command.

## Outputs

- Data-model section of `PROJECT_ROOT/docs/architecture/DATABASE_DESIGN.md`, and the matching summary in `PROJECT_ROOT/docs/architecture/ARCHITECTURE.md`, or
- Schema changes plus `PROJECT_ROOT/docs/development/database.md`

## Validation

- Every relationship in the diagram exists in the schema description.
- Access paths named in the design have an index or a written reason they do not.
- No destructive command was executed without a recorded user approval.
- Connection strings and data dumps are absent.
