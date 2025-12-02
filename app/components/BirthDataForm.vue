<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import geocodeClient from '@mapbox/mapbox-sdk/services/geocoding'

const emit = defineEmits(['generateChart'])

// Need to sort format validation on date and time inputs ...
const schema = z.object({
  placeOfBirth: z.string('Place of birth is required'),
  dateOfBirth: z.string('Date of Birth is required').min(1),
  timeOfBirth: z.string('Time of Birth is required').min(1)
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  placeOfBirth: undefined,
  dateOfBirth: undefined,
  timeOfBirth: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Handle form submission logic here
  emit('generateChart', {
    city: state.placeOfBirth,
    lng: lng.value,
    lat: lat.value,
    date: state.dateOfBirth,
    time: state.timeOfBirth
  })

  // and reset form state once chart is loaded ...
  state.placeOfBirth = ''
  state.dateOfBirth = ''
  state.timeOfBirth = ''
}

// flag the input state - run getPlace and either produce list or accept entry after hitting 'Enter' on one of the locations in the location drop-down 
const acceptEntry = ref(true)
let currentFocus = -1

// const city = ref('')
const lng = ref(0)
const lat = ref(0)
const placesdata = ref(null)

function insertCity(placeAr) {
  acceptEntry.value = false // reset flag so getPlace will run

  state.placeOfBirth = placeAr.place_name
  lng.value = placeAr.lng
  lat.value = placeAr.lat
  placesdata.value = null
}

// Mapbox stuff
const mapboxAccessToken
  = useRuntimeConfig().public.mapboxApiKey

const geocodeService = geocodeClient({ accessToken: mapboxAccessToken })

// Error handling here - try/catch on the promise
const getPlace = async function (e) {
  if (!acceptEntry.value) {
    acceptEntry.value = true // reset
    currentFocus = -1 // reset

    // remove listener
    if (document.getElementById('placeInput')) {
      document.getElementById('placeInput')?.removeEventListener('keydown', handleArrowKeys)
    }
    return
  }

  // add listener for the resulting location drop-down list
  if (document.getElementById('placeInput')) {
    document.getElementById('placeInput')?.addEventListener('keydown', handleArrowKeys)
  }

  geocodeService.forwardGeocode({
    query: e.target.value,
    limit: 5,
    types: ['district', 'place', 'locality']
  }).send()
    .then((response) => {
      placesdata.value = response.body.features
    })
}

// Handle arrow key navigation on the location drop-down
function handleArrowKeys(e) {
  let x = document.getElementById('placeList')
  if (x) x = x.getElementsByTagName('li')

  if (e.key == 'ArrowDown') {
    console.log('arrow down')
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

function addActive(x) {
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
  <div class="bg-green-50 border border-green-600 rounded-md py-5 px-3 w-full">
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField
        label="Place of Birth"
        name="placeOfBirth"
      >
        <UInput
          id="placeInput"
          v-model="state.placeOfBirth"
          type="text"
          class="w-full"
          @input="getPlace"
        />
      </UFormField>

      <div class="">
        <ul
          id="placeList"
          class="mt-1 place-list"
        >
          <PlaceButton
            v-for="(place, index) in placesdata"
            :key="index"
            :place="place"
            @insert-city="insertCity"
          />
        </ul>
      </div>

      <UFormField
        label="Data of Birth"
        name="dateOfBirth"
      >
        <UInput
          v-model="state.dateOfBirth"
          type="date"
        />
      </UFormField>

      <UFormField
        label="Time of Birth"
        name="timeOfBirth"
      >
        <UInput
          v-model="state.timeOfBirth"
          type="time"
        />
      </UFormField>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
    <!-- <UButton
      variant="solid"
      color="success"
      class="mt-4"
      @click="$emit('generateChart')"
    >
      Generate Chart
    </UButton> -->
  </div>
</template>

<style>
.autocomplete-active {
  background-color: oklch(96.2% 0.044 156.743) !important;
  border-color: oklch(79.2% 0.209 151.711);
  color: #ffffff;
}
</style>
