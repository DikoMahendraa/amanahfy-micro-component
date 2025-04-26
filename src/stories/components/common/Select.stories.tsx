import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectProps } from "components";

const meta: Meta<typeof Select> = {
  title: "Components/common/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
    defaultValue: "banana",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as SelectProps["size"][]).map((size) => (
        <div key={size}>
          <label className="block text-sm font-medium mb-1">{size}</label>
          <Select {...args} size={size} />
        </div>
      ))}
    </div>
  ),
};

export const WithError: Story = {
  args: {
    size: "md",
    hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    size: "md",
    disabled: true,
  },
};
