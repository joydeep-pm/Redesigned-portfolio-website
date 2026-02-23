import type { RagChunkDraft, RagRawDocument } from './types';

interface ChunkingOptions {
  targetLength?: number;
  maxLength?: number;
  overlapChars?: number;
}

function splitIntoParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .flatMap((p) => p.split(/(?<=[.!?])\s+(?=[A-Z0-9])/))
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

export function chunkDocument(doc: RagRawDocument, options: ChunkingOptions = {}): RagChunkDraft[] {
  const targetLength = options.targetLength ?? 700;
  const maxLength = options.maxLength ?? 950;
  const overlapChars = options.overlapChars ?? 120;

  const paragraphs = splitIntoParagraphs(doc.text);
  if (paragraphs.length === 0) return [];

  const chunks: RagChunkDraft[] = [];
  let buffer = '';
  let chunkNumber = 0;

  const flush = () => {
    const text = buffer.trim();
    if (!text) return;

    chunks.push({
      id: `${doc.id}::chunk-${chunkNumber}`,
      text,
      metadata: {
        sourceType: doc.sourceType,
        slug: doc.slug,
        title: doc.title,
        href: doc.href,
        tags: doc.tags,
      },
    });

    chunkNumber += 1;
    const overlap = overlapChars > 0 ? text.slice(Math.max(0, text.length - overlapChars)) : '';
    buffer = overlap;
  };

  for (const paragraph of paragraphs) {
    const next = buffer ? `${buffer} ${paragraph}` : paragraph;

    if (next.length > maxLength && buffer) {
      flush();
      buffer = paragraph;
      continue;
    }

    buffer = next;

    if (buffer.length >= targetLength) {
      flush();
    }
  }

  flush();

  return chunks;
}

export function chunkDocuments(docs: RagRawDocument[], options?: ChunkingOptions): RagChunkDraft[] {
  return docs.flatMap((doc) => chunkDocument(doc, options));
}
