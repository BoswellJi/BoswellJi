/**
 * 创建 Matrix 迭代，子命令 createMatrixSprint。
 * 接口：POST /api/sprints/create
 * 用法：matrix -- createMatrixSprint --sprintName=迭代名称 --projectId=项目id [--beginTime=]
 */

import {
  handleMatrixResponse,
  resolveProjectId,
  isVerbose
} from './matrix-api.ts'

/** 创建迭代接口：POST /api/sprints/create */
const SPRINTS_CREATE_URL = 'https://matrix.17usoft.com/api/sprints/create'

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

export interface CreateSprintArgs {
  sprintName: string
  projectId: string
  beginTime?: string
}

/** 从 argv 解析 createMatrixSprint 参数：sprintName、projectId 必填，beginTime 可选 */
export function getCreateSprintArgsFromArgv(): CreateSprintArgs {
  const sprintName = getArgFromArgv('sprintName')
  const projectIdStr = getArgFromArgv('projectId')
  const beginTime = getArgFromArgv('beginTime')
  if (sprintName == null || sprintName === '') {
    console.error('错误: createMatrixSprint 需要 --sprintName=迭代名称')
    process.exit(1)
  }
  if (projectIdStr == null || projectIdStr === '') {
    console.error('错误: createMatrixSprint 需要 --projectId=项目id')
    process.exit(1)
  }
  return {
    sprintName,
    projectId: projectIdStr,
    beginTime: beginTime ?? undefined
  }
}

/** 创建 Matrix 迭代：POST /api/sprints/create */
export async function createMatrixSprint(
  accessToken: string,
  args: CreateSprintArgs
): Promise<void> {
  const body: Record<string, unknown> = {
    sprintName: args.sprintName,
    projectId: await resolveProjectId(accessToken, args.projectId)
  }
  if (args.beginTime != null && args.beginTime !== '')
    body.beginTime = args.beginTime
  if (isVerbose()) {
    console.log('[verbose] fetch url:', SPRINTS_CREATE_URL)
    console.log('[verbose] fetch body:', JSON.stringify(body))
  }
  const res = await fetch(SPRINTS_CREATE_URL, {
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
  await handleMatrixResponse(res, 'sprints/create')
}
