import { useRef, useState } from 'react'
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import Button from '@/components/button'
import Input from '@/components/input'
import { styles } from '@/styles'
import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import * as SQLite from 'expo-sqlite'
import { createAtividade } from '@/lib/database/create-atividade'

const db = SQLite.openDatabaseSync('gymday.db')

const Page = () => {
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [permission, requestPermission] = useCameraPermissions()
  const [facing, setFacing] = useState('back')
  const cameraRef = useRef(null)

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [carga, setCarga] = useState('')
  const [series, setSeries] = useState('')
  const [repeticoes, setRepeticoes] = useState('')
  const [foto, setFoto] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const handleTakePicture = async () => {
    if (!cameraRef.current) return

    const photo = await cameraRef.current.takePictureAsync({ base64: true })
    setPhoto(photo.uri)
    setFoto(photo.base64)
    setModalVisible(false)
  }

  const handleCreateAtividade = async () => {
    const errors = {}

    if (!titulo.trim()) errors.titulo = 'Título é obrigatório'
    if (!carga.trim()) errors.carga = 'Carga é obrigatória'
    if (!series.trim()) errors.series = 'Séries são obrigatórias'
    if (!repeticoes.trim()) errors.repeticoes = 'Repetições são obrigatórias'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})

    if (!repeticoes) {
      setFormErrors((prev) => ({
        ...prev,
        repeticoes: 'Repetições são obrigatórias',
      }))
      return
    }

    const atividade = {
      titulo,
      descricao,
      carga: parseFloat(carga),
      series: parseInt(series, 10),
      repeticoes: parseInt(repeticoes, 10),
      data: new Date().toISOString(),
      foto,
    }

    try {
      await createAtividade(db, atividade)
      setTitulo('')
      setDescricao('')
      setCarga('')
      setSeries('')
      setRepeticoes('')
      setFoto('')
      router.push('/')
    } catch (error) {
      console.error('Erro ao criar atividade:', error)
    } 
  }

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
        <Text style={styles.title}>Nova atividade</Text>
      </View>

      <ScrollView
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={{ gap: 8, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.label}>Título da atividade</Text>
          <Input
            placeholder="Ex: Supino reto"
            value={titulo}
            onChangeText={setTitulo}
          />
          {formErrors.titulo && (
            <Text style={styles.error}>{formErrors.titulo}</Text>
          )}
        </View>

        <View>
          <Text style={styles.label}>Descrição</Text>
          <Input
            multiline
            numberOfLines={4}
            inputStyle={{ textAlignVertical: 'top' }}
            placeholder="Ex: Supino reto com barra"
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        <View>
          <Text style={styles.label}>Carga</Text>
          <Input
            placeholder="Ex: 20kg"
            keyboardType="numeric"
            autoCapitalize="none"
            value={carga}
            onChangeText={setCarga}
          />
          {formErrors.carga && (
            <Text style={styles.error}>{formErrors.carga}</Text>
          )}
        </View>

        <View>
          <Text style={styles.label}>Séries</Text>
          <Input
            placeholder="Ex: 3"
            keyboardType="numeric"
            autoCapitalize="none"
            value={series}
            onChangeText={setSeries}
          />
          {formErrors.series && (
            <Text style={styles.error}>{formErrors.series}</Text>
          )}
        </View>

        <View>
          <Text style={styles.label}>Repetições</Text>
          <Input
            placeholder="Ex: 10"
            keyboardType="numeric"
            autoCapitalize="none"
            value={repeticoes}
            onChangeText={setRepeticoes}
          />
          {formErrors.repeticoes && (
            <Text style={styles.error}>{formErrors.repeticoes}</Text>
          )}
        </View>

        <View>
          <Text style={styles.label}>Foto</Text>
          {photo && (
            <Image
              source={{ uri: photo }}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 8,
                marginBottom: 8,
              }}
              resizeMode="cover"
            />
          )}
          <Button
            title="Adicionar foto"
            variant="secondary"
            onPress={() => {
              if (!permission?.granted) {
                requestPermission()
              } else {
                setModalVisible(true)
              }
            }}
          />
        </View>

        <Button
          title="Adicionar atividade"
          onPress={() => handleCreateAtividade()}
        />
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <CameraView
            ref={cameraRef}
            style={{ flex: 1 }}
            facing={facing}
            mirror
          />
          <View
            style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}
          >
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button title="Tirar foto" onPress={handleTakePicture} />
              <Button
                title="Mudar câmera"
                onPress={() => {
                  setFacing((prev) => (prev === 'back' ? 'front' : 'back'))
                }}
              />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Page
