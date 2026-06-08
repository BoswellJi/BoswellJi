import { e as eventHandler, g as getQuery } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'anymatch';
import 'node:crypto';

const hello = eventHandler((event) => {
  const name = getQuery(event).name || "World";
  return {
    message: `Hello, ${name}!`
  };
});

export { hello as default };
//# sourceMappingURL=hello.mjs.map
