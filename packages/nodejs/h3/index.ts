// Import h3 as npm dependency
import { createApp, createRouter, defineEventHandler } from 'h3'

// Create an app instance
export const app = createApp()

// Create a new router and register it in app

app.use(
  defineEventHandler(event => {
    console.log('Middleware 1')
  })
)
app.use(
  defineEventHandler(event => {
    console.log('Middleware 2')
  })
)

// app.use(
//   '/',
//   defineEventHandler(event => {
//     return 'Hello from / route!' // Return a simple string response for /hello route
//   })
// )

const router = createRouter()
app.use(router)

router.get(
  '/',
  defineEventHandler(event => {
    return 'Hello H3!' // Return a simple string response
  })
)
