# AI software development team

This repository is the reusable AI development team. It holds Cursor agents, rules, skills, workflow docs, project templates, and automation scripts. Applications it creates live in separate folders and Git repositories.

## Start

Open this repository in Cursor and run:

```text
/start-new-project
```

The team asks one question at a time, including the project name and where to create it. It scaffolds that folder from `templates/project`, initializes Git there, and writes the application's documents under that project's `docs/` directory. It demonstrates the running local application and waits for your approval before any production plan.

Creating the folder does not commit, push, or create a GitHub repository.

## Layout

| Path | Purpose |
| --- | --- |
| `.cursor/agents/` | Specialist subagents |
| `.cursor/skills/` | Repeatable procedures |
| `.cursor/rules/ai-team-workflow.mdc` | Always-on principles and gates |
| `.cursor/hooks.json` | Safety and logging hooks |
| `docs/ai-team/WORKFLOW.md` | Lifecycle |
| `docs/ai-team/PROJECT_LAYOUT.md` | Where a generated project's files go |
| `templates/project/` | Scaffold copied into each new application |
| `scripts/new-project.mjs` | Creates the project folder and its Git repository |

Check the configuration with:

```text
node scripts/validate-ai-team.mjs
```
