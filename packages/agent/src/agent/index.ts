/**
 * Agent 核心模块
 *
 * 整合记忆、状态、工具，运行 Agent
 */

import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { AgentMemory } from './memory.js';
import { StateManager } from './state.js';
import { createTools } from './tools.js';
import { RagPipeline } from '../rag/pipeline.js';

export interface AgentOptions {
  maxMessages?: number;
}

export class Agent {
  private memory: AgentMemory;
  private state: StateManager;
  private pipeline: RagPipeline;
  private agent: ReturnType<typeof createReactAgent>;

  constructor(options: AgentOptions = {}) {
    this.memory = new AgentMemory({ maxMessages: options.maxMessages });
    this.state = new StateManager();
    this.pipeline = new RagPipeline();

    const llm = new ChatOpenAI({
      model: process.env.LLM_MODEL ?? 'mimo-v2.5-pro',
      apiKey: process.env.LLM_API_KEY ?? '',
      configuration: {
        baseURL: process.env.LLM_BASE_URL,
      },
      temperature: 0.7,
    });

    const tools = createTools(this.pipeline);

    this.agent = createReactAgent({
      llm,
      tools,
    });
  }

  async run(input: string): Promise<string> {
    this.state.setTask(input);
    this.state.setStatus('thinking');
    this.memory.add('user', input);

    try {
      const result = await this.agent.invoke({
        messages: [{ role: 'user', content: input }],
      });

      const lastMessage = result.messages[result.messages.length - 1];
      const response =
        typeof lastMessage.content === 'string'
          ? lastMessage.content
          : JSON.stringify(lastMessage.content);

      this.memory.add('assistant', response);
      this.state.setStatus('idle');
      this.state.setTask(null);

      return response;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.state.setError(errorMsg);
      throw error;
    }
  }

  getMemory(): AgentMemory {
    return this.memory;
  }

  getState(): StateManager {
    return this.state;
  }

  clearMemory(): void {
    this.memory.clear();
  }

  close(): void {
    this.pipeline.close();
  }
}
