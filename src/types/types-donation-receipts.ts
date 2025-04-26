export type DonationReceiptsItem = {
  id: number
  datetime: string
  donation_name: string
  donor_name: string
  organization: {
    logo: string
    name: string
  }
  total: number
  currency: string
}