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

    console.log('Fetched chart data from Supabase:', data)

    return { data, error }
    // return data?.[0]?.chart_data ? JSON.parse(data[0].chart_data) : null
  }

  return { getChartFromId }
}
