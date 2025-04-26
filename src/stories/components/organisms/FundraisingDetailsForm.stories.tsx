import type { Meta, StoryObj } from "@storybook/react";
import { FundraisingDetailsForm } from "components";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof FundraisingDetailsForm> = {
  title: "Components/organisms/FundraisingDetailsForm",
  component: FundraisingDetailsForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onInputChange: { action: "changed" },
    onInputBlur: { action: "blurred" },
    onImageUpload: { action: "image uploaded" },
    onImageRemove: { action: "image removed" },
    onEditDescription: { action: "edit description clicked" },
    onSubmit: { action: "form submitted" },
    onPreview: { action: "preview clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof FundraisingDetailsForm>;

// Common actions for all stories
const commonProps = {
  onInputChange: action("input changed"),
  onInputBlur: action("input blurred"),
  onImageUpload: action("image uploaded"),
  onImageRemove: action("image removed"),
  onEditDescription: action("edit description clicked"),
  onSubmit: action("form submitted"),
  onPreview: action("preview clicked"),
};

// Create a mock File object for the image
const mockFile = new File(["dummy content"], "example.png", {
  type: "image/png",
});
// Override URL.createObjectURL to work in Storybook
URL.createObjectURL = () =>
  "https://placehold.co/1600x600/e3a008/FFFFFF?text=Campaign+Image";

// Empty form state
export const Empty: Story = {
  args: {
    campaignName: "",
    fundraisingGoal: "",
    campaignImage: null,
    customUrl: "",
    amanahfyUrl: "",
    errors: {},
    touched: {},
    ...commonProps,
  },
};

// Filled form state
export const Filled: Story = {
  args: {
    campaignName: "Clean Water Initiative",
    fundraisingGoal: "50000",
    campaignImage: mockFile,
    customUrl: "clean-water-2025",
    amanahfyUrl: "clean-water-initiative",
    errors: {},
    touched: {
      campaignName: true,
      fundraisingGoal: true,
      customUrl: true,
      amanahfyUrl: true,
    },
    ...commonProps,
  },
};

// Form with validation errors
export const WithErrors: Story = {
  args: {
    campaignName: "",
    fundraisingGoal: "0",
    campaignImage: null,
    customUrl: "invalid-url",
    amanahfyUrl: "",
    errors: {
      campaignName: "This field is required",
      fundraisingGoal: "Minimum value is 1",
      customUrl: "Invalid URL",
    },
    touched: {
      campaignName: true,
      fundraisingGoal: true,
      customUrl: true,
      amanahfyUrl: false,
    },
    ...commonProps,
  },
};

// Partially filled form
export const PartiallyFilled: Story = {
  args: {
    campaignName: "Education Fund",
    fundraisingGoal: "25000",
    campaignImage: null,
    customUrl: "",
    amanahfyUrl: "",
    errors: {},
    touched: {
      campaignName: true,
      fundraisingGoal: true,
    },
    ...commonProps,
  },
};

// Mobile view (can be controlled in Storybook viewport)
export const MobileView: Story = {
  args: {
    ...Empty.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// With uploaded image
export const WithImage: Story = {
  args: {
    ...PartiallyFilled.args,
    campaignImage: mockFile,
  },
};
