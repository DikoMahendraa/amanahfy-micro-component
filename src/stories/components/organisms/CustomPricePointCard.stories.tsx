import type { Meta, StoryObj } from "@storybook/react";
import { CustomPricePointCard } from "components";
import { PricePointData } from "types/types-price-points";

const meta: Meta<typeof CustomPricePointCard> = {
  title: "Components/organisms/CustomPricePointCard",
  component: CustomPricePointCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CustomPricePointCard>;

const mockData: PricePointData = {
  id: 1,
  name: "Premium Package",
  description: "Access to all premium features, tools, and resources.",
  amount: 4999,
  currency: "USD",
};

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const WithEditButton: Story = {
  args: {
    data: mockData,
    onEdit: (data) => alert(`Editing price point: ${data.name}`),
  },
};
