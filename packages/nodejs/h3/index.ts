import { createApp, createRouter, defineEventHandler } from 'h3'

export const app = createApp()

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

const router = createRouter()
app.use(router)

router.get(
  '/',
  defineEventHandler(event => {
    return 'Hello H3!'
  })
)
