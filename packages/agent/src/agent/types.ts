/**
 * Agent 类型定义
 */

export interface AgentResult {
  output: string;
  steps: AgentStep[];
}

export interface AgentStep {
  tool: string;
  input: string;
  output: string;
}

export type { Message } from './memory.js';
export type { AgentState, AgentStatus } from './state.js';
