<script lang="ts" setup>
interface ExpandedPhrase {
  paragraphs: string[]
}

interface Phrase {
  expandedPhrase?: ExpandedPhrase
}

interface TextData {
  phrase?: Phrase[]
}

const props = defineProps<{
  text: TextData
}>()

console.log('Received text prop:', props.text)
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <div
      v-for="(expPhrase, index) in (props.text?.phrase || [])"
      :key="index"
      class="flex items-start gap-4 p-4 bg-gray-100 rounded-md dark:bg-gray-800"
    >
      <div class="flex-1 space-y-1">
        <div>
          <p
            v-for="paragraph in expPhrase?.expandedPhrase?.paragraphs"
            :key="paragraph"
            class="mb-5 font-medium dark:text-white"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
