import { type SQLiteDatabase } from "expo-sqlite";

const initializeDatabase = async (database: SQLiteDatabase) => {
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS Pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        fome INTEGER,
        sono INTEGER,
        diversao INTEGER,
        imageUri TEXT
    );
    `)
}

export default initializeDatabase;