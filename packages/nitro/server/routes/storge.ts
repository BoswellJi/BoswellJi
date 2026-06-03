import { defineEventHandler } from 'h3'
import { useStorage } from 'nitropack/runtime/internal/storage'

export default defineEventHandler(async () => {
  await useStorage().setItem('test:foo', { hello: 'worldwww' })
  const item = await useStorage().getItem('test:foo')

  console.log(item)

  return item
})
