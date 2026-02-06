export const useSupabaseAPI = () =>{
  const client = useSupabaseClient()

  async function getChartFromId(supabaseId: string) {
    const { data, error } = await client
      .from('charts')
      .select('chart_data')
      .eq('profile_id', supabaseId)
      .order('id', { ascending: false })
      .limit(1)

    if (error) {
      console.error('Error fetching chart:', error)
      return null
    }

    return { data, error }
  }

  return { getChartFromId }
}
