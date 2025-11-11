<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const user = useSupabaseUser()
const client = useSupabaseClient()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Nuxt Starter Template'
const description = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Dashboard',
  to: '/db',
  icon: 'i-lucide-book-open',
  active: route.path.startsWith('/docs/getting-started')
}])

const signOut = async () => {
  const { error } = await client.auth.signOut()
  if (error) {
    console.error(error)
  }
  await navigateTo('/')
}
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-5 shrink-0" />
        </NuxtLink>

        <UNavigationMenu
          :items="items"
          variant="link"
          class="hidden lg:block ml-4"
        />

        <!-- <TemplateMenu /> -->
      </template>

      <template #right>
        <div v-if="user" class="flex items-center">
          <UIcon
            name="i-lucide-circle-user-round"
            class="size-6"
            @click="signOut"
          />
        </div>
        <div v-else>
          <NuxtLink
            to="/login"
            class="text-gray-700 hover:bg-gray-400 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Sign in
          </NuxtLink>
        </div>
      </template>

      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
