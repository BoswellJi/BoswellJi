/**
 * 缺陷多维度查询，子命令 queryMatrixBugs（仅「与我相关」：不可关闭）。
 * 接口：POST /api/bug/selectAllBugWithPage/:page/:pageSize
 * 从 getLoginUser 取「姓名-工号」，依次按 assigner（待我处理）/ creator（我创建）/ owner（我负责）各查一页并分别输出。
 * 可选 --assigner/--creator/--owner 覆盖对应维度的查询人（逗号分隔多人）；**须包含当前登录用户「姓名-工号」**，否则报错。未传某维度时该维度仍用本人。
 * 不支持关闭与我相关（若传 --relatedToMe=0 则报错）。
 * projectIds/sIds/statusCondition 支持逗号分隔；字符串按 matrix-api 解析；levels/priority 可为数字或名称（bugLevel/bugPriority）。
 */

import {
  handleMatrixResponse,
  extractMatrixResultList,
  resolveProjectIds,
  resolveSprintIds,
  resolveItemStatusValueByName,
  isVerbose
} from './matrix-api.ts'
import { fetchLoginUserNameJob } from './get-login-user.ts'
import {
  getArgFromArgv,
  parseIdOrNameArray,
  parseCodeOrNameArray,
  resolveCodeOrNameArray
} from './parse-arg.ts'

const BUG_SELECT_PAGE_BASE =
  'https://matrix.17usoft.com/api/bug/selectAllBugWithPage'

function parseCommaStringList(s: string | null): string[] | undefined {
  if (s == null || s === '') return undefined
  const parts = s
    .split(',')
    .map(p => p.trim())
    .filter(Boolean)
  return parts.length ? parts : undefined
}

/** 严重程度：全非负整数则为 number[]，否则按 bugLevel 名称解析 */
function parseLevelsArray(s: string | null): number[] | string[] | undefined {
  return parseCodeOrNameArray(s)
}

export interface QueryBugsArgs {
  page: number
  pageSize: number
  startCreateTime?: string
  endCreateTime?: string
  bugName?: string
  bSolvers?: string[]
  levels?: number[] | string[]
  /** 解析后的缺陷优先级码（接口 body） */
  priority?: number
  statusCondition?: number[] | string[]
  projectIds?: number[] | string[]
  sIds?: number[] | string[]
  startCompletionTime?: string
  endCompletionTime?: string
  startWaitVerificationTime?: string
  startRealResolveTime?: string
  /**
   * 覆盖对应维度的 POST body 人字段（assigner/creator/owner）；逗号分隔表示多人。
   * 若设置则**须包含当前登录用户「姓名-工号」**；未设置则该维度使用本人。
   */
  assigner?: string
  creator?: string
  owner?: string
}

export type QueryBugsArgsFromArgv = QueryBugsArgs & { priorityStr?: string }

export type GetQueryBugsArgsFromArgvOptions = {
  /**
   * 为 true 时不从 argv 读取 --assigner/--creator/--owner（用于与其它子命令共用 argv 时避免与同名参数冲突，如 updateMatrixBugStatus 的 --assigner 表示状态变更受理人）。
   */
  omitPersonOverrides?: boolean
}

export function getQueryBugsArgsFromArgv(
  options?: GetQueryBugsArgsFromArgvOptions
): QueryBugsArgsFromArgv {
  const rel = getArgFromArgv('relatedToMe')
  if (rel != null && rel !== '') {
    const off =
      rel === '0' || rel.toLowerCase() === 'false' || rel.toLowerCase() === 'no'
    if (off) {
      console.error(
        '错误: queryMatrixBugs 仅支持查询与当前登录用户相关的缺陷，不能关闭（请勿使用 --relatedToMe=0）'
      )
      process.exit(1)
    }
  }
  const pageStr = getArgFromArgv('page')
  const pageSizeStr = getArgFromArgv('pageSize')
  const page = pageStr != null ? parseInt(pageStr, 10) : NaN
  const pageSize = pageSizeStr != null ? parseInt(pageSizeStr, 10) : NaN

  return {
    page: Number.isNaN(page) ? 1 : page,
    pageSize: Number.isNaN(pageSize) ? 20 : pageSize,
    startCreateTime: getArgFromArgv('startCreateTime') ?? undefined,
    endCreateTime: getArgFromArgv('endCreateTime') ?? undefined,
    bugName: getArgFromArgv('bugName') ?? undefined,
    bSolvers: parseCommaStringList(getArgFromArgv('bSolvers')),
    levels: parseLevelsArray(getArgFromArgv('levels')),
    priorityStr: getArgFromArgv('priority') ?? undefined,
    statusCondition: parseCodeOrNameArray(getArgFromArgv('statusCondition')),
    projectIds: parseIdOrNameArray(getArgFromArgv('projectIds')),
    sIds: parseIdOrNameArray(getArgFromArgv('sIds')),
    startCompletionTime: getArgFromArgv('startCompletionTime') ?? undefined,
    endCompletionTime: getArgFromArgv('endCompletionTime') ?? undefined,
    startWaitVerificationTime:
      getArgFromArgv('startWaitVerificationTime') ?? undefined,
    startRealResolveTime: getArgFromArgv('startRealResolveTime') ?? undefined,
    assigner: options?.omitPersonOverrides
      ? undefined
      : trimArg(getArgFromArgv('assigner')),
    creator: options?.omitPersonOverrides
      ? undefined
      : trimArg(getArgFromArgv('creator')),
    owner: options?.omitPersonOverrides
      ? undefined
      : trimArg(getArgFromArgv('owner'))
  }
}

function trimArg(s: string | null): string | undefined {
  if (s == null || s.trim() === '') return undefined
  return s.trim()
}

function formatBugRow(item: unknown): {
  id: number
  bugName: string
  projectName: string
  sprintName: string
  creator: string
  assigner: string
  owner: string
} | null {
  const o = item as Record<string, unknown>
  const id = o.id
  const idNum = typeof id === 'number' ? id : parseInt(String(id), 10)
  const bugName = (o.bugName ?? o.name ?? '').toString().trim()
  const projectName = (o.projectName ?? '').toString().trim() || '(无)'
  const sprintName = (o.sprintName ?? '').toString().trim() || '(无)'
  const creator = (o.creator ?? '').toString().trim() || '(无)'
  const assigner = (o.assigner ?? '').toString().trim() || '(无)'
  const owner = (o.owner ?? '').toString().trim() || '(无)'
  if (Number.isNaN(idNum)) return null
  return {
    id: idNum,
    bugName: bugName || '(无名称)',
    projectName,
    sprintName,
    creator,
    assigner,
    owner
  }
}

async function resolveBugLevels(
  accessToken: string,
  items: number[] | string[] | undefined
): Promise<number[] | undefined> {
  if (items == null || items.length === 0) return undefined
  const resolved = await Promise.all(
    items.map(async v => {
      if (typeof v === 'number') return v
      const trimmed = String(v).trim()
      const asNum = parseInt(trimmed, 10)
      if (trimmed !== '' && !Number.isNaN(asNum) && String(asNum) === trimmed)
        return asNum
      const code = await resolveItemStatusValueByName(
        accessToken,
        'bugLevel',
        trimmed
      )
      return typeof code === 'number' ? code : parseInt(String(code), 10)
    })
  )
  return resolved
}

async function resolveBugPriorityNumber(
  accessToken: string,
  raw: string | undefined
): Promise<number | undefined> {
  if (raw == null || raw === '') return undefined
  const trimmed = raw.trim()
  const asNum = parseInt(trimmed, 10)
  if (!Number.isNaN(asNum) && String(asNum) === trimmed) return asNum
  const code = await resolveItemStatusValueByName(
    accessToken,
    'bugPriority',
    trimmed
  )
  return typeof code === 'number' ? code : parseInt(String(code), 10)
}

type PersonField = 'assigner' | 'creator' | 'owner'

/** 校验覆盖人字段须包含当前用户（逗号分隔逐项精确匹配「姓名-工号」） */
function assertPersonOverrideIncludesMe(
  field: PersonField,
  raw: string,
  currentUserNameJob: string
): void {
  const parts = raw
    .split(',')
    .map(p => p.trim())
    .filter(Boolean)
  if (parts.length === 0) return
  if (parts.some(p => p === currentUserNameJob)) return
  console.error(
    `错误: --${field} 须包含当前登录用户「${currentUserNameJob}」，已传：${raw}`
  )
  process.exit(1)
}

function assertAllPersonOverridesIncludeMe(
  args: QueryBugsArgs,
  currentUserNameJob: string
): void {
  if (args.assigner)
    assertPersonOverrideIncludesMe(
      'assigner',
      args.assigner,
      currentUserNameJob
    )
  if (args.creator)
    assertPersonOverrideIncludesMe('creator', args.creator, currentUserNameJob)
  if (args.owner)
    assertPersonOverrideIncludesMe('owner', args.owner, currentUserNameJob)
}

/** 该维度写入接口的 assigner/creator/owner 字符串：有覆盖用覆盖（已校验含本人），否则用本人 */
function personValueForField(
  field: PersonField,
  args: QueryBugsArgs,
  currentUserNameJob: string
): string {
  const raw =
    field === 'assigner'
      ? args.assigner
      : field === 'creator'
        ? args.creator
        : args.owner
  if (raw != null && raw.trim() !== '') {
    return raw
      .split(',')
      .map(p => p.trim())
      .filter(Boolean)
      .join(',')
  }
  return currentUserNameJob
}

async function buildBugQueryBody(
  accessToken: string,
  args: QueryBugsArgs,
  person: { field: PersonField; value: string }
): Promise<Record<string, unknown>> {
  let resolvedProjectIds: number[] | undefined
  if (args.projectIds != null && args.projectIds.length > 0) {
    resolvedProjectIds = await resolveProjectIds(accessToken, args.projectIds)
  }

  let resolvedSIds: number[] | undefined
  if (args.sIds != null && args.sIds.length > 0) {
    if (typeof args.sIds[0] === 'string') {
      if (resolvedProjectIds == null || resolvedProjectIds.length === 0) {
        throw new Error('sIds 为迭代名称时需同时指定 projectIds')
      }
      resolvedSIds = await resolveSprintIds(
        accessToken,
        resolvedProjectIds[0]!,
        args.sIds
      )
    } else {
      resolvedSIds = args.sIds as number[]
    }
  }

  let resolvedStatus: number[] | undefined
  if (args.statusCondition != null && args.statusCondition.length > 0) {
    resolvedStatus = await resolveCodeOrNameArray(args.statusCondition, name =>
      resolveItemStatusValueByName(accessToken, 'bugStatus', name)
    )
  }

  let resolvedLevels: number[] | undefined
  if (args.levels != null && args.levels.length > 0) {
    resolvedLevels = await resolveBugLevels(accessToken, args.levels)
  }

  const priorityStr = (args as QueryBugsArgsFromArgv).priorityStr
  const priorityNum =
    args.priority !== undefined
      ? args.priority
      : await resolveBugPriorityNumber(accessToken, priorityStr)

  const body: Record<string, unknown> = {}
  if (args.startCreateTime) body.startCreateTime = args.startCreateTime
  if (args.endCreateTime) body.endCreateTime = args.endCreateTime
  if (args.bugName) body.bugName = args.bugName
  body[person.field] = person.value
  if (args.bSolvers != null && args.bSolvers.length > 0)
    body.bSolvers = args.bSolvers
  if (resolvedLevels != null && resolvedLevels.length > 0)
    body.levels = resolvedLevels
  if (priorityNum != null) body.priority = priorityNum
  if (resolvedStatus != null && resolvedStatus.length > 0)
    body.statusCondition = resolvedStatus
  if (resolvedProjectIds != null && resolvedProjectIds.length > 0)
    body.projectIds = resolvedProjectIds
  if (resolvedSIds != null && resolvedSIds.length > 0) body.sIds = resolvedSIds
  if (args.startCompletionTime)
    body.startCompletionTime = args.startCompletionTime
  if (args.endCompletionTime) body.endCompletionTime = args.endCompletionTime
  if (args.startWaitVerificationTime)
    body.startWaitVerificationTime = args.startWaitVerificationTime
  if (args.startRealResolveTime)
    body.startRealResolveTime = args.startRealResolveTime

  return body
}

async function postSelectBugs(
  accessToken: string,
  page: number,
  pageSize: number,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const url = `${BUG_SELECT_PAGE_BASE}/${page}/${pageSize}`
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
  return handleMatrixResponse(res, 'bug/selectAllBugWithPage')
}

function printBugRowsVerbose(list: unknown[], label?: string): void {
  const rows = list
    .map(formatBugRow)
    .filter((r): r is NonNullable<typeof r> => r != null)
  if (label) console.log(`\n${label}`)
  if (isVerbose()) {
    console.log('\ndata.result 简化结果：')
    for (const r of rows) {
      console.log(
        `  id: ${r.id}, bugName: ${r.bugName}, projectName: ${r.projectName}, sprintName: ${r.sprintName}, creator: ${r.creator}, assigner: ${r.assigner}, owner: ${r.owner}`
      )
    }
  }
}

/** 与我相关的缺陷摘要（用于未指定 bugId 时列出候选，供用户选择 id）；dimension 为首次出现的查询维度 */
export type RelatedBugRow = {
  id: number
  bugName: string
  projectName: string
  sprintName: string
  creator: string
  assigner: string
  owner: string
  dimension: PersonField
}

/**
 * 与 queryMatrixBugs 相同筛选，合并 assigner/creator/owner 三维度结果并按 id 去重（优先保留先出现的维度顺序：待我处理 > 我创建 > 我负责）。
 */
export async function fetchRelatedBugsForPick(
  accessToken: string,
  args: QueryBugsArgsFromArgv
): Promise<RelatedBugRow[]> {
  const nameJob = await fetchLoginUserNameJob(accessToken)
  assertAllPersonOverridesIncludeMe(args, nameJob)

  let priorityResolved: number | undefined
  if (args.priorityStr != null && args.priorityStr !== '') {
    priorityResolved = await resolveBugPriorityNumber(
      accessToken,
      args.priorityStr
    )
  }

  const base: QueryBugsArgsFromArgv = {
    page: args.page,
    pageSize: args.pageSize,
    startCreateTime: args.startCreateTime,
    endCreateTime: args.endCreateTime,
    bugName: args.bugName,
    bSolvers: args.bSolvers,
    levels: args.levels,
    priority: priorityResolved,
    statusCondition: args.statusCondition,
    projectIds: args.projectIds,
    sIds: args.sIds,
    startCompletionTime: args.startCompletionTime,
    endCompletionTime: args.endCompletionTime,
    startWaitVerificationTime: args.startWaitVerificationTime,
    startRealResolveTime: args.startRealResolveTime,
    assigner: args.assigner,
    creator: args.creator,
    owner: args.owner
  }

  const dimensions: PersonField[] = ['assigner', 'creator', 'owner']
  const seen = new Set<number>()
  const out: RelatedBugRow[] = []

  for (const field of dimensions) {
    const personValue = personValueForField(field, base, nameJob)
    const body = await buildBugQueryBody(accessToken, base, {
      field,
      value: personValue
    })
    const data = await postSelectBugs(
      accessToken,
      args.page,
      args.pageSize,
      body
    )
    const list = extractMatrixResultList(data)
    for (const item of list) {
      const r = formatBugRow(item)
      if (!r) continue
      if (seen.has(r.id)) continue
      seen.add(r.id)
      out.push({ ...r, dimension: field })
    }
  }

  return out
}

export async function queryMatrixBugs(
  accessToken: string,
  args: QueryBugsArgsFromArgv
): Promise<void> {
  let nameJob: string
  try {
    nameJob = await fetchLoginUserNameJob(accessToken)
  } catch (e) {
    console.error('错误:', e instanceof Error ? e.message : e)
    process.exit(1)
    throw e
  }
  assertAllPersonOverridesIncludeMe(args, nameJob)

  let priorityResolved: number | undefined
  if (args.priorityStr != null && args.priorityStr !== '') {
    priorityResolved = await resolveBugPriorityNumber(
      accessToken,
      args.priorityStr
    )
  }

  const base: QueryBugsArgsFromArgv = {
    page: args.page,
    pageSize: args.pageSize,
    startCreateTime: args.startCreateTime,
    endCreateTime: args.endCreateTime,
    bugName: args.bugName,
    bSolvers: args.bSolvers,
    levels: args.levels,
    priority: priorityResolved,
    statusCondition: args.statusCondition,
    projectIds: args.projectIds,
    sIds: args.sIds,
    startCompletionTime: args.startCompletionTime,
    endCompletionTime: args.endCompletionTime,
    startWaitVerificationTime: args.startWaitVerificationTime,
    startRealResolveTime: args.startRealResolveTime,
    assigner: args.assigner,
    creator: args.creator,
    owner: args.owner
  }

  const dimensions: { field: PersonField; title: string }[] = [
    { field: 'assigner', title: '=== 待我处理的缺陷（assigner）===' },
    { field: 'creator', title: '=== 我创建的缺陷（creator）===' },
    { field: 'owner', title: '=== 我负责的缺陷（owner）===' }
  ]

  for (const { field, title } of dimensions) {
    const personValue = personValueForField(field, base, nameJob)
    const body = await buildBugQueryBody(accessToken, base, {
      field,
      value: personValue
    })
    const data = await postSelectBugs(
      accessToken,
      args.page,
      args.pageSize,
      body
    )
    const list = extractMatrixResultList(data)
    printBugRowsVerbose(list, title)
  }
}
