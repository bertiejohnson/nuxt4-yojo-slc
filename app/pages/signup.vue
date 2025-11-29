<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const client = useSupabaseClient()

const sessionStore = useSessionStore()
const birthData = sessionStore.getBirthData

const schema = z.object({
  email: z.email('An email address is required'),
  password: z.string('A password is required').min(8, 'Password must be at least 8 characters long')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  try { // validate birthData before running signUp ...
    let { data, error } = await client.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        emailRedirectTo: 'https://yojoastro.com/confirm',
        data: {
          user_birth_data: birthData
        }
      }
    })
    state.email = ''
    state.password = ''
} catch (error) {
    console.log('Error!!', error.value)
  }
}
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <h2 class="text-3xl font-bold mt-2">
      Sign Up
    </h2>
    <p class="my-5 text-center w-44">
      Enter your details to create your account
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
          Submit
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<style>

</style>
