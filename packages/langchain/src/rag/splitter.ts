/**
 * 语义段落文本分割器
 *
 * 按自然语义边界切分文档，保持段落完整性：
 * 1. Markdown 标题（##, ### 等）作为第一优先级分段符
 * 2. 空行（\n\n 段落边界）作为第二优先级
 * 3. 每个段落块内容保持完整，不被截断
 */

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
  /** 最大段落组大小（字符数，超过此值会尝试进一步拆分，默认 2000） */
  maxChunkSize: number;
  /** 最小段落组大小（字符数，低于此值会尝试合并，默认 300） */
  minChunkSize: number;
}

const DEFAULT_OPTIONS: SplitterOptions = {
  maxChunkSize: 2000,
  minChunkSize: 300,
};

/**
 * Markdown 标题正则 — 匹配 # 到 ######
 */
const HEADING_RE = /^#{1,6}\s+.+$/m;

export class SemanticParagraphSplitter {
  constructor(private options: SplitterOptions = DEFAULT_OPTIONS) {}

  /**
   * 分割单个文档为多个块
   */
  splitDocument(doc: Document): Chunk[] {
    const chunks = this.splitIntoParagraphGroups(doc.content);
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
   * 将文本分割成语义段落组
   *
   * 策略：
   * 1. 先按 Markdown 标题分节（如果存在标题）
   * 2. 每个节内按空行（段落边界）拆分为段落
   * 3. 将小段落合并成大小适中的组
   * 4. 超大段落按标点（句号、问号、感叹号）进一步拆分
   */
  private splitIntoParagraphGroups(text: string): string[] {
    // 第一步：按标题分节
    const sections = this.splitByHeadings(text);
    if (sections.length > 1) {
      return this.groupParagraphs(sections);
    }

    // 第二步：无标题时按段落拆分再分组
    const paragraphs = this.splitIntoParagraphs(text);
    return this.groupParagraphs(paragraphs);
  }

  /**
   * 按 Markdown 标题拆分为节
   * 返回每个节的内容（含标题行）
   */
  private splitByHeadings(text: string): string[] {
    const lines = text.split('\n');
    const sections: string[] = [];
    let currentSection: string[] = [];

    for (const line of lines) {
      if (HEADING_RE.test(line) && currentSection.length > 0) {
        // 遇到新标题，保存上一个节
        sections.push(currentSection.join('\n'));
        currentSection = [line];
      } else {
        currentSection.push(line);
      }
    }

    if (currentSection.length > 0) {
      sections.push(currentSection.join('\n'));
    }

    return sections;
  }

  /**
   * 按空行拆分为段落
   * 连续空行视为一个分隔符
   */
  private splitIntoParagraphs(text: string): string[] {
    // 将文本按一个或多个空行拆分为段落
    const rawParagraphs = text.split(/\n\s*\n/);
    return rawParagraphs
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }

  /**
   * 将段落合并成大小适中的组
   *
   * - 小段落（< minChunkSize）尝试与相邻段落合并
   * - 超大段落（> maxChunkSize）按句子拆分
   * - 保持在合理大小范围内
   */
  private groupParagraphs(paragraphs: string[]): string[] {
    const groups: string[] = [];
    let currentGroup: string[] = [];
    let currentSize = 0;

    for (const para of paragraphs) {
      // 处理超大段落：按句子拆分为子段落
      if (para.length > this.options.maxChunkSize) {
        // 先保存当前组
        if (currentGroup.length > 0) {
          groups.push(currentGroup.join('\n\n'));
          currentGroup = [];
          currentSize = 0;
        }
        // 将超大段落拆分为子段落并分组
        const subParagraphs = this.splitLongParagraph(para);
        for (const sub of subParagraphs) {
          groups.push(sub);
        }
        continue;
      }

      // 当前段落加入后超过上限 → 先保存当前组
      if (currentSize + para.length > this.options.maxChunkSize && currentGroup.length > 0) {
        groups.push(currentGroup.join('\n\n'));
        currentGroup = [];
        currentSize = 0;
      }

      currentGroup.push(para);
      currentSize += para.length;
    }

    // 处理剩余的组
    if (currentGroup.length > 0) {
      // 如果最后一组太小且前面有组，合并到前一组
      if (
        groups.length > 0 &&
        currentSize < this.options.minChunkSize
      ) {
        const lastGroup = groups.pop()!;
        groups.push(`${lastGroup}\n\n${currentGroup.join('\n\n')}`);
      } else {
        groups.push(currentGroup.join('\n\n'));
      }
    }

    return groups;
  }

  /**
   * 将长段落按句子边界拆分为子段落
   * 句子边界：句号、问号、感叹号、冒号
   */
  private splitLongParagraph(text: string): string[] {
    // 按中文/英文句子边界拆分
    const parts = text.split(/(?<=[。！？：.!?:])\s*/);
    const result: string[] = [];
    let current = '';

    for (const part of parts) {
      if (!part.trim()) continue;

      if (current.length + part.length > this.options.maxChunkSize && current.length > 0) {
        result.push(current.trim());
        current = part;
      } else {
        current += part;
      }
    }

    if (current.trim()) {
      result.push(current.trim());
    }

    return result.length > 0 ? result : [text];
  }
}
