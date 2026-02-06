<script lang="ts" setup>
const props = defineProps<{
  planetOne: string
  planetTwo: string
}>()

const emit = defineEmits(['showAspects'])

const showKeywordsSelector = ref(true)
const text = ref<string>('')

function getTextForPair(planetOne: string, planetTwo: string, keywordOne: string, keywordTwo: string) {
  // Implement the logic to get text for the selected planet pair and keywords
  console.log('Getting text for:', planetOne, planetTwo, keywordOne, keywordTwo)

  text.value = `Text for ${planetOne} and ${planetTwo} with keywords ${keywordOne} and ${keywordTwo}`
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
      @get-text-for-pair="getTextForPair"
    />
    <DashSelectorTextOutput
      v-else
      :text="text"
    />
  </div>
</template>

<style>

</style>
