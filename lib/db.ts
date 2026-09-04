import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
export const db = createClient({ url: url || "file:local.db", ...(authToken ? { authToken } : {}) });

export async function initDb() {
  await db.batch([
    `CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT, phone TEXT, email TEXT, address TEXT, social_media TEXT, notes TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT, title TEXT NOT NULL, description TEXT, assigned_to TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, due_date TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', priority TEXT NOT NULL DEFAULT 'normal', comments TEXT, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS activity_updates (id INTEGER PRIMARY KEY AUTOINCREMENT, activity_id INTEGER NOT NULL REFERENCES activities(id) ON DELETE CASCADE, comment TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS designers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT, role TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS activity_attachments (id INTEGER PRIMARY KEY AUTOINCREMENT, activity_id INTEGER NOT NULL REFERENCES activities(id) ON DELETE CASCADE, update_id INTEGER REFERENCES activity_updates(id) ON DELETE CASCADE, filename TEXT NOT NULL, mime_type TEXT NOT NULL, data TEXT NOT NULL, size INTEGER NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE INDEX IF NOT EXISTS idx_attachments_activity ON activity_attachments(activity_id)`,
    `CREATE INDEX IF NOT EXISTS idx_activities_client ON activities(client_id)`, `CREATE INDEX IF NOT EXISTS idx_activities_due ON activities(due_date)`, `CREATE INDEX IF NOT EXISTS idx_updates_activity ON activity_updates(activity_id)`
  ], "write");
  try { await db.execute("ALTER TABLE activities ADD COLUMN assigned_to TEXT"); } catch { /* existing databases already migrated */ }
}
