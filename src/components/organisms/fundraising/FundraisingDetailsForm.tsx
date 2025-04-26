import { Input, Badge, Button, Card } from "components";
import { BsCheck } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { TbPencil } from "react-icons/tb";

// Define props interface for the component
interface FundraisingDetailsFormProps {
  // Form values
  campaignName: string;
  fundraisingGoal: number | string;
  campaignImage: File | null;
  customUrl: string;
  amanahfyUrl: string;

  // Error states
  errors: {
    campaignName?: string;
    fundraisingGoal?: string;
    campaignImage?: string;
    customUrl?: string;
    amanahfyUrl?: string;
  };

  // Touched states
  touched: {
    campaignName?: boolean;
    fundraisingGoal?: boolean;
    campaignImage?: boolean;
    customUrl?: boolean;
    amanahfyUrl?: boolean;
  };

  // Event handlers
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  onEditDescription: () => void;
  onSubmit: () => void;
  onPreview: () => void;
}

export const FundraisingDetailsForm: React.FC<FundraisingDetailsFormProps> = ({
  campaignName,
  fundraisingGoal,
  campaignImage,
  customUrl,
  amanahfyUrl,
  errors,
  touched,
  onInputChange,
  onInputBlur,
  onImageUpload,
  onImageRemove,
  onEditDescription,
  onSubmit,
  onPreview,
}) => {
  return (
    <div className="w-full space-y-3">
      <Card className="w-full lg:p-10">
        <div className="w-full xl:w-4/5 space-y-8">
          <div className="w-full grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-4 text-2xl font-semibold">
              Fundraising Campaign Name
            </div>
            <div className="col-span-12 lg:col-span-8 space-y-3">
              <Input
                size="lg"
                className="w-full"
                placeholder="Enter a title"
                name="campaignName"
                value={campaignName}
                onChange={onInputChange}
                onBlur={onInputBlur}
                hasError={!!(errors.campaignName && touched.campaignName)}
              />
              {!!(errors.campaignName && touched.campaignName) && (
                <div className="text-xs text-red-600">
                  {errors.campaignName}
                </div>
              )}
              <p className="text-sm text-gray-400">
                This displays at the top of the main campaign page below the
                {`"Campaign Name"`}. It should describe your fundraising
                campaign, invite visitors to join, start a team, donate, or
                share the campaign. Keep the descriptions short for one or two
                sentences.
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-4 text-2xl font-semibold">
              Fundraising Goal
            </div>
            <div className="col-span-12 lg:col-span-8 space-y-3">
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute inset-0 w-10 grid place-items-center border-r-2 border-primary text-primary font-bold">
                  $
                </div>
                <Input
                  size="lg"
                  type="number"
                  className="w-full pl-14 border-2 !border-primary"
                  placeholder="Enter goal amount"
                  name="fundraisingGoal"
                  value={fundraisingGoal}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  hasError={
                    !!(errors.fundraisingGoal && touched.fundraisingGoal)
                  }
                />
              </div>
              {!!(errors.fundraisingGoal && touched.fundraisingGoal) && (
                <div className="text-xs text-red-600">
                  {errors.fundraisingGoal}
                </div>
              )}
              <p className="text-sm text-gray-400">
                How much would you like the overall goal for this campaign to
                be? This is the goal amount that all teams and fundraisers will
                be working towards
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-4 text-2xl font-semibold">
              Campaign Image
            </div>
            <div className="col-span-12 lg:col-span-8 space-y-3">
              {campaignImage ? (
                <div className="w-full relative">
                  <img
                    alt="Campaign"
                    draggable="false"
                    className="w-full rounded-xl"
                    src={URL.createObjectURL(campaignImage)}
                  />
                  <div
                    onClick={onImageRemove}
                    className="cursor-pointer w-10 pt-0 text-4xl aspect-square rounded-full bg-red-500 transition-all hover:bg-red-600 text-white absolute -top-3 -right-3 grid place-items-center"
                  >
                    {/* @ts-ignore */}
                    <IoMdClose />
                  </div>
                </div>
              ) : (
                <>
                  <img
                    alt="Placeholder"
                    draggable="false"
                    src="https://placehold.co/1600x600"
                    className="w-full rounded-lg"
                  />
                  <div className="w-full flex justify-end">
                    <input
                      type="file"
                      className="hidden"
                      accept=".png,.jpg"
                      id="fundraising_campaign_image_file_input"
                      onChange={onImageUpload}
                    />
                    <Button
                      onClick={() =>
                        document
                          .getElementById(
                            "fundraising_campaign_image_file_input"
                          )
                          ?.click()
                      }
                    >
                      Add or upload file
                    </Button>
                  </div>
                </>
              )}
              {!!(errors.campaignImage && touched.campaignImage) && (
                <div className="text-xs text-red-600">
                  {errors.campaignImage}
                </div>
              )}
              <p className="text-sm text-gray-400">
                A long form description of your campaign providing details to
                potential donors and fundraisers. In this space you can add
                images, text, and media files to help motivate visitors to
                support or join the campaign.
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-4 text-2xl font-semibold">
              Campaign Description
            </div>
            <div className="col-span-12 lg:col-span-8 grid place-items-center aspect-[16/6] bg-gray-300 rounded-lg">
              <Button
                onClick={onEditDescription}
                className="inline-flex items-center gap-2"
              >
                {/* @ts-ignore */}
                <TbPencil />
                <div>Edit</div>
              </Button>
            </div>
          </div>
          <hr />
          <div className="w-full grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-4 text-2xl font-semibold">
              Custom URL
            </div>
            <div className="col-span-12 lg:col-span-5 space-y-3">
              <Input
                type="url"
                size="lg"
                className="w-full"
                placeholder="Enter a URL"
                name="customUrl"
                value={customUrl}
                onChange={onInputChange}
                onBlur={onInputBlur}
                hasError={!!(errors.customUrl && touched.customUrl)}
              />
              {!!(errors.customUrl && touched.customUrl) && (
                <div className="text-xs text-red-600">{errors.customUrl}</div>
              )}
              <p className="text-sm text-gray-400">
                https://yoururl.com/inserted URL
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:pt-3">
              <Badge
                // @ts-ignore
                icon={<BsCheck size={16} />}
                size="xs"
                variant="success"
                label="URL available"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-4 text-2xl font-semibold">
              Amanahfy URL
            </div>
            <div className="col-span-12 lg:col-span-5 space-y-3">
              <Input
                type="url"
                size="lg"
                className="w-full"
                placeholder="Enter a URL"
                name="amanahfyUrl"
                value={amanahfyUrl}
                onChange={onInputChange}
                onBlur={onInputBlur}
                hasError={!!(errors.amanahfyUrl && touched.amanahfyUrl)}
              />
              {!!(errors.amanahfyUrl && touched.amanahfyUrl) && (
                <div className="text-xs text-red-600">{errors.amanahfyUrl}</div>
              )}
              <p className="text-sm text-gray-400">
                https://amanahfy.com/org_name?insertedURL
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:pt-3">
              <Badge
                //  @ts-ignore
                icon={<BsCheck size={16} />}
                size="xs"
                variant="success"
                label="URL available"
              />
            </div>
          </div>
          <hr />
        </div>
      </Card>
      <div className="w-full flex justify-end flex-col lg:flex-row items-stretch gap-2">
        <Button size="lg" variant="outline-primary" onClick={onPreview}>
          Preview
        </Button>
        <Button size="lg" variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default FundraisingDetailsForm;
