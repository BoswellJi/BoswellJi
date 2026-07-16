import { loadDocuments } from './loader.js';
import { RecursiveCharacterSplitter } from './splitter.js';
import { DeepSeekEmbeddings } from './embeddings.js';
import { VectorStore } from './vectorStore.js';
import { Retriever } from './retriever.js';
import { RagLlm } from './llm.js';
import type { RetrievedChunk } from './retriever.js';

export interface IndexOptions {
  /** 文档存储路径 */
  dbPath?: string;
  /** 文本分块大小 */
  chunkSize?: number;
  /** 块重叠字符数 */
  chunkOverlap?: number;
}

export interface QueryOptions {
  /** 文档存储路径 */
  dbPath?: string;
  /** 返回的文档块数量 */
  topK?: number;
}

const DEFAULT_DB_PATH = 'rag-store.json';

/**
 * RAG 完整流程编排器
 *
 * 提供两个核心流程:
 * 1. index — 加载文档 → 分块 → 嵌入 → 存储
 * 2. query — 问题嵌入 → 检索 → 生成回答
 */
export class RagPipeline {
  private embeddings: DeepSeekEmbeddings;
  private splitter: RecursiveCharacterSplitter;
  private vectorStore: VectorStore;
  private retriever: Retriever;
  private llm: RagLlm;

  constructor(dbPath = DEFAULT_DB_PATH) {
    this.embeddings = new DeepSeekEmbeddings();
    this.splitter = new RecursiveCharacterSplitter();
    // 先建 store，后续根据实际 embedding 维度调整
    this.vectorStore = new VectorStore(dbPath, 1024);
    this.retriever = new Retriever(this.embeddings, this.vectorStore);
    this.llm = new RagLlm();
  }

  /**
   * 索引文档
   * 加载 → 分块 → 嵌入 → 存储
   */
  async index(inputPath: string, options: IndexOptions = {}): Promise<void> {
    const { chunkSize, chunkOverlap } = options;

    // 1. 加载文档
    console.log('\n📄 === 加载文档 ===');
    const docs = await loadDocuments(inputPath);
    if (docs.length === 0) {
      throw new Error(
        `路径 "${inputPath}" 下未找到支持的文档文件`
      );
    }

    // 2. 分块
    console.log('\n✂️ === 文本分块 ===');
    if (chunkSize || chunkOverlap) {
      this.splitter = new RecursiveCharacterSplitter({
        chunkSize: chunkSize ?? 1000,
        chunkOverlap: chunkOverlap ?? 200,
      });
    }
    const chunks = this.splitter.splitDocuments(docs);
    console.log(`共 ${chunks.length} 个文本块`);

    // 3. 生成嵌入向量
    console.log('\n🔮 === 生成向量嵌入 ===');
    const texts = chunks.map((c) => c.content);
    const embeddings = await this.embeddings.embedDocuments(texts);

    // 检测并调整向量维度
    if (embeddings.length > 0) {
      const actualDim = embeddings[0]!.length;
      if (actualDim !== this.vectorStore.getDimension()) {
        console.log(`检测到向量维度: ${actualDim}，调整存储维度`);
        this.vectorStore.setDimension(actualDim);
      }
    }

    // 4. 存储到向量库
    console.log('\n💾 === 存储到向量库 ===');
    this.vectorStore.insertChunks(chunks, embeddings);

    // 5. 打印统计
    const stats = this.vectorStore.getStats();
    console.log('\n📊 === 索引完成 ===');
    console.log(`文档来源数: ${stats.totalDocuments}`);
    console.log(`文档块总数: ${stats.totalChunks}`);
    console.log(`来源文件:`);
    for (const source of stats.sources) {
      console.log(`  - ${source}`);
    }
  }

  /**
   * 问答查询
   * 问题嵌入 → 检索 → 生成回答
   */
  async query(
    question: string,
    options: QueryOptions = {}
  ): Promise<{
    answer: string;
    sources: RetrievedChunk[];
  }> {
    const { topK } = options;
    if (topK) {
      this.retriever = new Retriever(this.embeddings, this.vectorStore, {
        topK,
      });
    }

    // 1. 检索相关文档
    console.log('\n🔍 === 检索相关文档 ===');
    const chunks = await this.retriever.retrieve(question);

    if (chunks.length === 0) {
      return {
        answer:
          '根据已索引的文档，未找到与问题相关的内容。请尝试其他问题或先索引更多文档。',
        sources: [],
      };
    }

    // 2. 打印检索到的来源
    console.log('\n📚 === 检索结果 ===');
    for (const chunk of chunks) {
      console.log(
        `  [${(chunk.relevanceScore * 100).toFixed(1)}%] ${chunk.chunk.source} (块 ${chunk.chunk.chunkIndex + 1}/${chunk.chunk.totalChunks})`
      );
    }

    // 3. 生成回答
    console.log('\n🤖 === 生成回答 ===');
    const answer = await this.llm.answer(question, chunks);

    return { answer, sources: chunks };
  }

  /**
   * 获取向量库统计信息
   */
  getStats() {
    return this.vectorStore.getStats();
  }

  /**
   * 清空向量库
   */
  clear(): void {
    this.vectorStore.clear();
  }

  /**
   * 关闭资源
   */
  close(): void {
    this.vectorStore.close();
  }
}
