<script lang="ts" setup>
const sessionStore = useSessionStore()

const userNatalChart = ref(null)
const headingString = ref('test')
const aspectProp = ref({})

const generateChart = async (birthData = null) => {
  // Testing dev purposes
  const url = ''
  const birthDataObj = null
  if (birthData) {
    birthDataObj = birthData
    url = `http://127.0.0.1:8181/swetest.php?type=natal&date=${birthData.date}&time=${birthData.time}&lng=${birthData.lng}&lat=${birthData.lat}`
  } else {
    birthDataObj = { city: 'Wickham, Hampshire, England, United Kingdom', lng: -1.187081, lat: 50.90014, date: '2025-11-04', time: '12:59' }
    url = 'http://127.0.0.1:8181/swetest.php?type=natal&date=2025-10-28&time=16:00&lng=-1.10000&lat=50.54000'
  }

  userNatalChart.value = await $fetch(
    url
  )

  sessionStore.setBirthData(birthDataObj)

  if (userNatalChart.value) {
    headingString.value = userNatalChart.value.chart.aspects[0].planetPair
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(` ${userNatalChart.value.chart.aspects[0]aspectName} `)

    aspectProp.value = {
      aspectType: userNatalChart.value.chart.aspects[0]aspectName,
      planetOne: userNatalChart.value.chart.aspects[0].planetOne_swisseph_id + 1,
      planetTwo: userNatalChart.value.chart.aspects[0].planetTwo_swisseph_id + 1
    }
  }
}
</script>

<template>
  <UPageSection
    id="birth_data_form"
    class="mt-12 bg-gray-100 min-h-screen"
  >
    <template v-if="!userNatalChart">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">
          Create your natal chart
        </h2>
        <p class="mb-6">
          Enter your birth details below to generate your personal natal chart
        </p>
        <BirthDataForm @generate-chart="generateChart" />
      </div>
    </template>

    <template v-if="userNatalChart">
      <div>
        <ChartBuilder
          :chart-data="userNatalChart"
        />
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
        <SignUpButton />
      </div>
    </template>
  </UPageSection>
</template>

<style>

</style>
