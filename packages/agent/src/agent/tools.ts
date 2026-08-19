/**
 * Agent 工具模块
 *
 * 定义 Agent 可用的工具
 */

import { exec } from 'node:child_process';
import { tool } from '@langchain/core/tools';
import { z } from 'zod';
import type { RagPipeline } from '../rag/pipeline.js';

/** 创建工具集 */
export function createTools(pipeline: RagPipeline) {
  const searchTool = tool(
    async ({ query }: { query: string }) => {
      const { answer, sources } = await pipeline.query(query, { topK: 3 });

      const sourceText = sources
        .map(
          (s) => `- ${s.chunk.source} (${(s.relevanceScore * 100).toFixed(1)}%)`
        )
        .join('\n');

      return `回答: ${answer}\n\n参考来源:\n${sourceText}`;
    },
    {
      name: 'search_docs',
      description: '搜索本地文档库，查找相关信息。输入应该是搜索问题。',
      schema: z.object({
        query: z.string().describe('搜索查询'),
      }),
    }
  );

  const statsTool = tool(
    async () => {
      const stats = pipeline.getStats();
      return `文档来源数: ${stats.totalDocuments}\n文档块总数: ${stats.totalChunks}`;
    },
    {
      name: 'get_stats',
      description: '获取文档库统计信息',
      schema: z.object({}),
    }
  );

  const shellTool = tool(
    async ({ command }: { command: string }) => {
      return new Promise<string>((resolve) => {
        exec(
          command,
          { timeout: 30_000, maxBuffer: 1024 * 1024 },
          (error, stdout, stderr) => {
            if (error) {
              resolve(`执行失败: ${error.message}\n${stderr}`);
              return;
            }
            resolve(stdout || '(无输出)');
          }
        );
      });
    },
    {
      name: 'shell',
      description:
        '执行 shell 命令并返回输出。适用于文件操作、系统查询等任务。',
      schema: z.object({
        command: z.string().describe('要执行的 shell 命令'),
      }),
    }
  );

  return [searchTool, statsTool, shellTool];
}
