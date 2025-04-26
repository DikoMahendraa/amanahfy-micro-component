import { Meta, StoryObj } from "@storybook/react";
import { PreviousOfflineDonationsList } from "components";

const meta: Meta<typeof PreviousOfflineDonationsList> = {
  title: "Components/organisms/PreviousOfflineDonationsList",
  component: PreviousOfflineDonationsList,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PreviousOfflineDonationsList>;

export const Default: Story = {
  render: () => <PreviousOfflineDonationsList />,
};
