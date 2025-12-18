<script setup lang="ts">
const props = defineProps({
  object: Object,
  planets: String,
  isLoading: Boolean
})

const emit = defineEmits(['getExpandedPhrase'])
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <div
      v-for="(phrase, index) in (props.object?.phrases || [])"
      :key="index"
      class="flex items-start gap-4 p-4 bg-gray-100 rounded-md dark:bg-gray-800"
    >
      <div class="flex-1 space-y-1">
        <div class="flex items-center justify-between">
          <p class="font-medium dark:text-white">
            {{ phrase?.phrase }}
            <span
              v-if="!isLoading"
              class="text-sm text-gray-500 ml-1"
            >
              <UButton
                label="More..."
                variant="subtle"
                size="xs"
                @click="emit('getExpandedPhrase', { phraseExpansion: phrase.phrase }, props.planets) "
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
