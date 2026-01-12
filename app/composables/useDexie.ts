import { db } from '@/utils/db'
import type { Chart } from '~~/shared/types'

export const useDexie = () => {
  //
  async function addChart(chartData: Chart) {
    let status = ''
    try {
      const retval = await db.charts.add({
        supabaseId: 'local-user',
        chartrow: chartData,
        name: 'Local Chart',
        birthdate: '2000-01-01',
        birthtime: '12:00',
        birthplace: 'Localtown'
      })

      if (retval === undefined) throw new Error('db.charts.add returned undefined')

      const test = await db.transits.add({
        chartId: retval,
        transitData: { test: 'Sample transit data' }
      })

      if (test === undefined) throw new Error('db.transits.add returned undefined')

      status = `Chart successfully added to IndexedDB with id ${retval} and transit id ${test}`
    } catch (error) {
      status = `Failed to add chart to IndexedDB: ${error}`
    }

    console.log(status)
  }
  return { addChart }
}
