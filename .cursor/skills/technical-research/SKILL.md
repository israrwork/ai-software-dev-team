---
name: technical-research
description: "Researches official documentation, APIs, libraries, and open-source options with sources. Use during research or feasibility work when a contract, library, or technical alternative is unknown."
---

# Technical research

## When to use

Use when the brief depends on a framework, protocol, API, or library and the contract is not already in the repository. Research writes evidence. Feasibility writes the verdict.

## Inputs

- The question to answer, taken from the brief or feasibility task.
- Official documentation and primary source repositories.
- The project's manifests, when the repository already has a stack.

## Steps

1. Search official docs and the project the library or API belongs to. Prefer those over summaries.
2. Record the version or date you read, the capability found, and the limitation found.
3. Compare at most three realistic alternatives against the requirement. Include the option already used in the repository.
4. For an open-source candidate, note the license, maintenance signal you could verify, and the integration point.
5. For an API, note authentication, the environment variable name it would need, rate limits, and undocumented behavior. Do not copy secret values.
6. Split the write-up into facts, unknowns, and recommendations.

## Outputs

- Sourced notes in `PROJECT_ROOT/docs/research/RESEARCH.md` or `PROJECT_ROOT/docs/research/FEASIBILITY.md`, matching the agent that invoked the skill.
- A short list of unknowns the architect must not invent past.

## Validation

- Every factual claim has a title and URL or a repository path.
- Unknowns are labeled unknown.
- The note does not select a new stack when the current one already fits.
