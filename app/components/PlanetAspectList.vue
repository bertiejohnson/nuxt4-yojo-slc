<script lang="ts" setup>
interface AspectData {
  planetOneName: string
  aspectName: string
  planetTwoName: string
}

const props = defineProps<{
  aspectData: AspectData[]
}>()

const emit = defineEmits(['showKeywords', 'backToPlanetButtons'])
</script>

<template>
  <div>
    <div class="flex flex-col items-center w-full">
      <UButton
        label="Back to Planets"
        variant="subtle"
        class="mb-3"
        @click="emit('backToPlanetButtons')"
      />
      <h2 class="text-1xl font-bold mb-4 text-center">
        Aspects for {{ props.aspectData[0]?.planetOneName }}
      </h2>
    </div>
    <div
      v-for="(aspect, index) in props.aspectData"
      :key="index"
    >
      <div
        class="p-1 rounded mb-3 cursor-pointer border border-green-300 hover:bg-green-200 transition-colors duration-200 text-center text-green-500"
        @click="emit('showKeywords', aspect.aspectName, aspect.planetOneName, aspect.planetTwoName)"
      >
        {{ capitalize(aspect.planetOneName) }} {{ capitalize(aspect.aspectName) }} {{ capitalize(aspect.planetTwoName) }}
      </div>
    </div>
  </div>
</template>

<style>

</style>
