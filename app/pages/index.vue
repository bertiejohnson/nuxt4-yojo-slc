<template>
  <div>
    <UPageHero
      title="A Unique Approach To Your Chart"
      :links="links"
    >
      <template #body>
        <ChartBuilder
          :chart-data="nowChartData"
        />
        <div class="relative -mt-4 h-30 flex items-center justify-center overflow-hidden">
          <ClientOnly>
            <LandingKeywords
              :aspect="aspectProp"
            />
          </ClientOnly>
        </div>
      </template>
    </UPageHero>
    <UPageSection id="birth_data_form" class="mt-12 bg-gray-100">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Create your natal chart</h2>
        <p class="mb-6">
          Enter your birth details below to generate your personalized natal chart
        </p>
      </div>
    </UPageSection>
    <UPageSection id="learn_more" class="mt-12">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Why Choose Our Charting Service?</h2>
        <p class="mb-6">
          Our charting service offers unparalleled accuracy and insights into your astrological profile. Whether you're a beginner or an experienced astrologer, our tools are designed to help you explore the cosmos with ease.
        </p>
        <ul class="list-disc list-inside text-left space-y-2">
          <li>Accurate and up-to-date astrological data</li>
          <li>User-friendly interface for easy navigation</li>
          <li>Comprehensive analysis of planetary positions and aspects</li>
          <li>Customizable charts to suit your preferences</li>
          <li>Expert support and resources to enhance your understanding</li>
        </ul>
      </div>
    </UPageSection>
    <UPageSection class="mt-12 bg-gray-100">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Get Started Today</h2>
        <p class="mb-6">
          Ready to explore your astrological chart? Sign up now and take the first step towards a deeper understanding of yourself and the universe.
        </p>
        <UButton
          color="primary"
          size="lg"
          href="/"
        >
          Create Your Chart
        </UButton>
      </div>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import { config } from 'zod'

const { data, error } = await useFetch('http://127.0.0.1:8181/swetest.php?type=now')
const links = ref([
  {
    label: 'Get chart',
    to: '#birth_data_form',
    icon: 'i-lucide-square-play'
  },
  {
    label: 'Learn more',
    to: '#learn_more',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])

// const config = useRuntimeConfig()
// console.log(config.public.apiBase)

if (error.value) {
  console.error('Error fetching chart data in index.vue:', error.value)
}

const nowChartData = data.value

// Adding 1 to match the planet IDs in the keywords JSON
// because swisseph_id starts from 0
// This is a temporary fix until the backend is updated
const aspectProp = {
  aspectType: nowChartData.chart.aspects[0].name,
  planetOne: nowChartData.chart.aspects[0].planetOne_swisseph_id + 1,
  planetTwo: nowChartData.chart.aspects[0].planetTwo_swisseph_id + 1
}
</script>
