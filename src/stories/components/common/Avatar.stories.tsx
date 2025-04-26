import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarSize } from "components";

const meta: Meta<typeof Avatar> = {
  title: "Components/common/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    alt: { control: "text" },
    src: { control: "text" },
    loading: {
      control: { type: "radio" },
      options: ["eager", "lazy"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://picsum.photos/200",
    alt: "Default Avatar",
    size: "md",
    loading: "lazy",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"].map((size) => (
        <Avatar
          key={size}
          src="https://picsum.photos/200"
          alt={`${size} Avatar`}
          size={size as AvatarSize}
        />
      ))}
    </div>
  ),
};

// Story to demonstrate fallback when src is missing
export const FallbackMissingSrc: Story = {
  args: {
    src: "", // Intentionally empty src
    alt: "John Doe",
    size: "lg",
  },
};

// Story to demonstrate fallback when src is invalid
export const FallbackInvalidSrc: Story = {
  args: {
    src: "invalid-image-url", // Intentionally invalid src
    alt: "Jane Smith",
    size: "lg",
  },
};

// Story to demonstrate initials generation with different name formats
export const FallbackInitialsExamples: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="" alt="Single" size="md" />
      <Avatar src="invalid" alt="Two Names" size="md" />
      <Avatar src="" alt="More Than Two Names" size="md" />
      <Avatar src="invalid" alt="" size="md" /> {/* Empty alt */}
      <Avatar src="" alt=" lowercase name " size="md" />{" "}
      {/* Leading/trailing spaces */}
    </div>
  ),
};
