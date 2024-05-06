const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'tiexin-x64-4.36.0.exe')

  // 设置响应头
  res.writeHead(200, {
    'Content-Type': 'application/x-ms-dos-executable',
    'Transfer-Encoding': 'chunked',
    'Content-Disposition': 'inline; filename="tiexin-x64-4.36.0.exe'
  })

  // 创建读取大文件的文件流
  const readStream = fs.createReadStream(filePath)

  // 流式传输文件内容到响应中
  readStream.pipe(res)

  // 处理流错误，避免服务器崩溃
  readStream.on('error', error => {
    console.error('Stream Error:', error)
    res.end(error)
  })
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
