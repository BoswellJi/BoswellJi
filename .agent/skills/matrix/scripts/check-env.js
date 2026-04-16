import { execSync } from 'child_process'

function checkNodeVersion() {
  try {
    const nodeVersionRaw = execSync('node -v').toString().trim()
    // Node 版本输出如 v20.11.0，去掉 v 获取主版本号
    const versionMatch = nodeVersionRaw.match(/^v(\d+)\./)
    if (!versionMatch) {
      console.warn('⚠️ 无法解析 Node.js 版本，请确保已安装 Node.js >= 20')
      return
    }

    const majorVersion = parseInt(versionMatch[1], 10)
    if (majorVersion < 20) {
      console.error(`\n❌ 环境依赖检测失败:`)
      console.error(`当前 Node.js 版本为: ${nodeVersionRaw}`)
      console.error(`matrix skill 依赖的 Node.js 版本需要 >= 20`)
      console.error(`请升级你的 Node.js 环境后重试。\n`)
      process.exit(1)
    } else {
      console.log(`✅ Node.js 环境检测通过: ${nodeVersionRaw} (>= 20)`)
      process.exit(0)
    }
  } catch (err) {
    console.error(
      `\n❌ 环境依赖检测失败: 无法检测到 Node.js，请先安装 Node.js >= 20。\n`
    )
    process.exit(1)
  }
}

checkNodeVersion()
