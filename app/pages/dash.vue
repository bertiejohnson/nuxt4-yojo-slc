<script lang="ts" setup>
import type { Chart, ChartRow, ChartAspect } from '@/../shared/types'

const user = useSupabaseUser()
const { getChartFromId } = useSupabaseAPI()
const { addDexieChart, getDexieChart } = useDexie()

const aspects = ref<ChartAspect[]>()
const mounted = ref(false)
const chartData = ref<Chart | null>(null)
const planetAspects = ref<ChartAspect[]>([])

const showPlanetButtons = ref(true)
const showChart = ref(true)

const showAspectList = ref(false)

const colOnePlanet = ref<string>()
const colTwoPlanet = ref<string>()

function isChartAspectArray(data: unknown): data is ChartAspect[] {
  return Array.isArray(data) && data.every(item =>
    'planetOneName' in item && 'aspectName' in item && 'planetTwoName' in item
  )
}

function showAspects(planetName: string, fromKeywords = false) {
  if (!aspects.value) return
  planetAspects.value = aspects.value.filter((aspect) => {
    return aspect.planetOneName === planetName
  })
  showAspectList.value = true
  if (fromKeywords) {
    showPlanetButtons.value = true
    showChart.value = true
  }
}

function showKeywords(planetOne: string, planetTwo: string) {
  colOnePlanet.value = planetOne
  colTwoPlanet.value = planetTwo

  showAspectList.value = false
  showPlanetButtons.value = false
  showChart.value = false
}

onMounted(async () => {
  let dexieChart: (ChartRow[] | undefined) = undefined

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

        let parsed: (Chart | null) = null

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
          if (isChartAspectArray(chartData.value.chart?.aspects)) {
            aspects.value = chartData.value.chart.aspects
          } else {
            aspects.value = [] // Fallback for type safety
          }
          mounted.value = true
        } else {
          console.log('No chart data retrieved from Supabase.')
        }
      }
    } else if (dexieChart[0] && dexieChart.length > 0) {
      if (isChartAspectArray(dexieChart[0].chart.chart?.aspects)) {
        aspects.value = dexieChart[0].chart.chart.aspects
      } else {
        aspects.value = [] // Fallback for type safety
      }
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
    <div
      v-if="showChart"
      class="w-80 mt-8"
    >
      <chart-builder
        v-if="chartData"
        :chart-data="chartData"
      />
    </div>
    <PlanetButtons
      v-if="showPlanetButtons"
      @show-aspects="showAspects"
    />
    <PlanetAspectList
      v-if="showAspectList"
      :aspect-data="planetAspects"
      @show-keywords="showKeywords"
    />
    <PlanetsAspectKeywords
      v-if="!showPlanetButtons && !showAspectList"
      :planet-one="colOnePlanet || ''"
      :planet-two="colTwoPlanet || ''"
      @show-aspects="showAspects"
    />
  </div>
</template>

<style>

</style>
