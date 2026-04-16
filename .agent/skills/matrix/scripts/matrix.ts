#!/usr/bin/env -S node --experimental-strip-types
/**
 * Matrix 入口：CDP 启动/连接、Cookie 获取、runWithToken、子命令路由。
 * 运行：./bin/matrix [--verbose] -- <子命令> [--参数=值 ...]
 * --verbose 开启调试输出（如 data.result 的 id/projectName 等），默认关闭。
 * 子命令：queryMatrixProjects | queryMatrixProjectSprints | queryMatrixItemsStatus | createMatrixProject | createMatrixSprint | createMatrixTask | createMatrixBug | updateMatrixBugStatus | getLoginUser | queryMatrixTasks | queryMatrixBugs | queryMatrixProjectRequirements
 */

import { spawn } from 'child_process'
import * as http from 'http'
import {
  MATRIX_URL,
  MATRIX_DOMAIN,
  getCachePath,
  readCache,
  writeCache,
  deleteCache,
  checkAccessTokenAvailable,
  pickAccessToken,
  type CookieItem
} from './access-token.ts'
import {
  getSprintsArgsFromArgv,
  queryMatrixProjectSprints
} from './query-matrix-project-sprints.ts'
import {
  getProjectListArgsFromArgv,
  queryMatrixProjects
} from './query-matrix-projects.ts'
import { queryMatrixItemsStatus } from './query-matrix-items-status.ts'
import {
  getCreateProjectArgsFromArgv,
  createMatrixProject
} from './create-matrix-project.ts'
import {
  getCreateSprintArgsFromArgv,
  createMatrixSprint
} from './create-matrix-sprint.ts'
import {
  getCreateTaskArgsFromArgv,
  createMatrixTask
} from './create-matrix-task.ts'
import {
  getCreateBugArgsFromArgv,
  createMatrixBug
} from './create-matrix-bug.ts'
import { getLoginUser } from './get-login-user.ts'
import {
  getQueryTasksArgsFromArgv,
  queryMatrixTasks
} from './query-matrix-tasks.ts'
import {
  getQueryBugsArgsFromArgv,
  queryMatrixBugs
} from './query-matrix-bugs.ts'
import { runUpdateMatrixBugStatusFromArgv } from './update-matrix-bug-status.ts'
import {
  getQueryProjectRequirementsArgsFromArgv,
  queryMatrixProjectRequirements
} from './query-matrix-project-requirements.ts'

const DEBUG_HOST = '127.0.0.1'
const DEBUG_PORT = 9222
const WAIT_TIMEOUT_MS = 300_000
const POLL_INTERVAL_MS = 2000

/** 解析并剥离 --verbose，设置 MATRIX_VERBOSE=1，供子命令 isVerbose() 使用 */
function stripVerbose(): void {
  const argv = process.argv
  let i = 0
  while (i < argv.length) {
    if (
      argv[i] === '--verbose' ||
      argv[i] === '-v' ||
      argv[i]!.startsWith('--verbose=')
    ) {
      process.env['MATRIX_VERBOSE'] = '1'
      process.argv.splice(i, 1)
      continue
    }
    i++
  }
}

function getSubcommand(): string | null {
  const args = process.argv.slice(2)
  let sub = args[0]
  if (sub === '--') sub = args[1]
  else if (sub === 'matrix') sub = args[1]

  if (sub === 'queryMatrixProjectSprints') return 'queryMatrixProjectSprints'
  if (sub === 'queryMatrixProjects') return 'queryMatrixProjects'
  if (sub === 'queryMatrixItemsStatus') return 'queryMatrixItemsStatus'
  if (sub === 'createMatrixProject') return 'createMatrixProject'
  if (sub === 'createMatrixSprint') return 'createMatrixSprint'
  if (sub === 'createMatrixTask') return 'createMatrixTask'
  if (sub === 'createMatrixBug') return 'createMatrixBug'
  if (sub === 'getLoginUser') return 'getLoginUser'
  if (sub === 'queryMatrixTasks') return 'queryMatrixTasks'
  if (sub === 'queryMatrixBugs') return 'queryMatrixBugs'
  if (sub === 'queryMatrixProjectRequirements')
    return 'queryMatrixProjectRequirements'
  if (sub === 'updateMatrixBugStatus') return 'updateMatrixBugStatus'
  return null
}

function getChromePath(): string {
  const env =
    process.env['CHROME_PATH'] ?? process.env['PUPPETEER_EXECUTABLE_PATH']
  if (env) return env
  if (process.platform === 'darwin')
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  return 'google-chrome'
}

function launchChrome(): import('child_process').ChildProcess | null {
  const chrome = getChromePath()
  const userDataDir =
    process.env['CHROME_USER_DATA_DIR'] ?? '/tmp/matrix-cdp-profile'
  const proc = spawn(
    chrome,
    [
      `--remote-debugging-port=${DEBUG_PORT}`,
      '--remote-debugging-address=127.0.0.1',
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      MATRIX_URL
    ],
    {
      stdio: 'ignore',
      detached: true
    }
  )
  proc.unref()
  return proc
}

function httpGet<T = unknown>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res: http.IncomingMessage) => {
      let data = ''
      res.on('data', (chunk: Buffer) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          resolve(JSON.parse(data) as T)
        } catch {
          reject(new Error('Invalid JSON'))
        }
      })
    })
    req.on('error', reject)
    req.setTimeout(5000, () => {
      req.destroy()
      reject(new Error('timeout'))
    })
  })
}

async function waitForDebugPort(maxMs: number): Promise<void> {
  const deadline = Date.now() + maxMs
  const url = `http://${DEBUG_HOST}:${DEBUG_PORT}/json/version`
  while (Date.now() < deadline) {
    try {
      await httpGet(url)
      return
    } catch {
      await new Promise(r => setTimeout(r, 100))
    }
  }
  throw new Error('Chrome 调试端口未就绪')
}

/** 从 /json 的 target 列表中取可用的 WebSocket URL（page 或 tab） */
function findPageWsUrl(
  targets: { type?: string; webSocketDebuggerUrl?: string }[]
): string | null {
  for (const t of targets) {
    if (t?.webSocketDebuggerUrl && (t.type === 'page' || t.type === 'tab'))
      return t.webSocketDebuggerUrl
  }
  return null
}

/** 等待 Chrome 出现 page/tab target 并返回 webSocketDebuggerUrl */
async function getPageWsUrl(): Promise<string> {
  const deadline = Date.now() + 15000
  const pollMs = 500
  while (Date.now() < deadline) {
    try {
      const targets = await httpGet<
        { type?: string; webSocketDebuggerUrl?: string }[]
      >(`http://${DEBUG_HOST}:${DEBUG_PORT}/json`)
      const wsUrl = findPageWsUrl(Array.isArray(targets) ? targets : [])
      if (wsUrl) return wsUrl
    } catch {
      // /json 未就绪或解析失败，继续轮询
    }
    await new Promise(r => setTimeout(r, pollMs))
  }
  throw new Error('未找到 page 的 webSocketDebuggerUrl（超时 15 秒）')
}

interface CDPMessage {
  id?: number
  method?: string
  result?: { cookies?: { name: string; value: string; domain?: string }[] }
  error?: { message?: string }
}

function connectCDP(wsUrl: string): Promise<{
  send: (
    method: string,
    params?: Record<string, unknown>
  ) => Promise<CDPMessage['result']>
  close: () => void
}> {
  const WS = (globalThis as { WebSocket?: new (url: string) => WebSocket })
    .WebSocket
  if (!WS) throw new Error('需要 Node 21+ 内置 WebSocket')

  return new Promise((resolve, reject) => {
    const ws = new WS(wsUrl)
    let nextId = 1
    const pending = new Map<
      number,
      { resolve: (r: CDPMessage['result']) => void; reject: (e: Error) => void }
    >()

    ws.addEventListener('message', (ev: MessageEvent) => {
      const data: CDPMessage = JSON.parse(
        typeof ev.data === 'string' ? ev.data : (ev.data as Buffer).toString()
      )
      if (data.id != null && pending.has(data.id)) {
        const p = pending.get(data.id)!
        pending.delete(data.id)
        if (data.error)
          p.reject(new Error(data.error.message ?? String(data.error)))
        else p.resolve(data.result)
      }
    })

    ws.addEventListener('open', () => {
      resolve({
        send(method: string, params?: Record<string, unknown>) {
          return new Promise((res, rej) => {
            const id = nextId++
            pending.set(id, { resolve: res, reject: rej })
            ws.send(JSON.stringify({ id, method, params: params ?? {} }))
          })
        },
        close: () => {
          try {
            ws.close()
          } catch {}
        }
      })
    })

    ws.addEventListener('error', e =>
      reject(e instanceof Error ? e : new Error(String(e)))
    )
  })
}

type CDPClient = Awaited<ReturnType<typeof connectCDP>>

async function getCookiesFromCDP(
  client: CDPClient,
  urls?: string[]
): Promise<CookieItem[]> {
  const targetUrls = urls ?? [MATRIX_URL, `https://${MATRIX_DOMAIN}`]
  const result = await client.send('Network.getCookies', { urls: targetUrls })
  return (result?.cookies as CookieItem[]) ?? []
}

/** 确保 Chrome 已就绪（启动或等待已有实例），返回需在结束时 kill 的进程及是否使用已有实例 */
async function ensureChromeReady(): Promise<{
  chromeProc: import('child_process').ChildProcess | null
  useExisting: boolean
}> {
  const useExisting = process.env['USE_EXISTING_CHROME'] === '1'
  if (!useExisting) {
    console.log(`正在启动 Chrome 并访问: ${MATRIX_URL}`)
    const chromeProc = launchChrome()
    await waitForDebugPort(15000)
    return { chromeProc, useExisting }
  }
  console.log('使用已存在的 Chrome（USE_EXISTING_CHROME=1）')
  await waitForDebugPort(5000)
  return { chromeProc: null, useExisting: true }
}

/** 连接 CDP 并导航到 Matrix 登录页 */
async function connectAndNavigateToMatrix(
  chromeProc: import('child_process').ChildProcess | null
): Promise<CDPClient> {
  const wsUrl = await getPageWsUrl()
  const client = await connectCDP(wsUrl)
  try {
    await client.send('Page.enable')
    await client.send('Network.enable')
    await client.send('Page.navigate', { url: MATRIX_URL })
    await new Promise(r => setTimeout(r, 3000))
  } catch (e) {
    console.error('CDP 连接或导航失败:', e)
    if (chromeProc) chromeProc.kill()
    process.exit(1)
  }
  return client
}

/** 轮询 Cookie 直到拿到 access_token，然后关闭 client 并清理 Chrome 进程 */
async function waitForAccessToken(
  client: CDPClient,
  chromeProc: import('child_process').ChildProcess | null,
  useExisting: boolean
): Promise<string> {
  console.log(
    `请在浏览器中完成登录，脚本将等待 access_token（超时 ${WAIT_TIMEOUT_MS / 1000} 秒）...`
  )
  const deadline = Date.now() + WAIT_TIMEOUT_MS
  let accessToken: string | null = null

  while (Date.now() < deadline) {
    const matrixCookies = await getCookiesFromCDP(client, [
      MATRIX_URL,
      `https://${MATRIX_DOMAIN}`
    ])
    accessToken = pickAccessToken(matrixCookies)
    let otherCookies: CookieItem[] = []
    if (!accessToken) {
      otherCookies = await getCookiesFromCDP(client, [
        'https://.17usoft.com/',
        'https://17usoft.com/'
      ])
      accessToken = pickAccessToken(otherCookies)
    }
    if (process.env['DEBUG_COOKIE'] === '1') {
      const all = [...matrixCookies]
      for (const c of otherCookies) {
        if (!all.some(x => x.name === c.name && x.domain === c.domain))
          all.push(c)
      }
      console.error('[调试] 当前 Cookie 数量:', all.length)
      for (const c of all) {
        const preview =
          (c.value ?? '').slice(0, 20) +
          ((c.value?.length ?? 0) > 20 ? '...' : '')
        console.error(
          `  name=${JSON.stringify(c.name)} domain=${JSON.stringify(c.domain)} value_preview=${JSON.stringify(preview)}`
        )
      }
    }
    if (accessToken) {
      console.log('[已从 Cookie 解析] access_token')
      break
    }
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS))
  }

  client.close()
  if (chromeProc && !useExisting)
    try {
      chromeProc.kill()
    } catch {}

  if (!accessToken) {
    console.error('错误: 等待超时，未在 Cookie 中检测到 access_token。')
    process.exit(1)
  }
  return accessToken as string
}

/** 获取 token（缓存或 CDP 登录）并执行 fn */
async function runWithToken(
  fn: (accessToken: string) => Promise<void>
): Promise<void> {
  const cachedToken = readCache()
  if (cachedToken) {
    console.log('[使用本地缓存] access_token')
    const ok = await checkAccessTokenAvailable(cachedToken)
    if (ok) {
      await fn(cachedToken)
      return
    }
    deleteCache()
    console.log('缓存 token 已失效，将走浏览器登录流程...')
  }
  const { chromeProc, useExisting } = await ensureChromeReady()
  const client = await connectAndNavigateToMatrix(chromeProc)
  const accessToken = await waitForAccessToken(client, chromeProc, useExisting)
  writeCache(accessToken)
  const ok = await checkAccessTokenAvailable(accessToken)
  if (!ok) process.exit(1)
  await fn(accessToken)
}

async function main(): Promise<void> {
  stripVerbose()
  console.log('[缓存路径]', getCachePath())

  const sub = getSubcommand()
  if (sub === 'queryMatrixProjects') {
    const projectArgs = getProjectListArgsFromArgv()
    await runWithToken(token => queryMatrixProjects(token, projectArgs))
    return
  }
  if (sub === 'queryMatrixItemsStatus') {
    await runWithToken(queryMatrixItemsStatus)
    return
  }
  if (sub === 'createMatrixProject') {
    const createArgs = getCreateProjectArgsFromArgv()
    await runWithToken(token => createMatrixProject(token, createArgs))
    return
  }
  if (sub === 'createMatrixSprint') {
    const sprintArgs = getCreateSprintArgsFromArgv()
    await runWithToken(token => createMatrixSprint(token, sprintArgs))
    return
  }
  if (sub === 'createMatrixTask') {
    const taskArgs = getCreateTaskArgsFromArgv()
    await runWithToken(token => createMatrixTask(token, taskArgs))
    return
  }
  if (sub === 'createMatrixBug') {
    const bugArgs = getCreateBugArgsFromArgv()
    await runWithToken(token => createMatrixBug(token, bugArgs))
    return
  }
  if (sub === 'updateMatrixBugStatus') {
    await runWithToken(runUpdateMatrixBugStatusFromArgv)
    return
  }
  if (sub === 'getLoginUser') {
    await runWithToken(getLoginUser)
    return
  }
  if (sub === 'queryMatrixTasks') {
    const tasksArgs = getQueryTasksArgsFromArgv()
    await runWithToken(token => queryMatrixTasks(token, tasksArgs))
    return
  }
  if (sub === 'queryMatrixBugs') {
    const bugsArgs = getQueryBugsArgsFromArgv()
    await runWithToken(token => queryMatrixBugs(token, bugsArgs))
    return
  }
  if (sub === 'queryMatrixProjectSprints') {
    const sprintsArgs = getSprintsArgsFromArgv()
    await runWithToken(token => queryMatrixProjectSprints(token, sprintsArgs))
    return
  }
  if (sub === 'queryMatrixProjectRequirements') {
    const reqArgs = getQueryProjectRequirementsArgsFromArgv()
    await runWithToken(token => queryMatrixProjectRequirements(token, reqArgs))
    return
  }
  console.error('错误: 请指定子命令，例如：')
  console.error(
    '  matrix [--verbose] -- queryMatrixProjects [--page=1] [--pageSize=15] [--projectName=] [--ids=]'
  )
  console.error(
    '  matrix -- queryMatrixProjectSprints [--page=1] [--pageSize=15] [--projectId=] [--sprintName=] [--statusCondition=]'
  )
  console.error('  matrix -- queryMatrixItemsStatus')
  console.error('  matrix -- createMatrixProject --projectName=项目名称')
  console.error(
    '  matrix -- createMatrixSprint --sprintName=迭代名称 --projectId=项目id [--beginTime=]'
  )
  console.error(
    '  matrix -- createMatrixTask --projectId=项目id或项目名 --taskName=任务名称 [--requirementId=] [--type=] [--sprintId=] [--priority=] ...'
  )
  console.error(
    '  matrix -- createMatrixBug --projectId=项目id或项目名 --bugName=缺陷名称 --assigner=姓名-工号 --completionTime="yyyy-MM-dd HH:mm:ss" --sprintId=迭代id或迭代名 [--description=] [--type=] [--level=] [--priority=] [--requirementId=]'
  )
  console.error(
    '  matrix -- updateMatrixBugStatus --status=缺陷状态码或状态名 --assigner=姓名-工号 [--bugId=]（未传 bugId 时列出与我相关缺陷供选择）'
  )
  console.error('  matrix -- getLoginUser')
  console.error(
    '  matrix -- queryMatrixTasks [--page=1] [--pageSize=10] [--processor=] [--creator=] [--rd=] [--qa=] ...'
  )
  console.error(
    '  matrix -- queryMatrixBugs [--page=1] [--pageSize=20] [--assigner=] [--creator=] [--owner=]（可选，须含本人） [--bugName=] [--projectIds=] [--sIds=] [--statusCondition=] [--levels=] [--priority=] ...（依次 assigner/creator/owner 三维度）'
  )
  console.error(
    '  matrix -- queryMatrixProjectRequirements --projectId=项目id [--page=1] [--pageSize=10] [--sIds=] [--requireName=] ...'
  )
  process.exit(1)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
