/**
 * 创建 Matrix 项目，子命令 createMatrixProject。
 * 接口：POST /api/project/create
 * 用法：matrix -- createMatrixProject --projectName=项目名称
 */

import { handleMatrixResponse, isVerbose } from './matrix-api.ts'

/** 创建项目接口：POST /api/project/create */
const PROJECT_CREATE_URL = 'https://matrix.17usoft.com/api/project/create'

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

/** 从 argv 解析 createMatrixProject 参数：projectName 必填 */
export function getCreateProjectArgsFromArgv(): { projectName: string } {
  const projectName = getArgFromArgv('projectName')
  if (projectName == null || projectName === '') {
    console.error('错误: createMatrixProject 需要 --projectName=项目名称')
    process.exit(1)
  }
  return { projectName }
}

/** 创建 Matrix 项目：POST /api/project/create */
export async function createMatrixProject(
  accessToken: string,
  args: { projectName: string }
): Promise<void> {
  const body = { projectName: args.projectName }
  if (isVerbose()) {
    console.log('[verbose] fetch url:', PROJECT_CREATE_URL)
    console.log('[verbose] fetch body:', JSON.stringify(body))
  }
  const res = await fetch(PROJECT_CREATE_URL, {
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
  await handleMatrixResponse(res, 'project/create')
}
