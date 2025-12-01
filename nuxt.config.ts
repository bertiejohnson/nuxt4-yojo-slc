// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/test-utils',
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    public: {
      mapboxApiKey: ''
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-07-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  supabase: {
    redirect: false,
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || ''
  },

  vite: {
    server: {
      allowedHosts: ["yojoastro.com"] 
    },
    optimizeDeps: {
      include: ['@supabase/postgrest-js', '@supabase/supabase-js']
    }
  },
  nitro: {
    externals: {
      inline: ['@supabase/supabase-js']
    }
  },
})
