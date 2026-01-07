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

  // Check if we need to migrate (add columns or fix email constraint)
  const columns = await db.all('PRAGMA table_info(registrants)');
  
  // If table doesn't exist, create it with new schema
  if (columns.length === 0) {
      await db.exec(`
        CREATE TABLE registrants (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          firstName TEXT NOT NULL,
          lastName TEXT NOT NULL,
          email TEXT UNIQUE,
          phone TEXT,
          organization TEXT,
          jobTitle TEXT,
          country TEXT,
          fieldVisit BOOLEAN DEFAULT 0,
          fieldVisitLocation TEXT,
          registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
  } else {
      // Check for new columns
      const hasFieldVisit = columns.some(c => c.name === 'fieldVisit');
      const emailColumn = columns.find(c => c.name === 'email');
      const isEmailNotNull = emailColumn?.notnull === 1;

      // If we need to migrate (missing columns or email is NOT NULL)
      if (!hasFieldVisit || isEmailNotNull) {
          console.log('Migrating database schema...');
          
          await db.exec('BEGIN TRANSACTION');
          
          try {
              // Create new table with correct schema
              await db.exec(`
                CREATE TABLE registrants_new (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT,
                  firstName TEXT NOT NULL,
                  lastName TEXT NOT NULL,
                  email TEXT UNIQUE,
                  phone TEXT,
                  organization TEXT,
                  jobTitle TEXT,
                  country TEXT,
                  fieldVisit BOOLEAN DEFAULT 0,
                  fieldVisitLocation TEXT,
                  registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP
                )
              `);

              // Copy data
              // We construct the INSERT dynamically based on what columns existed
              // But standard columns (title...registrationDate) should be there.
              // Note: fieldVisit and fieldVisitLocation will be null/default for old records.
              await db.exec(`
                INSERT INTO registrants_new (
                    id, title, firstName, lastName, email, phone, organization, 
                    jobTitle, country, registrationDate
                )
                SELECT 
                    id, title, firstName, lastName, email, phone, organization, 
                    jobTitle, country, registrationDate
                FROM registrants
              `);

              await db.exec('DROP TABLE registrants');
              await db.exec('ALTER TABLE registrants_new RENAME TO registrants');
              
              await db.exec('COMMIT');
              console.log('Migration successful');
          } catch (error) {
              console.error('Migration failed:', error);
              await db.exec('ROLLBACK');
              throw error;
          }
      }
  }

  // Check for users table and create/seed if necessary
  const userColumns = await db.all('PRAGMA table_info(users)');
  if (userColumns.length === 0) {
      await db.exec(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'media',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      // Seed default admin
      await db.run(
          'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
          'admin', 'pass', 'admin'
      );
      console.log('Users table created and seeded with default admin.');
  }

  return db;
}
