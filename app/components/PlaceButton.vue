<script setup>
const props = defineProps({
  place: Object
})

const emit = defineEmits(['insertCity'])

// sort out the naming here - selectCity and insert-city ... why the difference? Is it confusing?
const selectCity = (place) => {
  emit('insertCity', { place_name: place.place_name, lng: place.geometry.coordinates[0], lat: place.geometry.coordinates[1] }
  )
}
</script>

<template>
  <li
    class="w-[310px] bg-white truncate border border-t border-gray-100 py-1 px-2 text-sm place-list-li"
    @click="selectCity(place)"
  >
    <span class="font-bold text-slate-700">{{ place.text }}</span><br>
    <span
      v-for="(context, index) in place.context"
      :key="index"
      class="mr-1 text-xs text-slate-500"
    >
      {{ context.text }}
    </span>
  </li>
</template>

<style scoped>
.place-list-li:first-of-type {
  margin-top: -1rem;
  border-top-left-radius: 0.25rem; /* 4px */
  border-top-right-radius: 0.25rem; /* 4px */
}

.place-list-li:nth-last-of-type(1) {
  border-bottom-left-radius: 0.25rem; /* 4px */
  border-bottom-right-radius: 0.25rem; /* 4px */
}
</style>
