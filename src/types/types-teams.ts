export type TeamsListItem = {
  id: number
  name: string
  captain: {
    avatar: string
    name: string
  }
  members: number
  status: TeamsListItemStatus
}

export type TeamsListItemStatus = 'active' | 'in-review'

export type TeamsFundraisersListItem = {
  id: number
  first_name: string
  last_name: string
  email: string
  raised_amount: number
  currency: string
  status: TeamsFundraisersListItemStatus
}

export type TeamsFundraisersListItemStatus = 'accepted' | 'invited' | 'rejected'

export type TeamsCampaignsListItem = {
  id: number
  name: string
  raised_amount: number
  currency: string
}