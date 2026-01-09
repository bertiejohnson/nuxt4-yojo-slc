<script lang="ts" setup>
// dashboard page showing chart data from indexedDB
const user = useSupabaseUser()
const client = useSupabaseClient()

interface ChartObject {
  aspects?: object[]
  houses?: object
  planets?: object
  signs?: object
}

interface ChartRow {
  id?: number
  chart: ChartObject
  supabaseId: string
  name: string
  birthdate: string
  birthtime: string
  birthplace: string
}

const items = [
  {
    label: 'Planet Aspects',
    slot: 'planets'
  },
  {
    label: 'Transits',
    slot: 'transits'
  }
]

async function runIndexedDB(chartData: { chart: ChartObject }) {
  let status = ''
  try {
    const retval = await db.charts.add({
      chart: chartData.chart
    })
    const test = await db.transits.add({
      chartId: retval,
      transitData: 'Sample transit data'
    })

    status = `Chart successfully added to IndexedDB with id ${retval} and transit id ${test}`
  } catch (error) {
    status = `Failed to add chart to IndexedDB: ${error}`
  }

  console.log(status)
}

const aspects = ref<object[] | undefined>(undefined)
const mounted = ref(false)
const chartData = ref<ChartRow | null>(null)

// now run indexedDB functions
// If the user is authenicated but on a different device, we need to fetch from Supabase instead
// and sync to indexedDB
onMounted(async () => {
  const dexieChart = await db.charts.toArray()
  if (!dexieChart || dexieChart.length === 0) {
    // sync with Supabase here if needed
    const { data, error } = await client
      .from('charts')
      .select('chart_data')
      .eq('profile_id', user.value?.user_metadata.sub)
      .order('id', { ascending: false })
      .limit(1)
    const chartData = JSON.parse(data?.[0]?.chart_data) ?? null
    if (import.meta.client) {
      await runIndexedDB({ chart: chartData.chart })
      chartData.value = dexieChart[0] ?? null

      console.log('Dexie Chart from liveQuery:', chartData.value)
      if (chartData.value) {
        aspects.value = chartData.value.chart.aspects ?? undefined
        mounted.value = true
      }
    }
  } else {
    console.log(`Found ${dexieChart.length} chart(s) in indexedDB.`)

    chartData.value = dexieChart[0] ?? null

    console.log('Dexie Chart from liveQuery:', chartData.value)
    if (chartData.value) {
      aspects.value = chartData.value.chart.aspects ?? undefined
      mounted.value = true
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-full -mt-8">
      <chart-builder
        v-if="chartData"
        :chart-data="chartData"
      />
    </div>
    <div class="w-full px-4">
      <UTabs
        variant="pill"
        :items="items"
        :ui="{ trigger: 'grow' }"
      >
        <template #planets>
          <div v-if="mounted">
            <PlanetAspectList :chart-aspects="aspects" />
          </div>
          <div v-else>
            Loading aspects...
          </div>
        </template>
        <template #transits>
          <div class="px-1">
            Transits
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style>

</style>
