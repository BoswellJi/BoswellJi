/**
 * 有权限的项目列表查询，子命令 queryMatrixProjects。
 * 接口：POST /api/project/list/:page/:pageSize
 * 用法：matrix -- queryMatrixProjects [--page=1] [--pageSize=15] [--projectName=名称] [--ids=2884 或 1,2,3] [--verbose]
 */

import {
  extractMatrixResultList,
  handleMatrixResponse,
  isVerbose
} from './matrix-api.ts'

/** 项目列表接口：POST /api/project/list/:page/:pageSize */
const PROJECT_LIST_BASE = 'https://matrix.17usoft.com/api/project/list'

/** 从命令行读取单个可选参数，支持 --key=val 或 --key val */
function getArgFromArgv(key: string): string | null {
  const args = process.argv.slice(2)
  const prefix = `--${key}=`
  for (let i = 0; i < args.length; i++) {
    if (args[i]!.startsWith(prefix)) {
      const v = args[i]!.slice(prefix.length).trim()
      return v || null
    }
    if (args[i] === `--${key}` && args[i + 1]) {
      return args[i + 1]!.trim()
    }
  }
  return null
}

/** 项目列表查询参数 */
export interface ProjectListArgs {
  page: number
  pageSize: number
  projectName?: string
  ids?: number[]
}

/** 从 argv 解析 queryMatrixProjects 参数：page 默认 1，pageSize 默认 15 */
export function getProjectListArgsFromArgv(): ProjectListArgs {
  const pageStr = getArgFromArgv('page')
  const pageSizeStr = getArgFromArgv('pageSize')
  const page = pageStr != null ? parseInt(pageStr, 10) : NaN
  const pageSize = pageSizeStr != null ? parseInt(pageSizeStr, 10) : NaN
  const pageVal = Number.isNaN(page) ? 1 : page
  const pageSizeVal = Number.isNaN(pageSize) ? 15 : pageSize
  const projectName = getArgFromArgv('projectName')
  const idsStr = getArgFromArgv('ids')
  let ids: number[] | undefined
  if (idsStr != null && idsStr !== '') {
    const raw = idsStr.trim()
    try {
      const arr = JSON.parse(raw) as unknown
      if (Array.isArray(arr)) {
        ids = arr.map(x => Number(x)).filter(n => !Number.isNaN(n))
      } else if (typeof arr === 'number' && !Number.isNaN(arr)) {
        ids = [arr]
      }
    } catch {
      // 支持 "[2884]"、"[2884,2885]"：去掉首尾方括号后按逗号分割解析为数组
      if (raw.startsWith('[') && raw.endsWith(']')) {
        const inner = raw.slice(1, -1).trim()
        const parts = inner
          ? inner
              .split(',')
              .map(s => parseInt(s.trim(), 10))
              .filter(n => !Number.isNaN(n))
          : []
        if (parts.length > 0) ids = parts
      } else {
        const parts = raw
          .split(',')
          .map(s => parseInt(s.trim(), 10))
          .filter(n => !Number.isNaN(n))
        if (parts.length > 0) ids = parts
      }
    }
  }
  return {
    page: pageVal,
    pageSize: pageSizeVal,
    projectName: projectName ?? undefined,
    ids
  }
}

/** 从单条记录中取 id、projectName（兼容 id/projectId、projectName/name） */
function formatRow(item: unknown): { id: number; name: string } | null {
  const o = item as Record<string, unknown>
  const id = o.id ?? o.projectId
  const idNum = typeof id === 'number' ? id : parseInt(String(id), 10)
  const name = (o.projectName ?? o.name ?? '').toString().trim()
  if (Number.isNaN(idNum)) return null
  return { id: idNum, name: name || '(无名称)' }
}

/** 查询有权限的项目列表：POST /api/project/list/:page/:pageSize；成功时输出 data.result 中每条记录的 id 与 projectName，再输出完整 JSON */
export async function queryMatrixProjects(
  accessToken: string,
  args: ProjectListArgs
): Promise<void> {
  const url = `${PROJECT_LIST_BASE}/${args.page}/${args.pageSize}`
  const body: Record<string, unknown> = {}
  if (args.projectName != null && args.projectName !== '')
    body.projectName = args.projectName
  if (args.ids != null && args.ids.length > 0) body.ids = args.ids
  if (isVerbose()) {
    console.log('[verbose] fetch url:', url)
    console.log('[verbose] fetch body:', JSON.stringify(body))
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept-encoding': 'identity',
      Accept: '*/*',
      Cookie: `access_token=${accessToken}`
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000)
  })
  const data = await handleMatrixResponse(res, 'projects/list')
  const list = extractMatrixResultList(data)
  const rows = list
    .map(formatRow)
    .filter((r): r is { id: number; name: string } => r != null)
  if (isVerbose()) {
    console.log('\ndata.result 简化结果：')
    for (const r of rows) {
      console.log(`  id: ${r.id}, name: ${r.name}`)
    }
  }
}
