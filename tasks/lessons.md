# Lessons

Add dated entries when a user correction or implementation mistake reveals a reusable pattern.

## Template
- Date:
- Context:
- Mistake / correction:
- Rule to follow next time:

## Entries
- Date: 2026-02-23
- Context: Paused mid-implementation on the RAG chatbot feature and resumed later.
- Mistake / correction: Core implementation and verification were completed, but `tasks/todo.md` was not updated before pausing, which made resume status less precise.
- Rule to follow next time: Before pausing any non-trivial task, update `tasks/todo.md` checkboxes and add a short result/blocker note so resumption starts from verified state.

- Date: 2026-02-23
- Context: Chat widget launch behavior after shipping the portfolio concierge.
- Mistake / correction: Defaulted to first-visit auto-open, but the user wanted the widget minimized on page load.
- Rule to follow next time: For persistent UI assistants/widgets, default to minimized launch unless the user explicitly asks for auto-open behavior.
