import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "components";

const meta: Meta<typeof Input> = {
  title: "Components/common/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    hasError: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
    size: "md",
    hasError: false,
    disabled: false,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "This input has an error",
    size: "md",
    hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Input size="xs" placeholder="XS size" />
      <Input size="sm" placeholder="SM size" />
      <Input size="md" placeholder="MD size" />
      <Input size="lg" placeholder="LG size" />
      <Input size="xl" placeholder="XL size" />
    </div>
  ),
};
