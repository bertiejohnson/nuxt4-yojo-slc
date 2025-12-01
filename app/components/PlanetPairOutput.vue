<script lang="ts" setup>
const props = defineProps({
  aspect: Object
})

const { partialObject, isStreaming, isComplete, error, stream }
  = usePartialObjectStream()

const { getKeywordsForPlanetPair } = useKeywords()

const keywords = ref([])
keywords.value = await getKeywordsForPlanetPair(props.aspect?.planetOneId, props.aspect?.planetTwoId)

const showSection = ref('keywords')

// const phrases = ref([])
const elaboration = ref([])
const loadingPhrases = ref(true)
const loadingElaboration = ref(true)

const phrases = computed(() => partialObject.value.phrases)

async function getPhrases(pair) {
  let prompt = `Generate several short phrases of two to three sentences for the astrological keyword pair ${pair}. Do not include the keyword pair itself.`

  stream(prompt)

  loadingPhrases.value = false
}

async function elaboratePhrase(phrase: string) {
  let prompt = `Elaborate and expand on the following phrase - ${phrase}. Use 50 to 75 words over 2 to 3 paragraphs. Keep in mind the keyword pair energy - innovation.`
  stream(prompt)
  loadingElaboration.value = false
}
</script>

<template>
  <div v-if="showSection === 'keywords'">
    <div
      v-for="(pair, i) in keywords"
      :key="i"
      class="mb-2"
    >
      <span class="font-bold mr-2">{{ pair }}</span>
      <UButton
        label="Expand"
        variant="soft"
        size="xs"
        class="rounded-full"
        @click="getPhrases(pair); showSection = 'phrases'"
      />
    </div>
  </div>
  <div v-else-if="showSection === 'phrases'">
    <div v-if="loadingPhrases">
      <div class="flex items-center gap-4 mb-4">
        <USkeleton class="h-12 w-12 rounded-full" />
        <div class="grid gap-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <USkeleton class="h-12 w-12 rounded-full" />
        <div class="grid gap-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="phrases">
        <ul>
          <li
            v-for="(phrase, i) in phrases"
            :key="i"
            class="mb-4"
          >
            <span>{{ phrase }}</span>
            <UButton
              label="Elaborate"
              variant="soft"
              size="xs"
              @click="elaboratePhrase(phrases[i]); showSection = 'elaboration'"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else-if="showSection === 'elaboration'">
    <div v-if="loadingElaboration">
      <div class="flex items-center gap-4 mb-4">
        <USkeleton class="h-12 w-12 rounded-full" />
        <div class="grid gap-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </div>
    <div>
      <div>
        {{ phrases ? phrases[0] : '' }}
      </div>
    </div>
  </div>
</template>

<style>

</style>