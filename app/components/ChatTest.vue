<template>
  <div class="mt-8">
    <div v-for="(m, index) in chat.messages" :key="m.id ? m.id : index">
      {{ m.role === "user" ? "User: " : "AI: " }}
      <div
        v-for="(part, index) in m.parts"
        :key="`${m.id}-${part.type}-${index}`"
      >
        <div v-if="part.type === 'text'">
          {{ part.text }}
        </div>
      </div>
    </div>

    <form @submit="handleRequest">
      <input v-model="input" placeholder="Say something..." />
    </form>
  </div>
</template>

<script lang="ts" setup>
import { Chat } from '@ai-sdk/vue'

const input = ref('')
const chat = new Chat({})

const handleRequest = (e: Event) => {
  e.preventDefault()
  chat.sendMessage({ text: input.value })
  input.value = ''
}
</script>

<style>

</style>