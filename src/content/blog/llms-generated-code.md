---
title: "LLMs generated code: Positives, Negatives and Loopholes"
date: "2026-04-13"
tags: ["LLMs", "AI", "vibe code"]
status: "published"
excerpt: "We are living in an era of AI, and LLMs are here to stay. They are highly capable of writing code, all types good, bad and ugly."
featured: true
---

I have been working with agentic workflows lately. After exploring many tools, workflows, and custom-defined skills, I have noticed a pattern. LLMs are powerful enough to write capable code for many use cases when guided properly. They generate working code if you define the problem statement, implementation steps, and a clear path to progress. Yet the code is not of the best quality always. In fact, LLMs often generate redundant or unused code, and removing parts of it may not affect functionality in some cases.

## Positives
There are some strong advantages of LLM-generated code:
1. Fast code generation  
2. Easy prototype development  
3. Often produces working solutions for common problems  
4. Provides boilerplate code  
5. Attempts to use the provided context  

## LLM Generated Code and Issues

If the specs and prompts are defined correctly and provided to the coding agent, it often generates plausible implementations. It uses pattern matching from the instructions, utilizes context, and focuses on what it finds most relevant. However, during code generation, it often develops tunnel vision. It does not consider the broader system and applies fixes or implementations in isolation.

It fixes the broken code later on to just make it work. on the first place, It could have been described properly to work in a specific manner and with the mentioned piece of code.

LLMs may attempt to provide solutions even when uncertain, and sometimes these solutions may not be correct or fully aligned with the system. They can also highlight limitations or lack of context when necessary. So, explore the things end-to-end. Understand the suggestions provided. Then after thorough research and documentation, only proceed.

It may look time consuming, but this process saves time in the long run.

## Changing Things Just to Make It Work

One major problem is how LLMs handle failures or new feature requests. If you allow the agent to fix or implement something autonomously, it may produce questionable workarounds.

These workarounds often include:
- Hardcoded values  
- Fragile or overly simplified logic  
- Misaligned assumptions about the system  
- Unnecessary fallbacks  
- Trial-and-error style changes to force things to work  

The goal often shifts toward making things work, rather than making them correct, scalable, or maintainable.

## and Loopholes
Major loopholes in the LLM generated code are:
1. It seemingly looks correct more often
2. If earlier not described, It does not consider edge cases generally
3. It may use deprecated APIs and functions
4. One major issue is prompt sensitivity. A small change in prompt may lead to a completely different implementation.

## How to Make It Work as Expected

Before prompting the LLM:
1. Take time to think end-to-end. Plan thoroughly and create a complete design document.  
2. Start from first principles. Define requirements as clearly as possible.  
3. Use plan mode to inspect what it intends to do and correct it early.  
4. Work on a feature at a time. 
5. Provide source-of-truth documents that must be followed. If something does not follow, it should notify you.  
6. Create custom skills, rules and workflows with strict guidelines, including what not to do.  
7. Avoid letting it explore blindly through implementation. It will consume tokens and may move in the wrong direction. Instead, guide it with proper context and constraints.  


## Planning mode is beast
Yes, when using agentic workflow, planning mode enables you to actually go end-to-end without making actual changes. It saves time and tokens used which could be wasted in correcting the wrongly generated code.

## Incorporate Security Tools in the Workflow

One good practice is to integrate security and validation tools directly into your workflow. LLMs do not inherently guarantee safe or secure code, so external enforcement is necessary.

<details>
<summary>open this section also</summary>
You should:<br>
1. Use strong typing and schema validation over loosely typed implementations.<br>
2. Use static analysis tools to catch vulnerabilities and bad patterns<br>  
3. Run linters and formatters to maintain consistency<br>  
4. Integrate dependency scanners to detect insecure libraries<br>  
5. Add automated tests to validate behavior continuously<br>  
6. Use CI pipelines to enforce quality gates before merging<br>  
7. May use ai code reviewers also for ex. code rabbit
I've been exploring sonarQube for devs lately to incorporate with workflow.
</details>

## And

LLMs should work for you, not the other way around.  
Thinking should be your responsibility, and LLMs should execute it.

Keep visiting.