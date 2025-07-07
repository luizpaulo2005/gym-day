const createTable = async (database) => {
  await database.execAsync(`
        CREATE TABLE IF NOT EXISTS atividades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            carga REAL NOT NULL,
            series INTEGER NOT NULL,
            repeticoes INTEGER NOT NULL,
            data TEXT NOT NULL,
            foto TEXT
        )
        `)
}

export { createTable }
