import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "components";
import { HiInformationCircle } from "react-icons/hi";

const meta: Meta<typeof Badge> = {
  title: "Components/common/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "info",
        "secondary",
        "danger",
        "warning",
        "success",
        "gray",
      ],
    },
    icon: {
      control: false, // manually assigned in the example
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: "Badge Label",
    size: "md",
    variant: "primary",
  },
};

export const WithIcon: Story = {
  args: {
    label: "With Icon",
    size: "md",
    variant: "info",
    // @ts-ignore
    icon: <HiInformationCircle size={16} />,
  },
};

export const Clickable: Story = {
  args: {
    label: "Clickable Badge",
    size: "sm",
    variant: "success",
    onClick: () => alert("Badge clicked!"),
  },
};
