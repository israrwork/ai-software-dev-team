# Definition of done

The parent session marks a task `DONE` on `PROJECT_ROOT/docs/development/TASK_BOARD.md`. The specialist who did the work does not mark it `DONE`.

A task is done when every applicable item below is true and the evidence is recorded in the handoff or the deliverable.

## All tasks

- The assigned deliverable exists at its `PROJECT_ROOT` path in `docs/ai-team/PROJECT_LAYOUT.md`.
- The handoff in `docs/ai-team/AGENT_HANDOFF_PROTOCOL.md` is complete.
- Acceptance criteria for that task are checked off with evidence.
- Assumptions, risks, blockers, and remaining work are recorded.
- The change stays inside the approved scope and the assigned files.
- Secrets are absent. Configuration is referenced by environment variable name.

## Documentation and design tasks

- Sources or design inputs are listed.
- Facts are separated from assumptions.
- Open decisions are written as questions for the user.
- A later feature can read the document without the chat history.

## Implementation tasks

- The implementation exists in the assigned files.
- The project’s relevant tests were run, and the command plus result are recorded.
- A check that could not be run is listed with the reason. It is not called a pass.
- User-facing behavior matches the approved design.
- Documentation required by the task is updated.
- Known limitations are recorded in the role note under `PROJECT_ROOT/docs/development/`.

## QA tasks

- Each acceptance criterion is passed, failed, or not run.
- Failed items include owner, steps, expected result, and actual result.
- The report includes the commands that were executed and their results.
- Production code was not changed to force a pass.

## Security tasks

- The review used the diff and the design, not the implementer’s summary alone.
- Findings name severity, file, impact, owner, and a fix.
- The report contains no exploit procedure and no secret value.
- Revalidation says which findings are closed and which remain.

## Local demonstration

- The startup command and a successful serving result are recorded.
- `PROJECT_ROOT/docs/deployment/LOCAL.md` includes the URL, start and stop steps, features, known gaps, and test-account details or "no login".
- The user has not been told the app is ready while startup is failing.
- Gate 3 stays closed until the user explicitly approves that build.

## Release tasks

- Gate 3 is open before production preparation is marked done.
- QA and security revalidation results are cited.
- Deploy steps, backup, health check, rollback, and environment variable names are written.
- Gate 4 stays closed until the user explicitly approves the production action.
- No production command was run as part of preparation.

## Project review

Automated tests do not finish the project. The user reviews the running local application before production preparation begins.

## Rejection

Set the task to `REJECTED` when the deliverable misses its acceptance criteria or edits files outside its ownership. Send the follow-up to the same owner. Do not open the next gate to compensate for a rejected task.
