export enum SubscriptionStatus {
  COMPLETED = 'COMPLETED',
  ON_PRCESS = 'ON_PRCESS',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export type SubscriptionItem = {
  id: number
  thumbnail: string
  name: string
  datetime: string
  donation_name: string
  donation_total: number
  donation_currency: string
  status: SubscriptionStatus
}