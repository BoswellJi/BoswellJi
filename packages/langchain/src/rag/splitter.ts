import type { Document } from './loader.js';

export interface Chunk {
  content: string;
  metadata: {
    source: string;
    type: string;
    chunkIndex: number;
    totalChunks: number;
  };
}

export interface SplitterOptions {
  /** 每块最大字符数 */
  chunkSize: number;
  /** 块之间的重叠字符数 */
  chunkOverlap: number;
}

const DEFAULT_OPTIONS: SplitterOptions = {
  chunkSize: 1000,
  chunkOverlap: 200,
};

/**
 * 递归字符文本分割器
 * 按优先级分隔: \n\n → \n → 。 → . → 空格
 */
export class RecursiveCharacterSplitter {
  private readonly separators: string[] = [
    '\n\n',
    '\n',
    '。',
    '.',
    '，',
    ',',
    ' ',
    '',
  ];

  constructor(private options: SplitterOptions = DEFAULT_OPTIONS) {}

  /**
   * 分割单个文档为多个块
   */
  splitDocument(doc: Document): Chunk[] {
    const chunks: string[] = [];
    this.splitText(doc.content, chunks);
    return chunks.map((content, index) => ({
      content,
      metadata: {
        source: doc.metadata.source,
        type: doc.metadata.type,
        chunkIndex: index,
        totalChunks: chunks.length,
      },
    }));
  }

  /**
   * 分割多个文档
   */
  splitDocuments(docs: Document[]): Chunk[] {
    const allChunks: Chunk[] = [];
    for (const doc of docs) {
      allChunks.push(...this.splitDocument(doc));
    }
    return allChunks;
  }

  /**
   * 递归分割文本
   */
  private splitText(text: string, result: string[]): void {
    if (text.length <= this.options.chunkSize) {
      result.push(text);
      return;
    }

    const separator = this.findSeparator(text);
    if (!separator) {
      // 无合适分隔符，强制截断
      result.push(text.slice(0, this.options.chunkSize));
      const remaining = text.slice(
        this.options.chunkSize - this.options.chunkOverlap
      );
      if (remaining.length > 0) {
        this.splitText(remaining, result);
      }
      return;
    }

    const parts = text.split(separator);
    let currentChunk = '';

    for (const part of parts) {
      const candidate = currentChunk
        ? `${currentChunk}${separator}${part}`
        : part;

      if (candidate.length > this.options.chunkSize) {
        if (currentChunk) {
          result.push(currentChunk);
        }
        // 如果单个段已经超过块大小，递归分割
        if (part.length > this.options.chunkSize) {
          this.splitText(part, result);
          currentChunk = '';
        } else {
          currentChunk = part;
        }
      } else {
        currentChunk = candidate;
      }
    }

    if (currentChunk) {
      result.push(currentChunk);
    }
  }

  /**
   * 找到文本中最早出现的分隔符
   */
  private findSeparator(text: string): string | null {
    for (const sep of this.separators) {
      if (sep === '') return sep;
      if (text.includes(sep)) return sep;
    }
    return null;
  }
}
