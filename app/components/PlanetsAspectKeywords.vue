<script lang="ts" setup>
import { experimental_useObject as useObject } from '@ai-sdk/vue'
import { expandedPhraseSchema } from '@/../shared/zod-schemas'

const props = defineProps<{
  planetOne: string
  planetTwo: string
  theAspect: string
}>()

console.log('Received props:', props)

const emit = defineEmits(['showAspects'])

// values avaialable include error and isLoading. Methods include submit, stop, and clear. Object is the response object that is returned from the API route.
const { submit, object } = useObject({ api: '/api/ai/use-stream-object', schema: expandedPhraseSchema })

const showKeywordsSelector = ref(true)
const text = ref<string>('')

function getTextForPair(planetOne: string, planetTwo: string, keywordOne: string, keywordTwo: string) {
  console.log('Aspect:', props.theAspect)
  const prompt = `Generate a short piece of text that explores the astrology of ${planetOne} (planet one) ${props.theAspect} ${planetTwo} (planet two), using the keyword "${keywordOne}" (keyword one) and "${keywordTwo}" (keyword two). Keyword one is a property of planet one and keyword two is a property of planet two. The text should upon these keywords as they relate to the energies of the planets and their interaction with regards to the given aspect, i.e. ${props.theAspect}. Please create a thoughtful and engaging response that focuses on the keywords of this planetary pair in an astrological context.`
  submit({ prompt, schema: 'expandedPhraseSchema' })

  showKeywordsSelector.value = false
}
</script>

<template>
  <div class="p-4">
    <!-- Button that takes user back to aspect list -->
    <div class="flex justify-center mb-2">
      <UButton
        v-if="showKeywordsSelector"
        label="Back to Aspects"
        variant="subtle"
        @click="emit('showAspects', props.planetOne, true)"
      />
      <UButton
        v-else
        label="Back to Keywords List"
        variant="subtle"
        @click="showKeywordsSelector = true; text = ''"
      />
    </div>
    <DashKeywordsSelector
      v-if="showKeywordsSelector"
      :planet-one="planetOne"
      :planet-two="planetTwo"
      :the-aspect="theAspect"
      @get-text-for-pair="getTextForPair"
    />
    <DashSelectorTextOutput
      v-else
      :text="object"
    />
  </div>
</template>

<style>

</style>
