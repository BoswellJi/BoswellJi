/**
 * RAG Web Server
 * 将 RAG 系统作为 Web API 提供服务
 */

import express from 'express';
import { resolve } from 'node:path';
import { RagPipeline } from '../rag/pipeline.js';
import type { QueryOptions } from '../rag/pipeline.js';

const app = express()
const PORT = Number(process.env.PORT) || 3000
const DB_PATH = process.env.DB_PATH || 'rag-store.json'

// 中间件
app.use(express.json())
app.use(express.static(resolve(import.meta.dirname, 'public')))

// 单例 pipeline（服务器启动时创建，请求复用以避免重复加载）
let pipeline: RagPipeline | null = null

function getPipeline(): RagPipeline {
  if (!pipeline) {
    pipeline = new RagPipeline(DB_PATH)
  }
  return pipeline
}

/**
 * POST /api/ask
 * 单次问答
 */
app.post('/api/ask', async (req, res) => {
  try {
    const { question, topK } = req.body

    if (!question || typeof question !== 'string') {
      res.status(400).json({ error: '缺少 question 参数' })
      return
    }

    const options: QueryOptions = {}
    if (typeof topK === 'number') options.topK = topK

    const p = getPipeline()
    const stats = p.getStats()

    if (stats.totalChunks === 0) {
      res.json({
        answer: '向量库为空，请先索引文档。',
        sources: [],
      })
      return
    }

    const result = await p.query(question, options)
    res.json(result)
  } catch (error) {
    console.error('[API] /api/ask 错误:', error)
    res.status(500).json({
      error: error instanceof Error ? error.message : '未知错误',
    })
  }
})

/**
 * POST /api/index
 * 索引文档
 */
app.post('/api/index', async (req, res) => {
  try {
    const { path, maxChunkSize, minChunkSize } = req.body

    if (!path || typeof path !== 'string') {
      res.status(400).json({ error: '缺少 path 参数' })
      return
    }

    const p = getPipeline()
    await p.index(path, {
      maxChunkSize: typeof maxChunkSize === 'number' ? maxChunkSize : undefined,
      minChunkSize: typeof minChunkSize === 'number' ? minChunkSize : undefined,
    })

    const stats = p.getStats()
    res.json({ message: '索引完成', stats })
  } catch (error) {
    console.error('[API] /api/index 错误:', error)
    res.status(500).json({
      error: error instanceof Error ? error.message : '未知错误',
    })
  }
})

/**
 * GET /api/stats
 * 向量库统计信息
 */
app.get('/api/stats', (_req, res) => {
  try {
    const p = getPipeline()
    const stats = p.getStats()
    res.json(stats)
  } catch (error) {
    console.error('[API] /api/stats 错误:', error)
    res.status(500).json({
      error: error instanceof Error ? error.message : '未知错误',
    })
  }
})

/**
 * POST /api/clear
 * 清空向量库
 */
app.post('/api/clear', (_req, res) => {
  try {
    const p = getPipeline()
    p.clear()
    res.json({ message: '向量库已清空' })
  } catch (error) {
    console.error('[API] /api/clear 错误:', error)
    res.status(500).json({
      error: error instanceof Error ? error.message : '未知错误',
    })
  }
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`
🚀 RAG Web Server 已启动
   http://localhost:${PORT}

API 端点:
   POST /api/ask     — 问答
   POST /api/index   — 索引文档
   GET  /api/stats   — 查看统计
   POST /api/clear   — 清空库

打开浏览器访问 http://localhost:${PORT} 使用 Web 界面
  `)
})
