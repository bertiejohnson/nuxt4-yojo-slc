<script lang="ts" setup>
import { liveQuery } from 'dexie'

const friends = useObservable<Friend[]>(liveQuery(() => dbfriends.friends.where('age').above(34).toArray())) // default to empty array while loading
</script>

<template>
  <div>
    <ul>
      <li
        v-for="friend in friends"
        :key="friend.id"
      >
        {{ friend.name }}, {{ friend.age }}
      </li>
    </ul>
  </div>
</template>

<style>

</style>
