<script lang="ts" setup>
import { experimental_useObject as useObject } from '@ai-sdk/vue'
import type { string } from 'zod'

const { getKeywordsForPlanetPair } = useKeywords()

const props = defineProps({
  aspect: Object
})

const keywordPairs = await getKeywordsForPlanetPair(props.aspect.planetOne, props.aspect.planetTwo)

const response = await useGenerateObject(keywordPairs)

keywordPairs.forEach((e,i) => {
  keywordPairs[i] += `<br/>${response.object.value.object.phrases[i]}`
})

console.log('KP', keywordPairs)

const displayKeywordPair = ref('Dummy text goes here - will be replaced by planets and aspect and AI generated text coupled with keyword pairs.')

let i = 1
setInterval(() => {
  displayKeywordPair.value = keywordPairs[i]
  i++
  if (i >= keywordPairs.length) i = 0
}, 6000)
</script>

<template>
  <div class="relative -mt-4 h-30 flex items-center justify-center overflow-hidden">
    <Transition>
      <span v-html="displayKeywordPair" :key="displayKeywordPair"></span>
    </Transition>
  </div>
</template>


<style scoped>
span {
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
