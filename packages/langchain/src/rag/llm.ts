import { ChatDeepSeek } from '@langchain/deepseek';
import type { RetrievedChunk } from './retriever.js';

export interface LlmOptions {
  /** DeepSeek 模型名称 */
  model?: string;
  /** API Key */
  apiKey?: string;
  /** 温度参数 */
  temperature?: number;
  /** 最大 Token 数 */
  maxTokens?: number;
}

const DEFAULT_OPTIONS: Required<LlmOptions> = {
  model: 'deepseek-v4-flash',
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
  temperature: 0.3,
  maxTokens: 4096,
};

/**
 * RAG 系统提示词模板
 */
const RAG_SYSTEM_PROMPT = `你是一个基于本地文档的智能问答助手。

## 核心原则
- 仅基于提供的上下文内容回答问题
- 如果上下文不足以回答问题，明确说明"根据提供的文档，我无法回答这个问题"
- 不要编造或假设上下文之外的信息
- 用中文回答，除非上下文中明确使用了其他语言

## 回答格式
1. 首先直接回答问题
2. 必要时引用相关来源（文件名）
3. 如果涉及多个要点，使用编号列表

## 上下文内容
{context}`;

/**
 * LLM 问答模块
 * 使用 DeepSeek Chat 模型进行检索增强生成
 */
export class RagLlm {
  private model: ChatDeepSeek;
  private options: Required<LlmOptions>;

  constructor(options: LlmOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };

    if (!this.options.apiKey) {
      throw new Error(
        '未配置 DEEPSEEK_API_KEY。请设置环境变量或在 .env 文件中配置。'
      );
    }
    this.model = this.createModel();
  }

  /**
   * 创建 DeepSeek Chat 模型实例
   */
  private createModel(): ChatDeepSeek {
    return new ChatDeepSeek({
      model: this.options.model,
      apiKey: this.options.apiKey,
      temperature: this.options.temperature,
      maxTokens: this.options.maxTokens,
    });
  }

  /**
   * 构建包含上下文的提示
   */
  private buildContext(chunks: RetrievedChunk[]): string {
    return chunks
      .map(
        (chunk, index) =>
          `[来源 ${index + 1}] ${chunk.chunk.source}
[相关性: ${(chunk.relevanceScore * 100).toFixed(1)}%]

${chunk.chunk.content}

---`
      )
      .join('\n\n');
  }

  /**
   * 基于检索结果回答问题
   */
  async answer(question: string, chunks: RetrievedChunk[]): Promise<string> {
    const context = this.buildContext(chunks);
    const systemPrompt = RAG_SYSTEM_PROMPT.replace('{context}', context);

    const response = await this.model.invoke([
      ['system', systemPrompt],
      ['human', question],
    ]);

    return response.content as string;
  }
}
