import { createClient } from "@libsql/client";
const db = createClient({ url: process.env.TURSO_DATABASE_URL || "file:local.db", ...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}) });
const statements = [
  `CREATE TABLE IF NOT EXISTS clients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT, phone TEXT, email TEXT, address TEXT, social_media TEXT, notes TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE RESTRICT, title TEXT NOT NULL, description TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, due_date TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'pending', priority TEXT NOT NULL DEFAULT 'normal', comments TEXT, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE TABLE IF NOT EXISTS activity_updates (id INTEGER PRIMARY KEY AUTOINCREMENT, activity_id INTEGER NOT NULL REFERENCES activities(id) ON DELETE CASCADE, comment TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`,
  `CREATE INDEX IF NOT EXISTS idx_activities_client ON activities(client_id)`, `CREATE INDEX IF NOT EXISTS idx_activities_due ON activities(due_date)`, `CREATE INDEX IF NOT EXISTS idx_updates_activity ON activity_updates(activity_id)`
];
await db.batch(statements.map(sql => ({ sql })), "write");
console.log("Studio Flow database ready.");
