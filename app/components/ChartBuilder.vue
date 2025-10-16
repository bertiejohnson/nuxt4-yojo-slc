<template>
  <div class="p-4 w-full md:w-3/5">
    <svg
      id="chart-svg"
      viewBox="-225 -225 450 450">
      <ChartBuilderZodiacRing :chart-asc="chartAsc" />
      <circle
        cx="0"
        cy="0"
        r="146"
        fill="#fff"
        fill-opacity="0"
        stroke="#cffafe"
        stroke-width="40"
      />
      <ChartBuilderHouseRing :chart-houses="chartHouses" />
      <ChartBuilderPlanets :chart-planets="[chartPlanets, chartAsc]" />
      <ChartBuilderAspects
        :chart-aspects="[chartAspects, chartPlanets, chartAsc]"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  chartData: Object
})

// dev
// console.log('New Chart Houses', props.chartData.chart.houses)
// console.log('New Chart Aspect:', props.chartData.chart.aspects)
// console.log("New Chart Planets:", props.chartData.chart.planets)

const chartAsc = props.chartData.chart.houses.asc
const chartHouses = props.chartData.chart.houses
const chartAspects = props.chartData.chart.aspects
const chartPlanets = props.chartData.chart.planets
</script>
