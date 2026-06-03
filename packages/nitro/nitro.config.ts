import { defineNitroConfig } from 'nitropack/config'

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: 'latest',
  srcDir: 'server',
  imports: false,
  experimental: {
    websocket: true,
    tasks: true,
    database: true
  },
  storage: {
    db: {
      driver: 'fs',
      base: './data/db'
    }
  }
})
