<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const activeBreakpoint = breakpoints.active()

const layout = ref(false)

if (activeBreakpoint.value === 'mobile') {
  console.log(`Current active breakpoint: ${activeBreakpoint.value}`)
  layout.value = true
} else {
  console.log('No active breakpoint detected.')
}

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

const verified = ref(false)

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  try { // validate birthData before running signUp ...
    let { data, error } = await client.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        emailRedirectTo: useRuntimeConfig().public.baseUrl + '/confirm',
        data: {
          user_birth_data: birthData
        }
      }
    })
    state.email = ''
    state.password = ''
    if (data.user.aud === 'authenticated') {
      verified.value = true
    }
  } catch (error) {
    console.log('Error!!', error.value)
  }
}
</script>

<template>
  <div v-if="layout" class="flex flex-col items-center w-full">
    <h2 class="text-3xl font-bold mt-2">
      Sign Up
    </h2>
    <div v-if="!verified">
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
    <div v-else>
      <p class="my-5 text-center w-44">
        Please check your email to verify your account.
      </p>
    </div>
  </div>
  <div v-else class="flex flex-col items-center w-full">
    <h2 class="text-center text-3xl font-bold mt-8">
      Only works on mobile for now - more features coming soon!
    </h2>
  </div>
</template>

<style>

</style>
