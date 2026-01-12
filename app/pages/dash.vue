<script lang="ts" setup>
import type { Chart } from '@/../shared/types'

const user = useSupabaseUser()
const { getChartFromId } = useSupabaseAPI()
const { addChart } = useDexie()

// tab titles
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

const aspects = ref<object[] | undefined>(undefined)
const mounted = ref(false)
const chartData = ref<Chart | null>(null)

// now run indexedDB functions
// If the user is authenicated but on a different device, we need to fetch from Supabase instead
// and sync to indexedDB
onMounted(async () => {
  let dexieChart = await db.charts.toArray()

  if (!dexieChart || dexieChart.length === 0) {
    // sync with Supabase here if needed
    if (user.value?.sub) {
      const { data, error } = await getChartFromId(user.value.sub)

      if (error) {
        console.error('Error fetching chart from Supabase:', error)
      }

      const chart = { chart: JSON.parse(data?.[0]?.chart_data) ?? null }
      await addChart(chart.chart)
      dexieChart = await db.charts.toArray()

      if (dexieChart[0] === undefined) throw new Error('db.charts.add returned undefined')

      console.log('Dexie charts after sync:', dexieChart[0].chartrow.chart.aspects)

      chartData.value = dexieChart[0].chartrow

      // console.log('Dexie newly inserted chart:', chartData.value)
      if (chartData.value) {
        console.log('Chart data from Supabase synced to IndexedDB.', chartData.value)
        aspects.value = dexieChart[0].chartrow.chart.aspects ?? undefined
        mounted.value = true
      }
    }
  } else {
    console.log(`Found ${dexieChart.length} chart(s) in indexedDB.`)

    chartData.value = dexieChart[0] ?? null

    console.log('Dexie stored Chart:', dexieChart[0])
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
            <!-- <PlanetAspectList :chart-aspects="aspects" /> -->
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
