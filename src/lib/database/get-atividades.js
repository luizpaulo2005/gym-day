const getAtividades = async (database) => {
  const rows = await database.getAllAsync("SELECT * FROM atividades")

  const atividades = rows.map((row) => ({
    id: row.id,
    titulo: row.titulo,
    descricao: row.descricao,
    carga: row.carga,
    series: row.series,
    repeticoes: row.repeticoes,
    data: row.data,
    foto: row.foto,
  }))

  return atividades
}

export { getAtividades }