import { d as defineEventHandler, b as useStorage } from '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'anymatch';
import 'node:crypto';

const storge = defineEventHandler(async () => {
  await useStorage().setItem("test:foo", { hello: "worldwww" });
  const item = await useStorage().getItem("test:foo");
  console.log(item);
  return item;
});

export { storge as default };
//# sourceMappingURL=storge.mjs.map
