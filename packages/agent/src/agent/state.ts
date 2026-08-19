/**
 * Agent 状态模块
 *
 * 管理 Agent 运行时状态
 */

export type AgentStatus = 'idle' | 'thinking' | 'executing' | 'error';

export interface AgentState {
  status: AgentStatus;
  currentTask: string | null;
  toolCalls: number;
  startTime: number;
  error: string | null;
}

export class StateManager {
  private state: AgentState = {
    status: 'idle',
    currentTask: null,
    toolCalls: 0,
    startTime: 0,
    error: null,
  };

  get(): Readonly<AgentState> {
    return { ...this.state };
  }

  setStatus(status: AgentStatus): void {
    this.state.status = status;
  }

  setTask(task: string | null): void {
    this.state.currentTask = task;
  }

  incrementToolCalls(): void {
    this.state.toolCalls++;
  }

  setError(error: string | null): void {
    this.state.error = error;
    if (error) this.state.status = 'error';
  }

  reset(): void {
    this.state = {
      status: 'idle',
      currentTask: null,
      toolCalls: 0,
      startTime: Date.now(),
      error: null,
    };
  }

  getSummary(): string {
    const { status, currentTask, toolCalls } = this.state;
    return `状态: ${status} | 任务: ${currentTask ?? '无'} | 工具调用: ${toolCalls}`;
  }
}
