import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Initialize the database
let db: Database | null = null;

export async function getDb() {
  if (db) {
    return db;
  }

  const dbPath = path.join(process.cwd(), 'registrations.db');
  
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS registrants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      organization TEXT,
      jobTitle TEXT,
      country TEXT,
      dietaryRequirements TEXT,
      accessibilityNeeds TEXT,
      registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}
