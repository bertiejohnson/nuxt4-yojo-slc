<script setup lang="ts">
import type { Chart } from '@/../shared/types'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const activeBreakpoint = breakpoints.active()

const layout = ref(false)

if (activeBreakpoint.value === 'mobile') {
  console.log(`Current active breakpoint: ${activeBreakpoint.value}`)
  layout.value = true
} else {
  console.log('No active breakpoint detected.')
}

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

// if (aspect) {
//   headingString = aspect.planetPair
//     .split('_')
//     .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(` ${aspect.aspectName} `)

//   aspectProp = {
//     aspectType: aspect.aspectName,
//     planetOne: aspect.planetOne_swisseph_id,
//     planetTwo: aspect.planetTwo_swisseph_id
//   }
// }

const links = ref([
  {
    label: 'Get your chart',
    to: '/create-chart',
    icon: 'i-lucide-square-play'
  } // ,
  // { // a button to a page section that explains the keyword analysis system that this app uses
  //   label: 'Learn more',
  //   to: '#learn-more'
  // }
])
const test = ref('vertical')
</script>

<template>
  <div v-if="layout">
    <UPageHero
      title="A Unique Approach To Understanding Your Chart"
      headline="Yojo Astro"
      :orientation="test"
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
  </div>
  <div v-else class="flex flex-col items-center w-full">
    <h2 class="text-center text-3xl font-bold mt-8">
      Only works on mobile for now - more features coming soon!
    </h2>
  </div>
</template>
