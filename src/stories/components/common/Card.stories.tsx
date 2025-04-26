import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "components";

const meta: Meta<typeof Card> = {
  title: "Components/common/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: "This is a card content. You can pass any elements here.",
    className: "",
  },
};

export const WithCustomStyle: Story = {
  args: {
    children: "Card with custom styles",
    className: "bg-blue-50 shadow-md",
  },
};
