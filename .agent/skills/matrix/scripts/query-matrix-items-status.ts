/**
 * 需求/任务/缺陷状态码与类型枚举查询，子命令 queryMatrixItemsStatus。
 * 接口：GET /api/project/custom-status/items
 * 用法：matrix -- queryMatrixItemsStatus
 */

import {
  handleMatrixResponse,
  type MatrixResponse,
  isVerbose
} from './matrix-api.ts'

/** 自定义状态与类型枚举接口：GET /api/project/custom-status/items */
export const CUSTOM_STATUS_ITEMS_URL =
  'https://matrix.17usoft.com/api/project/custom-status/items'

const DEFAULT_HEADERS = (accessToken: string) => ({
  'Content-Type': 'application/json',
  'accept-encoding': 'identity',
  Accept: '*/*',
  Cookie: `access_token=${accessToken}`
})

/** 拉取 custom-status/items 原始数据（不打印），供 matrix-api resolveItemStatusValueByName、query-matrix-tasks 等解析状态/类型名用 */
export async function getItemsStatusData(
  accessToken: string
): Promise<MatrixResponse> {
  if (isVerbose())
    console.log('[verbose] fetch url:', CUSTOM_STATUS_ITEMS_URL, '(GET)')
  const res = await fetch(CUSTOM_STATUS_ITEMS_URL, {
    method: 'GET',
    headers: DEFAULT_HEADERS(accessToken),
    signal: AbortSignal.timeout(15000)
  })
  if (!res.ok) throw new Error(`custom-status/items 返回状态码 ${res.status}`)
  const data = (await res.json()) as MatrixResponse
  if (data?.code !== '0000')
    throw new Error(`custom-status/items 返回 code=${data?.code ?? '(无)'}`)
  return data
}

/** 查询 Matrix 系统需求/任务/缺陷状态码、任务类型、需求类型枚举值 */
export async function queryMatrixItemsStatus(
  accessToken: string
): Promise<void> {
  if (isVerbose())
    console.log('[verbose] fetch url:', CUSTOM_STATUS_ITEMS_URL, '(GET)')
  const res = await fetch(CUSTOM_STATUS_ITEMS_URL, {
    method: 'GET',
    headers: DEFAULT_HEADERS(accessToken),
    signal: AbortSignal.timeout(15000)
  })
  await handleMatrixResponse(res, 'custom-status/items')
}
