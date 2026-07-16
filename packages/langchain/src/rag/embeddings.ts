/**
 * Embedding API 客户端
 *
 * 默认使用硅基流动（SiliconFlow）的免费 BGE 嵌入模型：
 * - BAAI/bge-m3 模型，支持中文和多语言
 * - API 兼容 OpenAI 格式
 * - 新用户赠送 2000 万 Token
 *
 * 也可通过环境变量切换到其他 OpenAI 兼容的嵌入服务
 */

export interface EmbeddingResult {
  embedding: number[];
  index: number;
}

export interface EmbeddingsOptions {
  /** API Key */
  apiKey?: string;
  /** API 基础 URL */
  baseUrl?: string;
  /** 嵌入模型名称 */
  model?: string;
}

// 默认使用硅基流动的免费 BGE 嵌入
const DEFAULT_BASE_URL = 'https://api.siliconflow.cn/v1';
const DEFAULT_MODEL = 'BAAI/bge-m3';

function getApiKey(): string {
  const key =
    process.env.EMBEDDING_API_KEY ?? process.env.DEEPSEEK_API_KEY;
  if (!key) {
    throw new Error(
      '未找到 Embedding API Key。请设置 EMBEDDING_API_KEY 环境变量，或在 .env 文件中配置。'
    );
  }
  return key;
}

function getBaseUrl(): string {
  return process.env.EMBEDDING_BASE_URL ?? DEFAULT_BASE_URL;
}

function getModel(): string {
  return process.env.EMBEDDING_MODEL ?? DEFAULT_MODEL;
}

export class DeepSeekEmbeddings {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(options: EmbeddingsOptions = {}) {
    this.apiKey = options.apiKey ?? getApiKey();
    this.baseUrl = options.baseUrl ?? getBaseUrl();
    this.model = options.model ?? getModel();
  }

  /**
   * 生成单个文本的嵌入向量
   */
  async embedQuery(text: string): Promise<number[]> {
    const results = await this.embedDocuments([text]);
    return results[0];
  }

  /**
   * 批量生成文本的嵌入向量
   */
  async embedDocuments(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];

    // DeepSeek 限制每批最多 1024 个输入
    const BATCH_SIZE = 1024;
    const results: number[][] = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const batch = texts.slice(i, i + BATCH_SIZE);
      const batchResults = await this.embedBatch(batch);
      results.push(...batchResults);
      console.log(
        `[Embeddings] 已处理 ${Math.min(i + BATCH_SIZE, texts.length)}/${texts.length} 个文本块`
      );
    }

    return results;
  }

  /**
   * 嵌入一批文本
   */
  private async embedBatch(texts: string[]): Promise<number[][]> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        input: texts,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `DeepSeek Embedding API 错误 (${response.status}): ${errorText}`
      );
    }

    const data = (await response.json()) as {
      data: Array<{ embedding: number[]; index: number }>;
      usage?: { total_tokens: number };
    };

    const embeddings = data.data
      .sort((a, b) => a.index - b.index)
      .map((item) => item.embedding);

    if (data.usage) {
      console.log(`[Embeddings] Token 消耗: ${data.usage.total_tokens}`);
    }

    return embeddings;
  }
}
