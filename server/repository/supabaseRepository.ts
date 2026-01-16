// import { supabase } from "../utils/supabase"

export async function getChartFromId() {
  const { data, error } = await supabase
    .from('charts')
    .select('chart')
    .limit(1)
  if (error) {
    console.error('Error fetching chart during supabase client init in repository:', error)
  } else {
    console.log('Supabase client initialized, sample chart data in repository:', data)
  }

  return { data, error }
}
