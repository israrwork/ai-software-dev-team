---
name: website-reverse-engineering
description: "Analyzes public reference websites, user journeys, page structure, and features into a sourced comparison. Use when researching a competitor or reference product for docs/research."
---

# Website reverse engineering

## When to use

Use when the brief names reference sites or competitors, or when market expectations are still unclear. This is public product research for a functional comparison. It is not an intrusion or bypass of access controls.

## Inputs

- Approved brief and the questions the research must answer.
- Public URLs the user named, plus official public pages needed to answer the brief.
- Current `PROJECT_ROOT/docs/research/RESEARCH.md` when one already exists.

## Steps

1. Open only public pages. Stop and record the gap if a flow sits behind a login you do not have.
2. For each site, record the entry point, primary user journey, and the pages or states you observed.
3. List visible features. Mark each feature as in the current brief, a common expectation, or new scope.
4. Note page structure only as far as it explains the journey: navigation, main actions, and key forms.
5. Cite the page title and URL for each claim. Separate what you saw from what you inferred.
6. Write the findings into the research report. Leave the build verdict to the feasibility analyst.

## Outputs

- Journey and feature sections in `PROJECT_ROOT/docs/research/RESEARCH.md`
- A source list with titles and URLs
- Recommendations labeled as recommendations

## Validation

- Each journey step points at a source or is labeled unverified.
- New-scope features are not written back into the brief.
- No credentials, private data, or copied paywalled content appear in the report.
