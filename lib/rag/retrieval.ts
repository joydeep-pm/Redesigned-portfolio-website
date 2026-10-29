import fs from 'fs';
import path from 'path';
import type { RagChunk, RagIndexFile, RagSearchResult } from './types';

const indexPath = path.join(process.cwd(), 'data', 'rag', 'portfolio-index.json');
let cachedIndex: RagIndexFile | null = null;
let cachedMtimeMs = 0;

interface Prepared {
  tokens: string[];
  length: number;
}

let prepared = new Map<string, Prepared>();
let docFreq = new Map<string, number>();
let avgLength = 0;

const STOPWORDS = new Set(
  'a an and are as at be by can did do does for from has have he her his how i in is it its me of on or our she so than that the their them there they this to was we what when where which who why will with you your about into over'.split(
    ' '
  )
);

function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-z0-9$₹%+]+/g) ?? [])
    .map((t) => t.replace(/s$/, ''))
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function searchableText(chunk: RagChunk): string {
  const m = chunk.metadata;
  return `${m.title} ${m.title} ${(m.tags ?? []).join(' ')} ${m.sourceType} ${chunk.text}`;
}

const EXPANSIONS: [RegExp, string][] = [
  [/\b(current|currently|now|present|today|doing|role|job|position|title)\b/i, 'M2P Fintech Senior Director Core Lending Suite Present'],
  [/co-?lend/i, 'M2P Core Lending Suite Co-Lending Orchestration multi-lender volume enterprise accounts'],
  [/\b(ai|llm|automation|mcp)\b/i, 'Voice Journal PM Intelligence Engine MCP Lenny project'],
  [/\b(teardown|case ?stud(y|ies))\b/i, 'Independent product teardown BNPL Growth Strategy'],
];

function expandQuery(query: string): string {
  const extra = EXPANSIONS.filter(([re]) => re.test(query)).map(([, add]) => add);
  return [query, ...extra].join(' ');
}

function getRouteBias(routeContext?: string) {
  if (!routeContext) return null;
  if (routeContext.startsWith('/projects')) return 'project';
  if (routeContext.startsWith('/case-studies')) return 'case-study';
  if (routeContext.startsWith('/threads')) return 'thread';
  if (routeContext.startsWith('/work')) return 'work';
  return null;
}

export function loadRagIndex(): RagIndexFile {
  if (!fs.existsSync(indexPath)) {
    throw new Error('RAG index file not found. Run `npm run rag:index`.');
  }

  const stat = fs.statSync(indexPath);
  if (cachedIndex && cachedMtimeMs === stat.mtimeMs) return cachedIndex;

  const raw = fs.readFileSync(indexPath, 'utf8');
  const parsed = JSON.parse(raw) as RagIndexFile;
  cachedIndex = parsed;
  cachedMtimeMs = stat.mtimeMs;

  prepared = new Map();
  docFreq = new Map();
  let total = 0;
  for (const chunk of parsed.chunks) {
    const tokens = tokenize(searchableText(chunk));
    prepared.set(chunk.id, { tokens, length: tokens.length });
    total += tokens.length;
    for (const term of new Set(tokens)) docFreq.set(term, (docFreq.get(term) ?? 0) + 1);
  }
  avgLength = parsed.chunks.length ? total / parsed.chunks.length : 0;
  return parsed;
}

function bm25(queryTerms: string[], doc: Prepared, totalDocs: number): number {
  const k1 = 1.5;
  const b = 0.75;
  const counts = new Map<string, number>();
  for (const t of doc.tokens) counts.set(t, (counts.get(t) ?? 0) + 1);

  let score = 0;
  for (const term of queryTerms) {
    const tf = counts.get(term);
    if (!tf) continue;
    const df = docFreq.get(term) ?? 0;
    const idf = Math.log(1 + (totalDocs - df + 0.5) / (df + 0.5));
    score += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * doc.length) / (avgLength || 1))));
  }
  return score;
}

export function retrieveTopChunks(params: {
  query: string;
  routeContext?: string;
  topK?: number;
  maxPerDocument?: number;
}): RagSearchResult[] {
  const topK = params.topK ?? 6;
  const maxPerDocument = params.maxPerDocument ?? 2;
  const index = loadRagIndex();
  if (!index.chunks.length) return [];

  const queryTerms = [...new Set(tokenize(expandQuery(params.query)))];
  const biasType = getRouteBias(params.routeContext);

  const scored = index.chunks
    .map((chunk) => {
      const doc = prepared.get(chunk.id);
      let score = doc && queryTerms.length ? bm25(queryTerms, doc, index.chunks.length) : 0;
      if (biasType && chunk.metadata.sourceType === biasType) score *= 1.15;
      return { chunk, score };
    })
    .sort((a, b) => b.score - a.score);

  const perDocCount = new Map<string, number>();
  const selected: RagSearchResult[] = [];

  for (const item of scored) {
    if (item.score <= 0) break;
    const docKey = `${item.chunk.metadata.sourceType}:${item.chunk.metadata.slug || item.chunk.metadata.title}`;
    const count = perDocCount.get(docKey) ?? 0;
    if (count >= maxPerDocument) continue;
    perDocCount.set(docKey, count + 1);
    selected.push(item);
    if (selected.length >= topK) break;
  }

  if (selected.length === 0) {
    const profile = index.chunks.filter((c) => c.metadata.sourceType === 'profile').slice(0, 2);
    return profile.map((chunk) => ({ chunk, score: 0 }));
  }

  return selected;
}
