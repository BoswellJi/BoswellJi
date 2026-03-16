import {
  createApp,
  createRouter,
  defineEventHandler,
  getRequestHeader,
  getResponseHeaders,
  setResponseHeader
} from 'h3'

export const app = createApp()

const router = createRouter().get(
  '/user-agent',
  defineEventHandler(event => {
    const userAgent = getRequestHeader(event, 'user-agent')

    setResponseHeader(event, 'content-type', 'text/plain')
    setResponseHeader(event, 'x-server', 'nitro')

    const responseHeaders = getResponseHeaders(event)

    return {
      userAgent,
      responseHeaders
    }
  })
)

app.use(router)
