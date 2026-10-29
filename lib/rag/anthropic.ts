import type { ChatHistoryMessage, RagSearchResult } from './types';

const API_URL = 'https://api.anthropic.com/v1/messages';
const CHAT_MODEL = process.env.CLAUDE_CHAT_MODEL || 'claude-haiku-5-5';

export function getChatApiKey(): string | undefined {
  return process.env.CLAUDE_KEY || process.env.ANTHROPIC_API_KEY;
}

function buildMessages(history: ChatHistoryMessage[], userMessage: string) {
  const messages: { role: 'user' | 'assistant'; content: string }[] = [];
  for (const h of history.slice(-6)) {
    const last = messages[messages.length - 1];
    if (last && last.role === h.role) {
      last.content += `\n${h.content}`;
    } else {
      messages.push({ role: h.role, content: h.content });
    }
  }
  while (messages.length && messages[0].role !== 'user') messages.shift();
  const last = messages[messages.length - 1];
  if (last && last.role === 'user') {
    last.content += `\n${userMessage}`;
  } else {
    messages.push({ role: 'user', content: userMessage });
  }
  return messages;
}

export async function generateGroundedAnswer(params: {
  userMessage: string;
  history: ChatHistoryMessage[];
  retrieved: RagSearchResult[];
  routeContext?: string;
}): Promise<string> {
  const apiKey = getChatApiKey();
  if (!apiKey) throw new Error('CLAUDE_KEY is not configured');

  const contextBlock = params.retrieved
    .map((r, i) => {
      const m = r.chunk.metadata;
      return [`SOURCE ${i + 1}`, `title: ${m.title}`, `type: ${m.sourceType}`, `href: ${m.href}`, `content: ${r.chunk.text}`].join('\n');
    })
    .join('\n\n');

  const system = [
    "You are a professional portfolio concierge for Joydeep Sarkar's website.",
    'Answer only from the provided portfolio context.',
    'If the answer is not in context, say so clearly and suggest a nearby question.',
    'Prefer concrete metrics, companies, roles, and project names when available.',
    'Be concise, professional, and accurate. Use plain sentences, no markdown headings.',
    'Do not invent timelines, titles, achievements, or links.',
    params.routeContext ? `Current page context: ${params.routeContext}` : '',
    `Portfolio context:\n\n${contextBlock}`,
  ]
    .filter(Boolean)
    .join('\n');

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      max_tokens: 700,
      system,
      messages: buildMessages(params.history, params.userMessage),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Claude API ${response.status}: ${detail.slice(0, 200)}`);
  }

  const data = (await response.json()) as { content?: { type: string; text?: string }[] };
  const text = data.content
    ?.filter((b) => b.type === 'text' && b.text)
    .map((b) => b.text)
    .join('\n')
    .trim();
  if (text) return text;
  throw new Error('Claude returned an empty response');
}
