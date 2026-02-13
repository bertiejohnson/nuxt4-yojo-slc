<script lang="ts" setup>
interface AspectData {
  planetOneName: string
  aspectName: string
  planetTwoName: string
}

const props = defineProps<{
  aspectData: AspectData[]
}>()

const emit = defineEmits(['showKeywords'])
</script>

<template>
  <div>
    <div
      v-for="(aspect, index) in props.aspectData"
      :key="index"
    >
      <div
        class="underline"
        @click="emit('showKeywords', aspect.aspectName, aspect.planetOneName, aspect.planetTwoName)"
      >
        {{ aspect.planetOneName }} {{ aspect.aspectName }} {{ aspect.planetTwoName }}
      </div>
    </div>
  </div>
</template>

<style>

</style>
