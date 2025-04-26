import type { Meta, StoryObj } from "@storybook/react";
import { OfflineDonationForm } from "components";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof OfflineDonationForm> = {
  title: "Components/organisms/OfflineDonationForm",
  component: OfflineDonationForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onInputChange: { action: "input changed" },
    onInputBlur: { action: "input blurred" },
    onFileDrop: { action: "file dropped" },
    onFileRemove: { action: "file removed" },
    onFileButtonClick: { action: "file button clicked" },
    onSubmit: { action: "form submitted" },
  },
};

export default meta;
type Story = StoryObj<typeof OfflineDonationForm>;

// Mock file for the stories
const mockFile = new File(["dummy content"], "receipt.png", {
  type: "image/png",
});
// Override URL.createObjectURL to work in Storybook
URL.createObjectURL = () =>
  "https://placehold.co/800x600/e3a008/FFFFFF?text=Proof+of+Funds";

// Common props for all stories
const commonProps = {
  onInputChange: action("input changed"),
  onInputBlur: action("input blurred"),
  onFileDrop: action("file dropped"),
  onFileRemove: action("file removed"),
  onFileButtonClick: action("file button clicked"),
  onSubmit: action("form submitted"),
  descriptionCharCount: "16/35 characters",
  fundraiserOptions: [
    { value: "", label: "-- Select a Fundraiser --", disabled: true },
    { value: "123", label: "Adil Ali" },
    { value: "456", label: "Sarah Johnson" },
    { value: "789", label: "Mohammed Rahman" },
  ],
  getRootProps: () => ({}),
  getInputProps: () => ({}),
  isDragAccept: false,
};

// Empty form
export const Empty: Story = {
  args: {
    ...commonProps,
    amount: "",
    description: "",
    donorsNumber: "",
    recentDonorName: "",
    fundraiser: "",
    proofOfFunds: null,
    errors: {},
    touched: {},
  },
};

// Filled form
export const Filled: Story = {
  args: {
    ...commonProps,
    amount: 500,
    description: "Cash donation collected during charity event",
    donorsNumber: 15,
    recentDonorName: "Community Fundraiser",
    fundraiser: "123",
    proofOfFunds: mockFile,
    errors: {},
    touched: {
      amount: true,
      description: true,
      donorsNumber: true,
      recentDonorName: true,
      fundraiser: true,
      proofOfFunds: true,
    },
  },
};

// With validation errors
export const WithErrors: Story = {
  args: {
    ...commonProps,
    amount: "",
    description: "",
    donorsNumber: 0,
    recentDonorName: "",
    fundraiser: "",
    proofOfFunds: null,
    errors: {
      amount: "This field is required",
      description: "This field is required",
      donorsNumber: "Minimum value is 1",
      recentDonorName: "This field is required",
      proofOfFunds: "This field is required",
    },
    touched: {
      amount: true,
      description: true,
      donorsNumber: true,
      recentDonorName: true,
      fundraiser: false,
      proofOfFunds: true,
    },
  },
};

// Partially filled
export const PartiallyFilled: Story = {
  args: {
    ...commonProps,
    amount: 250,
    description: "Offline donation from event",
    donorsNumber: "",
    recentDonorName: "",
    fundraiser: "",
    proofOfFunds: null,
    errors: {},
    touched: {
      amount: true,
      description: true,
    },
  },
};

// With file uploaded
export const WithFileUploaded: Story = {
  args: {
    ...commonProps,
    amount: "",
    description: "",
    donorsNumber: "",
    recentDonorName: "",
    fundraiser: "",
    proofOfFunds: mockFile,
    errors: {},
    touched: {},
  },
};

// Drag Accept State
export const DragAcceptState: Story = {
  args: {
    ...commonProps,
    amount: "",
    description: "",
    donorsNumber: "",
    recentDonorName: "",
    fundraiser: "",
    proofOfFunds: null,
    errors: {},
    touched: {},
    isDragAccept: true,
  },
};

// Mobile View
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
