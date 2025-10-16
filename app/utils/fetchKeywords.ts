export default async () => {
  try {
    const data = await import('~/assets/json/planet-keywords.json')
    return data.default
  } catch (error) {
    console.error('Error fetching keywords:', error)
    return null
  }
}
