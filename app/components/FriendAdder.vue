<template>
  <fieldset>
    <legend>Add new friend</legend>
    <label>
      Name:
      <UInput
        v-model="friendName"
        type="text"
      />
    </label>
    <br>
    <label>
      Age:
      <UInput
        v-model="friendAge"
        type="number"
      />
    </label>
    <br>
    <UButton @click="addFriend">
      Add Friend
    </UButton>
    <p>{{ status }}</p>
  </fieldset>
  <div class="mt-4">
    <FriendList />
  </div>
</template>

<script setup lang="ts">
import { dbfriends } from '#imports' // Import the database instance from utils/db.ts via auto-imports

const props = defineProps({
  defaultAge: {
    type: Number,
    default: 21
  }
})

const status = ref('')
const friendName = ref('')
const friendAge = ref(props.defaultAge)

const addFriend = async () => {
  try {
    // Add the new friend!
    const id = await dbfriends.friends.add({
      name: friendName.value,
      age: friendAge.value
    })

    status.value = `Friend ${friendName.value} successfully added. Got id ${id}`

    // Reset form:
    friendName.value = ''
    friendAge.value = props.defaultAge
  } catch (error) {
    status.value = `Failed to add ${friendName.value}: ${error}`
  }
}
</script>
