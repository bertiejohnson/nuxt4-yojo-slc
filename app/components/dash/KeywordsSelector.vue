<script lang="ts" setup>
const props = defineProps<{
  planetOne: string
  planetTwo: string
}>()

const emit = defineEmits(['showAspects', 'getTextForPair'])

const keywordsOne = planetKeywordsStore[props.planetOne]
const keywordsTwo = planetKeywordsStore[props.planetTwo]

if (!keywordsOne || !keywordsTwo) {
  console.warn('Keywords not found for planets:', props.planetOne, props.planetTwo)
  // throw new Error('Keywords not found for one or both planets')
}

const colOnePlanet = props.planetOne
const colTwoPlanet = props.planetTwo

const colOneClass = ref<string>('text-gray-300')
const colTwoClass = ref<string>('text-gray-300')

const selectedKeywordColOne = ref<string>('Choose a keyword')
const selectedKeywordColTwo = ref<string>('Choose a keyword')

const keywordSelector = (keyword: string, column: number) => {
  // Implement the logic for keyword selection
  selectedKeywordColOne.value = column === 1 ? keyword : selectedKeywordColOne.value
  selectedKeywordColTwo.value = column === 2 ? keyword : selectedKeywordColTwo.value

  colOneClass.value = column === 1 ? 'text-black font-bold' : colOneClass.value
  colTwoClass.value = column === 2 ? 'text-black font-bold' : colTwoClass.value
}
</script>

<template>
  <div>
    <!-- Blurb for the planets and aspect with the heading justified center -->
    <div class="mb-4">
      <h2 class="text-2xl font-bold mb-2 text-center">
        Keywords for {{ capitalize(colOnePlanet) }} and {{ capitalize(colTwoPlanet) }}
      </h2>
      <p class="text-gray-600">
        Explore the keywords associated with the aspect between {{ capitalize(colOnePlanet) }} and {{ capitalize(colTwoPlanet) }}. Click on a keyword to select it and see how it relates to each planet.
      </p>
    </div>
    <!-- Keyword boxes and button -->
    <div class="grid grid-rows-3 gap-1">
      <div
        class="border rounded p-1 h-8 flex justify-center items-center"
        :class="colOneClass"
      >
        {{ capitalize(selectedKeywordColOne) }}
      </div>
      <div class="flex justify-center items-center">
        <span class="text-1xl">
          <UButton
            label="Explore"
            variant="subtle"
            @click="emit('getTextForPair', colOnePlanet, colTwoPlanet, selectedKeywordColOne, selectedKeywordColTwo)"
          />
        </span>
      </div>
      <div
        class="border rounded p-1 h-8 flex justify-center items-center"
        :class="colTwoClass"
      >
        {{ capitalize(selectedKeywordColTwo) }}
      </div>
    </div>

    <!-- Keyword columns -->
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="border rounded p-4">
        <h3 class="font-bold mb-2">
          {{ capitalize(colOnePlanet) }}
        </h3>
        <div
          v-for="(keyword, index) in (keywordsOne)"
          :key="index"
          class="mb-2"
          @click="keywordSelector(keyword, 1)"
        >
          {{ capitalize(keyword) }}
        </div>
      </div>
      <div class="border rounded p-4">
        <h3 class="font-bold mb-2">
          {{ capitalize(colTwoPlanet) }}
        </h3>
        <div
          v-for="(keyword, index) in (keywordsTwo)"
          :key="index"
          class="mb-2"
          @click="keywordSelector(keyword, 2)"
        >
          {{ capitalize(keyword) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>