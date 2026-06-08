import { defineNitroConfig } from 'nitropack/config';

// https://nitro.build/config
export default defineNitroConfig({
  preset: 'bun',
  compatibilityDate: 'latest',
  srcDir: 'server',
  imports: false,
  scheduledTasks: {
    // Run `test:test` task every minute
    '*/5 * * * * *': ['test:test'],
  },
  experimental: {
    websocket: true,
    tasks: true,
    database: true,
  },
  storage: {
    db: {
      driver: 'fs',
      base: './data/db',
    },
  },
});
