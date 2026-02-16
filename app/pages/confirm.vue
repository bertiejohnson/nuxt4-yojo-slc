<!-- Handles the email/password signup callback from Supabase -->
<script setup>
const user = useSupabaseUser()
const client = useSupabaseClient()
const { addDexieChart, getDexieChart } = useDexie()

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

  const chartToStore = chartData // this data gets inserted into indexedDB storage
  const chartJSON = JSON.stringify(chartData) // this data goes into supabase db chart table - insertChart()

  console.log('Generated chart data:', chartData)
  console.log('Chart to store in IndexedDB:', chartToStore)

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

  await navigateTo('/dash')
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
      chart: chart
    })
    .select()
  if (error) console.error(error)

  return { data, status, statusText, error }
}

async function runIndexedDB(chartData) {
  let status = ''
  try {
    const retval = await addDexieChart(chartData, user.value.sub)
    status = `Chart successfully added (in confirm.vue) to IndexedDB with return val of ${retval} - testing if this is the id of the added chart or something else`
  } catch (error) {
    status = `Failed to add chart (in confirm.vue) to IndexedDB: ${error}`
  }

  console.log(status)
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
