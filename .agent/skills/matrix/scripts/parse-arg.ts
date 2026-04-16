/**
 * 命令行参数解析公用方法：getArgFromArgv、整型/数组解析、状态码数组解析与按名称解析为数值。
 */

/** 从 process.argv 中取 --key=value 或 --key value */
export function getArgFromArgv(key: string): string | null {
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

export function isStrictPositiveIntString(s: string): boolean {
  const n = parseInt(s, 10)
  return !Number.isNaN(n) && String(n) === s.trim() && n > 0
}

/** 非负整数字符串（含 0），用于 statusCondition 等状态码 */
export function isNonNegativeIntString(s: string): boolean {
  const n = parseInt(s, 10)
  return !Number.isNaN(n) && String(n) === s.trim() && n >= 0
}

/** 解析为 number[]（全为正整数）或 string[]（含非数字，如项目名/迭代名/状态名） */
export function parseIdOrNameArray(
  s: string | null
): number[] | string[] | undefined {
  if (s == null || s === '') return undefined
  const raw = s.trim()
  const parts = raw
    .split(',')
    .map(p => p.trim())
    .filter(Boolean)
  if (parts.length === 0) return undefined
  const allNumeric = parts.every(p => isStrictPositiveIntString(p))
  if (allNumeric) return parts.map(p => parseInt(p, 10))
  return parts
}

/** 解析状态码数组：全为非负整数（含 0）则返回 number[]，否则返回 string[]（按名称解析） */
export function parseCodeOrNameArray(
  s: string | null
): number[] | string[] | undefined {
  if (s == null || s === '') return undefined
  const raw = s.trim()
  const parts = raw
    .split(',')
    .map(p => p.trim())
    .filter(Boolean)
  if (parts.length === 0) return undefined
  const allNumeric = parts.every(p => isNonNegativeIntString(p))
  if (allNumeric) return parts.map(p => parseInt(p, 10))
  return parts
}

/**
 * 将 (number|string)[] 解析为 number[]：数字直接保留；字符串若为整数字面量（含 0）则转数字，否则通过 resolveName 按名称解析。
 * 用于 statusCondition 等“数值或状态名”数组的统一解析。
 */
export async function resolveCodeOrNameArray(
  items: (number | string)[],
  resolveName: (name: string) => Promise<number | string>
): Promise<number[]> {
  const resolved: number[] = []
  for (const v of items) {
    if (typeof v === 'number') {
      resolved.push(v)
    } else {
      const trimmed = String(v).trim()
      const asNum = parseInt(trimmed, 10)
      if (trimmed !== '' && !Number.isNaN(asNum) && String(asNum) === trimmed) {
        resolved.push(asNum)
      } else {
        const code = await resolveName(trimmed)
        resolved.push(
          typeof code === 'number' ? code : parseInt(String(code), 10)
        )
      }
    }
  }
  return resolved
}
