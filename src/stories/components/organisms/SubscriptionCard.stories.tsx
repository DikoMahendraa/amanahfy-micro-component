import type { Meta, StoryObj } from "@storybook/react";
import { SubscriptionCard } from "components";
import {
  SubscriptionItem,
  SubscriptionStatus,
} from "types/types-subscriptions";

const meta: Meta<typeof SubscriptionCard> = {
  title: "Components/organisms/SubscriptionCard",
  component: SubscriptionCard,
};

export default meta;
type Story = StoryObj<typeof SubscriptionCard>;

const mockData: SubscriptionItem = {
  id: 1,
  name: "Monthly Support",
  datetime: new Date().toISOString(),
  thumbnail: "https://via.placeholder.com/300x200.png?text=Thumbnail",
  donation_name: "Clean Water Project",
  donation_total: 50,
  status: "COMPLETED" as SubscriptionStatus,
  donation_currency: "USD",
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};
