import { d as defineEventHandler, c as createEventStream } from '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'anymatch';
import 'node:crypto';

const sse = defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);
  const interval = setInterval(async () => {
    await eventStream.push(`Message @ ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}`);
  }, 1e3);
  eventStream.onClosed(async () => {
    clearInterval(interval);
    await eventStream.close();
  });
  return eventStream.send();
});

export { sse as default };
//# sourceMappingURL=sse.mjs.map
