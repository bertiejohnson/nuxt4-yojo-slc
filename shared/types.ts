export interface Chart {
  chart: ChartObject
}

export interface ChartObject {
  aspects?: object[]
  houses?: object
  planets?: object[]
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
