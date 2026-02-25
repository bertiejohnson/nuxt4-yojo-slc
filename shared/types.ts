export interface Chart {
  chart: ChartObject
}

type Aspect = {
  planetPair: string
  aspectName: string
  planetOne_swisseph_id: number
  planetTwo_swisseph_id: number
}

export interface ChartObject {
  aspects: Aspect[]
  houses: object
  planets: object[]
}

export interface ChartRow {
  id?: number
  supabaseId?: string
  chart: Chart
  name: string
  birthdate: string
  birthtime: string
  birthplace: string
}

export interface Transits {
  id: string
  chartId: number
  transitData: object
}

export interface ChartAspect {
  planetOneName: string
  aspectName: string
  planetTwoName: string
}
