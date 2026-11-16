---
title: "Agentic engineering glossary"
date: "2026-11-16"
status: "archived"
featured: false
highlighted: false
---

AGENTIC DEVELOPMENT - COMPLETE TERMINOLOGY
Continuous numbering. Plain text, ready to paste.


SECTION 1 - MATURITY LEVELS AND VOCABULARY

1. Autocomplete - inline next-token suggestion in the editor; no tools, no loop.
2. Chat / assistant - conversational; you drive every step and paste results yourself.
3. Agentic coding - a model with tools and a loop that reads, acts, verifies, repeats.
4. Agentic engineering - the disciplined form: humans define goals, constraints and quality bars; agents execute under supervision.
5. Vibe coding - prompt-driven, intuition-led building with minimal review; prototypes, not production.
6. Vibe engineering - vibe coding plus tests, reviews, architecture docs, security gates, pipelines.
7. Prompt-driven development - prompts and context files versioned, reviewed and reused like code.
8. Spec-driven development (SDD) - the spec is the source of truth; code, tasks and tests derive from it.
9. Agentic Development Lifecycle (ADLC) - the agent is part of the product, so verification continues after deployment.
10. Software 3.0 - programming as natural-language instruction to models rather than writing code.
11. AI-first developer - defaults to agents for scaffolding, refactors and debugging, but owns validation and shipping.
12. Ship velocity - idea-to-deployed time; the metric both vibe coding and vibe engineering optimise, differently.


SECTION 2 - THE AGENT ITSELF

13. Agent (coding agent) - a model wired to tools and a loop.
14. Agentic loop - gather context, act, verify, repeat until done or budget exhausted.
15. Agentic harness - the scaffolding that turns a model into an agent: tools, context management, permissions, memory, loop. Claude Code is a harness; Claude is the model inside it.
16. Tool / tool call - an invocable capability (read, edit, bash, search); every tool granted is a permission granted.
17. System prompt - standing instructions prepended to every request.
18. Turn - your message plus all the work the agent does before handing control back.
19. Session / thread - one continuous run from empty context to clear, close or handoff.
20. Steering (interrupting) - nudging a running agent mid-turn before a wrong step compounds.
21. Context window - everything the model sees in one request, measured in tokens.
22. Context - the running total: history, files read, tool results, loaded skills, instructions.
23. Stateless - nothing carries over on its own; each request starts from zero, so sessions must be made stateful.
24. Non-determinism - the same prompt can yield different paths; consistency must be measured, not assumed.
25. Subagent - a separate agent with its own context, tools and permissions; returns a summary only.
26. Orchestrator - the agent that decomposes work and delegates to subagents.


SECTION 3 - MODELS AND INFERENCE [NEW]

27. Model / LLM - the engine that picks the next action from context.
28. Model family - a lineage of models sharing training approach and tooling.
29. Light / medium / heavy model - tiers by capability, cost and latency.
30. Reasoning model - a model trained to spend extra compute thinking before answering.
31. Extended thinking - hidden deliberation tokens produced before the visible answer.
32. Reasoning effort - the dial controlling how much thinking a model is allowed to do.
33. Thinking tokens - the billed tokens consumed by deliberation, often invisible in output.
34. Temperature - sampling randomness; lower is more deterministic.
35. Top-p - nucleus sampling cutoff; an alternative randomness control.
36. Seed - a fixed value that improves reproducibility of sampling.
37. Function calling / tool calling - the model emitting a structured request to run a named tool.
38. Parallel tool calls - multiple tool invocations emitted in one turn.
39. Tool choice - forcing, allowing or forbidding tool use for a given call.
40. Structured output / JSON schema - constraining the response to a declared schema.
41. Open-weight model - a model whose weights are downloadable and self-hostable.
42. Local / self-hosted model - a model running on your own hardware or network.
43. Model routing / escalation - cheap model first, escalate only when quality demands it.
44. Capability per dollar - the real selection criterion between models.


SECTION 4 - CONTEXT MANAGEMENT

45. Context engineering - deciding what enters the window, when, and in what order.
46. Context rot - performance decline as context grows longer, noisier or self-contradictory; degradation hits cliffs, not slopes.
47. Context poisoning - a false fact takes root early and contaminates everything after it.
48. Context distraction - the model imitates its own history instead of reasoning.
49. Context confusion - irrelevant tokens pull the answer off course.
50. Context clash - accumulated context contradicts itself.
51. Compaction - summarising a session and restarting from the summary; lossy, and invalidates the prompt cache from that point.
52. Autocompact - compaction the harness triggers itself near the window limit.
53. Structured note-taking (agentic memory) - the agent writes durable notes outside the window and reads them back later.
54. Offload - moving bulky content out of context to disk, leaving a pointer behind.
55. Addressable recall (ARC) - compaction that replaces old content with content-addressed stubs fetchable on demand; lossless by construction.
56. Just-in-time retrieval - keep lightweight references such as paths; load content only when needed.
57. Progressive disclosure - load a short index up front; pull full detail only when a task matches.
58. Context pointer - a short reference saying where information lives and when to fetch it.
59. Long-horizon task - work spanning many turns where needed facts may be compacted away.
60. Agentic Context Management (ACM) - the agent itself decides when to compress, offloading raw turns to disk for later query.
61. Programmatic context management - history as an append-only event log the agent queries by writing code.
62. Cache reads - tokens served from provider cache because the same prefix was sent before; dominates cost in long sessions.
63. Context product - company knowledge packaged as a reusable, owned, versioned asset for agents.
64. Context isolation - splitting context across subagents or sessions; shrinks the parent at the cost of total spend.


SECTION 5 - INSTRUCTION AND KNOWLEDGE ARTIFACTS

65. Rules file - always-loaded instructions at the repo root: commands, conventions, boundaries.
66. AGENTS.md - the open, vendor-neutral rules format, stewarded by the Agentic AI Foundation under the Linux Foundation.
67. CLAUDE.md - Claude Code's equivalent; reads AGENTS.md only when no CLAUDE.md exists (v2.1.277+), or imports it with @AGENTS.md.
68. GEMINI.md - Gemini CLI's native instructions file.
69. Cursor rules (.mdc) - Cursor's rules, scopable to file globs.
70. Copilot instructions - .github/copilot-instructions.md and path-specific .instructions.md.
71. Skill (SKILL.md) - a named, on-demand procedure folder; only its description sits in context until invoked.
72. MCP (Model Context Protocol) - open standard for connecting agents to external tools and data.
73. MCP server / client - the program exposing tools, resources and prompts, and the agent-side consumer.
74. Streamable HTTP - MCP's remote transport: JSON-RPC over a single HTTP endpoint.
75. Resources / prompts (MCP) - readable data, and reusable templates a server can expose.
76. Hook - a script fired at a lifecycle point (pre/post tool use), outside the model's control.
77. Slash command - a reusable prompt the human invokes by name.
78. Plugin - several skills, connectors and rules packaged for one-install setup.
79. llms.txt / llms-full.txt - site-level files that help agents find, or bulk-load, documentation.
80. Constitution - project principles set once and consulted by every later artifact.
81. Spec / plan / tasks - the SDD artifact chain: what and why, then how, then ordered units, then code.
82. Handoff artifact - a written note carrying a task across a session boundary: done, left, decided, where to look.


SECTION 6 - ORCHESTRATION AND MULTI-AGENT

83. Orchestration - deliberate coordination of multiple agents: state, decomposition, routing, governance.
84. Multi-agent system (MAS) - multiple interacting agents whose collaboration may be emergent rather than directed.
85. Sequential (pipeline / prompt chaining) - fixed order, each agent consumes the previous output.
86. Concurrent (fan-out / fan-in, scatter-gather, map-reduce) - parallel agents on one input, results aggregated.
87. Group chat (roundtable / debate / council) - agents share a thread; a chat manager picks who speaks.
88. Handoff (routing / dispatch / triage) - one agent transfers the whole job to another; only one works at a time.
89. Magentic (planner-executor) - a manager builds and revises a task ledger of goals and subgoals.
90. Supervisor / hierarchical - a central agent routes to specialists and consolidates results.
91. Evaluator loop (maker-checker) - one agent produces, another critiques, looping until acceptance criteria pass.
92. Router - classifies input and dispatches to exactly one specialist; does no work itself.
93. Agents-as-tools - a manager calls specialists the way it calls tools.
94. Swarm - many peer agents, often decentralised, coordinating without a central authority.
95. A2A (Agent2Agent) - Linux Foundation protocol for cross-platform agent-to-agent messaging.
96. Agent card - a published capability manifest letting other agents discover and invoke an agent.
97. Dynamic worker pool - team size per role decided at runtime.
98. Composability - the property that makes delegation safe: subagent outputs combine without negotiation.
99. Contract loss - a subagent knew something relevant but its output contract did not ask, so the parent never learns it.


SECTION 7 - AUTONOMY, CONTROL AND LIMITS [NEW]

100. Autonomy level (L0-L5) - how much the agent may do without asking, from advisory to fully autonomous.
101. Human-in-the-loop (HITL) - required approval for high-impact or irreversible actions.
102. Approval gate - a defined checkpoint where a human must confirm before execution.
103. Least agency - minimum decision scope, not just minimum access.
104. Excessive agency - most incidents are autonomy failures inside valid permissions.
105. Iteration limit - a hard cap on loop cycles before the agent must stop.
106. Loop budget / token budget - the spend ceiling for one agent run.
107. Stop condition / termination condition - the explicit predicate that ends a loop.
108. Checkpoint - a saved state the agent can return to.
109. Rewind / rollback - reverting files or state to a prior checkpoint.
110. Kill switch - ability to interrupt and disable the agent immediately.
111. Read-only mode - the agent may inspect but not modify.
112. Plan mode - the agent proposes an approach before writing code.
113. Auto-accept / YOLO mode - edits applied without per-step confirmation.
114. Dry run - execute the plan without applying side effects.


SECTION 8 - VERIFICATION AND EVALUATION

115. Verification loop - tests, types, lint and browser, run as the agent's only honest feedback signal.
116. Acceptance criteria - the checkable definition of done, agreed before code exists.
117. Diff review - human inspection of every line the agent changed before merge.
118. Eval - systematic evaluation; "the eval is the agent's spec".
119. Eval-as-spec - the eval set precedes the code; a new requirement becomes a new case.
120. Trajectory (trace) - the full record of one run: turns, tool calls, results, final output. The basic unit of evaluation.
121. Case (task / test case) - setup, request and expected trace properties.
122. Trial / run - one attempt at one case, or one pass over the whole eval set.
123. pass@k - probability that at least one of k attempts succeeds. Rises with k. "Can it do this at all?"
124. pass^k - probability that all k attempts succeed. Falls with k. "Can I rely on it every time?"
125. Flip rate - share of a case's verdicts that disagree across repeated runs; a reproducibility defect in itself.
126. LLM-as-judge - using a model to grade what only language can judge; must be calibrated.
127. Judge calibration - measured judge-versus-human agreement; the judge's qualification to serve.
128. False-pass rate / false-fail rate - the judge's two directional error rates against gold.
129. Severity tiers (sev-1 / sev-2 / sev-3) - irreversible harm / recoverable loss / experience and efficiency. Sev-1 is never averaged in.
130. Verdicts - pass / concern / unsafe / unclear.
131. Reference trajectory - the known-passing trace attached to every case, proving solvability and correct verdict configuration.
132. Outcome scoring - grading the end state: database rows, files, tests.
133. Trajectory scoring - grading the sequence; catches process violations and is the only way to grade efficiency.
134. Partial credit / progress rate - intermediate checkpoints for long tasks; useful for development, risky for go/no-go.
135. State diff - comparing final environment state against an annotated goal state.
136. Collateral damage - unintended side effects an outcome check must also catch.


SECTION 9 - FAILURE MODES [NEW]

137. Reward hacking - optimising the proxy instead of the goal; empirically common, not theoretical.
138. Goodharting - when a measure becomes a target, it stops being a good measure.
139. Reward over-optimisation - proxy score keeps rising while true quality turns over.
140. Sycophancy - telling the user what they want to hear; a style-over-substance failure and a reward-hacking surface.
141. Verifiable rewards - reward from a deterministic checker rather than a bias-carrying judge; the partial escape from hacking.
142. Sandbagging - deliberate underperformance, often to avoid scrutiny or further work.
143. Test-gaming / shortcut - passing the check without satisfying the intent behind it.
144. Silent drift - gradual divergence from the original request across a long run.
145. Confident error - a fluent, well-structured answer that is wrong.
146. Context-induced regression - quality falling as the window fills, independent of task difficulty.


SECTION 10 - SAFETY AND GOVERNANCE

147. Prompt injection (direct) - user-supplied instructions overriding policy.
148. Indirect prompt injection - instructions smuggled through retrieved content: pages, docs, issues, tool output. The defining agent vulnerability.
149. Guardrails - controls on what enters, leaves or gets executed: input, output, runtime.
150. Runtime guardrails - enforcement at the moment of action, not design time.
151. Least privilege - minimum tools, scopes and resources per task.
152. Allowlisting / default-deny - permit only known-good tools, endpoints, skills and publishers.
153. Sandboxing - isolating execution so a compromise cannot reach the host.
154. Tool authorization - enforcement in the execution layer, outside the model's context.
155. Policy enforcement point (PEP) - a deterministic gate between agent output and action-capable systems.
156. Data exfiltration - leakage via tool calls, requests or outputs.
157. Memory poisoning - malicious data persisted to memory to influence future sessions.
158. Goal hijacking - agent objectives manipulated while appearing legitimate.
159. Provenance and trust labels - every chunk tagged: untrusted external, internal user-generated, or curated policy.
160. Instruction hierarchy - retrieved content is evidence, never orders.
161. Secrets outside context - credentials never enter model-visible text.
162. Audit trail - tamper-resistant log of prompts, tool calls, decisions and approvals.
163. Red teaming - adversarial testing before release, plus regression tests for new attack patterns.
164. PII redaction - removing personal data from prompts, logs and traces.
165. Data residency - guaranteeing data stays within a jurisdiction.
166. Zero data retention - provider contract that prompts and outputs are not stored.


SECTION 11 - ENGINEERING PROCESS

167. Converge - SDD's final step: assess the codebase against spec, plan and tasks; append-only, reports gaps as new tasks.
168. Task decomposition - splitting work into dependency-ordered, independently verifiable units.
169. Long-running agent - works for hours or days with periodic human checkpoints.
170. Background agent / watcher - a process that runs independently and reports back.
171. Session handoff - carrying state forward in writing rather than in the window.
172. Compounding loop - plan, test-first build, check, retrospective written back to the repo, so each run starts better equipped.
173. Agentic quality control - agents reviewing AI output at a scale humans cannot.
174. Agent PR / auto-fix - automated review comments and machine-generated fix pull requests.
175. Agentic CI/CD - agents integrated into pipelines for review, repair and release.
176. Human review gate - the mandatory checkpoint where a person approves before merge.
177. Branch-per-agent - one git branch per agent so parallel work never collides.
178. Git worktree isolation - separate working directories so agents can run concurrently on one repo.
179. Merge queue - serialising merges so agent-generated changes land in order.


SECTION 12 - RETRIEVAL AND CODE INTELLIGENCE [NEW]

180. RAG (retrieval-augmented generation) - fetching relevant documents and injecting them into context.
181. Agentic RAG - an agent that decides what to retrieve, when, and whether to retrieve again.
182. Embeddings - vector representations of text used for similarity search.
183. Vector store - a database indexed for nearest-neighbour retrieval.
184. Code graph / code RAG - retrieval over a graph of symbols, calls and dependencies.
185. LSP / language server - precise symbol navigation and type errors without running the compiler.
186. Tree-sitter / AST - parsing source into a syntax tree for structural queries.
187. Codemod - scripted, semantics-aware transformation of many files at once.
188. Symbol index - a lookup of functions, classes and definitions for fast navigation.
189. Semantic search - retrieval by meaning rather than exact keyword.
190. Repository map - a compact structural summary of a codebase.
191. Context retrieval - the act of pulling the right evidence into the window on demand.


SECTION 13 - EXECUTION AND RELIABILITY [NEW]

192. Synchronous vs asynchronous - blocking until done, versus starting and polling or awaiting a callback.
193. Background execution - work that continues after the initiating call returns.
194. Streaming - tokens delivered incrementally rather than in one response.
195. Queue - buffered work waiting for a worker.
196. Worker pool - a fixed set of processes executing queued tasks.
197. Retry / exponential backoff - repeating a failed call with growing delays.
198. Idempotency - repeating an operation has the same effect as doing it once.
199. Durable execution - workflows that survive crashes and resume from the last completed step.
200. Workflow engine - a runtime that models long-running work as resumable state machines.
201. State machine - explicit states and transitions governing agent behaviour.
202. Event-driven / choreography - components reacting to events with no central coordinator.
203. Circuit breaker - stop calling a failing dependency until it recovers.
204. Rate limiting - capping requests per unit time.
205. Concurrency limit - capping simultaneous agent or tool executions.


SECTION 14 - OBSERVABILITY [NEW]

206. Trace / span - a timed record of one operation, nested within the trace of a whole run.
207. OpenTelemetry GenAI conventions - emerging standard attributes for AI traces: model, tokens, tool calls.
208. Token accounting / usage - per-call and per-session counts of input, output and cache tokens.
209. Log - the raw text record of agent and tool activity.
210. Metric - aggregated numbers: latency, cost, success rate, token volume.
211. Cost per session - total spend of one continuous run.
212. Sampling (tracing) - recording only a fraction of traces to control overhead.


SECTION 15 - BENCHMARKS AND DATASETS [NEW]

213. SWE-bench - benchmark of real GitHub issues resolved by generated patches.
214. tau-bench - benchmark of agent tool-use in a simulated business domain.
215. WebArena / OSWorld - benchmarks for web and desktop computer use.
216. Golden set - the curated cases you always run before shipping.
217. Regression suite - the accumulated set of cases that must keep passing.
218. Benchmark contamination - test data leaking into training, inflating scores.
219. Leaderboard - public ranking of models or agents on a benchmark.
220. Held-out set - cases reserved for final validation, never used during development.
221. Inter-annotator agreement - how often humans label the same case the same way.
222. Pass rate - share of trials that succeed on a task or suite.


SECTION 16 - ECONOMICS AND PERFORMANCE

223. Token economics - every agent call re-sends existing context; cache reads can be most of the tokens.
224. Cost per task - the honest unit, not cost per token.
225. Prompt caching - provider-side reuse of a stable prefix; compaction invalidates it from the point of change.
226. Cache hit rate - share of requests served from cache rather than recomputed.
227. Cache TTL - how long a cached prefix remains valid.
228. Batch / offline - deferring non-urgent work to cheaper throughput tiers.
229. Spend cap - a hard ceiling on cost for a session, project or team.
230. Latency - time from request to response; increasingly a first-class metric.
231. Time-to-first-token - delay before output begins streaming.
232. Throughput - work completed per unit time under concurrency.


SECTION 17 - META

233. Harness versus model - the model is interchangeable; the harness is the product and the moat.
234. Model-agnostic - portable across providers via standard formats: AGENTS.md, skills, MCP.
235. AAIF (Agentic AI Foundation) - the Linux Foundation body stewarding AGENTS.md, MCP and Agent Skills.
236. Deterministic versus stochastic - which orchestration you can hardcode (sequential, router) and which you must measure (LLM-driven handoff).
237. Vendor-neutral standard - a format governed across companies rather than owned by one.
238. Human oversight - the retained authority to review, redirect and overrule the agent.
