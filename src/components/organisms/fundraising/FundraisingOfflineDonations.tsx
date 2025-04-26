import { memo } from "react";
import OfflineDoationForm from "./OfflineDonationForm";
import PreviousOfflineDonationsList from "./PreviousOfflineDonationsList";

export const FundraisingOfflineDonations: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-4">
        <OfflineDoationForm
          amount={100}
          description="description"
          donorsNumber={1}
          errors={{}}
          fundraiser=""
          proofOfFunds={null}
          recentDonorName=""
          touched={{}}
          onInputChange={() => console.log("input changed")}
          onInputBlur={() => console.log("input blurred")}
          onFileDrop={() => console.log("file dropped")}
          onFileRemove={() => console.log("file removed")}
          onFileButtonClick={() => console.log("file button clicked}")}
          onSubmit={() => console.log("form submitted")}
          descriptionCharCount="16/35 characters"
          fundraiserOptions={[
            { value: "", label: "-- Select a Fundraiser --", disabled: true },
            { value: "123", label: "Adil Ali" },
            { value: "456", label: "Sarah Johnson" },
            { value: "789", label: "Mohammed Rahman" },
          ]}
          getRootProps={() => ({})}
          getInputProps={() => ({})}
          isDragAccept={false}
        />
      </div>
      <div className="col-span-12 lg:col-span-8">
        <PreviousOfflineDonationsList />
      </div>
    </div>
  );
};

export default memo(FundraisingOfflineDonations);
