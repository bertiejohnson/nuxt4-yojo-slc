<script lang="ts" setup>
const sessionStore = useSessionStore()

const userNatalChart = ref(null)
const headingString = ref('test')
const aspectProp = ref({})

const generateChart = async (birthData) => {
  userNatalChart.value = await $fetch(
    // `http://127.0.0.1:8181/swetest.php?type=natal&date=${birthData.date}&time=${birthData.time}&lng=${birthData.lng}&lat=${birthData.lat}`
    // 'http://127.0.0.1:8181/swetest.php?type=now'
    'http://127.0.0.1:8181/swetest.php?type=natal&date=2025-10-28&time=16:00&lng=-1.10000&lat=50.54000'
  )

  const birthDataObj = { city: 'Wickham, Hampshire, England, United Kingdom', lng: -1.187081, lat: 50.90014, date: '2025-11-04', time: '12:59' }
  sessionStore.setBirthData(birthDataObj)

  if (userNatalChart.value) {
    headingString.value = userNatalChart.value.chart.aspects[0].planetPair
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(` ${userNatalChart.value.chart.aspects[0].aspectName} `)

    aspectProp.value = {
      aspectType: userNatalChart.value.chart.aspects[0].aspectName,
      planetOne: userNatalChart.value.chart.aspects[0].planetOne_swisseph_id + 1,
      planetTwo: userNatalChart.value.chart.aspects[0].planetTwo_swisseph_id + 1
    }
  }
}
</script>

<template>
  <div>
    <template v-if="!userNatalChart">
      <div class="flex flex-col items-center w-full">
        <h2 class="text-3xl font-bold mt-2">
          Create your natal chart
        </h2>
        <p class="my-5 text-center w-xs">
          Enter your birth details below to generate your personal natal chart
        </p>
        <div class="w-96 px-6">
          <BirthDataForm @generate-chart="generateChart" />
        </div>
      </div>
    </template>

    <template v-if="userNatalChart">
      <div>
        <ChartBuilder
          :chart-data="userNatalChart"
        />
        <div class="mx-auto px-3 text-center">
          <p>Here's your chart. Sign up to start using the keyword functions</p>
        </div>
        <SignUpButton />
      </div>
    </template>
  </div>
</template>

<style>

</style>
