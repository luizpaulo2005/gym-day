import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 8,
    backgroundColor: '#d4d4d8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  error: {
    fontSize: 14,
    color: '#dc2626',
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  detailsSubItems: {
    fontSize: 16,
    color: '#4b5563',
  }
})

export { styles }
