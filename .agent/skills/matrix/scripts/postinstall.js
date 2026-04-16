import fs from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const binDir = path.resolve(__dirname, '..', 'bin')
const homeDir = os.homedir()

const rcFiles = [path.join(homeDir, '.zshrc'), path.join(homeDir, '.bashrc')]

let added = false
const exportLine = `export PATH="${binDir}:$PATH"`

rcFiles.forEach(rcFile => {
  if (fs.existsSync(rcFile)) {
    const content = fs.readFileSync(rcFile, 'utf-8')
    if (!content.includes(binDir)) {
      fs.appendFileSync(rcFile, `\n# matrix skill\n${exportLine}\n`)
      console.log(`✅ 已自动将 matrix/bin 添加到 ${rcFile} 的 PATH 中`)
      added = true
    } else {
      console.log(`ℹ️  ${rcFile} 中已存在 matrix 的 PATH 配置，跳过添加`)
    }
  }
})

console.log('')
console.log('🎉 matrix skill 安装完成！')
if (added) {
  console.log(
    "👉 请执行 'source ~/.zshrc' (或对应的配置) 或者 重新打开终端 以使命令生效。"
  )
}
console.log("💡 之后你可以直接在任意目录运行 'matrix' 命令。")
console.log('')
