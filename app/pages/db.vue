<script lang="ts" setup>
import { openDB } from 'idb'

const items = [
  {
    label: 'Active',
    slot: 'active'
  },
  {
    label: 'Upcoming',
    slot: 'upcoming'
  },
  {
    label: 'Planets',
    slot: 'planets'
  }
]

let chartData = null
const aspectProp = ref({})

// now run indexedDB functions
if (import.meta.client) {
  const storeName = 'chartStore2'

  const db = await openDB('ReddogDB')
  chartData = await db.get(storeName, 1)
  if (chartData) setProps(chartData)
}

function setProps(chartData) {
  aspectProp.value = {
    aspectType: chartData.chart.aspects[0].name,
    planetOne: chartData.chart.aspects[0].planetOne_swisseph_id + 1,
    planetTwo: chartData.chart.aspects[0].planetTwo_swisseph_id + 1
  }
  console.log(aspectProp.value)
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
        <template #active>
          <div class="px-1">
            Active
          </div>
        </template>
        <template #upcoming>
          <div class="px-1">
            Upcoming
          </div>
        </template>
        <template #planets>
          <div class="px-1">
            Planet
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style>

</style>
