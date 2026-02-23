# Implementation Workflow (Project Playbook)

Use this file before any non-trivial implementation in this repo (3+ steps, architectural change, or multi-file change).

## 1. Plan First (Default)
- Enter planning mode before coding for non-trivial work.
- Write a detailed spec first to reduce ambiguity.
- If implementation goes sideways, stop and re-plan.
- Use plan mode for verification work too, not only feature design.

## 2. Focused Execution Strategy
- Break work into small, testable phases.
- Keep the main context clean; isolate concerns (UI, backend, data pipeline, styling).
- Use one focused task stream at a time for reliability.
- Prefer minimal code changes that achieve the goal.

## 3. Self-Improvement Loop
- When user corrects a direction, update `tasks/lessons.md`.
- Convert mistakes into explicit reusable rules.
- Revisit recent lessons before related changes.

## 4. Verify Before Done
- Never mark complete without proving behavior works.
- Run build/tests/checks and inspect relevant outputs.
- Compare changed behavior against intended behavior.
- Ask: would a senior engineer approve this change quality?

## 5. Demand Elegance (Balanced)
- For non-trivial changes, pause and ask if a simpler design exists.
- Avoid hacks that increase maintenance burden.
- Do not over-engineer obvious fixes.
- Challenge the solution before presenting it.

## 6. Autonomous Bug Fixing
- When errors appear, inspect logs and fix root causes directly.
- Avoid asking for hand-holding when the issue is diagnosable locally.
- Minimize user context switching.

## Task Management Rules (This Repo)
1. Update `tasks/todo.md` before and during implementation.
2. Mark items complete as you finish them.
3. Add a short result summary after significant milestones.
4. Record corrections/lessons in `tasks/lessons.md`.

## Core Principles
- Simplicity first
- No lazy fixes
- Minimal impact changes
- Verify every meaningful change
