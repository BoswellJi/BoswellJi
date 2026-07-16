/**
 * DeepSeek RAG 系统
 * — 基于本地文档的检索增强生成系统
 *
 * 使用 DeepSeek Embedding + DeepSeek Chat + sqlite-vec 构建
 */

export { loadDocuments } from './loader.js';
export type { Document, LoaderOptions } from './loader.js';

export { RecursiveCharacterSplitter } from './splitter.js';
export type { Chunk, SplitterOptions } from './splitter.js';

export { DeepSeekEmbeddings } from './embeddings.js';
export type { EmbeddingResult, EmbeddingsOptions } from './embeddings.js';

export { VectorStore } from './vectorStore.js';
export type { StoredChunk } from './vectorStore.js';

export { Retriever } from './retriever.js';
export type { RetrievedChunk, RetrieverOptions } from './retriever.js';

export { RagLlm } from './llm.js';
export type { LlmOptions } from './llm.js';

export { RagPipeline } from './pipeline.js';
export type { IndexOptions, QueryOptions } from './pipeline.js';
