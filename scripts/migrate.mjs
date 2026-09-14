import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";

const DATABASE_URL = process.env.DATABASE_URL || "file:./data/hekimtas.db";

if (DATABASE_URL.startsWith("file:")) {
  const filePath = DATABASE_URL.slice("file:".length);
  fs.mkdirSync(path.dirname(path.resolve(filePath)), { recursive: true });
}

const client = createClient({
  url: DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

await client.execute(
  "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)",
);

const migrationsDir = path.join(process.cwd(), "drizzle");
const files = fs
  .readdirSync(migrationsDir)
  .filter((name) => name.endsWith(".sql"))
  .sort();

for (const file of files) {
  const alreadyApplied = await client.execute({
    sql: "SELECT 1 FROM _migrations WHERE name = ?",
    args: [file],
  });
  if (alreadyApplied.rows.length > 0) continue;

  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
  const statements = sql
    .split("--> statement-breakpoint")
    .map((statement) => statement.trim())
    .filter((statement) => statement && statement.toLowerCase() !== "pragma optimize;");

  for (const statement of statements) {
    await client.execute(statement);
  }

  await client.execute({ sql: "INSERT INTO _migrations (name) VALUES (?)", args: [file] });
  console.log(`Uygulandı: ${file}`);
}

console.log(`Veritabanı migrasyonları uygulandı: ${DATABASE_URL}`);
