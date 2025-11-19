<script setup>
const props = defineProps({
  chartData: Object
})

// Will change to something more prosaic and predictable later on when making chart more interactive
const randomId = (length = 6) => Math.random().toString(36).substring(2, length + 2)
const chartId = randomId()

const chartAsc = props.chartData.chart.houses.asc
const chartHouses = props.chartData.chart.houses
const chartAspects = props.chartData.chart.aspects
const chartPlanets = props.chartData.chart.planets
</script>

<template>
  <div class="p-4 w-full md:w-3/5">
    <svg
      :id="'chart-svg-' + chartId"
      viewBox="-225 -225 450 450"
    >
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
