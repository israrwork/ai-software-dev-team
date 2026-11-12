---
name: deployment-workflow
description: "Starts the local application after QA and prepares production only after the user approves that local build. Use for local startup, release preparation, and rollback planning. Stops before any production action."
---

# Deployment workflow

## When to use

Use after QA and security revalidation report no open critical issues. Run the local application first. Prepare production only after the user approves that running build at Gate 3.

## Inputs

- Passing QA and security reports.
- Current install, run, CI, and deploy configuration.
- Environment variable names from the architecture.
- For production preparation, an open Gate 3 recorded in the status file.

## Steps

Local run:

1. Read how `PROJECT_ROOT` already starts. Use that command.
2. Install dependencies with the project's package manager inside `PROJECT_ROOT`.
3. Add local environment values the app needs to boot. Commit names and examples in the application repository only when the user asks for a commit. Keep production secrets out of the application. Record development-only demo passwords in the local runbook.
4. Create or migrate the local database and seed safe fake test data. Show any destructive command and wait for approval of that exact command.
5. Start the development server and the workers, queues, or frontend tools the design requires.
6. Check that the local URL responds. Save the command and the response or listen result.
7. Write `PROJECT_ROOT/docs/deployment/LOCAL.md` with the URL, start command, stop command, test accounts or "no login", implemented features, known gaps, and the QA and security report paths.
8. When startup fails, record the error and the owning role. Stop. Do not present the URL as ready.
9. Ask the user to review the running app. This is Gate 3. Stop.

Production preparation, only after Gate 3 is open:

10. Read the existing release path. Extend it. Do not replace it with a new platform unless the user asked.
11. Confirm the build and test commands that CI should run. Do not change application behavior to force success.
12. List required environment variables by name. Leave production values out.
13. Write the deploy steps, database backup, health check, logging or monitoring already used by the project, and rollback in `PROJECT_ROOT/docs/deployment/PRODUCTION.md`.
14. Add pipeline or runtime files only for gaps this feature introduces.
15. Present the plan and ask the user to approve the exact production command. This is Gate 4. Stop.
16. After that approval, run only the approved action, verify production health, and record the result.

## Outputs

- `PROJECT_ROOT/docs/deployment/LOCAL.md`
- A running local process, or a recorded startup failure
- After Gate 3, `PROJECT_ROOT/docs/deployment/PRODUCTION.md` and the pipeline or runtime files the current release path requires

## Validation

- The local document cites a successful startup result before the user is asked to review.
- Start and stop instructions are present.
- Production preparation is absent while Gate 3 is closed.
- The release document cites backup, rollback, and the health check.
- No production command runs before Gate 4.
- Production secret values are absent.
