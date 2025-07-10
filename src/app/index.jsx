import { Button } from '@/components/button'
import { AtividadeCard } from '@/components/atividade-card'
import { styles } from '@/styles'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

import { ScrollView, Text, View } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { getAtividades } from '@/lib/database/get-atividades'

const db = SQLite.openDatabaseSync('gymday.db')

const Page = () => {
  const router = useRouter()
  const [atividades, setAtividades] = useState([])

  useEffect(() => {
    const carregarAtividades = async () => {
      try {
        const data = await getAtividades(db)
        setAtividades(data)
      } catch (err) {
        console.error('Erro ao carregar atividades:', err)
      }
    }

    carregarAtividades()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginTop: 16 }]}>GymDay</Text>
      {atividades.length > 0 ? (
        <ScrollView style={{ width: '100%' }}>
          {atividades.map((atividade) => {
            return (
              <AtividadeCard
                key={atividade.id}
                id={atividade.id}
                titulo={atividade.titulo}
              />
            )
          })}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            Nenhuma atividade cadastrada
          </Text>
        </View>
      )}
      <Button
        title="Adicionar atividade"
        onPress={() => router.navigate('/nova-atividade')}
      />
    </View>
  )
}

export default Page
