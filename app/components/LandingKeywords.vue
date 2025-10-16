<template>
  <div class="relative -mt-4 h-10 flex items-center justify-center overflow-hidden">
    <Transition>
      <span :key="keywordPair">{{ keywordPair }}</span>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  aspect: Object
})

const planetOneId = props.aspect.planetOne
const planetTwoId = props.aspect.planetTwo

const keywords = await fetchKeywords()

// extract the keywords for each planet
const planetOneKeywords = keywords?.filter((p: any) => p.planet_id === planetOneId)
const planetTwoKeywords = keywords?.filter((p: any) => p.planet_id === planetTwoId)

const keywordsList = []

for (let i = 0; i < (planetOneKeywords ?? []).length; i++) {
  const kw = {
    keywordOne: (planetOneKeywords ?? [])[i]?.keyword,
    keywordTwo: (planetTwoKeywords ?? [])[i]?.keyword
  }
  keywordsList.push(kw)
}

const keywordPair = ref(`${planetOneKeywords[0]?.keyword} - ${planetTwoKeywords[0]?.keyword}`)

let i = 1
setInterval(() => {
  keywordPair.value = `${keywordsList[i]?.keywordOne} - ${keywordsList[i]?.keywordTwo}`
  i++
  if (i >= keywordsList.length) i = 0
}, 4000)
</script>

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
