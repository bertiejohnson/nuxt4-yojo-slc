<script lang="ts" setup>
import { experimental_useObject as useObject } from '@ai-sdk/vue'
import { unknown } from 'zod'

const { submit, isLoading, object, stop, error, clear } = useObject({ api:'/api/use-stream-object' })

const props = defineProps({
  chartAspects: Array as () => unknown[]
})

const filteredAspects = filterAspects(props.chartAspects)

const showAspectContent = ref(false)
const getPhrasesForAspect = ref({})
const aspectTitle = ref('')

const phrasesContent = async (aspect: object) => {
  aspectTitle.value = `${aspect.planetOneName} ${aspect.aspectName} ${aspect.planetTwoName}`

  getPhrasesForAspect.value = {
    planetOne: aspect.planetOneName,
    planetTwo: aspect.planetTwoName,
    aspectName: aspect.aspectName
  }

  const prompt = `Generate five short phrases of two to three sentences each for the following astrological aspect: ${aspect.planetOneName} ${aspect.aspectName} ${aspect.planetTwoName}. Do not include the keyword pair itself.`

  submit({ prompt, schema: 'phrasesSchema' })

  showAspectContent.value = true
}
</script>

<template>
  <div v-if="showAspectContent">
    <div class="flex justify-center mb-2">
      <h2 class="font-bold">
        {{ aspectTitle }}
      </h2>
    </div>
    <div>
      <PhrasesContent
        :planets="getPhrasesForAspect"
        :object="object"
        :is-loading="isLoading"
      />
    </div>
  </div>
  <div v-else>
    <div
      v-for="(aspect, i) in filteredAspects"
      :key="i"
      class="my-1"
    >
      <UButton
        :label="`${aspect.planetOneName} ${aspect.aspectName} ${aspect.planetTwoName}`"
        variant="subtle"
        @click="phrasesContent(aspect)"
      />
    </div>
  </div>
  <div>
    <UButton
      label="Back to list"
      class="mt-4"
      @click="showAspectContent = !showAspectContent"
    />
  </div>
</template>

<style>

</style>
