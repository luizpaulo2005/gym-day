const getAtividades = async (database) => {
    const result = await database.getAllAsync("SELECT * FROM atividades")
    let atividades = []
    for (const row of result.rows) {
        atividades.push({
            id: row.id,
            titulo: row.titulo,
            descricao: row.descricao,
            carga: row.carga,
            series: row.series,
            repeticoes: row.repeticoes,
            data: row.data,
            foto: row.foto
        })
    }
    return atividades
}

export { getAtividades }