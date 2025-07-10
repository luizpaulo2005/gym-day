import { getAtividadeById } from '@/lib/database/get-atividade'
import { styles } from '@/styles'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('gymday.db')

const Page = () => {
  const { id } = useLocalSearchParams()
  const [atividade, setAtividade] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const carregarAtividade = async () => {
      try {
        const atividade = await getAtividadeById(db, id)
        setAtividade(atividade)
      } catch (error) {
        console.error('Erro ao carregar atividade:', error)
      }
    }

    carregarAtividade()
  }, [])

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          marginTop: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft />
        </TouchableOpacity>
        <Text style={styles.title}>Detalhes da atividade</Text>
      </View>
      {atividade ? (
        <View>
          <Text style={styles.detailsTitle}>{atividade.titulo}</Text>
          {atividade.descricao && (
            <Text style={styles.detailsSubItems}>{atividade.descricao}</Text>
          )}
          <Text style={styles.detailsSubItems}>
            Carga: {atividade.carga} kg
          </Text>
          <Text style={styles.detailsSubItems}>Séries: {atividade.series}</Text>
          <Text style={styles.detailsSubItems}>
            Repetições: {atividade.repeticoes}
          </Text>
          <Text style={styles.detailsSubItems}>
            Data: {new Date(atividade.data).toLocaleString('pt-BR')}
          </Text>
          {atividade.foto && (
            <Image
              source={{ uri: `data:image/jpeg;base64,${atividade.foto}` }}
              style={{ width: '100%', height: 200, borderRadius: 8 }}
            />
          )}
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

export default Page
