<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const client = useSupabaseClient()

const schema = z.object({
  email: z.email('An email address is required'),
  password: z.string('A password is required').min(8, 'Password must be at least 8 characters long')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: state.email,
      password: state.password
    })

    await navigateTo('/db')
    // verifying.value = true;
    // if (data?.user?.identities?.length === 0) {
    //   return { data, error: "Please sign in with your existing account" };
    // }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex items-center w-full">
    <div class="mx-auto mt-4">
      <h2>Login Page</h2>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Email"
          name="email"
        >
          <UInput v-model="state.email" />
        </UFormField>

        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="state.password"
            type="password"
          />
        </UFormField>

        <UButton type="submit">
          Sign in
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<style>

</style>
