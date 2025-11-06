<script lang="ts" setup>
async function signUp() {
  // Redirect to the signup page
  await navigateTo('/signup')
}
</script>

<template>
  <div class="relative -mt-4 h-30 flex items-center justify-center overflow-hidden">
    <UButton
      class="mt-8"
      color="success"
      variant="solid"
      @click="signUp"
    >
      Sign up to save your chart
    </UButton>
  </div>
</template>

<style>

</style>