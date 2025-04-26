import type { Meta, StoryObj } from "@storybook/react";
import { TeamsList, type TeamsListProps } from "components";

// Mock Icons (replace with actual if needed)
import { TeamsListItem } from "types/types-teams";

// Example data
const mockData: TeamsListProps["data"] = [
  {
    id: 1,
    name: "Team Alpha",
    captain: {
      name: "Alice",
      avatar: "",
    },
    members: 5,
    status: "active",
  },
  {
    id: 2,
    name: "Team Beta",
    captain: {
      name: "Bob",
      avatar: "",
    },
    members: 3,
    status: "in-review",
  },
];

const meta: Meta<typeof TeamsList> = {
  title: "Components/organisms/TeamsList",
  component: TeamsList,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TeamsList>;

export const Default: Story = {
  args: {
    data: mockData,
    searchValue: "",
    onSearchChange: (val: string) => console.log("Search:", val),
    onPreview: (team: TeamsListItem) => alert(`Preview team: ${team.name}`),
    onEdit: (team: TeamsListItem) => alert(`Edit team: ${team.name}`),
    upcomingInvitesCount: 3,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    searchValue: "",
    onSearchChange: (val: string) => console.log("Search:", val),
    onPreview: () => ({}),
    onEdit: () => ({}),
    upcomingInvitesCount: 0,
  },
};
