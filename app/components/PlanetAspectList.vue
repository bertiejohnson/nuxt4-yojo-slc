<script lang="ts" setup>
interface PlanetAspect {
  aspectName: string
  colour: string
  fromExact: number
  planetOneId: number
  planetOneName: string
  planetOne_swisseph_id: number
  planetPair: string
  planetTwoId: number
  planetTwoName: string
  planetTwo_swisseph_id: number
  x1: string
  x2: string
  y1: string
  y2: string
}
const props = defineProps<{
  planetAspects: PlanetAspect[]
}>()

const planetsKeywords = planetKeywordsStore
const keywords = ref<string[]>([])
const theAspects = ref<PlanetAspect[]>(props.planetAspects || [])

console.log('PlanetAspectList planetAspects:', props.planetAspects, theAspects.value[0]?.planetOneName)
</script>

<template>
  <div>
    <div
      v-for="(aspect, index) in theAspects"
      :key="index"
    />
    {{ aspect.planetOneName }} {{ aspect.aspectName }} {{ aspect.planetTwoName }}
  </div>
</template>

<style>

</style>
