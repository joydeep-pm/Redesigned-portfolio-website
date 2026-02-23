import fs from 'fs';
import path from 'path';
import { loadEnvConfig } from '@next/env';
import { loadRagDocuments } from '../lib/rag/content-loader';
import { chunkDocuments } from '../lib/rag/chunking';
import { embedTexts, getEmbeddingModelName } from '../lib/rag/openai';
import type { RagIndexFile } from '../lib/rag/types';

async function main() {
  loadEnvConfig(process.cwd());

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required to build the RAG index');
  }

  const docs = loadRagDocuments();
  const chunkDrafts = chunkDocuments(docs, { targetLength: 700, maxLength: 950, overlapChars: 120 });

  if (!chunkDrafts.length) {
    throw new Error('No chunks generated from content');
  }

  const batchSize = 32;
  const embeddings: number[][] = [];

  for (let i = 0; i < chunkDrafts.length; i += batchSize) {
    const batch = chunkDrafts.slice(i, i + batchSize);
    // eslint-disable-next-line no-console
    console.log(`Embedding batch ${i / batchSize + 1} / ${Math.ceil(chunkDrafts.length / batchSize)} (${batch.length} chunks)`);
    const batchEmbeddings = await embedTexts(batch.map((c) => c.text));
    embeddings.push(...batchEmbeddings);
  }

  const dimensions = embeddings[0]?.length ?? 0;
  const index: RagIndexFile = {
    version: 1,
    createdAt: new Date().toISOString(),
    embeddingModel: getEmbeddingModelName(),
    dimensions,
    chunks: chunkDrafts.map((draft, i) => ({
      id: draft.id,
      text: draft.text,
      embedding: embeddings[i] ?? [],
      metadata: draft.metadata,
    })),
  };

  const outDir = path.join(process.cwd(), 'data', 'rag');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'portfolio-index.json');
  fs.writeFileSync(outPath, JSON.stringify(index, null, 2));
  // eslint-disable-next-line no-console
  console.log(`Wrote ${index.chunks.length} chunks to ${outPath}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
