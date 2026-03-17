import { createApp, createRouter, defineEventHandler, useBase } from 'h3'

export const app = createApp()

const router = createRouter()
  .get(
    '/',
    defineEventHandler(() => {
      return 'GET: hello world'
    })
  )
  .post(
    '/',
    defineEventHandler(() => {
      return 'POST: hello world'
    })
  )
  .put(
    '/',
    defineEventHandler(() => {
      return 'PUT: hello world'
    })
  )
  .delete(
    '/',
    defineEventHandler(() => {
      return 'DELETE: hello world'
    })
  )
  .patch(
    '/',
    defineEventHandler(() => {
      return 'PATCH: hello world'
    })
  )
  .head(
    '/',
    defineEventHandler(() => {
      return 'HEAD: hello world'
    })
  )

router.add(
  '/testadd',
  defineEventHandler(() => {
    return 'TESTADD: hello world'
  })
)

router.use(
  '/testuse',
  defineEventHandler(() => {
    return 'TESTUSE: hello world'
  })
)

const apiRouter = createRouter().get(
  '/hello',
  defineEventHandler(event => {
    return 'Hello API!'
  })
)

router.use('/api/**', useBase('/api', apiRouter.handler))

app.use(router)
