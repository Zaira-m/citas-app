import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  SQLiteConnection,
  SQLiteDBConnection,
  CapacitorSQLite
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private isReady = false;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async init() {
    if (this.isReady) return;

    // (Opcional)web/Android
    const platform = Capacitor.getPlatform();

    this.db = await this.sqlite.createConnection(
      'quotes_db',
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const query = `
      CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        author TEXT NOT NULL
      );
    `;

    await this.db.execute(query);
    this.isReady = true;
  }

  async addQuote(text: string, author: string) {
    const query = `INSERT INTO quotes (text, author) VALUES (?, ?)`;
    await this.db.run(query, [text, author]);
  }

  async getQuotes() {
  const result = await this.db.query(`
    SELECT id, text AS phrase, author
    FROM quotes
    ORDER BY id DESC
  `);

  return result.values ?? [];
}


  async deleteQuote(id: number) {
    const query = `DELETE FROM quotes WHERE id = ?`;
    await this.db.run(query, [id]);
  }
}
