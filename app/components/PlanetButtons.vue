<script lang="ts" setup>
const emit = defineEmits(['showAspects'])
const planets = planetListStandard // from '@/../shared/planetData/planetListStandard'

const planetNames = planets.map((planet) => {
  return { baseName: planet.name, displayName: capitalize(planet.name) }
})
</script>

<template>
  <div>
    <ul class="flex gap-1 justify-center flex-wrap">
      <li
        v-for="(planet, index) in planetNames"
        :key="index"
      >
        <UButton
          :label="planet.displayName"
          variant="subtle"
          @click="emit('showAspects', planet.baseName, false)"
        />
      </li>
    </ul>
  </div>
</template>

<style>

</style>
