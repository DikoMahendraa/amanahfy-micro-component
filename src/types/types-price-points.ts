export type PricePointData = {
  id: number
  name: string
  description: string
  amount: number
  currency: string
}

export type CustomPricePointFormPayload = {
  custom_price_point_name: string
  custom_price_point_description: string
  custom_price_point_amount: number
  custom_price_point_currency: string
}