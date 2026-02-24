import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('giftlist.db')

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS reservas (
      id TEXT PRIMARY KEY NOT NULL,
      nombreRegalo TEXT,
      reservadoPor TEXT,
      lat REAL,
      lng REAL,
      fecha TEXT
    );
  `)
}

export const guardarReservaLocal = (id, nombreRegalo, reservadoPor, lat, lng) => {
  db.runSync(
    `INSERT OR REPLACE INTO reservas 
     (id, nombreRegalo, reservadoPor, lat, lng, fecha)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [id, nombreRegalo, reservadoPor, lat, lng, new Date().toISOString()]
  )
}

export const obtenerReservasLocales = () => {
  return db.getAllSync(`SELECT * FROM reservas;`)
}