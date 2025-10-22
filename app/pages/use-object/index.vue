<template>
  <div class="flex flex-col items-center min-h-screen p-4 m-4">
    <button
      class="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md disabled:bg-blue-200"
      @click="() => submit('TESTING CONTEXT')"
      :disabled="isLoading"
    >
      Generate notifications
    </button>

    <div v-if="error" class="mt-4 text-red-500">
      An error occurred. {{ error.message }}
    </div>

    <div v-if="isLoading" class="mt-4 text-gray-500">
      <div>Loading...</div>
      <button
        type="button"
        class="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
        @click="stop"
      >
        STOP
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { experimental_useObject as useObject } from '@ai-sdk/vue'
// import { notificationSchema } from '~/shared/notification-schema';

const { submit, isLoading, object, stop, error, clear } = useObject({
  api: '/api/use-object',
  // schema: notificationSchema,
})
</script>

<style>

</style>