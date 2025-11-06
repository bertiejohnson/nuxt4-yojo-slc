<script lang="ts" setup>
import { openDB } from 'idb'

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
    <div>
      <div class="text-lg font-bold mb-1 -mt-3 flex items-center justify-center ">
        {{ headingString }}
      </div>
    </div>
    <div class="relative -mt-4 h-30 flex items-center justify-center overflow-hidden">
      <PageHeroKeywords
        :aspect="aspectProp"
      />
    </div>
  </div>
</template>

<style>

</style>
