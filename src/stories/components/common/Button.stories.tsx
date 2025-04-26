import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "components";

const meta: Meta<typeof Button> = {
  title: "Components/common/Button",
  component: Button,
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
        "secondary",
        "danger",
        "warning",
        "success",
        "outline-primary",
        "outline-danger",
        "outline-warning",
        "outline-success",
        "white",
        "gradient-primary",
      ],
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
    },
    onClick: { action: "clicked" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click Me",
    size: "md",
    variant: "primary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    size: "md",
    variant: "primary",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {[
        "primary",
        "secondary",
        "danger",
        "warning",
        "success",
        "outline-primary",
        "outline-danger",
        "outline-warning",
        "outline-success",
        "white",
        "gradient-primary",
      ].map((variant) => (
        <Button key={variant} variant={variant as ButtonProps["variant"]}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};
