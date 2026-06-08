import { d as defineEventHandler } from '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'anymatch';
import 'node:crypto';

const websocket = defineEventHandler(() => {
  return $fetch(
    "https://raw.githubusercontent.com/unjs/crossws/main/examples/h3/public/index.html"
  );
});

export { websocket as default };
//# sourceMappingURL=websocket.mjs.map
