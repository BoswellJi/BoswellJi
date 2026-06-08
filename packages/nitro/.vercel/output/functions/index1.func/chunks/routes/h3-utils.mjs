import { e as eventHandler } from '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'anymatch';
import 'node:crypto';

const h3Utils = eventHandler((event) => {
  return `
      <meta charset="utf-8"> 
      url: {${event.req.url}}
      <h1>This is your brand new Nitro project \u{1F680} </h1>
      <p>Get started by editing the <code>server/routes/index.ts</code> file.</p>
      <p>Learn more from \u{1F4D6} <a href="https://nitro.build/guide" target="_blank">Nitro Documentation</a></p>
    `;
});

export { h3Utils as default };
//# sourceMappingURL=h3-utils.mjs.map
