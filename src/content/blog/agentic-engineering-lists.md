---
title: "agentic engineering lists"
date: "2026-11-16"
status: "published"
excerpt: "Complete list of agentic engineering guide topics on which I need to write."
featured: false
highlighted: false
wrap_code: false
---

Agentic Development — Full Curriculum
27 posts, built directly from your scope.

Part I — Foundations
What Agentic Development Is — and Why It Is Not Just Faster Coding The shift from writing code to specifying and verifying it; agentic engineering vs vibe coding; what changes in the developer's job.

Anatomy of an Agent: Models, Tools, Context, Loop, Harness The five components every agent is built from, and how they fit together.

How Agents Work Internally: One Turn, Step by Step From your message → system prompt assembly → tool definitions → model call → tool execution → result fed back → next action. Includes how tool-call schemas actually work.

The Harness Landscape: Claude Code, Codex, Cursor, Copilot, Kiro, Gemini CLI, Aider, opencode What a harness is, what each one does well, and how to choose per team and task.

Agentic Use Cases: What to Delegate, What to Keep Where agents win, where they fail, and the decision rule for each.

Part II — Models and Reasoning
Light, Medium, Heavy: Choosing Models by Task Capability vs cost vs latency; routing strategies; when a cheap model is the right answer.

Reasoning Capabilities: Extended Thinking, Effort Levels, and When They Earn Their Cost What "thinking" actually buys you, what it costs in tokens, and where it is wasted.

Context Engineering and Prompting for Agents What goes in the window, what stays on disk, instruction files, and keeping context clean over long sessions.

Part III — Execution Mechanics
Building the Agentic Loop From Scratch Implementing the loop yourself: dispatch, tool registry, error handling, iteration limits, termination conditions.

Stateful Agents: Memory, Variables, and Persistence Short-term vs long-term memory, scratchpads, checkpointing, and surviving process death.

Session Management: Compaction, Handoffs, Clearing, and Recovery What survives a compaction, what doesn't, and how to hand work between sessions without losing the plot.

Synchronous vs Asynchronous Agents: Blocking, Background, and Streaming When to await, when to fire and poll, when to stream, and how to design for each.

Linear vs Parallel Agentic Requests: Chains, Fan-Out, and Fan-In Sequential pipelines, concurrent fan-out, result aggregation strategies, and conflict resolution.

Task Delegation and Subagents: Context Isolation and Output Contracts Why delegation exists, what to delegate, how to write the contract, and how to avoid contract loss.

Part IV — Orchestration
Orchestration Patterns: Sequential, Concurrent, Router, Supervisor, Handoff, Group Chat, Magentic The full pattern catalog with when to use each and how each fails.

Orchestration Platforms: LangGraph, AutoGen/AG2, CrewAI, OpenAI Agents SDK, Claude Agent SDK, Semantic Kernel What each framework gives you, its primitives, and when raw code beats a framework.

Durable Execution: Long-Running, Resumable, Crash-Safe Agent Workflows Task ledgers, event logs, retries, idempotency, and running agents for hours or days.

Part V — Economics and Performance
Token Costing: Pricing, Counting, and Where Agent Spend Actually Goes Input vs output vs cache tokens, why agents cost more than chat, and how to forecast a run.

Caching: Prompt Caching, Prefix Stability, and Cache Economics How provider caching works, why compaction breaks it, and how to structure prompts to maximise hits.

Latency and Throughput: Streaming, Batching, and Perceived Speed Time-to-first-token, parallel execution, and designing agent UX that doesn't feel slow.

Part VI — Production Discipline
Guardrails, Permissions and Agent Safety Least privilege, least agency, sandboxing, prompt injection, and human approval gates.

Evals: Measuring Whether Your Agent Actually Works Trajectories, pass@k vs pass^k, LLM-as-judge, and building a regression set you trust.

Observability and Debugging: Traces, Logs, and Failure Analysis Reading an agent trace, finding where a run went wrong, and instrumenting your own agents.

Agentic CI/CD and Async Pipelines Agents in review, repair, release, and scheduled/background jobs.

Part VII — Beyond Conventional SDLC
Extending Beyond the SDLC: Specs as Code, Agents in Design, Review, and Ops Where agentic development breaks the classic phase model and what replaces it.

Agentic Architecture: Designing Products Where Agents Are First-Class Building systems whose users and operators are agents, not just humans.

Scaling Adoption: Cost Control, Standards, and Leading a Team With Agents Review culture, shared instruction files, portability across harnesses, and onboarding.
