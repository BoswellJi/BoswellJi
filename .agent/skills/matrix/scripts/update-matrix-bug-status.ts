/**
 * 缺陷状态变更，子命令 updateMatrixBugStatus。
 * 接口：PUT /api/bug/:bugId/statusChange
 * 用法：matrix -- updateMatrixBugStatus --status=码或状态名 --assigner=姓名-工号 [--bugId=]
 * status：必填，数字或缺陷状态名（与 queryMatrixItemsStatus / custom-status 的 bugStatus 一致）。
 * assigner：必填，下一阶段处理人，格式：姓名-工号。
 * bugId：可选；未传时先按 queryMatrixBugs 相同规则列出「与我相关」缺陷（**仅按当前登录用户 Cookie，不使用本命令的 --assigner 做筛选**；--assigner 仅在带 --bugId 调用 PUT 时作为下一阶段处理人）。
 */

import {
  handleMatrixResponse,
  resolveItemStatusValueByName,
  isVerbose
} from './matrix-api.ts'
import { getArgFromArgv } from './parse-arg.ts'
import {
  fetchRelatedBugsForPick,
  getQueryBugsArgsFromArgv
} from './query-matrix-bugs.ts'

const BUG_STATUS_CHANGE_BASE = 'https://matrix.17usoft.com/api/bug'

export interface UpdateBugStatusArgs {
  bugId: number
  /** 接口 body.status（缺陷状态码） */
  status: number
  assigner: string
}

export function parseUpdateBugStatusArgv(): {
  bugId: number | undefined
  statusRaw: string
  assigner: string
} {
  const bugIdStr = getArgFromArgv('bugId')
  const statusRaw = getArgFromArgv('status')
  const assigner = getArgFromArgv('assigner') ?? ''

  let bugId: number | undefined
  if (bugIdStr != null && bugIdStr.trim() !== '') {
    const n = parseInt(bugIdStr.trim(), 10)
    if (Number.isNaN(n) || n <= 0) {
      console.error('错误: --bugId 须为正整数')
      process.exit(1)
    }
    bugId = n
  }

  if (statusRaw == null || statusRaw.trim() === '') {
    console.error(
      '错误: updateMatrixBugStatus 需要 --status=缺陷状态（数字或状态名，见 queryMatrixItemsStatus 的 bugStatus）'
    )
    process.exit(1)
  }
  if (assigner.trim() === '') {
    console.error(
      '错误: updateMatrixBugStatus 需要 --assigner=下一阶段处理人（格式：姓名-工号）'
    )
    process.exit(1)
  }

  return {
    bugId,
    statusRaw: statusRaw.trim(),
    assigner: assigner.trim()
  }
}

async function resolveStatusCode(
  accessToken: string,
  statusRaw: string
): Promise<number> {
  const trimmed = statusRaw.trim()
  const asNum = parseInt(trimmed, 10)
  if (!Number.isNaN(asNum) && String(asNum) === trimmed) return asNum
  const v = await resolveItemStatusValueByName(
    accessToken,
    'bugStatus',
    trimmed
  )
  return typeof v === 'number' ? v : parseInt(String(v), 10)
}

function printCandidateBugs(
  rows: Awaited<ReturnType<typeof fetchRelatedBugsForPick>>
): void {
  console.log(
    '未指定 --bugId，以下为与当前登录用户相关的缺陷候选（queryMatrixBugs 三维度合并去重），请选定 id 后执行：'
  )
  console.log('')
  for (const r of rows) {
    console.log(
      `  id: ${r.id}  [${r.dimension}]  ${r.bugName}  | 项目: ${r.projectName}  | 迭代: ${r.sprintName}  | 待处理: ${r.assigner}`
    )
  }
  console.log('')
  console.error(
    '请使用 --bugId=<上表中的 id> 并保留 --status= 与 --assigner= 再次执行 updateMatrixBugStatus。'
  )
}

/** PUT /api/bug/:bugId/statusChange */
export async function updateMatrixBugStatus(
  accessToken: string,
  args: UpdateBugStatusArgs
): Promise<void> {
  const url = `${BUG_STATUS_CHANGE_BASE}/${args.bugId}/statusChange`
  const body = {
    status: args.status,
    assigner: args.assigner
  }

  if (isVerbose()) {
    console.log('[verbose] fetch url:', url)
    console.log('[verbose] fetch body:', JSON.stringify(body))
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'accept-encoding': 'identity',
      Accept: '*/*',
      Cookie: `access_token=${accessToken}`
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000)
  })
  await handleMatrixResponse(res, 'bug/statusChange')
}

/**
 * 入口：若 argv 未给 bugId，则列出与我相关缺陷后 exit(1)；否则解析 status 并调用接口。
 */
export async function runUpdateMatrixBugStatusFromArgv(
  accessToken: string
): Promise<void> {
  const parsed = parseUpdateBugStatusArgv()

  if (parsed.bugId == null) {
    console.error(
      '提示: 未传 --bugId 时，缺陷列表只按当前登录账号（access_token）查询「与我相关」缺陷；--assigner 不参与筛选，仅在带上 --bugId 调用状态变更接口时作为下一阶段处理人提交。'
    )
    const queryBugsArgs = getQueryBugsArgsFromArgv({
      omitPersonOverrides: true
    })
    const rows = await fetchRelatedBugsForPick(accessToken, queryBugsArgs)
    if (rows.length === 0) {
      console.error(
        '未找到与我相关的缺陷，请先用 queryMatrixBugs 确认或使用 --bugId= 指定缺陷 id。'
      )
      process.exit(1)
    }
    printCandidateBugs(rows)
    process.exit(1)
  }

  const status = await resolveStatusCode(accessToken, parsed.statusRaw).catch(
    (e: Error) => {
      console.error('错误:', e.message)
      process.exit(1)
    }
  )

  await updateMatrixBugStatus(accessToken, {
    bugId: parsed.bugId,
    status,
    assigner: parsed.assigner
  })
}
