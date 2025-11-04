<script lang="ts" setup>
// import PlanetPairKeywords from './PlanetPairKeywords.vue'

const keywordStore = useKeywordsStore()

const { getKeywordsForPlanetPair } = useKeywords()

const props = defineProps({
  aspect: Object
})

const keywordPairs = await getKeywordsForPlanetPair(props.aspect?.planetOne, props.aspect?.planetTwo)
</script>

<template>
  <client-only>
    <div class="relative -mt-4 h-30 flex items-center justify-center overflow-hidden"></div>
    <PlanetPairKeywords
      :keyword-pairs="keywordPairs"
    />
  </client-only>
</template>

<style>

</style>
