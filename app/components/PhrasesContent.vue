<script lang="ts" setup>
import { experimental_useObject as useObject} from '@ai-sdk/vue'

const { submit: newSubmit, isLoading: newIsLoading, object: newObject, stop, error, clear } = useObject({ api:'/api/ai/use-stream-object' })

const props = defineProps({
  planets: Object,
  object: Object,
  isLoading: Boolean
})

const showPhrases = ref(true)
const showExpandedPhrase = ref(false)

const getExpandedPhrase = async (phrase, planets) => {
  const prompt = `The following phrase relates to the astrological planetary configuration ${planets.planetOne} ${planets.aspectName} ${planets.planetTwo}: ${phrase}. Please provide a detailed and insightful expansion of this phrase, exploring its deeper meanings and implications in the context of astrology. Your response should be thoughtful and comprehensive, offering valuable perspectives that enhance the understanding of this astrological concept.`

  newSubmit({ prompt, schema: 'expandedPhraseSchema' })

  showPhrases.value = false
  showExpandedPhrase.value = true
}
</script>

<template>
  <div v-if="showPhrases">
    <ShowPhrases
      :planets="props.planets"
      :object="props.object"
      :is-loading="props.isLoading"
      @get-expanded-phrase="getExpandedPhrase"
    />
  </div>
  <div v-else-if="showExpandedPhrase">
    <ShowExpandedPhrase :new-object="newObject" />
  </div>
  <div v-else>
    <p>No content available.</p>
  </div>
</template>

<style>

</style>
