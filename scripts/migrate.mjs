import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

const DATABASE_URL = process.env.DATABASE_URL || "file:./data/hekimtas.db";

if (DATABASE_URL.startsWith("file:")) {
  const filePath = DATABASE_URL.slice("file:".length);
  fs.mkdirSync(path.dirname(path.resolve(filePath)), { recursive: true });
}

const client = createClient({
  url: DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const db = drizzle(client);

await migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });

console.log(`Veritabanı migrasyonları uygulandı: ${DATABASE_URL}`);
