import { d as defineEventHandler, u as useDatabase } from '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'anymatch';
import 'node:crypto';

const db = defineEventHandler(async () => {
  const db = useDatabase("users");
  await db.sql`DROP TABLE IF EXISTS users`;
  await db.sql`CREATE TABLE IF NOT EXISTS users ("id" TEXT PRIMARY KEY, "firstName" TEXT, "lastName" TEXT, "email" TEXT)`;
  const userId = String(Math.round(Math.random() * 1e4));
  await db.sql`INSERT INTO users VALUES (${userId}, 'John', 'Doe', '')`;
  const { rows } = await db.sql`SELECT * FROM users WHERE id = ${userId}`;
  return {
    rows
  };
});

export { db as default };
//# sourceMappingURL=db.mjs.map
