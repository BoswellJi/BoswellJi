/**
 * 基于文件的 JSON 向量存储
 *
 * 纯 JavaScript 实现，无原生依赖。
 * - 所有数据保存在内存中
 * - 可选持久化到 JSON 文件
 * - 使用余弦相似度进行向量搜索
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import type { Chunk } from './splitter.js';

export interface StoredChunk {
  id: number;
  source: string;
  type: string;
  content: string;
  chunkIndex: number;
  totalChunks: number;
  createdAt: string;
}

interface StoreData {
  dimension: number;
  chunks: StoredChunk[];
  vectors: number[][];
  nextId: number;
}

export class VectorStore {
  private dimension: number;
  private chunks: StoredChunk[] = [];
  private vectors: number[][] = [];
  private nextId = 1;
  private filePath: string;
  private dirty = false;

  constructor(dbPath: string, dimension = 1024) {
    this.dimension = dimension;
    this.filePath = dbPath.endsWith('.json') ? dbPath : `${dbPath}.json`;

    if (existsSync(this.filePath)) {
      this.load();
    }
  }

  /**
   * 获取向量维度
   */
  getDimension(): number {
    return this.dimension;
  }

  /**
   * 设置向量维度
   * 注意：改变维度会清空已有数据
   */
  setDimension(dim: number): void {
    if (dim !== this.dimension) {
      this.dimension = dim;
      this.chunks = [];
      this.vectors = [];
      this.nextId = 1;
      this.dirty = true;
    }
  }

  /**
   * 插入文档块及其向量
   */
  insertChunks(chunks: Chunk[], embeddings: number[][]): void {
    if (chunks.length !== embeddings.length) {
      throw new Error(
        `文档块数量 (${chunks.length}) 与向量数量 (${embeddings.length}) 不匹配`
      );
    }

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]!;
      const embedding = embeddings[i]!;

      const stored: StoredChunk = {
        id: this.nextId++,
        source: chunk.metadata.source,
        type: chunk.metadata.type,
        content: chunk.content,
        chunkIndex: chunk.metadata.chunkIndex,
        totalChunks: chunk.metadata.totalChunks,
        createdAt: new Date().toISOString(),
      };

      this.chunks.push(stored);
      this.vectors.push(embedding);
    }

    this.dirty = true;
    console.log(`[VectorStore] 已存储 ${chunks.length} 个文档块及向量`);
  }

  /**
   * 向量归一化
   */
  private normalize(vec: number[]): number[] {
    const norm = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
    if (norm === 0) return vec;
    return vec.map((v) => v / norm);
  }

  /**
   * 余弦相似度计算（向量已预归一化）
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i]! * b[i]!;
    }
    // 余弦值范围 [-1, 1]，返回 [0, 1] 范围的相似度
    return (dotProduct + 1) / 2;
  }

  /**
   * 执行 kNN 向量搜索
   * 使用余弦相似度 + 暴力搜索（适用于小规模数据集）
   */
  search(
    queryEmbedding: number[],
    topK = 5
  ): Array<{ id: number; distance: number }> {
    if (this.chunks.length === 0) return [];

    const normalizedQuery = this.normalize(queryEmbedding);

    // 计算所有向量与查询向量的相似度
    const similarities = this.vectors.map((vec, index) => {
      const normalizedVec = this.normalize(vec);
      const similarity = this.cosineSimilarity(normalizedQuery, normalizedVec);
      // 距离 = 1 - 相似度，与 sqlite-vec 的 distance 语义一致（越小越相关）
      return {
        id: this.chunks[index]!.id,
        distance: 1 - similarity,
      };
    });

    // 按距离升序排序，取 topK
    similarities.sort((a, b) => a.distance - b.distance);
    return similarities.slice(0, topK);
  }

  /**
   * 根据 ID 获取文档块内容
   */
  getChunkById(id: number): StoredChunk | null {
    return this.chunks.find((c) => c.id === id) ?? null;
  }

  /**
   * 批量获取文档块
   */
  getChunksByIds(ids: number[]): StoredChunk[] {
    if (ids.length === 0) return [];

    const idSet = new Set(ids);
    return this.chunks
      .filter((c) => idSet.has(c.id))
      .sort((a, b) => {
        if (a.source !== b.source) return a.source.localeCompare(b.source);
        return a.chunkIndex - b.chunkIndex;
      });
  }

  /**
   * 获取文档统计信息
   */
  getStats(): {
    totalDocuments: number;
    totalChunks: number;
    sources: string[];
  } {
    const sources = [...new Set(this.chunks.map((c) => c.source))];

    return {
      totalDocuments: sources.length,
      totalChunks: this.chunks.length,
      sources: sources.sort(),
    };
  }

  /**
   * 清空所有数据
   */
  clear(): void {
    this.chunks = [];
    this.vectors = [];
    this.nextId = 1;
    this.dirty = true;
    console.log('[VectorStore] 已清空所有数据');
  }

  /**
   * 持久化数据到 JSON 文件
   */
  save(): void {
    const data: StoreData = {
      dimension: this.dimension,
      chunks: this.chunks,
      vectors: this.vectors,
      nextId: this.nextId,
    };

    writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    this.dirty = false;
    console.log(`[VectorStore] 已保存到 ${this.filePath}`);
  }

  /**
   * 从 JSON 文件加载数据
   */
  private load(): void {
    try {
      const raw = readFileSync(this.filePath, 'utf-8');
      const data = JSON.parse(raw) as StoreData;

      this.dimension = data.dimension;
      this.chunks = data.chunks;
      this.vectors = data.vectors;
      this.nextId = data.nextId;
      this.dirty = false;

      console.log(
        `[VectorStore] 已加载 ${this.chunks.length} 个文档块，${this.vectors.length} 个向量`
      );
    } catch (error) {
      console.error(`[VectorStore] 加载失败，将使用空存储:`, error);
      this.chunks = [];
      this.vectors = [];
      this.nextId = 1;
    }
  }

  /**
   * 关闭资源并保存
   */
  close(): void {
    if (this.dirty) {
      this.save();
    }
  }
}
