const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'tiexin-x64-4.36.0.exe')
  const r = fs.readFileSync(filePath)
  res.end(r)
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
