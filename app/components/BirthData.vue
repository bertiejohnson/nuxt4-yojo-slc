<template>
  <div>
    <form class="max-w-lg mx-auto">
          <UFormGroup label="Birth Date" class="mb-4">
            <UInput type="date" />
          </UFormGroup>
          <UFormGroup label="Birth Time" class="mb-4">
            <UInput type="time" />
          </UFormGroup>
          <UFormGroup label="Birth Place" class="mb-4">
            <UInput type="text" placeholder="Enter city name" />
          </UFormGroup>
          <UFormGroup>
            <UButton @click="getUserChart">Get Chart</UButton>
          </UFormGroup>
        </form>
  </div>
</template>

<script lang="ts" setup>
async function getYourChart(event) {
  event.preventDefault()
  // TODO: Get form values and make API call
  try {
    const { data, error } = await useFetch('http://127.0.0.1:8181/swetest.php?type=chart', {
      method: 'POST',
      body: {
        date: '', // Add form date value
        time: '', // Add form time value
        place: '' // Add form place value
      }
    })
    if (error.value) throw error.value
    // Handle the response data
    console.log(data.value)
  } catch (err) {
    console.error('Error getting chart:', err)
  }
}
</script>

<style>

</style>