import type { Meta, StoryObj } from "@storybook/react";
import { TeamsCampaignsList } from "components";
import { TeamsCampaignsListItem } from "types/types-teams";

const meta: Meta<typeof TeamsCampaignsList> = {
  title: "Components/organisms/TeamsCampaignsList",
  component: TeamsCampaignsList,
};

export default meta;
type Story = StoryObj<typeof TeamsCampaignsList>;

const mockData: TeamsCampaignsListItem[] = [
  {
    id: 1,
    name: "Clean Water for All",
    raised_amount: 5000,
    currency: "USD",
  },
  {
    id: 2,
    name: "Education First",
    raised_amount: 3000,
    currency: "USD",
  },
];

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
