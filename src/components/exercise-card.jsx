import { Text, View } from 'react-native'

const ExerciseCard = ({ id, title }) => {
  return (
    <View>
      <Text>
        {id} - {title}
      </Text>
    </View>
  )
}

export { ExerciseCard }
