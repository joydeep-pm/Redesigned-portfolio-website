import OpenAI from 'openai';
import type { ChatHistoryMessage, RagSearchResult } from './types';

const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';
const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

let client: OpenAI | null = null;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  if (!client) client = new OpenAI({ apiKey });
  return client;
}

export function getEmbeddingModelName() {
  return EMBEDDING_MODEL;
}

export function getChatModelName() {
  return CHAT_MODEL;
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  if (texts.length === 0) return [];
  const c = getClient();
  const res = await c.embeddings.create({ model: EMBEDDING_MODEL, input: texts });
  return res.data.map((d) => d.embedding);
}

export async function embedSingleText(text: string): Promise<number[]> {
  const [embedding] = await embedTexts([text]);
  return embedding;
}

export async function generateGroundedAnswer(params: {
  userMessage: string;
  history: ChatHistoryMessage[];
  retrieved: RagSearchResult[];
  routeContext?: string;
}): Promise<string> {
  const c = getClient();
  const contextBlock = params.retrieved
    .map((r, i) => {
      const m = r.chunk.metadata;
      return [
        `SOURCE ${i + 1}`,
        `title: ${m.title}`,
        `type: ${m.sourceType}`,
        `href: ${m.href}`,
        `score: ${r.score.toFixed(4)}`,
        `content: ${r.chunk.text}`,
      ].join('\n');
    })
    .join('\n\n');

  const system = [
    'You are a professional portfolio concierge for Joydeep Sarkar\'s website.',
    'Answer only from the provided portfolio context.',
    'If the answer is not in context, say so clearly and suggest a nearby question.',
    'Prefer concrete metrics, companies, roles, and project names when available.',
    'Be concise, professional, and accurate.',
    'Do not invent timelines, titles, achievements, or links.',
    params.routeContext ? `Current page context: ${params.routeContext}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const history = params.history.slice(-6).map((h) => ({ role: h.role, content: h.content }));

  const response = await c.chat.completions.create({
    model: CHAT_MODEL,
    messages: [
      { role: 'system', content: system },
      { role: 'system', content: `Portfolio context:\n\n${contextBlock}` },
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: 'user', content: params.userMessage },
    ],
    temperature: 0.2,
  });

  const text = response.choices[0]?.message?.content?.trim();
  if (text) return text;
  throw new Error('OpenAI returned an empty response');
}
