import { eventHandler, getQuery } from 'h3'

export default eventHandler(event => {
  const name = getQuery(event).name || 'World'
  return {
    message: `Hello, ${name}!`
  }
})
