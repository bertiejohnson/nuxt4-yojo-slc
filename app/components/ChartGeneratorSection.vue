<script lang="ts" setup>
const showChart = ref(false)

const generateChart = () => {
  console.log('Load chart called')
  showChart.value = true
}
</script>

<template>
  <UPageSection id="birth_data_form" class="mt-12 bg-gray-100 min-h-screen">
    <template v-if="!showChart">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Create your natal chart</h2>
        <p class="mb-6">
          Enter your birth details below to generate your personalized natal chart
        </p>
        <BirthDataForm @generateChart="generateChart" />
        <UButton
          class="mt-6"
          color="primary"
          @click="showChart = true"
        >
          Generate Chart
        </UButton>
      </div>
    </template>
    <template v-if="showChart">
      <div>
        <!-- Chart display logic goes here -->
        SHOW CHART HERE
      </div>
    </template>
  </UPageSection>
</template>

<style>

</style>