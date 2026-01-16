import { getChartFromId } from '../../../repository/supabaseRepository'

export default defineEventHandler(async (event) => {
  const { data, error } = await getChartFromId(1)

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chart not found - Supabase repository returned null'
    })
  }

  console.log('Returning chart data from API endpoint:', data)

  return { data, error }
})
