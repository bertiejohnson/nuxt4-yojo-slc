<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import geocodeClient from '@mapbox/mapbox-sdk/services/geocoding'

const emit = defineEmits(['loadChart'])

// Need to sort format validation on date and time inputs ...
const schema = z.object({
  placeOfBirth: z.string('Place of birth is required'),
  dateOfBirth: z.string('Date of Birth is required').min(1),
  timeOfBirth: z.string('Time of Birth is required').min(1),
  timeOfBirth: z.string('Time of Birth is required').min(1)
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  placeOfBirth: undefined,
  dateOfBirth: undefined,
  timeOfBirth: undefined
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log('Form submitted with values:', event.data, 'LatLng', lat.value, lng.value)
  // Handle form submission logic here
  emit('generateChart', {
    city: city.value,
    lng: lng.value,
    lat: lat.value,
    date: state.dateOfBirth,
    time: state.timeOfBirth
  })
  // use form data to fetch chart
  const { data, error } = await useFetch('http://127.0.0.1:8181/swetest.php?type=natal&date='
    + event.data.dateOfBirth + '&time=' + event.data.timeOfBirth
    + '&lng=' + lng.value + '&lat=' + lat.value)
  console.log('Fetch result:', data.value, 'Error:', error.value)
  // and reset form state once chart is loaded ...
  state.placeOfBirth = ''
  state.dateOfBirth = ''
  state.timeOfBirth = ''
}

// flag the input state - run getPlace and either produce list or accept entry after hitting 'Enter' on one of the locations in the location drop-down 
const acceptEntry = ref(true)
let currentFocus = -1

const city = ref('')
const lng = ref(0)
const lat = ref(0)
const placesdata = ref(null)

function insertCity(placeAr) {
  console.log('Insert city called with:', placeAr)
  acceptEntry.value = false // reset flag so getPlace will run

  state.placeOfBirth = placeAr.place_name
  lng.value = placeAr.lng
  lat.value = placeAr.lat
  placesdata.value = null
}

// Mapbox stuff
const myAccessToken
  = 'pk.eyJ1IjoiZGFyaW5iZWNrZXR0IiwiYSI6ImNsdDh3bXMzZjB5OTEyaXFydWkyY2txY2MifQ.erv3U5I-UIRdAPD6i_sJNg'

const geocodeService = geocodeClient({ accessToken: myAccessToken })

// Error handling here - try/catch on the promise
const getPlace = async function (e) {
  if (!acceptEntry.value) {
    acceptEntry.value = true // reset
    currentFocus = -1 // reset

    //remove listener
    if (document.getElementById('placeInput')) {
      document.getElementById('placeInput').removeEventListener('keydown', handleArrowKeys)
    }
    return
  }

  // add listener for the resulting location drop-down list
  if (document.getElementById('placeInput')) {
    document.getElementById('placeInput').addEventListener('keydown', handleArrowKeys)
  }

  geocodeService.forwardGeocode({
    query: e.target.value,
    limit: 5,
    types: ['district', 'place', 'locality']
  }).send()
    .then((response) => {
      placesdata.value = response.body.features
    })

  placesdata.value.forEach(element => {
    console.log('Place:', element.place_name)
  })

  function catchError(error) {
    console.log('We have an error', error)
    throw createError({
      statusCode: 401,
      statusMessage: `Not working: ${error}`,
      fatal: false
    })
  }
}

// Handle arrow key navigation on the locataion drop-down
function handleArrowKeys(e) {
  let x = document.getElementById('placeList')
  if (x) x = x.getElementsByTagName('li')

  if (e.key == 'ArrowDown') {
    currentFocus++
    addActive(x)
  } else if (e.key == 'ArrowUp') {
    currentFocus--
    addActive(x)
  } else if (e.key == 'Enter') {
    e.preventDefault()
    if (currentFocus > -1) {
      if (x) x[currentFocus].click()
    }
  }
}

function addActive (x) {
  if (!x) return false
  removeActive(x)
  if (currentFocus >= x.length) currentFocus = 0
  if (currentFocus < 0) currentFocus = (x.length - 1)
  x[currentFocus].classList.add('autocomplete-active')
}

function removeActive(x) {
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('autocomplete-active')
  }
}
</script>

<template>
  <div>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="Place of Birth" name="placeOfBirth">
        <UInput v-model="state.placeOfBirth" id="placeInput" type="text" @input="getPlace" />
      </UFormField>

      <div>
        <ul id="placeList" class="mt-1 place-list">
          <PlaceButton
            v-for="place in placesdata"
            :key="place.id"
            @insert-city="insertCity"
            :place="place"
          />
        </ul>
      </div>

      <UFormField label="Data of Birth" name="dateOfBirth">
        <UInput v-model="state.dateOfBirth" type="date" />
      </UFormField>
      <UFormField label="Time of Birth" name="timeOfBirth">
        <UInput v-model="state.timeOfBirth" type="time" />
      </UFormField>
      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
    <!-- <ChartBuilder
      :city="state.placeOfBirth"
      :lng="lng"
      :lat="lat"
      :date="state.dateOfBirth"
      :time="state.timeOfBirth"
    /> -->
  </div>
</template>

<style>
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>

