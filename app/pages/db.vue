<script lang="ts" setup>
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
const chartData = ref(null)
const aspects = ref(null)
const mounted = ref(false)

// now run indexedDB functions
onMounted(async () => {
  chartData.value = await fetchChartFromIDB()
  if (chartData.value) {
    aspects.value = chartData.value.chart.aspects
    mounted.value = true
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
