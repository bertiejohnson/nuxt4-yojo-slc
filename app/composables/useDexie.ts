import { db } from '@/utils/db'
import type { Chart } from '~~/shared/types'

export const useDexie = () => {
  //
  async function addDexieChart(chartData: Chart, supabaseId: string) {
    console.log('Adding chart to IndexedDB via Dexie:', chartData)
    try {
      const retval = await db.charts.add({
        supabaseId: supabaseId,
        chart: chartData,
        name: '',
        birthdate: '',
        birthtime: '',
        birthplace: ''
      })

      if (retval === undefined) throw new Error('db.charts.add returned undefined')

      console.log(`Chart successfully added to IndexedDB with id ${retval}`)
    } catch (error) {
      console.log(`Failed to add chart to IndexedDB: ${error}`)
    }
  }

  async function getDexieChart() {
    return await db.charts.toArray()
  }
  return { addDexieChart, getDexieChart }
}
