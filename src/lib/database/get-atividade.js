const getAtividadeById = async (db, id) => {
  const result = await db.getFirstAsync(`SELECT * FROM atividades WHERE id = ?`, [id]);
  
  if (!result) {
    throw new Error(`Atividade com ID ${id} não encontrada`);
  }

  const atividade = {
    id: result.id,
    titulo: result.titulo,
    descricao: result.descricao,
    carga: result.carga,
    series: result.series,
    repeticoes: result.repeticoes,
    data: result.data,
    foto: result.foto
  };

  return atividade;
}

export { getAtividadeById }
