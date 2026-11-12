# Optional integrations

This repository does not configure an MCP server. No server was installed during the team upgrade. Add one only after the user approves that server.

The parent session in Cursor can already use platform tools such as web search and web fetch when those tools are enabled. Specialist subagents inherit the parent tool set for that session. Availability still depends on the user’s Cursor account and settings.

The `user-rea` namespace visible in one local session is a reverse-engineering toolkit configured outside this repository. It is not part of the software-delivery workflow and was not wired into these agents.

## Useful additions

| Integration | How it would help | When to add it |
| --- | --- | --- |
| GitHub CLI (`gh`) or a GitHub MCP | Issues, pull requests, and checks become evidence for planning and delivery. The team can cite a PR instead of pasting status into chat. | When the feature is hosted on GitHub and the user wants the agent to open or update issues and PRs. |
| Browser automation | QA can exercise a web UI, and the researcher can inspect a public reference site’s flows. | When the product has a running UI. Keep it on sites the user named. Do not use it to bypass access controls. |
| Documentation search | Official API and framework docs reduce invented contracts during research and integration work. | The platform web tools cover this for the parent session. Add a docs MCP only when a provider’s search needs authenticated access. |
| Read-only database inspection | The database engineer can confirm live schema and indexes against the design. | After the project has a database and the user supplies a read-only connection. Do not point it at production write credentials. Destructive SQL stays behind the approval policy. |
| Issue tracker (GitHub Issues or Linear) | Task ids can map to tracker items the user already manages. | When the user wants the project board mirrored outside `PROJECT_ROOT/docs/development/TASK_BOARD.md`. That board remains the source of record until the user approves another tracker. |

## Not recommended yet

- A deploy MCP, or any hook that calls a hosting API. Gate 4 requires a human approval for the exact production action, and only after Gate 3 accepts the running local application.
- A database MCP with migration or admin rights.
- Search or browser access to private customer data without a task that names that data and an approval to read it.

## Using the team

Clone this repository into a workspace when you want to build an application. Run `/start-new-project` from the AI team checkout. The new application is created as its own folder and Git repository outside this one.

Do not copy these agents into the application unless you explicitly want that. Do not put application code or application docs in this repository.

A user-level copy of the agents was not installed.
