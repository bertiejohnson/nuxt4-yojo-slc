import { Dexie, type EntityTable } from 'dexie'

interface ChartData { // What columns do I want here? Think about encryption
  id: number
  chart: object
  supabaseId?: string
  name?: string
  birthdate?: string
  birthtime?: string
  birthplace?: string
}

interface Transits {
  id: number
  chartId: number
  transitData: string
}

const db = new Dexie('YojoDatabase') as Dexie & {
  charts: EntityTable<
    ChartData,
    'id'
  >
  transits: EntityTable<
    Transits,
    'id'
  > // Define tables here
}

db.version(1).stores({
  charts: '++id, chart, supabaseId, name, birthdate, birthtime, birthplace', // Define indexes here i.e. anything that will be used in a where clause
  transits: '++id, chartId, transitData'
})

export type { ChartData, Transits }
export { db }
