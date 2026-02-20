<script setup lang="ts">
import type { Chart } from '@/../shared/types'

let chartSrc: Chart | null = null
// dynamically import the JSON file with an explicit type assertion
const jsonModule = (await import('~/assets/json/example-chart.json')) as unknown as { default: Chart }
chartSrc = jsonModule.default

let headingString = ''
let aspectProp = {
  aspectType: '',
  planetOne: 0,
  planetTwo: 0
}

const aspect = chartSrc?.chart?.aspects?.[1] // example aspect, you can choose any aspect from the chart - Sun square Jupiter at present

if (aspect) {
  headingString = aspect.planetPair
    .split('_')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(` ${aspect.aspectName} `)

  aspectProp = {
    aspectType: aspect.aspectName,
    planetOne: aspect.planetOne_swisseph_id,
    planetTwo: aspect.planetTwo_swisseph_id
  }
}

const links = ref([
  {
    label: 'Get your chart',
    to: '/create-chart',
    icon: 'i-lucide-square-play'
  },
  { // a button to a page section that explains the keyword analysis system that this app uses
    label: 'Learn more',
    to: '#learn-more'
  }
])
</script>

<template>
  <div>
    <UPageHero
      title="A Unique Approach To Understanding Your Chart"
      headline="Yojo Astro"
      :links="links"
      class="min-h-screen"
    >
      <template #body>
        <div class="mb-3">
          <ChartBuilder
            :chart-data="chartSrc"
          />
          <span class="text-xs text-muted-foreground -mt-4 mb-4 block">
            Example chart
          </span>
        </div>
        <div>
          <div class="text-base font-bold mb-1 -mt-3">
            <div class="">Sun square Jupiter</div>
          </div>
        </div>
        <div>
          Sun square Jupiter carries a restless friction — identity isn't big enough and must grow. It can demand reckless expansion. The tension is uncomfortable but alive.
        </div>
      </template>
    </UPageHero>
    <UPageSection
      id="learn-more"
      title="Explore Your Chart With Keywords"
      headline="Keyword Pairs"
      href="#learn-more"
    >
      <!-- Content to explain the app and its keyword analysis system -->
      <p class="mb-4">
        Yojo Astro uses a unique keyword analysis system to help you explore your chart. Each aspect in your chart is associated with a pair of keywords that capture the essence of the planetary interaction. These keywords are designed to be evocative and insightful, providing you with a deeper understanding of the energies at play in your chart.
      </p>
      <p class="mb-4">
        By exploring the keyword pairs for each aspect, you can gain new perspectives on your chart and discover insights that you may not have considered before. The keywords are meant to be a starting point for your exploration, encouraging you to reflect on how the energies of the planets interact in your chart and how they manifest in your life.
      </p>
      <p class="mb-4">
        To see the keyword pairs for your chart, simply create your chart and then navigate to the "Explore" section. There, you'll find the keyword pairs for each aspect in your chart, along with explanations and insights to help you understand the energies at play. Whether you're new to astrology or a seasoned astrologer, the keyword pairs can provide valuable insights and a fresh perspective on your chart.
      </p>
    </UPageSection>
  </div>
</template>
