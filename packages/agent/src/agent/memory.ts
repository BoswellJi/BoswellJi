/**
 * Agent 记忆模块
 *
 * 管理对话历史，支持滑动窗口截断
 */

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface MemoryOptions {
  maxMessages?: number;
}

export class AgentMemory {
  private messages: Message[] = [];
  private maxMessages: number;

  constructor(options: MemoryOptions = {}) {
    this.maxMessages = options.maxMessages ?? 20;
  }

  add(role: Message['role'], content: string): void {
    this.messages.push({ role, content, timestamp: Date.now() });
    this.trim();
  }

  getHistory(): Message[] {
    return [...this.messages];
  }

  getContext(): string {
    return this.messages.map((m) => `[${m.role}]: ${m.content}`).join('\n');
  }

  clear(): void {
    this.messages = [];
  }

  get size(): number {
    return this.messages.length;
  }

  private trim(): void {
    if (this.messages.length > this.maxMessages) {
      this.messages = this.messages.slice(-this.maxMessages);
    }
  }
}
