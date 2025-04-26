import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AddExistingCampaignPopup } from "components";
import { CURRENCY } from "utils/number";

type Campaign = {
  id: number | string;
  imageUrl: string;
  title: string;
  raisedAmount: number;
  targetAmount: number;
  currency: string;
};

const mockCampaigns: Campaign[] = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  imageUrl: `https://dummyimage.com/600x500/9e9e9${i}/fff`,
  title: `Sample Campaign Title ${i + 1} With Longer Name`,
  raisedAmount: Math.floor(Math.random() * 90000) + 10000,
  targetAmount: 100000,
  currency: CURRENCY.USD,
}));

const meta: Meta<typeof AddExistingCampaignPopup> = {
  title: "Components/organisms/AddExistingCampaignPopup",
  component: AddExistingCampaignPopup,
  tags: ["autodocs"],
  argTypes: {
    show: { control: "boolean" },
    campaigns: { control: "object" },
    selectedCampaignId: { control: "text" },
    searchTerm: { control: "text" },
    isLoading: { control: "boolean" },
    isAdding: { control: "boolean" },
    onClose: { action: "closed" },
    onSelectCampaign: { action: "selected" },
    onAddCampaign: { action: "added" },
    onSearchChange: { action: "searched" },
  },
};

export default meta;

type Story = StoryObj<typeof AddExistingCampaignPopup>;

const BaseStory: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedId, setSelectedId] = useState<string | number | null>(
      args.selectedCampaignId || null
    );
    const [search, setSearch] = useState(args.searchTerm || "");
    const [adding, setAdding] = useState(args.isAdding || false);

    const handleClose = () => {
      setIsOpen(false);
      args.onClose();
    };

    const handleSelect = (id: string | number) => {
      setSelectedId(id);
      args.onSelectCampaign(id);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      args.onSearchChange(event);
    };

    const handleAdd = () => {
      args.onAddCampaign();
      setAdding(true);
      setTimeout(() => {
        setAdding(false);
        setIsOpen(false);
        alert(`Campaign ${selectedId} added!`);
        setSelectedId(null);
      }, 1500);
    };

    const filteredCampaigns = args.campaigns.filter((campaign) =>
      campaign.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <>
        {!isOpen && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsOpen(true)}
          >
            Open Modal
          </button>
        )}
        <AddExistingCampaignPopup
          {...args}
          show={isOpen}
          onClose={handleClose}
          campaigns={filteredCampaigns}
          selectedCampaignId={selectedId}
          onSelectCampaign={handleSelect}
          searchTerm={search}
          onSearchChange={handleSearch}
          onAddCampaign={handleAdd}
          isAdding={adding}
        />
      </>
    );
  },
};

export const Default: Story = {
  ...BaseStory,
  args: {
    campaigns: mockCampaigns,
    isLoading: false,
    isAdding: false,
    selectedCampaignId: null,
    searchTerm: "",
  },
};

export const LoadingCampaigns: Story = {
  ...BaseStory,
  args: {
    ...Default.args,
    campaigns: [],
    isLoading: true,
  },
};

export const AddingCampaign: Story = {
  ...BaseStory,
  args: {
    ...Default.args,
    selectedCampaignId: mockCampaigns[0]?.id || 1,
    isAdding: true,
  },
};

export const NoCampaignsFound: Story = {
  ...BaseStory,
  args: {
    ...Default.args,
    campaigns: [],
    isLoading: false,
  },
};
