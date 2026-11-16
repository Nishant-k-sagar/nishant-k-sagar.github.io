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

In agentic development, the repository is no longer just storage for code. It is the **working memory and interface** of every agent that touches it. A human engineer carries tribal knowledge in their head: where the config lives, which folder is generated, why a module is weird. An agent carries nothing between sessions except what it can read from disk. Whatever your repo fails to say explicitly, the agent will guess, and guesses compound into drift.

This post covers why structure matters mechanically, a layout that works well, and the maintenance habits that keep it healthy.

## Why repo organisation matters more with agents

Agents operate under three hard constraints:

1. **Bounded context window.** An agent cannot read a 400-file monolith. It navigates with `ls`, `grep` and `glob`, then loads a handful of files. If names and directories are predictable, it finds the right 5 files in 3 tool calls. If they are not, it burns context on exploration and still edits the wrong place.
2. **Statelessness across sessions.** Nothing persists unless it is written to a file. Conventions, decisions and gotchas must live in the repo, not in a chat.
3. **Pattern imitation.** Agents copy the nearest example. A clean, consistent module is replicated faithfully. A messy one gets replicated too, including its bugs.

The practical conclusion: **navigability and explicitness are now correctness properties**, not style preferences.

## Conventional Repo Structure

A layout that is easy for both humans and agents to reason about:

```text
.
├── AGENTS.md              # entry point for agents (or CLAUDE.md)
├── README.md              # entry point for humans
├── docs/
│   ├── architecture.md    # system map, data flow, boundaries
│   ├── decisions/         # ADRs: 0001-use-postgres.md ...
│   └── runbooks/          # how to deploy, rollback, debug
├── src/
│   ├── api/               # transport layer only (HTTP handlers)
│   ├── domain/            # business rules, no I/O
│   ├── infra/             # DB, queues, external clients
│   └── shared/            # small, dependency-free utilities
├── tests/
│   ├── unit/              # mirrors src/ one-to-one
│   ├── integration/
│   └── fixtures/
├── scripts/               # one-off and dev tooling, documented
├── .github/workflows/     # CI: lint, test, build, deploy
└── Makefile               # single command surface: make test, make lint
```

Key properties:

- **Layered boundaries.** `domain/` never imports from `infra/` or `api/`. The dependency direction is enforceable by a linter, which gives the agent a fast, objective failure signal instead of a code-review opinion.
- **Mirrored tests.** `src/domain/billing.py` is tested by `tests/unit/domain/test_billing.py`. The agent never has to search for where tests go.
- **One command surface.** `make test`, `make lint`, `make build`. An agent that has to discover that tests run via a bespoke incantation will often skip them.

## The agent instructions file

`AGENTS.md` (or `CLAUDE.md`) is the highest-leverage file in the repo. It is loaded at the start of every session, so treat it like a **hot path**: short, accurate, and high-signal.

```markdown
# Project: payments-service

## Commands
- Install: `make setup`
- Test (fast): `make test`        # must pass before any commit
- Lint + types: `make lint`

## Architecture
- `src/domain` is pure. No network or DB imports. Enforced by import-linter.
- All DB access goes through `src/infra/db/`.

## Conventions
- Errors: raise `DomainError` subclasses, never bare `Exception`.
- New endpoints need an integration test in `tests/integration/api/`.

## Do not
- Edit `src/generated/` (produced by `make codegen`).
- Add dependencies without updating `docs/decisions/`.
```

Rules of thumb:

- Put **commands and constraints** here, not prose about history.
- Link to deeper docs rather than inlining them. Let the agent pull detail on demand.
- Every line should change agent behaviour. If deleting a line changes nothing, delete it.
- Keep it in version control and review it like code, because stale instructions are worse than none.

## Make the structure self-enforcing

Documentation rots; automation does not. Convert conventions into checks:

| Convention | Enforcement |
| --- | --- |
| Layer boundaries | `import-linter`, `dependency-cruiser`, ArchUnit |
| Formatting and style | formatter + linter in pre-commit and CI |
| Type safety | `mypy --strict`, `tsc --noEmit` |
| Test mirrors source | a small CI script that fails on untested modules |
| No secrets committed | `gitleaks` in pre-commit |
| Generated files untouched | CI step that regenerates and fails on `git diff` |

The principle is a tight **feedback loop**: the agent edits, runs `make lint test`, reads a precise failure, and corrects itself. Every convention you can express as a failing command is a convention the agent will actually follow.

## Git hygiene for agentic workflows

Agents produce more commits, faster. Keep history reviewable:

- **Small, single-purpose branches.** One task, one branch, one PR. Large agent diffs are hard to review and easy to rubber-stamp.
- **Worktrees for parallelism.** `git worktree add ../feature-x feature-x` lets multiple agents work simultaneously without stepping on each other's working directory.
- **Conventional commits.** `feat:`, `fix:`, `refactor:` prefixes make history searchable by both humans and agents.
- **Protected `main`.** Require CI green and review. Never let an agent push directly to the default branch.
- **Aggressive `.gitignore`.** Build output, caches and virtualenvs must stay out, otherwise they pollute search results and waste context.

## Keeping the repo clean over time

Entropy is the real enemy. A few recurring habits:

1. **Delete dead code.** Unused modules are noise that agents will read, trust and extend. Version control remembers them.
2. **Prune and refresh `AGENTS.md` regularly.** When an agent repeats a mistake, fix the instruction or add a lint rule rather than correcting it in chat.
3. **Record decisions as ADRs.** A 10-line `docs/decisions/0007-queue-choice.md` stops the next agent from relitigating it.
4. **Keep files small and focused.** A 2,000-line file is expensive to load and easy to corrupt with partial edits. Prefer many cohesive files under a few hundred lines.
5. **Name things for grep.** Distinctive, searchable names beat clever ones. `InvoiceRetryPolicy` is findable; `Helper2` is not.

## Anti-patterns to avoid

- **The junk drawer.** `utils/`, `misc/` and `common/` folders that grow without bound.
- **Hidden generation.** Generated code mixed with hand-written code and no marker. Agents will edit it, and the next build will wipe the change.
- **Implicit setup.** Required env vars or services that exist only in someone's shell. Provide `.env.example` and a one-command bootstrap.
- **Contradictory docs.** Two files describing the same convention differently. The agent picks one at random.

## A quick audit checklist

Run through this on any repo you want agents to work in:

- [ ] Can a newcomer run tests with a single documented command?
- [ ] Does an `AGENTS.md` exist, and is it under about 100 lines?
- [ ] Are architectural boundaries enforced by a tool, not just described?
- [ ] Is generated code clearly marked or isolated?
- [ ] Do tests mirror the source layout?
- [ ] Does CI run the same commands the agent runs locally?
- [ ] Are there ADRs for the non-obvious decisions?

## Conclusion

Agentic engineering rewards the same things good engineering always did: clear boundaries, explicit contracts, fast feedback and honest documentation. The difference is that the cost of neglect is now paid **on every single agent session**, at machine speed. Invest in the structure once, encode it in tooling, keep the instructions file sharp, and your agents will spend their context on the actual problem instead of rediscovering your repo.
