import { UIBuilderElementProperties } from "./ui-builder";

export type FundraisingListItem = {
  id: number;
  title: string;
  last_donation_at?: string;
  goals_amount: number;
  raised_amount: number;
  total_donors: number;
  status?: FundraisingListItemStatus | string;
  currency: string;
};

export type FundraisingListItemStatus = "draft" | "active" | "in-review";

export type FundraisingFormPayload = {
  fundraising_campaign_name: string;
  fundraising_goal: number;
  fundraising_campaign_image: File | null;
  fundraising_campaign_description: UIBuilderElementProperties[];
  fundraising_custom_url: string;
  fundraising_amanahfy_url: string;
};

export type FundraisingOfflineDonationFormPayload = {
  offline_donation_amount: number;
  offline_donation_description: string;
  offline_donation_donors_number: number;
  offline_donation_recent_donor_name: string;
  offline_donation_fundraiser: string;
  offline_donation_proof_of_funds: File | null;
};
