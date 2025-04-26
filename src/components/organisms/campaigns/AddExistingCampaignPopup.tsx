import { memo } from "react";
import { IoMdClose } from "react-icons/io";
import { Modal, Button, Input, Card, Progress } from "components";
import { IoSearch } from "react-icons/io5";
import clsx from "clsx";
import { formatAmountWithCurrency } from "utils/number";

// Define the structure for a single campaign object
type Campaign = {
  id: number | string;
  imageUrl: string;
  title: string;
  raisedAmount: number;
  targetAmount: number;
  currency: string;
};

// Update prop types for the presentational component
type AddExistingCampaignPopupProps = {
  show: boolean;
  onClose: () => void;
  campaigns: Campaign[]; // List of campaigns to display
  selectedCampaignId: number | string | null; // Controlled selected ID
  onSelectCampaign: (id: number | string) => void; // Callback for selection
  onAddCampaign: () => void; // Callback for adding
  searchTerm: string; // Controlled search term
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Callback for search change
  isLoading?: boolean; // Optional: Show loading state for campaigns
  isAdding?: boolean; // Optional: Show loading state for add button
};

export const AddExistingCampaignPopup: React.FC<
  AddExistingCampaignPopupProps
> = ({
  show,
  onClose,
  campaigns,
  selectedCampaignId,
  onSelectCampaign,
  onAddCampaign,
  searchTerm,
  onSearchChange,
  isLoading, // Use isLoading if provided
  isAdding, // Use isAdding if provided
}) => {
  return (
    <Modal show={show} size="xl" onClose={onClose}>
      <div className="w-full space-y-4">
        <div className="w-full flex justify-end">
          {/* @ts-ignore */}
          <IoMdClose
            onClick={onClose}
            className="w-7 h-7 text-gray-500 cursor-pointer"
            aria-label="Close modal" // Added aria-label for accessibility
          />
        </div>
        <div className="w-full flex justify-center !mt-0">
          <div className="lg:w-4/5 flex flex-col items-center gap-1">
            <div className="w-full text-lg font-bold text-center">
              Add Existing Campaign
            </div>
            <p className="text-sm text-gray-400 text-center">
              Select an existing campaign to add it to your list.
              {/* Updated placeholder text */}
            </p>
          </div>
        </div>
        <div className="w-full space-y-5">
          <div className="w-full relative">
            <Input
              type="search"
              className="w-full pl-10"
              placeholder="Search campaigns..." // Updated placeholder
              value={searchTerm} // Controlled input value
              onChange={onSearchChange} // Controlled input change handler
            />
            <div className="absolute top-0 bottom-0 left-3 grid place-items-center">
              {/* @ts-ignore */}
              <IoSearch size={20} className="text-gray-400" />
            </div>
          </div>
          <div className="w-full bg-gray-100 p-3 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[calc(100dvh-30rem)] overflow-y-auto">
            {/* Conditional rendering for loading state */}
            {isLoading ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                Loading campaigns...
              </div>
            ) : campaigns.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500">
                No campaigns found.
              </div>
            ) : (
              campaigns.map((campaign) => {
                const progressValue = Math.min(
                  (campaign.raisedAmount / campaign.targetAmount) * 100,
                  100
                );
                return (
                  <Card
                    key={campaign.id}
                    onClick={() => onSelectCampaign(campaign.id)} // Use callback prop
                    className={clsx(
                      "w-full h-full shadow-md bg-white transition-all cursor-pointer !p-0 overflow-hidden",
                      selectedCampaignId === campaign.id &&
                        "ring-4 ring-primary" // Use prop for selection
                    )}
                  >
                    <img
                      alt={campaign.title} // Use campaign title for alt text
                      loading="lazy"
                      draggable="false"
                      src={campaign.imageUrl} // Use campaign image URL
                      className="w-full aspect-[6/5] object-cover object-center"
                    />
                    <div className="w-full px-4 py-3 space-y-2">
                      <div className="w-full line-clamp-1 text-lg font-bold">
                        {campaign.title} {/* Use campaign title */}
                      </div>
                      <Progress value={progressValue} variant="info" />
                      <div className="text-xs text-gray-500 font-light">
                        <span className="font-bold">
                          {formatAmountWithCurrency(
                            campaign.raisedAmount,
                            campaign.currency
                          )}{" "}
                          Raised
                        </span>{" "}
                        of{" "}
                        {formatAmountWithCurrency(
                          campaign.targetAmount,
                          campaign.currency
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
          <Button
            size="lg"
            variant="primary"
            className="w-full"
            disabled={!selectedCampaignId || isAdding} // Disable based on prop and isAdding state
            onClick={onAddCampaign} // Use callback prop
          >
            {isAdding ? "Adding..." : "Add Campaign"} {/* Show adding state */}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default memo(AddExistingCampaignPopup);
