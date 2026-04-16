/**
 * 任务多维度查询，子命令 queryMatrixTasks（待我处理/我创建的/我开发的/我测试的等）。
 * 接口：POST /api/task/list/:page/:pageSize
 * 用法：matrix -- queryMatrixTasks [--page=1] [--pageSize=10] [--processor=] [--creator=] [--rd=] [--qa=] [--projectIds=] [--sIds=] [--statusCondition=] [--type=] ...
 * processor/creator/rd/qa 为姓名-工号（getLoginUser）；type 为数字或类型名（按 taskTypeMap 解析）。
 * projectIds/sIds/statusCondition 支持逗号分隔数组：数字原样传参，字符串则通过 matrix-api 的 resolveProjectIds、resolveSprintIds、taskStatus 解析为对应 value。
 */

import {
  handleMatrixResponse,
  extractMatrixResultList,
  resolveProjectIds,
  resolveSprintIds,
  resolveItemStatusValueByName,
  isVerbose
} from './matrix-api.ts'
import { getItemsStatusData } from './query-matrix-items-status.ts'
import {
  getArgFromArgv,
  parseIdOrNameArray,
  parseCodeOrNameArray,
  resolveCodeOrNameArray
} from './parse-arg.ts'

const TASK_LIST_BASE = 'https://matrix.17usoft.com/api/task/list'

/** 从 data 中取出 taskTypeMap：map key=code, value=name */
function getTaskTypeList(
  data: Record<string, unknown>
): { code: number; name: string }[] {
  const raw =
    (data.taskTypeMap as Record<string, string> | undefined) ??
    ((data.data as Record<string, unknown> | undefined)?.taskTypeMap as
      | Record<string, string>
      | undefined)
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return []
  return Object.entries(raw)
    .map(([key, value]) => {
      const code = parseInt(key, 10)
      const name = (value ?? '').toString().trim()
      return { code: Number.isNaN(code) ? undefined : code, name }
    })
    .filter(
      (x): x is { code: number; name: string } =>
        x.name !== '' && typeof x.code === 'number'
    )
}

/** 将 type 解析为任务类型码：整型直接返回，字符串从 taskTypeMap 按 name 解析 */
export async function resolveTaskTypeCode(
  accessToken: string,
  typeStr: string
): Promise<number> {
  const trimmed = typeStr.trim()
  const asNum = parseInt(trimmed, 10)
  if (!Number.isNaN(asNum) && String(asNum) === trimmed) return asNum

  const data = (await getItemsStatusData(accessToken)) as Record<
    string,
    unknown
  >
  const list = getTaskTypeList(data)
  const lower = trimmed.toLowerCase()
  const exact = list.find(
    x => x.name === trimmed || x.name.toLowerCase() === lower
  )
  if (exact) return exact.code
  const includes = list.find(
    x =>
      x.name.includes(trimmed) ||
      trimmed.includes(x.name) ||
      x.name.toLowerCase().includes(lower) ||
      lower.includes(x.name.toLowerCase())
  )
  if (includes) return includes.code
  console.error(
    '错误: 未在 custom-status/items 的 taskTypeMap 中按 name 找到与「' +
      trimmed +
      '」匹配的任务类型，请使用数字或 queryMatrixItemsStatus 查看'
  )
  process.exit(1)
  return 0 as never
}

export interface QueryTasksArgs {
  page: number
  pageSize: number
  processor?: string
  /** 项目 id 数组，数字原样；字符串为项目名，通过 resolveProjectIds 解析 */
  projectIds?: number[] | string[]
  /** 任务状态码数组，数字原样；字符串为状态名，通过 taskStatus 解析 */
  statusCondition?: number[] | string[]
  /** 迭代 id 数组，数字原样；字符串为迭代名，通过 resolveSprintIds 解析（需配合 projectIds） */
  sIds?: number[] | string[]
  creator?: string
  cCreateTimeS?: string
  cCreateTimeE?: string
  cExpectFinishTimeE?: string
  cExpectFinishTimeS?: string
  cExpectQaEndTimeE?: string
  cExpectQaEndTimeS?: string
  cRealEndTimeE?: string
  cRealEndTimeS?: string
  cTestEndTimeE?: string
  cTestEndTimeS?: string
  cExpectDeployTimeE?: string
  cExpectDeployTimeS?: string
  cRealDeployTimeE?: string
  cRealDeployTimeS?: string
  rd?: string
  qa?: string
  type?: number
}

export type QueryTasksArgsFromArgv = Omit<QueryTasksArgs, 'type'> & {
  typeStr?: string
}

/** 从 argv 解析 queryMatrixTasks 参数：page 默认 1，pageSize 默认 10 */
export function getQueryTasksArgsFromArgv(): QueryTasksArgsFromArgv {
  const pageStr = getArgFromArgv('page')
  const pageSizeStr = getArgFromArgv('pageSize')
  const page = pageStr != null ? parseInt(pageStr, 10) : NaN
  const pageSize = pageSizeStr != null ? parseInt(pageSizeStr, 10) : NaN
  return {
    page: Number.isNaN(page) ? 1 : page,
    pageSize: Number.isNaN(pageSize) ? 10 : pageSize,
    processor: getArgFromArgv('processor') ?? undefined,
    projectIds: parseIdOrNameArray(getArgFromArgv('projectIds')),
    statusCondition: parseCodeOrNameArray(getArgFromArgv('statusCondition')),
    sIds: parseIdOrNameArray(getArgFromArgv('sIds')),
    creator: getArgFromArgv('creator') ?? undefined,
    cCreateTimeS: getArgFromArgv('cCreateTimeS') ?? undefined,
    cCreateTimeE: getArgFromArgv('cCreateTimeE') ?? undefined,
    cExpectFinishTimeE: getArgFromArgv('cExpectFinishTimeE') ?? undefined,
    cExpectFinishTimeS: getArgFromArgv('cExpectFinishTimeS') ?? undefined,
    cExpectQaEndTimeE: getArgFromArgv('cExpectQaEndTimeE') ?? undefined,
    cExpectQaEndTimeS: getArgFromArgv('cExpectQaEndTimeS') ?? undefined,
    cRealEndTimeE: getArgFromArgv('cRealEndTimeE') ?? undefined,
    cRealEndTimeS: getArgFromArgv('cRealEndTimeS') ?? undefined,
    cTestEndTimeE: getArgFromArgv('cTestEndTimeE') ?? undefined,
    cTestEndTimeS: getArgFromArgv('cTestEndTimeS') ?? undefined,
    cExpectDeployTimeE: getArgFromArgv('cExpectDeployTimeE') ?? undefined,
    cExpectDeployTimeS: getArgFromArgv('cExpectDeployTimeS') ?? undefined,
    cRealDeployTimeE: getArgFromArgv('cRealDeployTimeE') ?? undefined,
    cRealDeployTimeS: getArgFromArgv('cRealDeployTimeS') ?? undefined,
    rd: getArgFromArgv('rd') ?? undefined,
    qa: getArgFromArgv('qa') ?? undefined,
    typeStr: getArgFromArgv('type') ?? undefined
  }
}
/** 从单条记录中打印简化结果 */
function formatRow(
  item: unknown
): {
  id: number
  name: string
  projectName: string
  sprintName: string
  requirementName: string
} | null {
  const o = item as Record<string, unknown>
  const id = o.id
  const idNum = typeof id === 'number' ? id : parseInt(String(id), 10)
  const name = (o.taskName ?? o.name ?? '').toString().trim()
  const projectName = (o.projectName ?? '').toString().trim() || '(无名称)'
  const sprintName = (o.sprintName ?? '').toString().trim() || '(无名称)'
  const requirementName = (o.requirementName ?? '').toString().trim()

  if (Number.isNaN(idNum)) return null
  return {
    id: idNum,
    name: name || '(无名称)',
    projectName,
    sprintName,
    requirementName
  }
}
/** 查询任务列表：POST /api/task/list/:page/:pageSize；typeStr 会在内部从 taskTypeMap 解析为 type；projectIds/statusCondition/sIds 为字符串时通过 matrix-api 对应 resolve 转为数值 */
export async function queryMatrixTasks(
  accessToken: string,
  args: QueryTasksArgsFromArgv
): Promise<void> {
  let typeVal: number | undefined
  if (args.typeStr != null && args.typeStr !== '') {
    typeVal = await resolveTaskTypeCode(accessToken, args.typeStr)
  }

  let resolvedProjectIds: number[] | undefined
  if (args.projectIds != null && args.projectIds.length > 0) {
    resolvedProjectIds = await resolveProjectIds(accessToken, args.projectIds)
  }

  let resolvedSIds: number[] | undefined
  if (args.sIds != null && args.sIds.length > 0) {
    if (typeof args.sIds[0] === 'string') {
      if (resolvedProjectIds == null || resolvedProjectIds.length === 0) {
        console.error(
          '错误: sIds 为名称时需同时指定 projectIds（迭代名按项目解析）'
        )
        process.exit(1)
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

  let resolvedStatusCondition: number[] | undefined
  if (args.statusCondition != null && args.statusCondition.length > 0) {
    resolvedStatusCondition = await resolveCodeOrNameArray(
      args.statusCondition,
      name => resolveItemStatusValueByName(accessToken, 'taskStatus', name)
    )
  }

  const resolved: QueryTasksArgs = {
    ...args,
    type: typeVal,
    projectIds: resolvedProjectIds,
    sIds: resolvedSIds,
    statusCondition: resolvedStatusCondition
  }
  const url = `${TASK_LIST_BASE}/${resolved.page}/${resolved.pageSize}`
  const body: Record<string, unknown> = {}
  if (resolved.processor != null && resolved.processor !== '')
    body.processor = resolved.processor
  if (resolved.projectIds != null && resolved.projectIds.length > 0)
    body.projectIds = resolved.projectIds
  if (resolved.statusCondition != null && resolved.statusCondition.length > 0)
    body.statusCondition = resolved.statusCondition
  if (resolved.sIds != null && resolved.sIds.length > 0)
    body.sIds = resolved.sIds
  if (resolved.creator != null && resolved.creator !== '')
    body.creator = resolved.creator
  if (resolved.cCreateTimeS != null && resolved.cCreateTimeS !== '')
    body.cCreateTimeS = resolved.cCreateTimeS
  if (resolved.cCreateTimeE != null && resolved.cCreateTimeE !== '')
    body.cCreateTimeE = resolved.cCreateTimeE
  if (resolved.cExpectFinishTimeE != null && resolved.cExpectFinishTimeE !== '')
    body.cExpectFinishTimeE = resolved.cExpectFinishTimeE
  if (resolved.cExpectFinishTimeS != null && resolved.cExpectFinishTimeS !== '')
    body.cExpectFinishTimeS = resolved.cExpectFinishTimeS
  if (resolved.cExpectQaEndTimeE != null && resolved.cExpectQaEndTimeE !== '')
    body.cExpectQaEndTimeE = resolved.cExpectQaEndTimeE
  if (resolved.cExpectQaEndTimeS != null && resolved.cExpectQaEndTimeS !== '')
    body.cExpectQaEndTimeS = resolved.cExpectQaEndTimeS
  if (resolved.cRealEndTimeE != null && resolved.cRealEndTimeE !== '')
    body.cRealEndTimeE = resolved.cRealEndTimeE
  if (resolved.cRealEndTimeS != null && resolved.cRealEndTimeS !== '')
    body.cRealEndTimeS = resolved.cRealEndTimeS
  if (resolved.cTestEndTimeE != null && resolved.cTestEndTimeE !== '')
    body.cTestEndTimeE = resolved.cTestEndTimeE
  if (resolved.cTestEndTimeS != null && resolved.cTestEndTimeS !== '')
    body.cTestEndTimeS = resolved.cTestEndTimeS
  if (resolved.cExpectDeployTimeE != null && resolved.cExpectDeployTimeE !== '')
    body.cExpectDeployTimeE = resolved.cExpectDeployTimeE
  if (resolved.cExpectDeployTimeS != null && resolved.cExpectDeployTimeS !== '')
    body.cExpectDeployTimeS = resolved.cExpectDeployTimeS
  if (resolved.cRealDeployTimeE != null && resolved.cRealDeployTimeE !== '')
    body.cRealDeployTimeE = resolved.cRealDeployTimeE
  if (resolved.cRealDeployTimeS != null && resolved.cRealDeployTimeS !== '')
    body.cRealDeployTimeS = resolved.cRealDeployTimeS
  if (resolved.rd != null && resolved.rd !== '') body.rd = resolved.rd
  if (resolved.qa != null && resolved.qa !== '') body.qa = resolved.qa
  if (resolved.type != null) body.type = resolved.type

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
  const data = await handleMatrixResponse(res, 'task/list')
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
        requirementName: string
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
