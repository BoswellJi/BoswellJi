#!/usr/bin/env node

/**
 * Agent CLI
 *
 * 交互式 Agent 命令行界面
 */

import { createInterface } from 'node:readline/promises';
import { Agent } from '../agent/index.js';

async function main() {
  console.log('🤖 Agent Demo (输入 "exit" 退出)\n');
  console.log('命令:');
  console.log('  /state  - 查看 Agent 状态');
  console.log('  /memory - 查看记忆历史');
  console.log('  /clear  - 清空记忆');
  console.log('  exit    - 退出\n');

  const agent = new Agent({ maxMessages: 20 });
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const input = await rl.question('You: ');
    if (!input.trim() || input.toLowerCase() === 'exit') break;

    // 显示命令
    if (input.toLowerCase() === '/state') {
      console.log(`\n${agent.getState().getSummary()}\n`);
      continue;
    }
    if (input.toLowerCase() === '/memory') {
      const history = agent.getMemory().getHistory();
      console.log(`\n记忆 (${history.length} 条):`);
      for (const m of history.slice(-5)) {
        console.log(`  [${m.role}] ${m.content.slice(0, 50)}...`);
      }
      console.log();
      continue;
    }
    if (input.toLowerCase() === '/clear') {
      agent.clearMemory();
      console.log('\n✅ 记忆已清空\n');
      continue;
    }

    // 运行 Agent
    try {
      console.log('\nAgent 思考中...');
      const response = await agent.run(input);
      console.log(`\nAgent: ${response}\n`);
    } catch (error) {
      console.error(`\n❌ 错误: ${error}\n`);
    }
  }

  rl.close();
  agent.close();
  console.log('\n👋 再见！');
}

main().catch(console.error);
