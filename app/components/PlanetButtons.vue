<script lang="ts" setup>
const emit = defineEmits(['showAspects'])
const planets = planetListStandard // from '@/../shared/planetData/planetListStandard'

const planetNames = planets.map((planet) => {
  return { baseName: planet.name, displayName: capitalize(planet.name) }
})

const buttonColOne = []
const buttonColTwo = []

for (let i = 0; i < planetNames.length; i++) {
  if (i <= 4) {
    buttonColOne.push(planetNames[i])
  } else {
    buttonColTwo.push(planetNames[i])
  }
}
</script>

<template>
  <div>
    <h2 class="text-1xl font-bold mb-4 text-center">
      Select a Planet to Explore its Aspects
    </h2>
  </div>
  <div class="grid grid-cols-2 gap-12">
    <div>
      <div
        v-for="(planet, index) in buttonColOne"
        :key="index"
        class="mb-3"
      >
        <UButton
          :label="planet.displayName"
          variant="outline"
          @click="emit('showAspects', planet.baseName, false)"
        />
      </div>
    </div>
    <div>
      <div
        v-for="(planet, index) in buttonColTwo"
        :key="index"
        class="mb-3"
      >
        <UButton
          :label="planet.displayName"
          variant="outline"
          @click="emit('showAspects', planet.baseName, false)"
        />
      </div>
    </div>
  </div>
</template>

<style>

</style>
