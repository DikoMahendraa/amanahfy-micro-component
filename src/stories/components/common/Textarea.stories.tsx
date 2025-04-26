import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "components";

const meta: Meta<typeof Textarea> = {
  title: "Components/common/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the textarea",
      defaultValue: "md",
    },
    rows: {
      control: { type: "number", min: 1 },
      description: "Number of visible text rows",
      defaultValue: 3,
    },
    hasError: {
      control: "boolean",
      description: "Apply error styles",
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea",
    },
    placeholder: {
      control: "text",
      description: "Textarea placeholder text",
    },
    className: {
      control: "text",
      description: "Custom Tailwind classes",
    },
    defaultValue: {
      control: "text",
      description: "Initial value of the textarea",
    },
    onChange: {
      action: "changed",
      description: "Triggered when the textarea changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    size: "md",
    rows: 3,
    placeholder: "Type something...",
    hasError: false,
    disabled: false,
    defaultValue: "",
  },
};

export const WithError: Story = {
  args: {
    size: "md",
    rows: 4,
    hasError: true,
    defaultValue: "Oops! Something went wrong.",
  },
};

export const Disabled: Story = {
  args: {
    size: "md",
    disabled: true,
    defaultValue: "This field is disabled",
  },
};
