export const useKeywordsStore = defineStore('keywords', {
  state: () => ({
    keywords: [],
    landingKeywordPairs: [],
    keywordsFetched: false
  }),
  getters: {
    getKeywords: (state) => state.keywords,
    getLandingKeywordPairs: (state) => state.landingKeywordPairs
  },
  actions: {
    async fetchLandingKeywords(keywordPairs) {
      this.landingKeywordPairs = keywordPairs
      const response = await useGenerateObject(keywordPairs)
      if (Array.isArray(response?.object.value.object.phrases)) {
        this.keywords = response.object.value.object.phrases
        this.keywordsFetched = true
      }
    }
  }
})
