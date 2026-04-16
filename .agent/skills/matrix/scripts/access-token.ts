/**
 * Matrix access_token：本地缓存读写（7 天有效）、校验（getuserinfo）、从 CDP Cookie 解析。
 * 供 matrix.ts 入口在 runWithToken 时优先读缓存，失效后走浏览器登录并写回缓存。
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const MATRIX_URL = 'https://matrix.17usoft.com/'
/** 从 MATRIX_URL 截取域名 */
export const MATRIX_DOMAIN = new URL(MATRIX_URL).hostname
/** access_token 校验接口 */
const GETUSERINFO_URL = 'https://tccommon.17usoft.com/oauth/rs/getuserinfo'
/** access_token 缓存有效期：7 天 */
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000
/** 缓存文件：matrix/cache/matrix_cache.json */
const CACHE_FILENAME = 'matrix_cache.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function getCachePath(): string {
  return path.join(__dirname, '..', 'cache', CACHE_FILENAME)
}

interface CacheEntry {
  accessToken: string
  cachedAt: number
}

/** urls -> 缓存内容 的映射 */
type CacheMap = Record<string, CacheEntry>

function readCacheMap(): CacheMap {
  try {
    const p = getCachePath()
    const raw = fs.readFileSync(p, 'utf-8')
    const map = JSON.parse(raw) as CacheMap
    return map && typeof map === 'object' ? map : {}
  } catch {
    return {}
  }
}

function writeCacheMap(map: CacheMap): void {
  const p = getCachePath()
  const dir = path.dirname(p)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(p, JSON.stringify(map, null, 0), 'utf-8')
}

export function readCache(url: string = MATRIX_URL): string | null {
  const map = readCacheMap()
  const entry = map[url]
  if (!entry?.accessToken || typeof entry.cachedAt !== 'number') return null
  if (Date.now() - entry.cachedAt > CACHE_TTL_MS) return null
  return entry.accessToken.trim()
}

export function writeCache(
  accessToken: string,
  url: string = MATRIX_URL
): void {
  const map = readCacheMap()
  map[url] = { accessToken: accessToken.trim(), cachedAt: Date.now() }
  writeCacheMap(map)
  console.log('[已写入本地缓存] 有效期 7 天')
}

export function deleteCache(url: string = MATRIX_URL): void {
  const map = readCacheMap()
  if (url in map) {
    delete map[url]
    writeCacheMap(map)
    console.log('[已删除无效缓存]')
  }
}

export type CookieItem = { name: string; value: string; domain?: string }

/** 优先取 MATRIX_DOMAIN 下的 access_token，否则取任意域名的 access_token */
export function pickAccessToken(cookies: CookieItem[]): string | null {
  const tokenCookies = cookies.filter(
    c => c.name === 'access_token' && c.value?.trim()
  )
  if (tokenCookies.length === 0) return null
  const matrixDomain = MATRIX_DOMAIN
  const fromMatrix = tokenCookies.find(
    c => c.domain === matrixDomain || c.domain === `.${matrixDomain}`
  )
  return (fromMatrix ?? tokenCookies[0]).value.trim()
}

/** access_token 校验：请求 getuserinfo。返回 true 表示有效，false 表示无效（不退出进程） */
export async function checkAccessTokenAvailable(
  accessToken: string
): Promise<boolean> {
  const res = await fetch(GETUSERINFO_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ access_token: accessToken }).toString(),
    signal: AbortSignal.timeout(15000)
  })
  if (!res.ok) {
    console.error('失败: getuserinfo 返回状态码', res.status)
    return false
  }
  const data = (await res.json()) as { newWorkId?: string }
  if (!data?.newWorkId) {
    console.error('失败: 返回结果中 newWorkId 为空。', data)
    return false
  }
  console.log('access_token 校验成功')
  // console.log(JSON.stringify(data, null, 2));
  return true
}

export { MATRIX_URL }
