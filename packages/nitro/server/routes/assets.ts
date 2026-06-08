import { eventHandler } from 'h3';
import { useStorage } from 'nitropack/runtime/internal/storage';

export default eventHandler(async () => {
  const data = await useStorage('assets:server').getItem(`data.json`);
  return data;
});
