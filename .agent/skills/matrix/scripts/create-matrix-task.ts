/**
 * 创建任务/拆分任务，子命令 createMatrixTask。
 * 接口：POST /api/task/create
 * 用法：matrix -- createMatrixTask --projectId=项目id或名称 --taskName=任务名称 [--requirementId=] [--type=] [--sprintId=] [--priority=] ...
 * projectId/sprintId/requirementId/type/priority 的按名称解析均走 matrix-api 的 resolve 方法。
 */

import {
  handleMatrixResponse,
  resolveProjectId,
  resolveSprintId,
  resolveRequirementId,
  resolveItemStatusValueByName,
  isVerbose
} from './matrix-api.ts'
import { resolveTaskTypeCode } from './query-matrix-tasks.ts'

const TASK_CREATE_URL = 'https://matrix.17usoft.com/api/task/create'

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

function parseOptionalNumber(val: string | null): number | undefined {
  if (val == null || val === '') return undefined
  const n = parseInt(val, 10)
  return Number.isNaN(n) ? undefined : n
}

async function runResolve<T>(fn: () => Promise<T>): Promise<T> {
  return fn().catch((e: Error) => {
    console.error('错误:', e.message)
    process.exit(1)
  }) as Promise<T>
}

export interface CreateTaskArgs {
  projectId: string
  taskName: string
  requirementId?: string
  type?: string
  sprintId?: string
  expectBeginTime?: string
  expectEndTime?: string
  priority?: string
  ifTest?: number
  expectRdHours?: number
}

export function getCreateTaskArgsFromArgv(): CreateTaskArgs {
  const projectId = getArgFromArgv('projectId')
  const taskName = getArgFromArgv('taskName')
  if (projectId == null || projectId === '') {
    console.error(
      '错误: createMatrixTask 需要 --projectId=项目id（或项目名称，将通过 queryMatrixProjects 解析）'
    )
    process.exit(1)
  }
  if (taskName == null || taskName === '') {
    console.error('错误: createMatrixTask 需要 --taskName=任务名称')
    process.exit(1)
  }
  return {
    projectId,
    taskName,
    requirementId: getArgFromArgv('requirementId') ?? undefined,
    type: getArgFromArgv('type') ?? undefined,
    sprintId: getArgFromArgv('sprintId') ?? undefined,
    expectBeginTime: getArgFromArgv('expectBeginTime') ?? undefined,
    expectEndTime: getArgFromArgv('expectEndTime') ?? undefined,
    priority: getArgFromArgv('priority') ?? undefined,
    ifTest: parseOptionalNumber(getArgFromArgv('ifTest')),
    expectRdHours: parseOptionalNumber(getArgFromArgv('expectRdHours'))
  }
}

const DEFAULT_TASK_TYPE_NAME = '开发任务'
const DEFAULT_PRIORITY_NAME = '中'

/** 创建 Matrix 任务：POST /api/task/create */
export async function createMatrixTask(
  accessToken: string,
  args: CreateTaskArgs
): Promise<void> {
  const projectId = await runResolve(() =>
    resolveProjectId(accessToken, args.projectId)
  )

  let requirementId: number | undefined
  if (args.requirementId != null && args.requirementId !== '') {
    const reqName = args.requirementId
    requirementId = await runResolve(() =>
      resolveRequirementId(accessToken, projectId, reqName)
    )
  }

  let type: number
  if (args.type != null && args.type !== '') {
    type = await resolveTaskTypeCode(accessToken, args.type)
  } else {
    type = await resolveTaskTypeCode(accessToken, DEFAULT_TASK_TYPE_NAME)
  }

  let priority: number
  if (args.priority != null && args.priority !== '') {
    const p = args.priority
    const v = await runResolve(() =>
      resolveItemStatusValueByName(accessToken, 'taskPriority', p)
    )
    priority = typeof v === 'number' ? v : parseInt(String(v), 10)
  } else {
    const v = await runResolve(() =>
      resolveItemStatusValueByName(
        accessToken,
        'taskPriority',
        DEFAULT_PRIORITY_NAME
      )
    )
    priority = typeof v === 'number' ? v : parseInt(String(v), 10)
  }

  const ifTest = args.ifTest != null ? args.ifTest : 0
  const expectRdHours = args.expectRdHours != null ? args.expectRdHours : 0

  const body: Record<string, unknown> = {
    projectId,
    taskName: args.taskName,
    type,
    priority,
    ifTest,
    expectRdHours
  }
  if (requirementId != null) body.requirementId = requirementId
  if (args.sprintId != null && args.sprintId !== '') {
    body.sprintId = await runResolve(() =>
      resolveSprintId(accessToken, projectId, args.sprintId!)
    )
  }
  if (args.expectBeginTime != null && args.expectBeginTime !== '')
    body.expectBeginTime = args.expectBeginTime
  if (args.expectEndTime != null && args.expectEndTime !== '')
    body.expectEndTime = args.expectEndTime

  if (isVerbose()) {
    console.log('[verbose] fetch url:', TASK_CREATE_URL)
    console.log('[verbose] fetch body:', JSON.stringify(body))
  }
  const res = await fetch(TASK_CREATE_URL, {
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
  await handleMatrixResponse(res, 'task/create')
}
