export const getMappedPlanetId = (id) => {
  const supabase = useSupabaseClient()

  const { data } = useAsyncData('keywords', async () => {
    const { data, error } = await supabase
      .from('swisseph_planet_mapping')
      .select('planet_id')
      .eq('swisseph_planet_id', id)
      .single()
    if (error) {
      console.error('Error fetching planet id:', error)
    }
    return data
  })
  console.log('Mapped Planet ID Data:', data.value)
  return data
}
