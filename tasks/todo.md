# TODO

## Active Task: Portfolio RAG Chatbot + Workflow Playbook

- [x] Create workflow playbook + tracking files
- [x] Implement RAG content ingestion and chunking modules
- [x] Implement OpenAI embedding/chat wrappers and retrieval runtime
- [x] Add `/api/chat` route with guardrails and citations
- [x] Build global chat widget UI (launcher, panel, prompts, messages, citations)
- [x] Mount widget in layout and integrate theme compatibility
- [x] Add index builder script and local index file bootstrap
- [x] Validate build and core flows
- [x] Generate real embeddings index (requires `OPENAI_API_KEY`)

## Result Notes
- `npm run build -- --webpack` passed after adding chatbot/RAG files.
- `POST /api/chat` returns `503 Service Unavailable` with a clear remediation message when the local RAG index is empty.
- `npm run rag:index` fails as expected in this environment: `OPENAI_API_KEY is required to build the RAG index`.
- Added `.env.local` key configuration and fixed `scripts/build-rag-index.ts` to load Next env files via `@next/env`, so `npm run rag:index` works without manual export.
- `npm run rag:index` now succeeds and generated `33` embedded chunks in `/Users/joy/Projects/Website Portfolio Redesign/data/rag/portfolio-index.json`.
- `POST /api/chat` now returns grounded answers with citations (verified via `curl`).
- Browser smoke test passed: widget auto-open, hint prompt click, loading state, assistant response, and source links render correctly.

## Review
- Scope implemented: workflow playbook files, local RAG retrieval modules, `/api/chat`, and global chat widget UI.
- Verified correctness of fallback behavior and build stability.
- Response quality is validated at smoke-test level; deeper prompt tuning can be iterative.
