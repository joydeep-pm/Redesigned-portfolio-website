import { NextResponse } from 'next/server';
import { embedSingleText, generateGroundedAnswer } from '@/lib/rag/openai';
import { getSuggestedQuestions, resultsToCitations } from '@/lib/rag/prompt';
import { loadRagIndex, retrieveTopChunks } from '@/lib/rag/retrieval';
import type { ChatRequestBody, ChatHistoryMessage, ChatResponseBody } from '@/lib/rag/types';

export const runtime = 'nodejs';

function normalizeHistory(input: unknown): ChatHistoryMessage[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((m): m is { role: 'user' | 'assistant'; content: string } => {
      return !!m && typeof m === 'object' && (m as any).role && (m as any).content;
    })
    .map((m) => ({ role: m.role, content: String(m.content) }))
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content.trim().length > 0)
    .slice(-10);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = String(body?.message || '').trim();
    const routeContext = typeof body?.routeContext === 'string' ? body.routeContext : undefined;
    const history = normalizeHistory(body?.history);

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const index = loadRagIndex();
    if (!index.chunks.length) {
      return NextResponse.json(
        {
          error:
            'Chat knowledge index is not built yet. Configure OPENAI_API_KEY and run `npm run rag:index` to generate embeddings.',
        },
        { status: 503 }
      );
    }

    const queryEmbedding = await embedSingleText(message);
    const retrieved = retrieveTopChunks({ queryEmbedding, routeContext, topK: 6, maxPerDocument: 2 });

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
    const status = message.includes('OPENAI_API_KEY') || message.includes('RAG index') ? 503 : 500;

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
