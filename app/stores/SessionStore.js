export const useSessionStore = defineStore('sessionStore', {
  state: () => {
    return {
      birthData: {},
      supabaseUser: {}
    }
  },
  getters: {
    getBirthData: (state) => state.birthData,
    getSupabaseUser: (state) => state.supabaseUser
  },
  actions: {
    setBirthData(data) {
      this.birthData = data
    },
    setSupabaseUser(data) {
      this.supabaseUser = data
    }
  }
})
