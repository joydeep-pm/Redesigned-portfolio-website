import fs from 'fs';
import path from 'path';
import { loadRagDocuments } from '../lib/rag/content-loader';
import { chunkDocuments } from '../lib/rag/chunking';
import type { RagIndexFile } from '../lib/rag/types';

function main() {
  const docs = loadRagDocuments();
  const chunkDrafts = chunkDocuments(docs, { targetLength: 700, maxLength: 950, overlapChars: 120 });

  if (!chunkDrafts.length) {
    throw new Error('No chunks generated from content');
  }

  const index: RagIndexFile = {
    version: 1,
    createdAt: new Date().toISOString(),
    embeddingModel: 'keyword-bm25',
    dimensions: 0,
    chunks: chunkDrafts.map((draft) => ({
      id: draft.id,
      text: draft.text,
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

try {
  main();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
