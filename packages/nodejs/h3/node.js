import { createApp, defineEventHandler, toNodeListener } from 'h3'
import { createServer } from 'node:http'

const app = createApp()
app.use(defineEventHandler(() => 'Hello world!'))

createServer(toNodeListener(app)).listen(process.env.PORT || 3000, () => {
  console.log(
    'Server is running on http://localhost:' + (process.env.PORT || 3000)
  )
})
