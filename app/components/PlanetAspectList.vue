<script lang="ts" setup>
const props = defineProps({
  chartAspects: Array
})

// const aspects = props.chartAspects
const theAspectsToFilter = ['conjunction', 'square', 'opposition', 'sextile', 'trine']
const thePlanetsToFilter = [0, 1, 2, 3, 4]
const ascMcNodeFilter = [10, 12, 13]
const showAspectContent = ref(false)
const aspectToDisplay = ref({})

function filterAspects(arr) {
  const newArr = arr.filter((e) => {
    if (thePlanetsToFilter.includes(e.planetOneId)) return true
  }).filter((e) => {
    if (ascMcNodeFilter.includes(e.planetTwoId)) {
      return false
    } else {
      return true
    }
  }).filter((e) => {
    if (theAspectsToFilter.includes(e.aspectName)) return true
  }).toSorted((a, b) => a.fromExact - b.fromExact)

  return newArr
}

const filteredAspects = filterAspects(props.chartAspects)
</script>

<template>
  <div v-if="showAspectContent">
    <div class="flex justify-center mb-2">
      <h2 class="font-bold">
        {{ `${aspectToDisplay.planetOneName} ${aspectToDisplay.aspectName} ${aspectToDisplay.planetTwoName}` }}
      </h2>
    </div>
    <div>
      <PlanetPairOutput :aspect="aspectToDisplay" />
    </div>
    <UButton
      label="Back to list"
      @click="showAspectContent = !showAspectContent"
      class="mt-4"
    />
  </div>
  <div v-else>
    <div
      v-for="(aspect, i) in filteredAspects"
      :key="i"
      class="my-1"
    >
      <UButton
        :label="`${aspect.planetOneName} ${aspect.aspectName} ${aspect.planetTwoName}`"
        variant="subtle"
        @click="aspectToDisplay=aspect; showAspectContent = !showAspectContent"
      />
    </div>
  </div>
</template>

<style>

</style>
