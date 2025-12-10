import { openDB } from 'idb'

export default async function useFetchChartFromIDB() {
  const storeName = 'chartStore2'
  const db = await openDB('ReddogDB')
  const chart = await db.get(storeName, 1)
  return chart
}
