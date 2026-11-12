---
name: start-new-project
description: "Starts the AI software team lifecycle for a new application in its own folder and Git repository, with approval gates. Use when the user invokes /start-new-project or asks to kick off a new product effort."
disable-model-invocation: true
---

# Start a new project

Run this from the parent session in the AI team repository. Ask one question at a time, then end the turn. Delegate specialist work with the Task tool to the subagent types in `.cursor/agents/`. Do not start implementation before the user approves the architecture.

Specialists must not spawn further agents. Review their files before you change `PROJECT_ROOT/docs/development/TASK_BOARD.md`.

Application code and application docs go only in `PROJECT_ROOT`. Do not modify the AI team's agents, skills, rules, or templates during ordinary application work. Propose that kind of change and wait for approval.

## When to use

Use when the user invokes `/start-new-project` or asks the team to take a new idea from discovery through delivery. If the user names an existing application directory, continue that project instead of creating another one.

## Inputs

- The user's first message, which may already include the idea, project name, or directory.
- `docs/ai-team/WORKFLOW.md`, `docs/ai-team/APPROVAL_POLICY.md`, and `docs/ai-team/PROJECT_LAYOUT.md`
- For an existing application: its README, manifests, and source layout.

## Steps

1. If the user names an existing application, set `PROJECT_ROOT` to that directory and inspect it before proposing changes. Do not create a second project. Do not reuse another project's docs, tasks, credentials, or source unless the user explicitly authorizes that reuse.
2. For a new application, ask for the project name if it is missing. Then ask where to create it if the user has not chosen a parent directory. Offer the folder that contains this AI team repository so the new project is a sibling. Ask one question, then stop the turn.
3. Create the project with `node scripts/new-project.mjs --name <project-name> --parent <parent-directory>`. The script copies `templates/project` and runs `git init` in the new folder. It does not commit, push, or create a GitHub repository. If it refuses because the path is inside the AI team repository, ask for a different parent directory.
4. Keep a private list of the discovery answers: problem, users and roles, first release, out of scope, technology constraints, and success criteria. Record any answer the user already gave.
5. Ask the single next unanswered discovery question. Stop and wait.
6. When those answers are enough, delegate to `project-manager` to write `PROJECT_ROOT/docs/requirements/PRD.md` and `PROJECT_ROOT/docs/project/PROJECT_STATUS.md`.
7. Ask the user to approve the requirements. This is Gate 1. Stop until they approve.
8. Launch `researcher` and `feasibility-analyst` in parallel. They write `PROJECT_ROOT/docs/research/RESEARCH.md` and `PROJECT_ROOT/docs/research/FEASIBILITY.md`.
9. Delegate to `project-manager` to consolidate both files without new scope. Show the consolidation to the user and wait for direction to start architecture.
10. If feasibility returns `stop`, explain the blocker and wait.
11. Delegate to `software-architect`. Ask the user to approve `PROJECT_ROOT/docs/architecture/ARCHITECTURE.md`. This is Gate 2. Stop until they approve.
12. Delegate to `project-manager` for `PROJECT_ROOT/docs/development/TASKS.md` and the project task board.
13. Delegate implementation to the assigned owners. All source changes stay inside `PROJECT_ROOT`. Parallelize only tasks whose files do not overlap. Run shared or dependent files one at a time.
14. Use `code-review` on the implementation diff, then delegate to `qa-engineer` and `security-auditor`.
15. Send failures back to the file owner. Delegate revalidation after fixes. Stop if a critical defect or critical finding remains.
16. Delegate the local run to `devops-engineer`. Install dependencies, configure the local environment, migrate the local database, seed safe test data, and start the development server and required workers. Record the startup command and result in `PROJECT_ROOT/docs/deployment/LOCAL.md`.
17. Confirm the local URL responds. When browser tools are available, open the application and exercise the main user journeys. Never claim the application is ready for review if it has not successfully started.
18. Show the user the URL, test accounts or "no login", start and stop instructions, implemented features, known issues, and QA results. This is Gate 3. Stop until the user explicitly approves the running local application.
19. When the user requests changes, delegate the feedback record to `project-manager`, the fixes to the owning developers, and retests to `qa-engineer`. Restart the local app and wait for approval again.
20. Only after Gate 3, delegate production preparation to `devops-engineer`. Present the deployment plan. Ask for the production action. This is Gate 4. Do not prepare production until the user explicitly approves the running local application.
21. Delegate to `project-manager` for `PROJECT_ROOT/docs/project/FINAL_DELIVERY_REPORT.md`.

Skip a role only when the approved design says it is unnecessary, and tell the user which role you skipped.

Do not commit the application, push it, or create a GitHub repository unless the user explicitly asks for that action.

## Outputs

- A `PROJECT_ROOT` outside the AI team repository, with its own `git init`
- The stage documents listed in `docs/ai-team/PROJECT_LAYOUT.md`
- Task-board rows with evidence inside the application
- A delivery report whose local review and deployment status match Gate 3 and Gate 4

## Validation

- Discovery questions were asked one at a time.
- The application folder is not inside the AI team repository.
- Gate 1 closed research-for-design, Gate 2 closed implementation, Gate 3 closed production preparation, and Gate 4 closed production commands.
- The local application was started and shown before any production plan.
- Research and feasibility files both exist before architecture.
- No task is `DONE` without verification evidence.
- The parent, not a specialist, launched each delegation.
- No application source or application document was written into the AI team repository.
