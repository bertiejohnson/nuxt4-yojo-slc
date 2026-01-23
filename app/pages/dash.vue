<script lang="ts" setup>
import type { Chart, ChartRow } from '@/../shared/types'

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

const user = useSupabaseUser()
const { getChartFromId } = useSupabaseAPI()
const { addDexieChart, getDexieChart } = useDexie()

const aspects = ref<object[] | undefined>(undefined)
const mounted = ref(false)
const chartData = ref<Chart | null>(null)

onMounted(async () => {
  let dexieChart: ChartRow[] | undefined = undefined

  try {
    dexieChart = await getDexieChart()

    if (!dexieChart || dexieChart.length === 0) {
      if (user.value?.sub) {
        const result = await getChartFromId(user.value.sub)

        if (!result) {
          console.error('No result returned from getChartFromId')
        }

        const { data, error } = result as { data: Chart[] | null, error: string | null }

        if (error) {
          console.error('Error fetching chart from Supabase:', error)
        }

        let parsed: Chart | null = null

        const raw = data?.[0]?.chart

        if (raw && typeof raw === 'string') {
          try {
            parsed = JSON.parse(raw)
          } catch (parseError) {
            console.error('Error parsing chart JSON from Supabase:', parseError)
          }
        }

        chartData.value = parsed

        if (chartData.value) {
          await addDexieChart(chartData.value, user.value.sub) // insert into IndexedDB via Dexie
          aspects.value = chartData.value.chart.aspects
          mounted.value = true
        } else {
          console.log('No chart data retrieved from Supabase.')
        }
      }
    } else if (dexieChart[0] && dexieChart.length > 0) {
      aspects.value = dexieChart[0].chart.chart.aspects
      chartData.value = dexieChart[0].chart
      mounted.value = true
    } else {
      console.log('No aspects!!')
    }
  } catch (error) {
    console.error('Error accessing IndexedDB:', error)
  }
})
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="w-full mt-8">
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
            <PlanetList :chart-aspects="aspects" />
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
