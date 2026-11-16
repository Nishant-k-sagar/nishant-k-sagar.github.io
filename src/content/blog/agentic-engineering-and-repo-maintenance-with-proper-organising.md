---
title: "Agentic engineering and Repo maintenance with proper organising"
date: "2026-11-16"
tags: ["AI", "git", "Dev"]
status: "published"
excerpt: "In the modern agentic development, It is very crucial to keeping the repo organized. The reasoning behind it is how agents work inertly."
featured: false
highlighted: false
seo_title: "Agentic engineering and coding"
seo_description: "Maintaining and keeping the repo clean vastly helps in keeping the agentic engineering on higher pedestals."
wrap_code: false
---

# Agentic development - Premise

In agentic development, the repo is not just a place to store code anymore. It is the working memory of every agent that touches it. A human engineer carries a lot in their head: where the config lives, which folder is generated, why a module looks weird. An agent carries nothing between sessions except what it can read from disk. Whatever the repo does not say clearly, the agent will guess. And those guesses pile up over time.

## Why it matters more with agents

An agent works with some hard limits:

1. Limited context. It cannot read a 400-file monolith. It navigates with `ls`, `grep` and `glob`, then loads a few files. Predictable names and folders mean it finds the right files in a few calls. Otherwise it burns tokens exploring and still edits the wrong place.
2. No memory across sessions. If it is not written in a file, it does not exist for the next session.
3. It copies the nearest example. A clean module gets replicated well. A messy one gets replicated too, bugs included.

So a navigable and explicit repo is not a style preference anymore. It directly affects the quality of the output.

## Conventional Repo Structure

Here is a layout that is easy for both humans and agents to reason about. I mean this is something very clean and easy to start with.

```text
.
├── AGENTS.md              # entry point for agents (or CLAUDE.md)
├── README.md              # entry point for humans
├── docs/
│   ├── architecture.md    # system map, data flow, boundaries
│   ├── decisions/         # ADRs: 0001-use-postgres.md ...
│   └── runbooks/          # deploy, rollback, debug
├── src/
│   ├── api/               # transport layer only (HTTP handlers)
│   ├── domain/            # business rules, no I/O
│   ├── infra/             # DB, queues, external clients
│   └── shared/            # small utilities, no dependencies
├── tests/
│   ├── unit/              # mirrors src/ one-to-one
│   ├── integration/
│   └── fixtures/
├── scripts/               # dev tooling, documented
├── .github/workflows/     # CI: lint, test, build, deploy
└── Makefile               # make test, make lint
```

A few things make this work:

1. Layered boundaries. `domain/` never imports from `infra/` or `api/`. A linter can enforce it, so the agent gets a quick failure instead of a review comment later.
2. Tests mirror the source. `src/domain/billing.py` is tested in `tests/unit/domain/test_billing.py`. No searching for where tests go.
3. One command surface. `make test`, `make lint`, `make build`. If the agent has to discover a custom way to run tests, it will often skip them.

## AGENTS.md is the most important file

`AGENTS.md` (or `CLAUDE.md`) gets loaded at the start of every session. So keep it short, accurate and useful. It is the hot path.

```markdown
# Project: payments-service

## Commands
- Install: `make setup`
- Test: `make test`   # must pass before any commit
- Lint and types: `make lint`

## Architecture
- `src/domain` is pure. No network or DB imports.
- All DB access goes through `src/infra/db/`.

## Do not
- Edit `src/generated/`, it is produced by `make codegen`.
- Add dependencies without updating `docs/decisions/`.
```

Some rules of thumb:

1. Put commands and constraints here, not history.
2. Link to deeper docs instead of copying them. Let the agent pull them when needed.
3. If removing a line changes nothing in the agent's behaviour, remove it.
4. Review it like code. Stale instructions are worse than none.

## Let the tools enforce it

Docs rot, automation does not. Whatever convention you can turn into a failing command, the agent will actually follow.

<details>
<summary>open this section also</summary>
1. Layer boundaries: `import-linter`, `dependency-cruiser`, ArchUnit<br>
2. Formatting and style: formatter and linter in pre-commit and CI<br>
3. Type safety: `mypy --strict`, `tsc --noEmit`<br>
4. Secrets: `gitleaks` in pre-commit<br>
5. Generated files untouched: CI regenerates and fails on `git diff`<br>
6. Test mirrors source: a small CI script that fails on untested modules
</details>

The loop is simple. The agent edits, runs `make lint test`, reads the exact failure, and corrects itself.

## Git hygiene

Agents produce more commits, faster. So keep the history easy to review.

1. One task, one branch, one PR. Big agent diffs are easy to rubber-stamp.
2. Use worktrees for parallel agents. `git worktree add ../feature-x feature-x` keeps them out of each other's way.
3. Conventional commits like `feat:` and `fix:` make history searchable.
4. Protect `main`. CI green and a review before merge, no direct pushes.
5. Keep a strict `.gitignore`. Build output and caches pollute search and waste context.

## Keeping the repo clean

Entropy is the real enemy here.

1. Delete dead code. Agents will read it, trust it and extend it. Git remembers it anyway.
2. Update `AGENTS.md` when an agent repeats a mistake. Fix the instruction or add a lint rule instead of correcting it in chat every time.
3. Write ADRs for decisions. A 10-line file stops the next session from reopening the same debate.
4. Keep files small and focused. A 2000-line file is costly to load and easy to break with partial edits.
5. Name things so they can be grepped. `InvoiceRetryPolicy` is findable, `Helper2` is not.

## Things to avoid

1. The junk drawer: `utils/`, `misc/` and `common/` that keep growing.
2. Generated code mixed with hand-written code without any marker. Agents will edit it and the next build wipes it.
3. Hidden setup, like env vars that live only in someone's shell. Keep a `.env.example` and a one-command bootstrap.
4. Two docs describing the same convention differently. The agent picks one at random.

## Quick audit - Things to ensure

Make sure to check this on any repo before handing it to an agent:

1. Can someone run the tests with one documented command?
2. Is there an `AGENTS.md`, and is it short?
3. Are the boundaries enforced by a tool and not just described?
4. Is generated code clearly marked?
5. Does CI run the same commands the agent runs locally?
6. Are the non-obvious decisions written down?

## Conclusion

Agentic engineering rewards what good engineering always did: clear boundaries, fast feedback and honest docs. The difference is that neglect now costs you in every single agent session. Set the structure once, enforce it with tools, keep the instructions sharp, and the agent spends its context on the real problem instead of figuring out the repo.
