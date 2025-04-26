import AddExistingCampaignPopup from "components/organisms/campaigns/AddExistingCampaignPopup";
import { Badge, Button, FundraiserActionType, Tabs } from "components";
import { lazy, memo, Suspense, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { CURRENCY } from "utils/number";

const TeamsEditForm = lazy(
  () => import("components/organisms/teams/TeamsEditForm")
);
const TeamsFundraisersList = lazy(
  () => import("components/organisms/teams/TeamsFundraisersList")
);
const TeamsCampaignsList = lazy(
  () => import("components/organisms/teams/TeamsCampaignsList")
);
const AddFundraisersPopup = lazy(
  () => import("components/organisms/fundraisers/AddFundraisersPopup")
);

enum TabType {
  EDIT_TEAMS = "EDIT_TEAMS",
  FUNDRAISERS = "FUNDRAISERS",
  CAMPAIGNS = "CAMPAIGNS",
}

const joinOptions = [
  { label: "Anyone can join", value: "open" },
  { label: "Invite only", value: "invite" },
];

const defaultValues = {
  team_name: "",
  team_code: "",
  team_default_fundraising_amount: undefined,
  team_story: "",
  team_profile_image: null,
  team_join_permission: "open",
};

const defaultErrors = {
  team_name: "",
  team_code: "",
  team_default_fundraising_amount: "",
  team_story: "",
  team_profile_image: "",
  team_join_permission: "",
};

const defaultTouched = {
  team_name: false,
  team_code: false,
  team_default_fundraising_amount: false,
  team_story: false,
  team_profile_image: false,
  team_join_permission: false,
};

const TeamsEditPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.EDIT_TEAMS);
  const [showAddFundraisers, setShowAddFundraisers] = useState<boolean>(false);
  const [showAddCampaign, setShowAddCampaign] = useState<boolean>(false);
  const [formState, setFormState] = useState(defaultValues);
  const [errors] = useState(defaultErrors);
  const [touched, setTouched] = useState(defaultTouched);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleDropImage = (acceptedFiles: File[]) => {
    console.log("Dropped image:", acceptedFiles);
  };

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, team_join_permission: value }));
  };

  const handleSubmit = () => {
    alert("Form submitted! (not really)");
  };

  return (
    <>
      <div className="w-full space-y-4">
        <div className="w-full flex flex-col lg:flex-row gap-4 lg:justify-between">
          <div className="w-full space-y-1">
            <div className="inline-flex items-center gap-2">
              <div className="text-xl font-bold">Teams</div>
              <Badge size="xs" label="Label text or value" variant="info" />
            </div>
            <p className="text-sm text-gray-400">
              Set up your appeal for donation
            </p>
          </div>
          <div className="w-full lg:w-fit">
            {activeTab === TabType.FUNDRAISERS && (
              <>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => setShowAddFundraisers(true)}
                  className="w-full lg:w-fit inline-flex justify-center items-center gap-2"
                >
                  {/* @ts-ignore */}
                  <BsPlus className="w-8 h-8" />
                  <div className="whitespace-nowrap">Add Fundraisers</div>
                </Button>
                <AddFundraisersPopup
                  show={showAddFundraisers}
                  onClose={() => setShowAddFundraisers(false)}
                  actionType={FundraiserActionType.CHOOSE_ACTION}
                  onActionTypeChange={function (
                    actionType: FundraiserActionType
                  ): void {
                    throw new Error(`Function not implemented. ${actionType}`);
                  }}
                  avatarImages={{
                    avatar1: "",
                    avatar2: "",
                    avatar3: "",
                  }}
                  firstName={""}
                  lastName={""}
                  email={""}
                  picture={null}
                  onFirstNameChange={function (value: string): void {
                    throw new Error(`Function not implemented. ${value}`);
                  }}
                  onLastNameChange={function (value: string): void {
                    throw new Error(`Function not implemented. ${value}`);
                  }}
                  onEmailChange={function (value: string): void {
                    throw new Error(`Function not implemented. ${value}`);
                  }}
                  onFirstNameBlur={function (): void {
                    throw new Error(`Function not implemented.`);
                  }}
                  onLastNameBlur={function (): void {
                    throw new Error(`Function not implemented.`);
                  }}
                  onEmailBlur={function (): void {
                    throw new Error(`Function not implemented.`);
                  }}
                  onPictureUpload={function (file: File): void {
                    throw new Error(`Function not implemented. ${file}`);
                  }}
                  onPictureRemove={function (): void {
                    throw new Error(`Function not implemented.`);
                  }}
                  onAddFundraiser={function (): void {
                    throw new Error(`Function not implemented.`);
                  }}
                  allowedImageExtensions={[]}
                  onInvalidFileType={function (message: string): void {
                    throw new Error(`Function not implemented. ${message}`);
                  }}
                />
              </>
            )}
            {activeTab === TabType.CAMPAIGNS && (
              <>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => setShowAddCampaign(true)}
                  className="w-full lg:w-fit inline-flex justify-center items-center gap-2"
                >
                  {/* @ts-ignore */}
                  <BsPlus className="w-8 h-8" />
                  <div className="whitespace-nowrap">Add Campaigns</div>
                </Button>
                <AddExistingCampaignPopup
                  show={showAddCampaign}
                  onClose={() => setShowAddCampaign(false)}
                  campaigns={[]}
                  selectedCampaignId={1}
                  onSelectCampaign={() => ({})}
                  searchTerm={""}
                  onSearchChange={() => ({})}
                  onAddCampaign={() => ({})}
                  isAdding={false}
                />
              </>
            )}
          </div>
        </div>
        <div className="w-full">
          <Tabs
            activeKey={activeTab}
            onChange={(tab) => setActiveTab(tab.key as TabType)}
            items={[
              { key: TabType.EDIT_TEAMS, label: "Edit Teams" },
              { key: TabType.FUNDRAISERS, label: "Fundraisers" },
              { key: TabType.CAMPAIGNS, label: "Campaigns" },
            ]}
          />
        </div>
        <div className="w-full pt-5">
          <Suspense>
            {activeTab === TabType.EDIT_TEAMS && (
              <TeamsEditForm
                values={formState}
                errors={errors}
                touched={touched}
                onChange={handleChange}
                onBlur={handleBlur}
                onDropImage={handleDropImage}
                onRadioChange={handleRadioChange}
                onSubmit={handleSubmit}
                joinOptions={joinOptions}
              />
            )}
            {activeTab === TabType.FUNDRAISERS && (
              <TeamsFundraisersList
                data={[
                  {
                    id: 1,
                    first_name: "Luqni",
                    last_name: "Maulana",
                    email: "luqni@email.com",
                    raised_amount: 20000,
                    currency: CURRENCY.USD,
                    status: "accepted",
                  },
                  {
                    id: 2,
                    first_name: "Luqni",
                    last_name: "Maulana",
                    email: "luqni@email.com",
                    raised_amount: 23000,
                    currency: CURRENCY.USD,
                    status: "invited",
                  },
                  {
                    id: 3,
                    first_name: "Luqni",
                    last_name: "Maulana",
                    email: "luqni@email.com",
                    raised_amount: 47000,
                    currency: CURRENCY.USD,
                    status: "rejected",
                  },
                ]}
              />
            )}
            {activeTab === TabType.CAMPAIGNS && (
              <TeamsCampaignsList
                data={[
                  {
                    id: 1,
                    name: "Lorem Ipsum",
                    raised_amount: 20000,
                    currency: CURRENCY.USD,
                  },
                  {
                    id: 2,
                    name: "Lorem Ipsum",
                    raised_amount: 23000,
                    currency: CURRENCY.USD,
                  },
                  {
                    id: 3,
                    name: "Lorem Ipsum",
                    raised_amount: 47000,
                    currency: CURRENCY.USD,
                  },
                ]}
              />
            )}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default memo(TeamsEditPage);
