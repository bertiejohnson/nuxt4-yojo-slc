<script lang="ts" setup>
const props = defineProps({
  keywordPairs: {
    type: Array as () => string[],
    required: true
  }
})

const kwps = ref(props.keywordPairs)

const keywordStore = useKeywordsStore()

const { keywords, keywordsFetched } = storeToRefs(keywordStore)

const displayKeywordPair = ref<string>('')

callOnce(async () => await keywordStore.fetchLandingKeywords(props.keywordPairs))

const keywordStrings = ref<string[]>([])

watch(keywordsFetched, () => {
  console.log('watch KWPS', keywordsFetched.value)
  if (keywordsFetched.value && keywords.value.length > 0) {
    setUpKeywordPhrases()
  }
})

onMounted(() => {
  if (keywordsFetched.value && keywords.value.length > 0) {
    // call function that sets up the keyword phrases
    console.log('onMounted KWPS', keywordsFetched.value)
    setUpKeywordPhrases()
  }
})

function setUpKeywordPhrases() {
  for (let i = 0; i < kwps.value.length; i++) {
    keywordStrings.value[i] = `${kwps.value[i]}<br/>${keywords.value[i]}`
  }
  displayKeywordPair.value = keywordStrings.value[0]
  startInterval()
}

function startInterval() {
  let i = 1
  setInterval(() => {
    displayKeywordPair.value = keywordStrings.value[i]
    i++
    if (i == kwps.value.length - 1) i = 0
  }, 4000)
}
</script>

<template>
  <transition>
    <div v-if="keywordsFetched" v-html="displayKeywordPair" :key="displayKeywordPair" class="keywords"></div>
    <div v-else>
      Display keywords so you can explore your chart ...
    </div>
  </transition>
</template>

<style scoped>
.keywords {
  display: block;
  font-size: 0.9rem;
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
