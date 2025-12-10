<script setup lang="ts">
const { data, error } = await useFetch('/api/generate-chart', {
  query: {
    type: 'now'
  }
})

const chartFetchError = ref(null)

if (error.value) {
  chartFetchError.value = 'Oops! There was an error fetching your chart data :('
  console.error('Oops! There was an error fetching chart data :(', error.value)
  // log the error - date/time, error message, stack trace etc. Or use a logging service like Sentry
}

const nowChartData = data.value

const headingString = nowChartData.chart.aspects[0].planetPair
  .split('_')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(` ${nowChartData.chart.aspects[0].aspectName} `)

// Adding 1 to match the planet IDs in the keywords JSON
// because swisseph_id starts from 0
// This is a temporary fix until the backend is updated
const aspectProp = {
  aspectType: nowChartData.chart.aspects[0].aspectName,
  planetOne: nowChartData.chart.aspects[0].planetOne_swisseph_id,
  planetTwo: nowChartData.chart.aspects[0].planetTwo_swisseph_id
}

const links = ref([
  {
    label: 'Create your chart',
    to: '/create-chart',
    icon: 'i-lucide-square-play'
  },
  {
    label: 'Learn more',
    to: '#learn_more'
  }
])
</script>

<template>
  <div>
    <UPageHero
      title="A Unique Approach To Your Chart"
      :links="links"
      class=" min-h-screen"
    >
      <template #body>
        <div v-if="chartFetchError" class="mb-4 max-w-2xl">
          <p>
            {{ chartFetchError }}
          </p>
        </div>
        <div v-else>
          <ChartBuilder
            :chart-data="nowChartData"
          />
        </div>
        <div>
          <div class="text-lg font-bold mb-1 -mt-3">
            {{ headingString }}
          </div>
        </div>
        <div class="relative -mt-4 h-30 flex items-center justify-center overflow-hidden">
          <PageHeroKeywords
            :aspect="aspectProp"
          />
        </div>
      </template>
    </UPageHero>

    <USeparator />

    <UPageSection
      id="#learn_more"
      class="mt-12 bg-gray-100 min-h-screen"
    >
      <div>Learn More</div>
    </UPageSection>
  </div>
</template>
