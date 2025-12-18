<script lang="ts" setup>
const props = defineProps({
  newObject: Object
})
</script>

<template>
  <div class="flex flex-col gap-4 mt-4">
    <div
      v-for="(expPhrase, index) in (props.newObject?.phrase || [])"
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
