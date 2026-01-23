<script lang="ts" setup>
interface ChartAspect {
  planetOneName: string
  aspectName: string
  planetTwoName: string
  // Add other properties as needed
}

const props = defineProps({
  chartAspects: Array as () => ChartAspect[]
})

const showPlanetButtons = ref(true)
const showAspectBlurb = ref(false)
const showAspectList = ref(false)
const showKeywordsList = ref(false)

const aspectBlurb = ref('A brief introduction to the planets and the aspect goes here.')
const planetAspects = ref<ChartAspect[]>([])
const planets = planetListStandard

const planetOneKeywords = ref(null)
const planetTwoKeywords = ref(null)

const selectedKeywordColOne = ref('Keyword 1')
const selectedKeywordColTwo = ref('Keyword 2')

const colOnePlanet = ref('')
const colTwoPlanet = ref('')

const colOneClass = ref('text-gray-300')
const colTwoClass = ref('text-gray-300')

const showAspects = (planetName: string) => {
  if (!props.chartAspects) return
  planetAspects.value = props.chartAspects.filter((aspect) => {
    return aspect.planetOneName === planetName
  })
  showAspectList.value = true
}

function showKeywords(planetOne: string, planetTwo: string) {
  // Implement the logic to show keywords for the given planets

  planetOneKeywords.value = planetKeywordsStore[planetOne]
  planetTwoKeywords.value = planetKeywordsStore[planetTwo]

  colOnePlanet.value = planetOne
  colTwoPlanet.value = planetTwo

  showAspectBlurb.value = true
  aspectBlurb.value = `Keywords for the aspect between ${planetOne} and ${planetTwo}.`
  showAspectList.value = false
  showPlanetButtons.value = false
  showKeywordsList.value = true
}

const keywordSelector = (keyword: string, column: number) => {
  // Implement the logic for keyword selection
  selectedKeywordColOne.value = column === 1 ? keyword : selectedKeywordColOne.value
  selectedKeywordColTwo.value = column === 2 ? keyword : selectedKeywordColTwo.value

  colOneClass.value = column === 1 ? 'text-black font-bold' : colOneClass.value
  colTwoClass.value = column === 2 ? 'text-black font-bold' : colTwoClass.value
}

const backToAspectsReset = () => {
  showAspectBlurb.value = false
  showAspectList.value = true
  showKeywordsList.value = false
  showPlanetButtons.value = true

  selectedKeywordColOne.value = 'Keyword 1'
  selectedKeywordColTwo.value = 'Keyword 2'

  colOneClass.value = 'text-gray-300'
  colTwoClass.value = 'text-gray-300'
}
</script>

<template>
  <div v-if="showPlanetButtons">
    <ul class="flex gap-4 justify-center flex-wrap">
      <li
        v-for="planet in planets"
        :key="planet.name"
      >
        <UButton
          :label="planet.name"
          variant="subtle"
          @click="showAspects(planet.name)"
        />
      </li>
    </ul>
  </div>
  <div v-if="showAspectBlurb">
    <p class="p-4">
      {{ aspectBlurb }}
    </p>
    <UButton
      label="Back to Aspects"
      variant="subtle"
      @click="backToAspectsReset"
    />
  </div>
  <div v-if="showAspectList">
    <div
      v-for="(aspect, index) in planetAspects"
      :key="index"
    >
      <div
        class="underline"
        @click="showKeywords(aspect.planetOneName, aspect.planetTwoName)"
      >
        {{ aspect.planetOneName }} {{ aspect.aspectName }} {{ aspect.planetTwoName }}
      </div>
    </div>
  </div>
  <div
    v-else-if="showKeywordsList"
    class="p-4"
  >
    <div class="grid grid-cols-3 gap-4">
      <div
        class="border rounded p-4"
        :class="colOneClass"
      >
        {{ selectedKeywordColOne }}
      </div>
      <div class="flex justify-center items-center">
        <span class="text-2xl">
          <UButton
            label="Explore"
            variant="subtle"
          />
        </span>
      </div>
      <div
        class="border rounded p-4"
        :class="colTwoClass"
      >
        {{ selectedKeywordColTwo }}
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="border rounded p-4">
        <h3 class="font-bold mb-2">
          {{ colOnePlanet }}
        </h3>
        <div
          v-for="(keyword, index) in (planetOneKeywords)"
          :key="index"
          class="mb-2"
          @click="keywordSelector(keyword, 1)"
        >
          {{ keyword }}
        </div>
      </div>
      <div class="border rounded p-4">
        <h3 class="font-bold mb-2">
          {{ colTwoPlanet }}
        </h3>
        <div
          v-for="(keyword, index) in (planetTwoKeywords)"
          :key="index"
          class="mb-2"
          @click="keywordSelector(keyword, 2)"
        >
          {{ keyword }}
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Select a planet to view aspects.
  </div>
</template>

<style>

</style>
