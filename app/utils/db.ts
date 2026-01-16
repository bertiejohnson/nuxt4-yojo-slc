import { Dexie, type EntityTable } from 'dexie'
import type { ChartRow, Transits } from '~~/shared/types'

const db = new Dexie('YojoDatabase') as Dexie & {
  charts: EntityTable<
    ChartRow,
    'id'
  >
  // transits: EntityTable<
  //   Transits,
  //   'id'
  // > // Define tables here
}

db.version(1).stores({
  charts: '++id, chart, supabaseId, name, birthdate, birthtime, birthplace', // Define indexes here i.e. anything that will be used in a where clause
  // transits: '++id, chartId, transitData'
})

export { db }
