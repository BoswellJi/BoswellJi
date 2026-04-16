/**
 * Matrix API 公用层：响应校验（handleMatrixResponse）、列表结果抽取（extractMatrixResultList）、
 * 按名称解析 projectId/sprintId/requirementId（resolve*；createMatrixBug 使用 exactNameMatchOnly 强制 projectName/sprintName 精确匹配）、custom-status 枚举 name→value（resolveItemStatusValueByName；queryMatrixBugs 的 bugStatus/bugLevel/bugPriority 等同理）、
 * 以及认证请求 fetchMatrixJson。各子命令脚本依赖本模块。
 */

export type MatrixResponse = {
  code?: string
  message?: string
  [k: string]: unknown
}

/** 是否开启 verbose 调试（matrix 入口解析 --verbose 后设置 MATRIX_VERBOSE=1）；默认关闭，开启时各子命令可打印 data.result 等调试信息 */
export function isVerbose(): boolean {
  return process.env['MATRIX_VERBOSE'] === '1'
}

/** 列表类接口 base URL（与各 query 子命令一致） */
const PROJECT_LIST_BASE = 'https://matrix.17usoft.com/api/project/list'
const SPRINTS_LIST_BASE = 'https://matrix.17usoft.com/api/sprints/list'
const REQUIREMENT_SEARCH_BASE =
  'https://matrix.17usoft.com/api/pool/project/new/search'
/** custom-status/items 与 queryMatrixItemsStatus 一致 */
const CUSTOM_STATUS_ITEMS_URL =
  'https://matrix.17usoft.com/api/project/custom-status/items'

/**
 * 从 Matrix 列表类接口成功响应体中取出记录数组（code=0000 后的 payload）。
 * 统一解析 data.data.result、data.result，并回退 data.data.list / data.list / records，
 * 供 project/list、sprints/list、pool/project/new/search 等基于 name 查询后的参数转换复用。
 */
export function extractMatrixResultList(
  data: Record<string, unknown>
): unknown[] {
  const d = data.data as Record<string, unknown> | undefined
  if (d && Array.isArray(d.result)) return d.result
  // bug/selectAllBugWithPage：data.data 为 { pageNum, rowNum, totalNum, data: { result: [...] } }
  if (
    d &&
    d.data != null &&
    typeof d.data === 'object' &&
    !Array.isArray(d.data)
  ) {
    const inner = d.data as Record<string, unknown>
    if (Array.isArray(inner.result)) return inner.result
    if (Array.isArray(inner.list)) return inner.list
  }
  if (Array.isArray(data.result)) return data.result
  if (d && Array.isArray(d.list)) return d.list
  if (Array.isArray(data.list)) return data.list
  if (d && Array.isArray(d.records)) return d.records
  if (Array.isArray(data.records)) return data.records
  return []
}

/**
 * 处理 Matrix 接口响应：HTTP 非 2xx 或 body.code !== "0000" 时打日志并 process.exit(1)；
 * 成功时打印「成功。<apiName> 返回结果:」及 JSON。
 */
export async function handleMatrixResponse(
  res: Response,
  apiName: string
): Promise<Record<string, unknown>> {
  if (!res.ok) {
    console.error(`失败: ${apiName} 返回状态码`, res.status)
    process.exit(1)
  }
  const text = await res.text()
  let data: MatrixResponse
  try {
    data = JSON.parse(text) as MatrixResponse
  } catch {
    console.error('res.json 解析失败，原始 body:', text)
    throw new Error('响应体不是合法 JSON')
  }
  if (data?.code !== '0000') {
    console.error('失败:', apiName, '返回 code=', data?.code ?? '(无)', data)
    process.exit(1)
  }
  console.log('matrix api 执行成功,完整返回结果如下:', apiName)
  console.log('data:', JSON.stringify(data, null, 2))

  return data
}

// ---------- 内部：认证请求，不打印，供 resolve 方法复用 ----------
function defaultHeaders(accessToken: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'accept-encoding': 'identity',
    Accept: '*/*',
    Cookie: `access_token=${accessToken}`
  }
}

/** 发起请求并解析 JSON，校验 code=0000，不打印；失败抛错 */
export async function fetchMatrixJson(
  accessToken: string,
  url: string,
  init: RequestInit
): Promise<Record<string, unknown>> {
  if (isVerbose()) {
    console.log('[verbose] fetch url:', url)
    if (init.body != null)
      console.log(
        '[verbose] fetch body:',
        typeof init.body === 'string' ? init.body : '[RequestInit]'
      )
  }
  const res = await fetch(url, {
    ...init,
    headers: {
      ...defaultHeaders(accessToken),
      ...(init.headers as Record<string, string>)
    },
    signal: AbortSignal.timeout(15000)
  })
  if (!res.ok) throw new Error(`请求失败 HTTP ${res.status}`)
  const data = (await res.json()) as Record<string, unknown>
  if (data?.code !== '0000')
    throw new Error(`接口返回 code=${data?.code ?? '(无)'}`)
  return data
}

function isStrictPositiveIntString(s: string): boolean {
  const n = parseInt(s, 10)
  return !Number.isNaN(n) && String(n) === s.trim() && n > 0
}

function parseIdFromItem(item: unknown, idKeys: string[]): number | null {
  const o = item as Record<string, unknown>
  for (const k of idKeys) {
    const v = o[k]
    if (v == null) continue
    const n = typeof v === 'number' ? v : parseInt(String(v), 10)
    if (!Number.isNaN(n)) return n
  }
  return null
}

function parseNameFromItem(item: unknown, nameKeys: string[]): string {
  const o = item as Record<string, unknown>
  for (const k of nameKeys) {
    const v = o[k]
    if (v != null && typeof v === 'string') return v.trim()
  }
  return ''
}

// ---------- 1. 按 projectName 查询 projectId ----------

export type ResolveProjectIdOptions = {
  /**
   * 为 true 时：字符串仅当与 queryMatrixProjects（POST project/list）返回记录的 projectName 完全一致时采纳；
   * 不存在精确匹配或存在多条同名则报错（不允许「仅一条模糊命中」的兜底）。
   */
  exactNameMatchOnly?: boolean
}

/**
 * 按名称 projectName 解析为 projectId。数字字符串直接转数字；否则走 project/list 按 projectName 查询，结果不唯一或不存在则报错。
 */
export async function resolveProjectId(
  accessToken: string,
  projectIdOrName: string,
  options?: ResolveProjectIdOptions
): Promise<number> {
  const trimmed = projectIdOrName.trim()
  const exactOnly = options?.exactNameMatchOnly === true

  if (isStrictPositiveIntString(trimmed)) return parseInt(trimmed, 10)

  const url = `${PROJECT_LIST_BASE}/1/10`
  const data = await fetchMatrixJson(accessToken, url, {
    method: 'POST',
    body: JSON.stringify({ projectName: trimmed })
  })
  const list = extractMatrixResultList(data)
  const projects = list
    .map(item => {
      const id = parseIdFromItem(item, ['id', 'projectId'])
      const name = parseNameFromItem(item, ['projectName', 'name'])
      return id != null && name !== '' ? { id, name } : null
    })
    .filter((x): x is { id: number; name: string } => x != null)

  const exact = projects.filter(p => p.name === trimmed)
  if (exact.length === 1) return exact[0]!.id
  if (exact.length > 1) {
    throw new Error(
      `按项目名称「${trimmed}」精确匹配到多条，请使用数字 projectId 或通过 queryMatrixProjects 确认`
    )
  }
  if (exactOnly) {
    if (projects.length === 0) {
      throw new Error(
        `未找到与项目名「${trimmed}」精确一致的项目，请使用 queryMatrixProjects 核对名称或直接使用数字 projectId`
      )
    }
    throw new Error(
      `项目名「${trimmed}」无精确匹配（返回列表均为模糊相关结果），请使用 queryMatrixProjects 核对完整名称或直接使用数字 projectId`
    )
  }
  if (projects.length === 0) {
    throw new Error(
      `未找到与项目名「${trimmed}」匹配的项目，请使用 queryMatrixProjects 核对或直接使用数字 projectId`
    )
  }
  if (projects.length === 1) return projects[0]!.id
  throw new Error(`按项目名称「${trimmed}」未匹配到唯一项目`)
}

/**
 * 参数 projectIds：若为数字数组则直接返回；若为字符串数组则按 projectName 逐个解析为 projectId，任一不唯一或不存在则报错。
 */
export async function resolveProjectIds(
  accessToken: string,
  projectIds: number[] | string[]
): Promise<number[]> {
  if (!Array.isArray(projectIds) || projectIds.length === 0) return []
  const allNums = (projectIds as (number | string)[]).map(x =>
    typeof x === 'number' ? x : parseInt(String(x).trim(), 10)
  )
  if (allNums.every(n => !Number.isNaN(n))) return allNums as number[]
  return Promise.all(
    (projectIds as string[]).map(name => resolveProjectId(accessToken, name))
  )
}

// ---------- 2. 按 sprintName 查询 sprintId ----------

export type ResolveSprintIdOptions = {
  /**
   * 为 true 时：字符串仅当与 queryMatrixProjectSprints（POST sprints/list）在 sprintName 条件下返回的 sprintName 完全一致时采纳；
   * 不存在精确匹配或存在多条同名则报错（不允许「仅一条模糊命中」的兜底）。
   */
  exactNameMatchOnly?: boolean
}

/**
 * 按名称 sprintName 解析为 sprintId。数字字符串直接转数字；否则走 sprints/list 按 sprintName 查询，结果不唯一或不存在则报错。需传入 projectId。
 */
export async function resolveSprintId(
  accessToken: string,
  projectId: number,
  sprintIdOrName: string,
  options?: ResolveSprintIdOptions
): Promise<number> {
  const trimmed = sprintIdOrName.trim()
  const exactOnly = options?.exactNameMatchOnly === true
  const asNum = parseInt(trimmed, 10)
  if (!Number.isNaN(asNum) && String(asNum) === trimmed) return asNum

  const url = `${SPRINTS_LIST_BASE}/1/5`
  const data = await fetchMatrixJson(accessToken, url, {
    method: 'POST',
    body: JSON.stringify({ projectId, sprintName: trimmed })
  })
  const list = extractMatrixResultList(data)
  const sprints = list
    .map(item => {
      const id = parseIdFromItem(item, ['id', 'sprintId'])
      const name = parseNameFromItem(item, ['sprintName', 'name'])
      return id != null && name !== '' ? { id, name } : null
    })
    .filter((x): x is { id: number; name: string } => x != null)

  const exact = sprints.filter(s => s.name === trimmed)
  if (exact.length === 1) return exact[0]!.id
  if (exact.length > 1) {
    throw new Error(
      `按迭代名称「${trimmed}」精确匹配到多条，请使用数字 sprintId 或通过 queryMatrixProjectSprints 确认`
    )
  }
  if (exactOnly) {
    if (sprints.length === 0) {
      throw new Error(
        `项目 ${projectId} 下未找到与迭代名「${trimmed}」精确一致的迭代，请使用 queryMatrixProjectSprints 核对名称或直接使用数字 sprintId`
      )
    }
    throw new Error(
      `迭代名「${trimmed}」无精确匹配（返回列表均为模糊相关结果），请使用 queryMatrixProjectSprints 核对完整名称或直接使用数字 sprintId`
    )
  }
  if (sprints.length === 0) {
    throw new Error(
      `项目 ${projectId} 下未找到与迭代名「${trimmed}」匹配的迭代，请使用 queryMatrixProjectSprints 核对或直接使用数字 sprintId`
    )
  }
  if (sprints.length === 1) return sprints[0]!.id
  throw new Error(`按迭代名称「${trimmed}」未匹配到唯一迭代`)
}

/**
 * 参数 sIds：若为数字数组则直接返回；若为字符串数组则按 sprintName 逐个解析为 sprintId，任一不唯一或不存在则报错。需传入 projectId。
 */
export async function resolveSprintIds(
  accessToken: string,
  projectId: number,
  sIds: number[] | string[]
): Promise<number[]> {
  if (!Array.isArray(sIds) || sIds.length === 0) return []
  const allNums = (sIds as (number | string)[]).map(x =>
    typeof x === 'number' ? x : parseInt(String(x).trim(), 10)
  )
  if (allNums.every(n => !Number.isNaN(n))) return allNums as number[]
  return Promise.all(
    (sIds as string[]).map(name =>
      resolveSprintId(accessToken, projectId, name)
    )
  )
}

// ---------- 3. 按 requireName 查询 requirementId ----------

/**
 * 按名称 requireName 解析为 requirementId。数字字符串直接转数字；否则走 pool/project/new/search 按 requireName 查询，结果不唯一或不存在则报错。需传入 projectId。
 */
export async function resolveRequirementId(
  accessToken: string,
  projectId: number,
  requirementIdOrName: string
): Promise<number> {
  const trimmed = requirementIdOrName.trim()
  if (isStrictPositiveIntString(trimmed)) return parseInt(trimmed, 10)

  const url = `${REQUIREMENT_SEARCH_BASE}/1/5`
  const data = await fetchMatrixJson(accessToken, url, {
    method: 'POST',
    body: JSON.stringify({ projectId, requireName: trimmed })
  })
  const list = extractMatrixResultList(data)
  const reqs = list
    .map(item => {
      const id = parseIdFromItem(item, ['id', 'requirementId'])
      const name = parseNameFromItem(item, ['requireName', 'name', 'title'])
      return id != null && name !== '' ? { id, name } : null
    })
    .filter((x): x is { id: number; name: string } => x != null)

  const exact = reqs.filter(r => r.name === trimmed)
  if (exact.length === 1) return exact[0]!.id
  if (exact.length > 1) {
    throw new Error(
      `按需求名称「${trimmed}」查询到多条，请使用数字 requirementId 或通过 queryMatrixProjectRequirements 确认`
    )
  }
  if (reqs.length === 0) {
    throw new Error(
      `项目 ${projectId} 下未找到与需求名「${trimmed}」匹配的需求，请使用 queryMatrixProjectRequirements 核对或直接使用数字 requirementId`
    )
  }
  if (reqs.length === 1) return reqs[0]!.id
  throw new Error(`按需求名称「${trimmed}」未匹配到唯一需求`)
}

/**
 * 参数 requirementIds：若为数字数组则直接返回；若为字符串数组则按 requireName 逐个解析为 requirementId，任一不唯一或不存在则报错。需传入 projectId。
 */
export async function resolveRequirementIds(
  accessToken: string,
  projectId: number,
  requirementIds: number[] | string[]
): Promise<number[]> {
  if (!Array.isArray(requirementIds) || requirementIds.length === 0) return []
  const allNums = (requirementIds as (number | string)[]).map(x =>
    typeof x === 'number' ? x : parseInt(String(x).trim(), 10)
  )
  if (allNums.every(n => !Number.isNaN(n))) return allNums as number[]
  return Promise.all(
    (requirementIds as string[]).map(name =>
      resolveRequirementId(accessToken, projectId, name)
    )
  )
}

// ---------- 4. 基于 queryMatrixItemsStatus 的 name→value（枚举 code） ----------

/** custom-status/items 中用于按 name 查 value 的字段名 */
export type ItemStatusField =
  | 'sprintStatus'
  | 'reqPriority'
  | 'reqStatus'
  | 'reqType'
  | 'taskPriority'
  | 'taskTypeMap'
  | 'taskStatus'
  | 'bugPriority'
  | 'bugStatus'
  | 'bugLevel'
  | 'bugEnvironment'
  | 'bugType'

function getMapFromItemsData(
  data: Record<string, unknown>,
  field: ItemStatusField
): Record<string, string> | null {
  const d = data.data as Record<string, unknown> | undefined
  const raw =
    (data[field] as Record<string, string> | undefined) ??
    (d?.[field] as Record<string, string> | undefined) ??
    (data[field + 'Map'] as Record<string, string> | undefined) ??
    (d?.[field + 'Map'] as Record<string, string> | undefined)
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(raw)) {
    if (v != null && typeof v === 'string' && v.trim() !== '') out[k] = v.trim()
  }
  return Object.keys(out).length ? out : null
}

/**
 * 基于 custom-status/items 查询指定类型字段，按 name 获取对应的 value（枚举 code）。
 * 若不存在或不唯一则报错，唯一则返回 value（可能是 number 或 string，依接口返回）。
 */
export async function resolveItemStatusValueByName(
  accessToken: string,
  field: ItemStatusField,
  name: string
): Promise<string | number> {
  const trimmed = name.trim()
  if (trimmed === '')
    throw new Error(`resolveItemStatusValueByName 的 name 不能为空`)

  if (isVerbose())
    console.log('[verbose] fetch url:', CUSTOM_STATUS_ITEMS_URL, '(GET)')
  const res = await fetch(CUSTOM_STATUS_ITEMS_URL, {
    method: 'GET',
    headers: defaultHeaders(accessToken),
    signal: AbortSignal.timeout(15000)
  })
  if (!res.ok) throw new Error(`custom-status/items 返回状态码 ${res.status}`)
  const data = (await res.json()) as Record<string, unknown>
  if (data?.code !== '0000')
    throw new Error(`custom-status/items 返回 code=${data?.code ?? '(无)'}`)

  const map = getMapFromItemsData(data, field)
  if (!map) {
    throw new Error(
      `custom-status/items 中未找到字段「${field}」，请使用 queryMatrixItemsStatus 查看`
    )
  }

  const lower = trimmed.toLowerCase()
  const matches: { key: string; name: string }[] = []
  for (const [key, val] of Object.entries(map)) {
    if (val === trimmed || val.toLowerCase() === lower) {
      matches.push({ key, name: val })
    }
  }
  if (matches.length === 0) {
    const byInclude = Object.entries(map).filter(
      ([_, val]) =>
        val.includes(trimmed) ||
        trimmed.includes(val) ||
        val.toLowerCase().includes(lower)
    )
    if (byInclude.length === 1) {
      const num = parseInt(byInclude[0]![0], 10)
      return Number.isNaN(num) ? byInclude[0]![0] : num
    }
    if (byInclude.length > 1) {
      throw new Error(
        `在 ${field} 中按名称「${name}」匹配到多条：${byInclude.map(([k, v]) => `${k}:${v}`).join(', ')}`
      )
    }
    throw new Error(
      `在 ${field} 中未找到与「${name}」对应的项，请使用 queryMatrixItemsStatus 查看`
    )
  }
  if (matches.length > 1) {
    throw new Error(
      `在 ${field} 中按名称「${name}」匹配到多条：${matches.map(m => m.key + ':' + m.name).join(', ')}`
    )
  }
  const key = matches[0]!.key
  const num = parseInt(key, 10)
  return Number.isNaN(num) ? key : num
}
