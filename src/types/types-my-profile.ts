export enum EnumMenuItem {
  MAIN_INFO = 'MAIN_INFO',
  PAYMENT_DETAILS = 'PAYMENT_DETAILS',
  DONATION_RECEIPTS = 'DONATION_RECEIPTS',
  SUBSCRIPTIONS = 'SUBSCRIPTIONS',
  FUNDRAISING = 'FUNDRAISING',
  TEAMS = 'TEAMS',
}

export type MenuItem = {
  key: EnumMenuItem,
  title: string,
  is_active: boolean,
  href?: string
}

export type MainInfoDefaultValues = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  aboutMe: string
}

export type MainInfoSaveChangesPayload = {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  aboutMe: string
}
