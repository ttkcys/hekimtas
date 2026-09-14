import { sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteContent = sqliteTable("site_content", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedBy: text("updated_by").notNull().default("system"),
});

export const contentRevisions = sqliteTable(
  "content_revisions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    key: text("key").notNull(),
    value: text("value").notNull(),
    author: text("author").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_content_revisions_key_created").on(table.key, table.createdAt)],
);

export const inquiries = sqliteTable(
  "inquiries",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    company: text("company").notNull().default(""),
    phone: text("phone").notNull().default(""),
    email: text("email").notNull().default(""),
    service: text("service").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("new"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_inquiries_status_created").on(table.status, table.createdAt)],
);

export const mediaAssets = sqliteTable(
  "media_assets",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    key: text("key").notNull().unique(),
    filename: text("filename").notNull(),
    contentType: text("content_type").notNull(),
    size: integer("size").notNull(),
    data: text("data").notNull(),
    uploadedBy: text("uploaded_by").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [index("idx_media_assets_created").on(table.createdAt)],
);
