import type { DeepSeekEmbeddings } from './embeddings.js';
import type { VectorStore, StoredChunk } from './vectorStore.js';

export interface RetrievedChunk {
  chunk: StoredChunk;
  score: number;
  /** 归一化后的相关性分数，越高越相关 */
  relevanceScore: number;
}

export interface RetrieverOptions {
  /** 返回的最相关文档块数量 */
  topK?: number;
  /** 最低相似度阈值 (距离) */
  minDistance?: number;
  /** 是否返回分数归一化结果 */
  normalize?: boolean;
}

const DEFAULT_OPTIONS: Required<RetrieverOptions> = {
  topK: 5,
  minDistance: 1,
  normalize: true,
};

/**
 * 向量检索器
 * 将用户问题向量化后，从向量库中检索最相似的文档块
 */
export class Retriever {
  private embeddings: DeepSeekEmbeddings;
  private vectorStore: VectorStore;
  private options: Required<RetrieverOptions>;

  constructor(
    embeddings: DeepSeekEmbeddings,
    vectorStore: VectorStore,
    options: RetrieverOptions = {}
  ) {
    this.embeddings = embeddings;
    this.vectorStore = vectorStore;
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * 检索与问题最相关的文档块
   */
  async retrieve(query: string): Promise<RetrievedChunk[]> {
    // 1. 将问题向量化
    const queryEmbedding = await this.embeddings.embedQuery(query);

    // 2. 执行向量搜索
    const results = this.vectorStore.search(queryEmbedding, this.options.topK);

    // 3. 过滤低质量结果
    const filteredResults = results.filter(
      (r) => r.distance <= this.options.minDistance
    );

    if (filteredResults.length === 0) {
      console.log('[Retriever] 未找到匹配的文档块');
      return [];
    }

    // 4. 获取文档块内容
    const chunkIds = filteredResults.map((r) => r.id);
    const chunks = this.vectorStore.getChunksByIds(chunkIds);

    // 5. 组装结果
    const chunkMap = new Map(chunks.map((c) => [c.id, c]));

    const retrieved: RetrievedChunk[] = filteredResults
      .map((result) => {
        const chunk = chunkMap.get(result.id);
        if (!chunk) return null;

        // 距离越小越相关，转换为 0-1 的分数
        const rawScore = 1 / (1 + result.distance);

        return {
          chunk,
          score: result.distance,
          relevanceScore: rawScore,
        };
      })
      .filter((r): r is RetrievedChunk => r !== null);

    // 归一化分数
    if (this.options.normalize && retrieved.length > 0) {
      const maxScore = Math.max(...retrieved.map((r) => r.relevanceScore));
      const minScore = Math.min(...retrieved.map((r) => r.relevanceScore));
      const range = maxScore - minScore;

      if (range > 0) {
        for (const item of retrieved) {
          item.relevanceScore = (item.relevanceScore - minScore) / range;
        }
      }
    }

    console.log(
      `[Retriever] 检索到 ${retrieved.length} 个相关文档块，最高相关性: ${(retrieved[0]?.relevanceScore ?? 0).toFixed(4)}`
    );

    return retrieved;
  }
}
