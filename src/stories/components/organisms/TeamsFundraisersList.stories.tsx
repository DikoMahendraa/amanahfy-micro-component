import type { Meta, StoryObj } from "@storybook/react";
import { TeamsFundraisersList } from "components";
import { TeamsFundraisersListItem } from "types/types-teams";

const meta: Meta<typeof TeamsFundraisersList> = {
  title: "Components/organisms/TeamsFundraisersList",
  component: TeamsFundraisersList,
};

export default meta;

type Story = StoryObj<typeof TeamsFundraisersList>;

const mockData: TeamsFundraisersListItem[] = [
  {
    id: 1,
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice@example.com",
    raised_amount: 5000,
    currency: "USD",
    status: "accepted",
  },
  {
    id: 2,
    first_name: "Bob",
    last_name: "Smith",
    email: "bob@example.com",
    raised_amount: 200,
    currency: "EUR",
    status: "invited",
  },
  {
    id: 3,
    first_name: "Charlie",
    last_name: "Brown",
    email: "charlie@example.com",
    raised_amount: 0,
    currency: "GBP",
    status: "rejected",
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
