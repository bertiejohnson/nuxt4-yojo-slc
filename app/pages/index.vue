<script setup lang="ts">
const { data, error } = await useFetch('http://127.0.0.1:8181/swetest.php?type=now')
const links = ref([
  {
    label: 'Create your chart',
    to: '#birth_data_form',
    icon: 'i-lucide-square-play'
  },
  // {
  //   label: 'Learn more',
  //   to: '#learn_more',
  //   color: 'neutral',
  //   variant: 'subtle',
  //   trailingIcon: 'i-lucide-arrow-right'
  // }
])

// const config = useRuntimeConfig()
// console.log(config.public.apiBase)

if (error.value) {
  console.error('Error fetching chart data in index.vue:', error.value)
}

const nowChartData = data.value

const headingString = nowChartData.chart.aspects[0].planetpair
  .split('_')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(` ${nowChartData.chart.aspects[0].name} `)

// Adding 1 to match the planet IDs in the keywords JSON
// because swisseph_id starts from 0
// This is a temporary fix until the backend is updated
const aspectProp = {
  aspectType: nowChartData.chart.aspects[0].name,
  planetOne: nowChartData.chart.aspects[0].planetOne_swisseph_id + 1,
  planetTwo: nowChartData.chart.aspects[0].planetTwo_swisseph_id + 1
}
</script>

<template>
  <div>
    <UPageHero
      title="A Unique Approach To Your Chart"
      :links="links"
      class=" min-h-screen"
    >
      <template #body>
        <ChartBuilder
          :chart-data="nowChartData"
        />
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
    <ChartGeneratorSection />
  </div>
</template>
