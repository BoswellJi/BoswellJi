import { createEventStream, defineEventHandler } from 'h3'

export default defineEventHandler(async event => {
  const eventStream = createEventStream(event)

  const interval = setInterval(async () => {
    await eventStream.push(`Message @ ${new Date().toLocaleTimeString()}`)
  }, 1000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})
