import { Tabs } from "components";
import { lazy, memo, Suspense, useState } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const FundraisingDetailsForm = lazy(
  () => import("components/organisms/fundraising/FundraisingDetailsForm")
);
const FundraisingOfflineDonations = lazy(
  () => import("components/organisms/fundraising/FundraisingOfflineDonations")
);
const FundraisingPricePoints = lazy(
  () => import("components/organisms/fundraising/FundraisingPricePoints")
);

enum TabType {
  DETAILS = "DETAILS",
  OFFLINE_DONATION = "OFFLINE_DONATION",
  PRICE_POINTS = "PRICE_POINTS",
}

const FundraisingPageEdit: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DETAILS);
  return (
    <>
      <div className="w-full space-y-4">
        <div className="w-full flex justify-between items-start gap-4">
          <div className="inline-flex items-center gap-4">
            {/* @ts-ignore */}
            <HiOutlineArrowLongLeft
              title="Back"
              onClick={() => navigate(-1)}
              className="w-12 h-12 cursor-pointer"
            />
            <div className="text-2xl font-semibold">
              Editing [fundraising campaign name]
            </div>
          </div>
        </div>
        <div className="w-full">
          <Tabs
            activeKey={activeTab}
            onChange={(tab) => setActiveTab(tab.key as TabType)}
            items={[
              { key: TabType.DETAILS, label: "Details" },
              { key: TabType.OFFLINE_DONATION, label: "Offline Donation" },
              { key: TabType.PRICE_POINTS, label: "Price Points" },
            ]}
          />
        </div>
        <div className="w-full pt-5">
          <Suspense>
            {activeTab === TabType.DETAILS && (
              <FundraisingDetailsForm
                errors={{
                  campaignName: "This field is required",
                  fundraisingGoal: "Minimum value is 1",
                  customUrl: "Invalid URL",
                }}
                touched={{
                  campaignName: true,
                  fundraisingGoal: true,
                  customUrl: true,
                  amanahfyUrl: true,
                }}
                campaignName="Clean Water Initiative"
                fundraisingGoal="50000"
                campaignImage={
                  new File(["dummy content"], "example.png", {
                    type: "image/png",
                  })
                }
                customUrl="clean-water-2025"
                amanahfyUrl="clean-water-initiative"
                onInputChange={() => console.log("input changed")}
                onInputBlur={() => console.log("input blurred")}
                onImageUpload={() => console.log("image uploaded")}
                onImageRemove={() => console.log("image removed")}
                onEditDescription={() =>
                  console.log("edit description clicked")
                }
                onSubmit={() => console.log("form submitted")}
                onPreview={() => console.log("preview clicked")}
              />
            )}
            {activeTab === TabType.OFFLINE_DONATION && (
              <FundraisingOfflineDonations />
            )}
            {activeTab === TabType.PRICE_POINTS && <FundraisingPricePoints />}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default memo(FundraisingPageEdit);
