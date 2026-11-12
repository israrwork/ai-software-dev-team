# Approval policy

Agents propose. The user approves. A gate opens only when the user clearly approves it in the conversation. Silence, a specialist handoff, or a draft document does not open a gate.

The project manager records the gate state in `PROJECT_ROOT/docs/project/PROJECT_STATUS.md`.

## Gate 1. Requirements

**Opens when:** the user approves the PRD in `PROJECT_ROOT/docs/requirements/PRD.md`.

**Required content before the ask:** goal, users, in scope, out of scope, features, acceptance criteria, constraints, and remaining questions.

**While closed:** research may be prepared only to clarify a question the user was asked. Research findings are not an input to architecture. Implementation stays stopped.

**After it opens:** the parent launches research and feasibility in parallel.

## Research review

**Opens when:** the user has seen the consolidated research and feasibility verdict and tells the session to continue to architecture.

**While closed:** the architect does not start. A `proceed` verdict does not replace the user review.

**Stop verdict:** if feasibility returns `stop`, tell the user the blocker and wait. Do not design around it.

## Gate 2. Architecture

**Opens when:** the user approves `PROJECT_ROOT/docs/architecture/ARCHITECTURE.md`.

**Required content before the ask:** modules, data model, API contracts, security boundaries, file ownership, and open decisions.

**While closed:** no implementation tasks are started and no application code is changed for the feature.

**After it opens:** the project manager writes the task plan. Implementers receive only their assigned files.

## Gate 3. Local application review

**Opens when:** the user explicitly approves the running local application in this conversation.

**Required content before the ask:**

- The application has started. Record the command and the result that shows it is serving.
- The local URL, such as `http://localhost:8000`.
- How to start and stop it.
- Development-only login credentials when the app has accounts. Write "no login" when it does not.
- Implemented features, known gaps, and the QA and security results.

**While closed:** production preparation does not start. The session does not deploy, restart production, change live DNS, or run a production migration. Passing automated tests does not open this gate. Silence does not open it.

**After it opens:** the user has accepted this local build. Production preparation may start.

If the user requests changes, close the gate again and follow the feedback cycle below. The next approval must name the updated local build.

## Feedback cycle

1. The project manager records the feedback in `PROJECT_ROOT/docs/project/REVIEW.md`.
2. Each issue gets one owning developer and a task-board row.
3. That developer implements the change in the assigned files.
4. The QA engineer retests the affected behavior and records the command and result.
5. The local application is restarted or refreshed, and the new URL check is recorded.
6. Show the user the updated application.
7. Wait for explicit approval. Repeat until Gate 3 opens.

## Gate 4. Production deployment

**Opens when:** Gate 3 is open and the user explicitly approves the production action in this conversation. Approval of the local application is not approval to deploy. Approval of the release document is approval to prepare.

**Required content before the ask:** the exact command or pipeline action, the target environment, the database backup, rollback, and the health check.

**While closed:** after Gate 3 is open, the DevOps engineer may edit pipeline and documentation files. The session does not deploy, restart production, change live DNS, or run a production migration.

**After it opens:** run only the approved production action, then verify production health and report the result.

## Destructive data commands

DROP, TRUNCATE, unscoped DELETE, production migrations, and recursive deletion of project data require a separate approval. Show the exact command and wait. Approval of a feature is not approval of that command.

## What counts as approval

Use a user message that names the gate or the artifact, such as "I approve the architecture", "the local app looks good", or "approved, deploy to production."

These do not open a gate:

- The agent announcing the gate is open
- A research, design, or test file existing on disk
- A passing test suite
- Silence after a demo
- A previous feature’s approval
- Approval of a different environment
- Local approval used as production approval

If the message is ambiguous, ask one clarification question and keep the gate closed.
