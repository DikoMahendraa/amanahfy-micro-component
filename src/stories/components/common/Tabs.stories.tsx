import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabItem } from "components";
import { useState } from "react";

const defaultItems: TabItem[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
];

const meta: Meta<typeof Tabs> = {
  title: "Components/common/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    activeKey: {
      control: "select",
      options: defaultItems.map((item) => item.key),
      description: "Currently active tab key",
    },
    className: {
      control: "text",
      description: "Additional Tailwind className for wrapper",
    },
    items: {
      control: false, // complex prop, not easily editable in controls panel
    },
    onChange: {
      action: "changed",
      description: "Callback when a different tab is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    activeKey: "home",
    items: defaultItems,
  },
  render: (args) => {
    const [activeKey, setActiveKey] = useState(args.activeKey);

    return (
      <Tabs
        {...args}
        activeKey={activeKey}
        onChange={(tab) => {
          setActiveKey(tab.key);
          args.onChange?.(tab);
        }}
      />
    );
  },
};

export const WithCustomLabel: Story = {
  args: {
    activeKey: "profile",
    items: [
      { key: "profile", label: <span>👤 Profile</span> },
      { key: "settings", label: <span>⚙️ Settings</span> },
    ],
  },
  render: (args) => {
    const [activeKey, setActiveKey] = useState(args.activeKey);

    return (
      <Tabs
        {...args}
        activeKey={activeKey}
        onChange={(tab) => {
          setActiveKey(tab.key);
          args.onChange?.(tab);
        }}
      />
    );
  },
};
