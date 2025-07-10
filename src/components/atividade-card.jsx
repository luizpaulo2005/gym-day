import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

const AtividadeCard = ({ id, titulo }) => {
  const router = useRouter()

  return (
    <TouchableOpacity
      style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}
      onPress={() => router.push(`/${id}`)}
    >
      <Text>
        {id} - {titulo}
      </Text>
    </TouchableOpacity>
  )
}

export { AtividadeCard }
