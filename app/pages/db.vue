<script lang="ts" setup>
import { openDB } from 'idb'

const items = [
  {
    label: 'Planet Aspects',
    slot: 'planets'
  },
  {
    label: 'Upcoming',
    slot: 'upcoming'
  }
]

let chartData = null
const aspectProp = ref({})
let aspects = null

// now run indexedDB functions
if (import.meta.client) {
  const storeName = 'chartStore2'
  const db = await openDB('ReddogDB')
  chartData = await db.get(storeName, 1)
  if (chartData) {
    aspects = ref(chartData.chart.aspects)
  }
}
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <div class="mx-auto mt-4">
      <h2>Dashboard</h2>
    </div>
    <div class="w-full -mt-8">
      <chart-builder :chart-data="chartData" />
    </div>
    <div class="w-full px-4">
      <UTabs
        variant="pill"
        :items="items"
        :ui="{ trigger: 'grow' }"
      >
        <template #planets>
          <div class="px-1">
            <PlanetAspectList :chart-aspects="aspects" />
          </div>
        </template>
        <template #upcoming>
          <div class="px-1">
            Upcoming
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style>

</style>
