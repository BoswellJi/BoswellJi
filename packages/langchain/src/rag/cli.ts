#!/usr/bin/env node

import { Command } from 'commander';
import { createInterface } from 'node:readline/promises';
import { RagPipeline } from './pipeline.js';

function createReadline() {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

const program = new Command();

program
  .name('rag')
  .description('DeepSeek RAG 系统 — 基于本地文档的智能问答')
  .version('1.0.0');

/**
 * index 命令: 索引文档
 */
program
  .command('index')
  .description('索引文档到向量库')
  .argument('<path>', '文档文件或目录路径')
  .option('-d, --db <path>', '向量数据库路径', 'rag-store.json')
  .option('--chunk-size <number>', '文本分块大小', '1000')
  .option('--chunk-overlap <number>', '块重叠字符数', '200')
  .action(async (inputPath, options) => {
    try {
      const pipeline = new RagPipeline(options.db);
      await pipeline.index(inputPath, {
        chunkSize: Number(options.chunkSize),
        chunkOverlap: Number(options.chunkOverlap),
      });
      pipeline.close();
      console.log('\n✅ 索引完成！');
    } catch (error) {
      console.error('\n❌ 索引失败:', error);
      process.exit(1);
    }
  });

/**
 * query 命令: 交互式问答
 */
program
  .command('query')
  .description('交互式问答模式')
  .option('-d, --db <path>', '向量数据库路径', 'rag-store.json')
  .option('-k, --top-k <number>', '检索的文档块数量', '5')
  .action(async (options) => {
    try {
      const pipeline = new RagPipeline(options.db);
      const rl = createReadline();

      const stats = pipeline.getStats();
      console.log(
        `\n📊 向量库状态: ${stats.totalDocuments} 个来源, ${stats.totalChunks} 个文档块\n`
      );

      if (stats.totalChunks === 0) {
        console.log('⚠️  向量库为空，请先运行 "rag index <path>" 索引文档');
        rl.close();
        pipeline.close();
        return;
      }

      console.log('💬 交互式问答模式 (输入 "exit" 退出)\n');

      while (true) {
        const question = await rl.question('🙋 请输入问题: ');

        if (!question.trim() || question.toLowerCase() === 'exit') {
          break;
        }

        try {
          const { answer, sources } = await pipeline.query(question, {
            topK: Number(options.topK),
          });

          console.log('\n' + '='.repeat(60));
          console.log('🤖 回答:');
          console.log(answer);
          console.log('='.repeat(60));

          if (sources.length > 0) {
            console.log('\n📚 参考来源:');
            for (const src of sources) {
              console.log(
                `  ${src.chunk.source} (相关性: ${(src.relevanceScore * 100).toFixed(1)}%)`
              );
            }
          }
          console.log();
        } catch (error) {
          console.error('❌ 查询失败:', error);
        }
      }

      rl.close();
      pipeline.close();
      console.log('\n👋 再见！');
    } catch (error) {
      console.error('\n❌ 启动失败:', error);
      process.exit(1);
    }
  });

/**
 * ask 命令: 单次问答
 */
program
  .command('ask')
  .description('单次问答模式')
  .argument('<question>', '要问的问题')
  .option('-d, --db <path>', '向量数据库路径', 'rag-store.json')
  .option('-k, --top-k <number>', '检索的文档块数量', '5')
  .action(async (question, options) => {
    try {
      const pipeline = new RagPipeline(options.db);

      const stats = pipeline.getStats();
      if (stats.totalChunks === 0) {
        console.log('⚠️  向量库为空，请先运行 "rag index <path>" 索引文档');
        pipeline.close();
        return;
      }

      const { answer, sources } = await pipeline.query(question, {
        topK: Number(options.topK),
      });

      console.log('\n' + '='.repeat(60));
      console.log('🤖 回答:');
      console.log(answer);
      console.log('='.repeat(60));

      if (sources.length > 0) {
        console.log('\n📚 参考来源:');
        for (const src of sources) {
          console.log(
            `  ${src.chunk.source} (相关性: ${(src.relevanceScore * 100).toFixed(1)}%)`
          );
        }
      }

      pipeline.close();
    } catch (error) {
      console.error('\n❌ 查询失败:', error);
      process.exit(1);
    }
  });

/**
 * stats 命令: 查看向量库统计
 */
program
  .command('stats')
  .description('查看向量库统计信息')
  .option('-d, --db <path>', '向量数据库路径', 'rag-store.json')
  .action((options) => {
    try {
      const pipeline = new RagPipeline(options.db);
      const stats = pipeline.getStats();
      console.log('\n📊 向量库统计:');
      console.log(`  文档来源数: ${stats.totalDocuments}`);
      console.log(`  文档块总数: ${stats.totalChunks}`);
      if (stats.sources.length > 0) {
        console.log('  来源文件:');
        for (const source of stats.sources) {
          console.log(`    - ${source}`);
        }
      }
      pipeline.close();
    } catch (error) {
      console.error('❌ 获取统计失败:', error);
      process.exit(1);
    }
  });

/**
 * clear 命令: 清空向量库
 */
program
  .command('clear')
  .description('清空向量库')
  .option('-d, --db <path>', '向量数据库路径', 'rag-store.json')
  .action((options) => {
    try {
      const pipeline = new RagPipeline(options.db);
      pipeline.clear();
      pipeline.close();
      console.log('✅ 向量库已清空');
    } catch (error) {
      console.error('❌ 清空失败:', error);
      process.exit(1);
    }
  });

// 解析命令行参数
program.parse();
