<script lang="ts" setup>
import { openDB } from 'idb'

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
          <div v-if="aspects" class="px-1">
            <PlanetAspectList :chart-aspects="aspects" />
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
