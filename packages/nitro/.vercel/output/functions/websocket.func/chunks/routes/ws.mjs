import { f as defineWebSocketHandler } from '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'anymatch';
import 'node:crypto';

const ws = defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer);
  },
  message(peer, message) {
    console.log("[ws] message", peer, message);
    if (message.text().includes("ping")) {
      peer.send("pong");
    }
  },
  close(peer, event) {
    console.log("[ws] close", peer, event);
  },
  error(peer, error) {
    console.log("[ws] error", peer, error);
  }
});

export { ws as default };
//# sourceMappingURL=ws.mjs.map
