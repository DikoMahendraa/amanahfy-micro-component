import { Meta, StoryObj } from "@storybook/react";
import { FundraisingOfflineDonations } from "components";

const meta: Meta<typeof FundraisingOfflineDonations> = {
  title: "Components/organisms/FundraisingOfflineDonations",
  component: FundraisingOfflineDonations,
};

export default meta;

type Story = StoryObj<typeof FundraisingOfflineDonations>;

export const Default: Story = {
  render: () => <FundraisingOfflineDonations />,
};
