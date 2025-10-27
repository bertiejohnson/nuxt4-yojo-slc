<script lang="ts" setup>
const { getKeywordsForPlanetPair } = useKeywords()

const props = defineProps({
  aspect: Object
})

const show = ref(false)
const displayKeywordPair = ref('')


const keywordPairs = await getKeywordsForPlanetPair(props.aspect.planetOne, props.aspect.planetTwo)
const rep = await useGetLandingKeywords(keywordPairs)

console.log('rep', rep)

// const getAIObject = async (keywordPairs) => {
//   const response = await useGenerateObject(keywordPairs)
//   if (Array.isArray(response?.object.value.object.phrases)) {
//     for (let i = 0; i < keywordPairs.length; i++) {
//       keywordPairs[i] = `${keywordPairs[i]}<br/>${response.object.value.object.phrases[i]}`
//       // console.log('KWP', i, keywordPairs[i])
//       if (i == keywordPairs.length - 1) {
//         displayKeywordPair.value = keywordPairs[0]
//         startInterval()
//         show.value = true
//       }
//     }
//   }
// }

// getAIObject(keywordPairs)

function startInterval() {
  let i = 1
  setInterval(() => {
    displayKeywordPair.value = keywordPairs[i]
    i++
    if (i == keywordPairs.length - 1) i = 0
  }, 1000)
}
</script>

<template>
  <span v-if="!show">Testing</span>
  <span v-else v-html="displayKeywordPair" :key="displayKeywordPair"></span>
</template>

<style scoped>
span {
  display: block;
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
