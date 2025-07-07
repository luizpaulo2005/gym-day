import { Button } from '@/components/button'
import { ExerciseCard } from '@/components/exercise-card'
import { styles } from '@/styles'
import { useRouter } from 'expo-router'

import { ScrollView, Text, View } from 'react-native'

const Page = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { marginTop: 16 }]}>GymDay</Text>
      <View style={{ flexDirection: 'row', gap: 8, maxWidth: '100%', justifyContent: 'space-between' }}>
        <Button
        title="Adicionar atividade"
        onPress={() => router.navigate('/nova-atividade')}
      />
        <Button
          title="Gerenciar exercícios"
          onPress={() => router.navigate('/exercicios')}
          variant="secondary"
        />
      </View>
      <ScrollView style={{ width: '100%' }}>
          <ExerciseCard id="1" title="Supino Reto" />
        </ScrollView>
    </View>
  )
}

export default Page
