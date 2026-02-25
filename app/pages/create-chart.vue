<script lang="ts" setup>
import { experimental_useObject as useObject } from '@ai-sdk/vue'
import { expandedPhraseSchema } from '@/../shared/zod-schemas'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280
})

const activeBreakpoint = breakpoints.active()

const layout = ref(false)

if (activeBreakpoint.value === 'mobile') {
  console.log(`Current active breakpoint: ${activeBreakpoint.value}`)
  layout.value = true
} else {
  console.log('No active breakpoint detected.')
}

const userNatalChart = ref(null) // doesn't need to be a ref?
const headingString = ref('')
const keywordOne = ref('')
const keywordTwo = ref('')
const theAspect = ref('')

const sessionStore = useSessionStore()

const { submit, object } = useObject({ api: '/api/ai/use-stream-object', schema: expandedPhraseSchema })

const generateChart = async (birthData) => {
  userNatalChart.value = await $fetch('/api/generate-chart', {
    query: {
      type: 'natal',
      date: birthData.date,
      time: birthData.time,
      lng: birthData.lng,
      lat: birthData.lat
    }
  })

  sessionStore.setBirthData(birthData)

  if (userNatalChart.value) {
    theAspect.value = userNatalChart.value.chart.aspects[0].aspectName
    setHeadingString(userNatalChart.value.chart.aspects[0].planetPair, userNatalChart.value.chart.aspects[0].aspectName)
    const [planetOne, planetTwo] = splitPlanetPair(userNatalChart.value.chart.aspects[0].planetPair)
    if (planetOne && planetTwo) {
      const randomKeywords = await getRandomKeywords(planetOne, planetTwo)
      console.log('Random keywords for first aspect:', randomKeywords[0], randomKeywords[1])
      if (randomKeywords[0] || randomKeywords[1]) {
        getTextForPair(planetOne, planetTwo, randomKeywords[0], randomKeywords[1])
      }
    } else {
      console.warn('Could not split planet pair:', userNatalChart.value.chart.aspects[0].planetPair)
    }
  }
}

function setHeadingString(planetPair: string, aspectName: string) {
  headingString.value = planetPair
    .split('_')
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(` ${aspectName} `)
}

function splitPlanetPair(planetPair: string) {
  const [planetOne, planetTwo] = planetPair.split('_')
  return [planetOne, planetTwo]
}

async function getRandomKeywords(planetOne: string, planetTwo: string) {
  keywordOne.value = planetKeywordsStore[planetOne][0] || []
  keywordTwo.value = planetKeywordsStore[planetTwo][0] || []
  console.log('Random keywords:', keywordOne.value, keywordTwo.value)
  return [keywordOne.value, keywordTwo.value]
}

function getTextForPair(planetOne: string, planetTwo: string, keywordOne: string, keywordTwo: string) {
  const prompt = `Generate a short piece of text that explores the astrology of ${planetOne} (planet one) ${theAspect.value} ${planetTwo} (planet two), using the keyword "${keywordOne}" (keyword one) and "${keywordTwo}" (keyword two). Keyword one is a property of planet one and keyword two is a property of planet two. The text should upon these keywords as they relate to the energies of the planets and their interaction with regards to the given aspect, i.e. ${theAspect.value}. Please create a thoughtful and engaging response that focuses on the keywords of this planetary pair in an astrological context.`
  submit({ prompt, schema: 'expandedPhraseSchema' })
}
</script>

<template>
  <div v-if="layout">
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

    <template v-else>
      <div>
        <div class="text-center mt-3">
          <h1 class="text-pretty tracking-tight text-highlighted text-xl sm:text-3xl font-bold">
            Your Chart
          </h1>
        </div>
        <ChartBuilder
          :chart-data="userNatalChart"
          class="-mt-2"
        />
        <SignUpButton class="mt-1" />
        <div class="mx-auto px-3 mt-2 text-center text-sm">
          <p>Check out the output from one of your chart's aspects below and start unlocking the secrets it holds. Sign up to start using the keyword functions</p>
        </div>
        <div class="text-center mt-3 text-base font-semibold">
          {{ headingString }}
          <h2 class="text-sm font-normal mt-1">
            {{ capitalize(keywordOne) }} - {{ capitalize(keywordTwo) }}
          </h2>
        </div>
        <DashSelectorTextOutput
          v-if="object"
          :text="object"
          class="px-4 mt-2"
        />
      </div>
    </template>
  </div>
  <div v-else class="flex flex-col items-center w-full">
    <h2 class="text-center text-3xl font-bold mt-8">
      Only works on mobile for now - more features coming soon!
    </h2>
  </div>
</template>

<style>

</style>
