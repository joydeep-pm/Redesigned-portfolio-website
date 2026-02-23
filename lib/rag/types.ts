export type RagSourceType = 'work' | 'project' | 'case-study' | 'thread' | 'profile';

export interface RagChunkMetadata {
  sourceType: RagSourceType;
  slug?: string;
  title: string;
  href: string;
  tags?: string[];
  section?: string;
}

export interface RagChunk {
  id: string;
  text: string;
  embedding: number[];
  metadata: RagChunkMetadata;
}

export interface RagIndexFile {
  version: 1;
  createdAt: string;
  embeddingModel: string;
  dimensions: number;
  chunks: RagChunk[];
}

export interface RagRawDocument {
  id: string;
  sourceType: RagSourceType;
  slug?: string;
  title: string;
  href: string;
  tags?: string[];
  text: string;
}

export interface RagChunkDraft {
  id: string;
  text: string;
  metadata: RagChunkMetadata;
}

export interface RagSearchResult {
  chunk: RagChunk;
  score: number;
}

export interface ChatHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequestBody {
  message: string;
  history?: ChatHistoryMessage[];
  routeContext?: string;
}

export interface ChatCitation {
  sourceType: RagSourceType;
  slug?: string;
  title: string;
  href: string;
  score?: number;
  snippet?: string;
}

export interface ChatResponseBody {
  answer: string;
  citations: ChatCitation[];
  suggestedQuestions?: string[];
}
