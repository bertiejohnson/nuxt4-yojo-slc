// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui', 
    '@nuxt/test-utils', 
    '@nuxt/eslint', 
    '@nuxtjs/supabase'
  ],
  
  css: ['~/assets/css/main.css'],
  
  routeRules: {
    '/': { prerender: true }
  },
  
  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || ''
  },
  
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  
  devtools: { enabled: true }
})
