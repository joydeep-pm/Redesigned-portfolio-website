import type { ChatCitation, RagSearchResult } from './types';

const baseSuggestions = [
  'Summarize Joydeep\'s fintech and lending experience.',
  'What RBI / lending infrastructure work has he done?',
  'Which projects show hands-on AI or automation experience?',
  'What product leadership roles is he best suited for?',
  'Which case studies should I read first?',
  'How does Joydeep approach scaling lending products?',
];

export function resultsToCitations(results: RagSearchResult[]): ChatCitation[] {
  const seen = new Set<string>();
  const citations: ChatCitation[] = [];

  for (const r of results) {
    const key = `${r.chunk.metadata.sourceType}:${r.chunk.metadata.slug || r.chunk.metadata.title}`;
    if (seen.has(key)) continue;
    seen.add(key);
    citations.push({
      sourceType: r.chunk.metadata.sourceType,
      slug: r.chunk.metadata.slug,
      title: r.chunk.metadata.title,
      href: r.chunk.metadata.href,
      score: Number(r.score.toFixed(4)),
      snippet: r.chunk.text.slice(0, 180),
    });
  }

  return citations;
}

export function getSuggestedQuestions(routeContext?: string): string[] {
  if (!routeContext) return baseSuggestions;
  if (routeContext.startsWith('/projects')) {
    return [
      'Which projects best demonstrate AI and automation work?',
      'What technologies does Joydeep use across his side projects?',
      ...baseSuggestions.slice(0, 4),
    ];
  }
  if (routeContext.startsWith('/case-studies')) {
    return [
      'Which case study best shows fintech product strategy?',
      'Summarize the main problem solved in these case studies.',
      ...baseSuggestions.slice(0, 4),
    ];
  }
  return baseSuggestions;
}
