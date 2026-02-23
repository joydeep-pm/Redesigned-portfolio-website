import fs from 'fs';
import path from 'path';
import type { RagIndexFile, RagSearchResult } from './types';
import { cosineSimilarity } from './similarity';

const indexPath = path.join(process.cwd(), 'data', 'rag', 'portfolio-index.json');
let cachedIndex: RagIndexFile | null = null;
let cachedMtimeMs = 0;

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
    throw new Error('RAG index file not found. Run `npm run rag:index` after configuring OPENAI_API_KEY.');
  }

  const stat = fs.statSync(indexPath);
  if (cachedIndex && cachedMtimeMs === stat.mtimeMs) return cachedIndex;

  const raw = fs.readFileSync(indexPath, 'utf8');
  const parsed = JSON.parse(raw) as RagIndexFile;
  cachedIndex = parsed;
  cachedMtimeMs = stat.mtimeMs;
  return parsed;
}

export function retrieveTopChunks(params: {
  queryEmbedding: number[];
  routeContext?: string;
  topK?: number;
  maxPerDocument?: number;
}): RagSearchResult[] {
  const topK = params.topK ?? 6;
  const maxPerDocument = params.maxPerDocument ?? 2;
  const index = loadRagIndex();
  if (!index.chunks.length) return [];

  const biasType = getRouteBias(params.routeContext);

  const scored = index.chunks
    .map((chunk) => {
      let score = cosineSimilarity(params.queryEmbedding, chunk.embedding);
      if (biasType && chunk.metadata.sourceType === biasType) score += 0.03;
      return { chunk, score };
    })
    .sort((a, b) => b.score - a.score);

  const perDocCount = new Map<string, number>();
  const selected: RagSearchResult[] = [];

  for (const item of scored) {
    const docKey = `${item.chunk.metadata.sourceType}:${item.chunk.metadata.slug || item.chunk.metadata.title}`;
    const count = perDocCount.get(docKey) ?? 0;
    if (count >= maxPerDocument) continue;
    perDocCount.set(docKey, count + 1);
    selected.push(item);
    if (selected.length >= topK) break;
  }

  return selected;
}
