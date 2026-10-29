import { NextResponse } from 'next/server';
import { generateGroundedAnswer, getChatApiKey } from '@/lib/rag/anthropic';
import { getSuggestedQuestions, resultsToCitations } from '@/lib/rag/prompt';
import { loadRagIndex, retrieveTopChunks } from '@/lib/rag/retrieval';
import type { ChatRequestBody, ChatHistoryMessage, ChatResponseBody } from '@/lib/rag/types';

export const runtime = 'nodejs';

const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY_CHARS = 1000;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

// Best-effort per-instance limiter; serverless instances do not share memory.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function normalizeHistory(input: unknown): ChatHistoryMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((m): m is { role: 'user' | 'assistant'; content: string } => {
      return !!m && typeof m === 'object' && (m as any).role && (m as any).content;
    })
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, MAX_HISTORY_CHARS) }))
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content.trim().length > 0)
    .slice(-10);
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  }

  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = String(body?.message || '').trim().slice(0, MAX_MESSAGE_CHARS);
    const routeContext = typeof body?.routeContext === 'string' ? body.routeContext : undefined;
    const history = normalizeHistory(body?.history);

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    if (!getChatApiKey()) {
      return NextResponse.json({ error: 'The portfolio concierge is not configured yet.' }, { status: 503 });
    }

    const index = loadRagIndex();
    if (!index.chunks.length) {
      return NextResponse.json(
        { error: 'Chat knowledge index is not built yet. Run `npm run rag:index`.' },
        { status: 503 }
      );
    }

    const retrieved = retrieveTopChunks({ query: message, routeContext, topK: 6, maxPerDocument: 2 });

    if (!retrieved.length) {
      const emptyResponse: ChatResponseBody = {
        answer:
          'I could not find matching details in the current portfolio content. Try asking about fintech experience, lending infrastructure, case studies, or side projects.',
        citations: [],
        suggestedQuestions: getSuggestedQuestions(routeContext),
      };
      return NextResponse.json(emptyResponse);
    }

    const answer = await generateGroundedAnswer({
      userMessage: message,
      history,
      retrieved,
      routeContext,
    });

    const responseBody: ChatResponseBody = {
      answer,
      citations: resultsToCitations(retrieved),
      suggestedQuestions: getSuggestedQuestions(routeContext),
    };

    return NextResponse.json(responseBody);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected chat error';
    console.error('[chat]', message);
    const status = message.includes('CLAUDE_KEY') || message.includes('RAG index') ? 503 : 500;

    return NextResponse.json(
      {
        error:
          status === 503
            ? message
            : 'The portfolio concierge is temporarily unavailable. Please try again shortly.',
      },
      { status }
    );
  }
}
