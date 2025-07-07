import { createTable } from '@/lib/database/create-table'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseSync('gymday.db')

export default function Layout() {
  useEffect(() => {
    createTable(db)
  }, [])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
