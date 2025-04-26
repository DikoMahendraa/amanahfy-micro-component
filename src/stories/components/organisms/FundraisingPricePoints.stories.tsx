import { Meta, StoryObj } from "@storybook/react";
import { FundraisingPricePoints } from "components";

const meta: Meta<typeof FundraisingPricePoints> = {
  title: "Components/organisms/FundraisingPricePoints",
  component: FundraisingPricePoints,
};

export default meta;

type Story = StoryObj<typeof FundraisingPricePoints>;

export const Default: Story = {
  render: () => <FundraisingPricePoints />,
};
