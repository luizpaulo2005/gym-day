const createAtividade = async (
  db,
  { titulo, descricao, carga, series, repeticoes, data, foto }
) => {
  const statement = await db.prepareAsync(`
    INSERT INTO atividades (
      titulo, descricao, carga, series, repeticoes, data, foto
    ) VALUES (
      $titulo, $descricao, $carga, $series, $repeticoes, $data, $foto
    )
  `)

  try {
    await statement.executeAsync({
      $titulo: titulo,
      $descricao: descricao,
      $carga: carga,
      $series: series,
      $repeticoes: repeticoes,
      $data: data,
      $foto: foto,
    })
    console.log('Atividade criada com sucesso')
  } catch (error) {
    console.error('Erro ao criar atividade', error)
    throw new Error('Erro ao criar atividade: ' + error.message)
  } finally {
    await statement.finalizeAsync()
  }
}

export { createAtividade }
