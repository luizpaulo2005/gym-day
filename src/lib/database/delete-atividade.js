const deleteAtividade = async (db, id) => {
    const statement = await db.prepareAsync(`
        DELETE FROM atividades WHERE id = $id
    `);

    try {
        await statement.executeAsync({
            $id: id
        });
    } catch (error) {
        console.error('Erro ao deletar atividade', error);
        throw new Error('Erro ao deletar atividade: ' + error.message);
    } finally {
        await statement.finalizeAsync();
    }
}

export { deleteAtividade };