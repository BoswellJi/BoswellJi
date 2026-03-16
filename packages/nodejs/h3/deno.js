import { createApp, defineEventHandler, toWebHandler } from 'h3'

const app = createApp()

app.use(defineEventHandler(() => 'Hello Deno!'))

Deno.serve(toWebHandler(app))
