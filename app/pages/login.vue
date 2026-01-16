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

    await navigateTo('/dash')
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
  <div class="flex flex-col items-center w-full">
    <h2 class="text-3xl font-bold mt-2">
      Sign in
    </h2>
    <p class="my-5 text-center w-44">
      Enter your details to sign into your account
    </p>
    <div class="bg-green-50 border border-green-600 rounded-md py-5 px-3 w-fit">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Email"
          name="email"
          class="m"
        >
          <UInput
            v-model="state.email"
            type="email"
          />
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
