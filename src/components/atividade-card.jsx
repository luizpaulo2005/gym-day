import { styles } from '@/styles'
import { useRouter } from 'expo-router'
import { Edit, Plus, Trash2 } from 'lucide-react-native'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { deleteAtividade } from '@/lib/database/delete-atividade'

const db = SQLite.openDatabaseSync('gymday.db')

const AtividadeCard = ({ id, titulo }) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteAtividade(db, id)
      router.push('/')
    } catch (error) {
      console.error('Erro ao deletar atividade:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text>
        {id} - {titulo}
      </Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'lightblue' }]}
          onPress={() => router.push(`/${id}`)}
        >
          <Plus />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'lightcoral' }]}
          onPress={() => handleDelete()}
          disabled={isDeleting}
        >
          <Trash2 />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'lightgreen' }]}
        >
          <Edit />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export { AtividadeCard }
