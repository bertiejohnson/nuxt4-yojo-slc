export default function useKeywords() {
  async function getKeywordsForPlanetPair(planetIdOne: string, planetIdTwo: string) {
    try {
      let keywords: any = null
      // dynamically import the JSON file
      await import('~/assets/json/planet-keywords.json').then((module) => {
        keywords = module.default
      })
      // extract the keywords for each planet
      const planetOneArr = keywords?.filter((p: any) => p.planet_id === planetIdOne)
      const planetTwoArr = keywords?.filter((p: any) => p.planet_id === planetIdTwo)

      const planetOneKeywords = []

      for (let i = 0; i < planetOneArr.length; i++) {
        planetOneKeywords[i] = planetOneArr[i].keyword
      }

      const planetTwoKeywords = []
      for (let i = 0; i < planetTwoArr.length; i++) {
        planetTwoKeywords[i] = planetTwoArr[i].keyword
      }

      const keywordsList = []

      for (let i = 0; i < (planetOneKeywords ?? []).length; i++) {
        keywordsList.push(`${planetOneKeywords[i]} - ${planetTwoKeywords[i]}`)
      }
      return keywordsList
    } catch (error) {
      console.error('Error fetching keywords:', error)
      return error
    }
  }
  return { getKeywordsForPlanetPair }
}
