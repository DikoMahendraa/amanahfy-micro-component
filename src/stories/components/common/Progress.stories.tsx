import { Meta, StoryObj } from "@storybook/react";
import { Progress } from "components";

const meta: Meta<typeof Progress> = {
  title: "Components/common/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["primary", "info", "secondary", "danger", "warning", "success"],
    },
    value: {
      control: { type: "number" },
    },
    className: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
    size: "md",
    variant: "primary",
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="space-y-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size}>
          <span className="text-sm capitalize">{size}</span>
          <Progress {...args} size={size} value={args.value} />
        </div>
      ))}
    </div>
  ),
  args: {
    value: 70,
    variant: "info",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="space-y-3 w-full">
      {(
        [
          "primary",
          "info",
          "secondary",
          "danger",
          "warning",
          "success",
        ] as const
      ).map((variant) => (
        <div key={variant} className="w-full">
          <span className="text-sm capitalize">{variant}</span>
          <Progress {...args} variant={variant} value={args.value} />
        </div>
      ))}
    </div>
  ),
  args: {
    value: 80,
    size: "md",
  },
};
