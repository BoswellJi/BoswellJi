import { defineTask } from 'nitropack/runtime/internal/task';

export default defineTask({
  meta: {
    name: 'test:test',
    description: 'Run database migrations',
  },
  run() {
    console.log('Running DB migration task...');
    return { result: 'Success' };
  },
});
