<script lang="ts" setup>
const emit = defineEmits(['showAspects'])
const planets = planetListStandard // from '@/../shared/planetData/planetListStandard'
</script>

<template>
  <div>
    <ul class="flex gap-4 justify-center flex-wrap">
      <li
        v-for="planet in planets"
        :key="planet.name"
      >
        <UButton
          :label="planet.name"
          variant="subtle"
          @click="emit('showAspects', planet.name)"
        />
      </li>
    </ul>
  </div>
</template>

<style>

</style>
