/**
 * 项目迭代列表查询，子命令 queryMatrixProjectSprints。
 * 接口：POST /api/sprints/list/:page/:pageSize
 * 用法：matrix -- queryMatrixProjectSprints [--page=1] [--pageSize=15] [--projectId=] [--sprintName=] [--statusCondition=]
 */

import {
  handleMatrixResponse,
  extractMatrixResultList,
  resolveProjectId,
  resolveItemStatusValueByName,
  isVerbose
} from './matrix-api.ts'
import { getArgFromArgv, resolveCodeOrNameArray } from './parse-arg.ts'

/** 迭代列表接口：POST /api/sprints/list/:page/:pageSize */
const SPRINTS_LIST_BASE = 'https://matrix.17usoft.com/api/sprints/list'

/** 迭代列表查询参数；statusCondition 支持数值数组或字符串数组（字符串通过 sprintStatus 转换为 code） */
export interface SprintsListArgs {
  page: number
  pageSize: number
  projectId?: string
  sprintName?: string
  statusCondition?: (number | string)[]
}

/** 从 argv 解析 queryMatrixProjectSprints 参数：page 默认 1，pageSize 默认 15 */
export function getSprintsArgsFromArgv(): SprintsListArgs {
  const pageStr = getArgFromArgv('page')
  const pageSizeStr = getArgFromArgv('pageSize')
  const page = pageStr != null ? parseInt(pageStr, 10) : NaN
  const pageSize = pageSizeStr != null ? parseInt(pageSizeStr, 10) : NaN
  const pageVal = Number.isNaN(page) ? 1 : page
  const pageSizeVal = Number.isNaN(pageSize) ? 15 : pageSize
  const projectIdStr = getArgFromArgv('projectId')
  const sprintName = getArgFromArgv('sprintName')
  const statusStr = getArgFromArgv('statusCondition')
  let statusCondition: (number | string)[] | undefined
  if (statusStr != null && statusStr !== '') {
    try {
      const arr = JSON.parse(statusStr) as unknown
      if (!Array.isArray(arr)) {
        statusCondition = undefined
      } else {
        statusCondition = arr
          .map(x => {
            if (typeof x === 'number' && !Number.isNaN(x)) return x
            if (typeof x === 'string' && x.trim() !== '') return x.trim()
            const n = Number(x)
            return Number.isNaN(n)
              ? typeof x === 'string'
                ? (x as string).trim()
                : undefined
              : n
          })
          .filter((x): x is number | string => x !== undefined && x !== '') as (
          | number
          | string
        )[]
        if (statusCondition.length === 0) statusCondition = undefined
      }
    } catch {
      const parts = statusStr
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
      if (parts.length > 0) {
        const asNumbers = parts.map(s => parseInt(s, 10))
        const allNumeric = asNumbers.every(n => !Number.isNaN(n))
        statusCondition = allNumeric ? asNumbers : parts
      }
    }
  }
  return {
    page: pageVal,
    pageSize: pageSizeVal,
    projectId: projectIdStr ?? undefined,
    sprintName: sprintName ?? undefined,
    statusCondition
  }
}

/** 从单条记录中取 id、projectName（兼容 id/projectId、projectName/name） */
function formatRow(
  item: unknown
): { id: number; name: string; projectName: string } | null {
  const o = item as Record<string, unknown>
  const id = o.id
  const idNum = typeof id === 'number' ? id : parseInt(String(id), 10)
  const name = (o.sprintName ?? o.name ?? '').toString().trim()
  const projectName = (o.projectName ?? '').toString().trim() || '(无名称)'
  if (Number.isNaN(idNum)) return null
  return { id: idNum, name: name || '(无名称)', projectName }
}

/** 查询项目迭代列表：POST /api/sprints/list/:page/:pageSize */
export async function queryMatrixProjectSprints(
  accessToken: string,
  args: SprintsListArgs
): Promise<void> {
  const url = `${SPRINTS_LIST_BASE}/${args.page}/${args.pageSize}`
  const body: Record<string, unknown> = {}
  if (args.projectId != null)
    body.projectId = await resolveProjectId(accessToken, args.projectId)
  if (args.sprintName != null) body.sprintName = args.sprintName
  if (args.statusCondition != null && args.statusCondition.length > 0) {
    body.statusCondition = await resolveCodeOrNameArray(
      args.statusCondition,
      name => resolveItemStatusValueByName(accessToken, 'sprintStatus', name)
    )
  }
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
  const data = await handleMatrixResponse(res, 'sprints/list')
  const list = extractMatrixResultList(data)
  const rows = list
    .map(formatRow)
    .filter(
      (r): r is { id: number; name: string; projectName: string } => r != null
    )
  if (isVerbose()) {
    console.log('\ndata.result 简化结果：')
    for (const r of rows) {
      console.log(
        `  id: ${r.id}, name: ${r.name}, projectName: ${r.projectName}`
      )
    }
  }
}
