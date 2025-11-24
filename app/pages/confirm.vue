<!-- Handles the email/password signup callback from Supabase -->
<script setup>
import { openDB } from 'idb'

const user = useSupabaseUser()
const client = useSupabaseClient()

const userIsAuthenticated = async (userBirthData) => {
  const chartData = await $fetch('/api/generate-chart', {
    query: {
      type: 'natal',
      date: userBirthData.date,
      time: userBirthData.time,
      lng: userBirthData.lng,
      long: userBirthData.lat
    }
  })

  const chartToStore = { chart: chartData } // this data gets inserted into indexedDB storage
  const chartJSON = JSON.stringify(chartData) // this data goes into supabase db chart table - insertChart()

  const profileData = await updateProfile(
    userBirthData,
    user.value.sub
  )

  if (profileData.status === 200) {
    await insertChart(user.value.sub, chartJSON)
  }

  if (import.meta.client) {
    await runIndexedDB(chartToStore)
  }

  await navigateTo('/db')
}

// So, now update profile and chart tables
async function updateProfile(userBirthData, id) {
  const { data, status, statusText, error } = await client
    .from('profiles')
    .update({ birth_data: userBirthData, first_name: 'Darin' })
    .eq('id', id)
    .select()

  if (error) console.error(error)

  return { data, status, statusText, error }
}

async function insertChart(id, chart) {
  const { data, status, statusText, error } = await client
    .from('charts')
    .insert({
      profile_id: id,
      chart_type: 'natal',
      chart_data: chart
    })
    .select()
  if (error) console.error(error)

  return { data, status, statusText, error }
}

async function runIndexedDB(chartToStore) {
  console.log('CHART TO STORE', chartToStore)
  const dbName = 'ReddogDB'
  const version = 2
  const storeName = 'chartStore2'

  // create DB and store
  const db = await openDB(dbName, version, {
    upgrade(db) {
      const store = db.createObjectStore(storeName, {
        autoIncrement: true
      })
    }
  })
  await db.add(storeName, chartToStore.chart)
}

watch(
  user,
  () => {
    if (user.value) {
      userIsAuthenticated(user.value.user_metadata.user_birth_data)
    }
  }
)
</script>

<template>
  <div>Waiting for login...</div>
</template>
