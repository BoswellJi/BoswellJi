/**
 * 项目内/迭代内需求列表查询，子命令 queryMatrixProjectRequirements。
 * 接口：POST /api/task/list/:page/:pageSize
 * 用法：matrix -- queryMatrixProjectRequirements --projectId=项目id [--page=1] [--pageSize=10] [--sIds=] [--requireName=] [--id=] ...
 * projectId 可为数字或项目名；若为字符串通过 queryMatrixProjects 解析。sIds 同理可用 queryMatrixProjectSprints 解析。creator/demander/proposer 为姓名-工号；priority/rpType 为数值或名称（名称通过 queryMatrixItemsStatus 的 reqPriority/reqType 解析）。
 */

import {
  handleMatrixResponse,
  resolveProjectId,
  resolveSprintIds,
  resolveItemStatusValueByName,
  extractMatrixResultList,
  isVerbose
} from './matrix-api.ts'

const REQUIREMENT_LIST_BASE =
  'https://matrix.17usoft.com/api/pool/project/new/search'

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

function isStrictPositiveIntString(s: string): boolean {
  const n = parseInt(s, 10)
  return !Number.isNaN(n) && String(n) === s.trim() && n > 0
}

/** 解析为 number[]（全为数字）或 string[]（含非数字，如项目名/迭代名） */
function parseIdOrNameArray(s: string | null): number[] | string[] | undefined {
  if (s == null || s === '') return undefined
  const raw = s.trim()
  const parts = raw
    .split(',')
    .map(p => p.trim())
    .filter(Boolean)
  if (parts.length === 0) return undefined
  const allNumeric = parts.every(p => isStrictPositiveIntString(p))
  if (allNumeric) return parts.map(p => parseInt(p, 10))
  return parts
}

export interface QueryProjectRequirementsArgs {
  page: number
  pageSize: number
  /** 任务所属项目 id，支持数字数组或字符串数组（项目名，通过 queryMatrixProjects 解析） */
  projectId: string
  /** 所属迭代 id，支持数字数组或字符串数组（迭代名，通过 queryMatrixProjectSprints 解析） */
  sIds?: number[] | string[]
  creator?: string
  requireName?: string
  id?: number
  /** 需求优先级：数值直接使用，字符串名通过 queryMatrixItemsStatus 的 reqPriority 解析 */
  priority?: number | string
  demander?: string
  proposer?: string
  /** 需求类型：数值直接使用，字符串名通过 queryMatrixItemsStatus 的 reqType 解析 */
  rpType?: number | string
}

/** 从 argv 解析 queryMatrixProjectRequirements 参数：page 默认 1，pageSize 默认 10，projectId 必填 */
export function getQueryProjectRequirementsArgsFromArgv(): QueryProjectRequirementsArgs {
  const pageStr = getArgFromArgv('page')
  const pageSizeStr = getArgFromArgv('pageSize')
  const projectIdStr = getArgFromArgv('projectId')
  const page = pageStr != null ? parseInt(pageStr, 10) : NaN
  const pageSize = pageSizeStr != null ? parseInt(pageSizeStr, 10) : NaN

  if (projectIdStr == null || projectIdStr === '') {
    console.error(
      '错误: queryMatrixProjectRequirements 需要 --projectId=项目id或名称 可通过 queryMatrixProjects 按名称查询）'
    )
    process.exit(1)
  }

  const idStr = getArgFromArgv('id')
  let id: number | undefined
  if (idStr != null && idStr !== '') {
    const n = parseInt(idStr, 10)
    if (!Number.isNaN(n)) id = n
  }

  const priorityStr = getArgFromArgv('priority')
  let priority: number | string | undefined
  if (priorityStr != null && priorityStr !== '') {
    const n = parseInt(priorityStr, 10)
    priority =
      !Number.isNaN(n) && String(n) === priorityStr.trim()
        ? n
        : priorityStr.trim()
  }

  const rpTypeStr = getArgFromArgv('rpType')
  let rpType: number | string | undefined
  if (rpTypeStr != null && rpTypeStr !== '') {
    const n = parseInt(rpTypeStr, 10)
    rpType =
      !Number.isNaN(n) && String(n) === rpTypeStr.trim() ? n : rpTypeStr.trim()
  }

  const sIdsRaw = getArgFromArgv('sIds')
  const sIds =
    sIdsRaw != null && sIdsRaw !== '' ? parseIdOrNameArray(sIdsRaw) : undefined

  return {
    page: Number.isNaN(page) ? 1 : page,
    pageSize: Number.isNaN(pageSize) ? 10 : pageSize,
    projectId: projectIdStr,
    sIds,
    creator: getArgFromArgv('creator') ?? undefined,
    requireName: getArgFromArgv('requireName') ?? undefined,
    id,
    priority,
    demander: getArgFromArgv('demander') ?? undefined,
    proposer: getArgFromArgv('proposer') ?? undefined,
    rpType
  }
}
/** 从单条记录中取 id、projectName（兼容 id/projectId、projectName/name） */
function formatRow(
  item: unknown
): {
  id: number
  name: string
  projectName: string
  sprintName: string
} | null {
  const o = item as Record<string, unknown>
  const id = o.id
  const idNum = typeof id === 'number' ? id : parseInt(String(id), 10)
  const name = (o.requireName ?? o.name ?? '').toString().trim()
  const projectName = (o.projectName ?? '').toString().trim() || '(无名称)'
  const sprintName = (o.sprintName ?? '').toString().trim() || '(无名称)'
  if (Number.isNaN(idNum)) return null
  return { id: idNum, name: name || '(无名称)', projectName, sprintName }
}
/** 查询项目内/迭代内需求列表：POST /api/task/list/:page/:pageSize；projectId/sIds 为字符串时自动解析为 id */
export async function queryMatrixProjectRequirements(
  accessToken: string,
  args: QueryProjectRequirementsArgs
): Promise<void> {
  const projectId = await resolveProjectId(accessToken, args.projectId)
  if (projectId == null || projectId === 0) {
    console.error('错误: projectId 解析后为空')
    process.exit(1)
  }

  let sIdsResolved: number[] | undefined
  if (args.sIds != null && args.sIds.length > 0) {
    sIdsResolved = await resolveSprintIds(accessToken, projectId!, args.sIds)
  }

  let priorityVal: number | string | undefined = args.priority
  if (typeof args.priority === 'string' && args.priority !== '') {
    priorityVal = (await resolveItemStatusValueByName(
      accessToken,
      'reqPriority',
      args.priority
    )) as number
  }

  let rpTypeVal: number | string | undefined = args.rpType
  if (typeof args.rpType === 'string' && args.rpType !== '') {
    rpTypeVal = (await resolveItemStatusValueByName(
      accessToken,
      'reqType',
      args.rpType
    )) as number | string
  }

  const url = `${REQUIREMENT_LIST_BASE}/${args.page}/${args.pageSize}`
  const body: Record<string, unknown> = { projectId: projectId }
  if (sIdsResolved != null && sIdsResolved.length > 0) body.sIds = sIdsResolved
  if (args.creator != null && args.creator !== '') body.creator = args.creator
  if (args.requireName != null && args.requireName !== '')
    body.requireName = args.requireName
  if (args.id != null) body.id = args.id
  if (priorityVal != null) body.priority = priorityVal
  if (args.demander != null && args.demander !== '')
    body.demander = args.demander
  if (args.proposer != null && args.proposer !== '')
    body.proposer = args.proposer
  if (rpTypeVal != null) body.rpType = rpTypeVal

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
  const data = await handleMatrixResponse(res, '/api/pool/project/new/search')
  const list = extractMatrixResultList(data)
  const rows = list
    .map(formatRow)
    .filter(
      (
        r
      ): r is {
        id: number
        name: string
        projectName: string
        sprintName: string
      } => r != null
    )
  if (isVerbose()) {
    console.log('\ndata.result 简化结果：')
    for (const r of rows) {
      console.log(
        `  id: ${r.id}, name: ${r.name}, projectName: ${r.projectName}, sprintName: ${r.sprintName}`
      )
    }
  }
}
