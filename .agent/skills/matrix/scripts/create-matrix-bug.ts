/**
 * 创建缺陷，子命令 createMatrixBug。
 * 接口：POST /api/bug/create
 * 用法：matrix -- createMatrixBug --projectId= --bugName= --assigner=姓名-工号 --completionTime="yyyy-MM-dd HH:mm:ss" --sprintId= [--description=] [--type=] [--level=] [--priority=] [--requirementId=]
 * projectId：数字直接使用；字符串走 queryMatrixProjects（project/list）且须与 projectName 精确一致，不存在或不唯一则报错。
 * sprintId：数字直接使用；字符串走 queryMatrixProjectSprints（sprints/list + sprintName）且须与 sprintName 精确一致，不存在或不唯一则报错。
 * type/level/priority 可为数字或名称，名称通过 custom-status/items 解析（缺陷类型 bugType，严重程度 bugLevel，优先级 bugPriority）。
 */

import {
  handleMatrixResponse,
  resolveProjectId,
  resolveSprintId,
  resolveRequirementId,
  resolveItemStatusValueByName,
  isVerbose,
  type ItemStatusField
} from './matrix-api.ts'

const BUG_CREATE_URL = 'https://matrix.17usoft.com/api/bug/create'

/** 与接口默认 description 一致（未传 --description 时使用） */
export const DEFAULT_BUG_DESCRIPTION =
  '<p>相关模块：【】-【】</p><p>重现步骤：</p><p>预期结果：</p><p>测试结果：</p><p>备注信息：</p>'

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

async function runResolve<T>(fn: () => Promise<T>): Promise<T> {
  return fn().catch((e: Error) => {
    console.error('错误:', e.message)
    process.exit(1)
  }) as Promise<T>
}

function isAllDigits(s: string): boolean {
  return /^\d+$/.test(s.trim())
}

async function resolveOptionalBugCode(
  accessToken: string,
  field: ItemStatusField,
  raw: string | undefined
): Promise<number | undefined> {
  if (raw == null || raw === '') return undefined
  const trimmed = raw.trim()
  if (isAllDigits(trimmed)) return parseInt(trimmed, 10)
  const v = await runResolve(() =>
    resolveItemStatusValueByName(accessToken, field, trimmed)
  )
  return typeof v === 'number' ? v : parseInt(String(v), 10)
}

export interface CreateBugArgs {
  projectId: string
  bugName: string
  assigner: string
  completionTime: string
  sprintId: string
  description?: string
  type?: string
  level?: string
  priority?: string
  requirementId?: string
}

export function getCreateBugArgsFromArgv(): CreateBugArgs {
  const projectId = getArgFromArgv('projectId')
  const bugName = getArgFromArgv('bugName')
  const assigner = getArgFromArgv('assigner')
  const completionTime = getArgFromArgv('completionTime')
  const sprintId = getArgFromArgv('sprintId')

  if (projectId == null || projectId === '') {
    console.error(
      '错误: createMatrixBug 需要 --projectId=项目id（数字直接使用）或项目名称（经 queryMatrixProjects / project/list 精确匹配 projectName，不存在或不唯一则报错）'
    )
    process.exit(1)
  }
  if (bugName == null || bugName === '') {
    console.error('错误: createMatrixBug 需要 --bugName=缺陷名称')
    process.exit(1)
  }
  if (assigner == null || assigner === '') {
    console.error(
      '错误: createMatrixBug 需要 --assigner=缺陷处理人（格式：姓名-工号）'
    )
    process.exit(1)
  }
  if (completionTime == null || completionTime === '') {
    console.error(
      '错误: createMatrixBug 需要 --completionTime=期望修复时间（格式：yyyy-MM-dd HH:mm:ss）'
    )
    process.exit(1)
  }
  if (sprintId == null || sprintId === '') {
    console.error(
      '错误: createMatrixBug 需要 --sprintId=迭代id（数字直接使用）或迭代名称（经 queryMatrixProjectSprints / sprints/list 精确匹配 sprintName，不存在或不唯一则报错）'
    )
    process.exit(1)
  }

  return {
    projectId: projectId!,
    bugName: bugName!,
    assigner: assigner!,
    completionTime: completionTime!,
    sprintId: sprintId!,
    description: getArgFromArgv('description') ?? undefined,
    type: getArgFromArgv('type') ?? undefined,
    level: getArgFromArgv('level') ?? undefined,
    priority: getArgFromArgv('priority') ?? undefined,
    requirementId: getArgFromArgv('requirementId') ?? undefined
  }
}

/** 创建 Matrix 缺陷：POST /api/bug/create */
export async function createMatrixBug(
  accessToken: string,
  args: CreateBugArgs
): Promise<void> {
  const projectId = await runResolve(() =>
    resolveProjectId(accessToken, args.projectId, { exactNameMatchOnly: true })
  )

  const description =
    args.description != null && args.description !== ''
      ? args.description
      : DEFAULT_BUG_DESCRIPTION

  let requirementId: number | undefined
  if (args.requirementId != null && args.requirementId !== '') {
    requirementId = await runResolve(() =>
      resolveRequirementId(accessToken, projectId, args.requirementId!)
    )
  }

  const sprintId = await runResolve(() =>
    resolveSprintId(accessToken, projectId, args.sprintId, {
      exactNameMatchOnly: true
    })
  )

  const type = await resolveOptionalBugCode(accessToken, 'bugType', args.type)
  const level = await resolveOptionalBugCode(
    accessToken,
    'bugLevel',
    args.level
  )
  const priority = await resolveOptionalBugCode(
    accessToken,
    'bugPriority',
    args.priority
  )

  const body: Record<string, unknown> = {
    projectId,
    bugName: args.bugName,
    assigner: args.assigner,
    completionTime: args.completionTime,
    description,
    sprintId
  }
  if (requirementId != null) body.requirementId = requirementId
  if (type != null) body.type = type
  if (level != null) body.level = level
  if (priority != null) body.priority = priority

  if (isVerbose()) {
    console.log('[verbose] fetch url:', BUG_CREATE_URL)
    console.log('[verbose] fetch body:', JSON.stringify(body))
  }
  const res = await fetch(BUG_CREATE_URL, {
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
  await handleMatrixResponse(res, 'bug/create')
}
