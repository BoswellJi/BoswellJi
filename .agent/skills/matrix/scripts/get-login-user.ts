/**
 * 获取当前登录用户信息，子命令 getLoginUser。
 * 接口：GET /api/user/getLoginUser
 * 用法：matrix -- getLoginUser
 */

import { fetchMatrixJson, handleMatrixResponse } from './matrix-api.ts'

/** 获取当前用户信息：GET /api/user/getLoginUser */
export const GET_LOGIN_USER_URL =
  'https://matrix.17usoft.com/api/user/getLoginUser'

/**
 * 调用 getLoginUser 接口并解析为「姓名-工号」，工号优先取 userInfo.newWorkId（新工号），供 queryMatrixTasks/queryMatrixBugs 等与当前用户相关的查询。
 * 解析失败时抛出错误（请使用 matrix -- getLoginUser 查看原始字段）。
 */
export async function fetchLoginUserNameJob(
  accessToken: string
): Promise<string> {
  const data = await fetchMatrixJson(accessToken, GET_LOGIN_USER_URL, {
    method: 'GET'
  })
  const d =
    (data.data as Record<string, unknown> | undefined) ??
    (data as Record<string, unknown>)
  const pickStr = (o: Record<string, unknown>, keys: string[]): string => {
    for (const k of keys) {
      const v = o[k]
      if (v != null && String(v).trim() !== '') return String(v).trim()
    }
    return ''
  }
  const u = (d.userInfo as Record<string, unknown> | undefined) ?? d
  const name = pickStr(u, [
    'userName',
    'name',
    'realName',
    'nickName',
    'userNick'
  ])
  const job = pickStr(u, [
    'newWorkId',
    'workId',
    'jobNumber',
    'workNo',
    'empNo',
    'userCode',
    'code',
    'jobNo'
  ])
  if (name !== '' && job !== '') return `${name}-${job}`
  const combined =
    pickStr(u, ['userNameJob', 'displayName', 'label']).trim() ||
    pickStr(d, ['userNameJob', 'displayName', 'label'])
  if (combined.includes('-')) return combined
  throw new Error(
    '无法从 getLoginUser 响应中解析「姓名-工号」，请手动传 assigner/creator/owner，或执行 matrix -- getLoginUser 核对字段'
  )
}

/** 获取当前登录用户信息 */
export async function getLoginUser(accessToken: string): Promise<void> {
  const res = await fetch(GET_LOGIN_USER_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'accept-encoding': 'identity',
      Accept: '*/*',
      Cookie: `access_token=${accessToken}`
    },
    signal: AbortSignal.timeout(15000)
  })
  await handleMatrixResponse(res, 'user/getLoginUser')
}
