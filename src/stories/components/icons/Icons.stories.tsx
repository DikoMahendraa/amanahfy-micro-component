import type { Meta, StoryObj } from "@storybook/react";
import {
  IconFacebookCircle,
  IconInstagramCircle,
  IconMasterCard,
  IconMasterCardSmall,
  IconTrashDanger,
  IconXCircle,
  IconYoutubeCircle,
} from "components";

const meta: Meta = {
  title: "Components/icons/All-Icons",
  tags: ["autodocs"],
  component: IconTrashDanger,
  argTypes: {
    size: {
      control: { type: "select" },
      options: [16, 20, 24, 28, 32, 38, 40],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconFacebookCircle>;

export const Default: Story = {
  args: {
    size: 24,
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <div className="bg-gray-200 rounded-lg p-2">
        <IconFacebookCircle />
      </div>
      <div className="bg-gray-200 rounded-lg p-2">
        <IconInstagramCircle />
      </div>
      <div className="bg-gray-200 rounded-lg p-2">
        <IconMasterCard />
      </div>
      <div className="bg-gray-200 rounded-lg p-2">
        <IconMasterCardSmall />
      </div>
      <div className="bg-gray-200 rounded-lg p-2">
        <IconTrashDanger size={32} />
      </div>
      <div className="bg-gray-200 rounded-lg p-2">
        <IconXCircle />
      </div>
      <div className="bg-gray-200 rounded-lg p-2">
        <IconYoutubeCircle />
      </div>
    </div>
  ),
};
