import type { Meta, StoryObj } from "@storybook/react";
import { FundraisingList } from "components";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof FundraisingList> = {
  title: "Components/organisms/FundraisingList",
  component: FundraisingList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onPreview: { action: "preview clicked" },
    onEdit: { action: "edit clicked" },
    onSearchChange: { action: "search changed" },
  },
};

export default meta;
type Story = StoryObj<typeof FundraisingList>;

// Helper functions
const calculateProgress = (goal: number, raised: number) => {
  return Math.min(Math.ceil((raised / goal) * 100), 100);
};

const formatAmountWithCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
};

const formatTimeAgo = (date: string) => {
  // Simple mock for Storybook
  return date ?? "3 days ago";
};

// Common props for all stories
const commonProps = {
  searchValue: "",
  onPreview: action("preview clicked"),
  onEdit: action("edit clicked"),
  onSearchChange: action("search changed"),
  calculateProgress,
  formatAmountWithCurrency,
  formatTimeAgo,
  statusConfig: {},
};

// Mock data
const mockData = [
  {
    id: 1,
    title: "Water for All Campaign",
    goals_amount: 50000,
    raised_amount: 35000,
    currency: "USD",
    status: undefined,
    total_donors: 125,
    last_donation_at: "2025-04-22T10:30:00Z",
  },
  {
    id: 2,
    title: "Education Fund",
    goals_amount: 100000,
    raised_amount: 15000,
    currency: "USD",
    status: "draft",
    total_donors: 42,
    last_donation_at: "2025-04-18T14:45:00Z",
  },
  {
    id: 3,
    title: "Emergency Relief Initiative",
    goals_amount: 75000,
    raised_amount: 60000,
    currency: "USD",
    status: "draft",
    total_donors: 210,
    last_donation_at: "2025-04-24T09:15:00Z",
  },
];

// With data
export const WithData: Story = {
  args: {
    ...commonProps,
    data: mockData,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    ...commonProps,
    data: [],
  },
};

// With search
export const WithSearch: Story = {
  args: {
    ...commonProps,
    data: mockData,
    searchValue: "water",
  },
};

// Mobile view
export const MobileView: Story = {
  args: {
    ...commonProps,
    data: mockData,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// With many items
export const ManyItems: Story = {
  args: {
    ...commonProps,
    data: [
      ...mockData,
      ...mockData.map((item) => ({ ...item, id: item.id })),
      ...mockData.map((item) => ({ ...item, id: item.id })),
    ],
  },
};
