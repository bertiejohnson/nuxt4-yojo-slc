<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div>
    <p>{{ props.text }}</p>
  </div>
</template>

<style>

</style>