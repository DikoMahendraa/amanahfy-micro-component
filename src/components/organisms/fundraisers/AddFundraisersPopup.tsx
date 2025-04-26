import { IoMdClose } from "react-icons/io";
import { Modal, Button, Avatar, Input } from "components";
import { IoSearch } from "react-icons/io5";
import { FiUploadCloud } from "react-icons/fi";
import Dropzone from "react-dropzone";
import clsx from "clsx";

export enum FundraiserActionType {
  CHOOSE_ACTION = "CHOOSE_ACTION",
  INVITE_FUNDRAISERS = "INVITE_FUNDRAISERS",
  MANUALLY_ADD = "MANUALLY_ADD",
}

export type Fundraiser = {
  id: string | number;
  name: string;
  username: string;
  avatar: string;
  role: string;
};

type AddFundraisersPopupProps = {
  // Modal props
  show: boolean;
  onClose: () => void;

  // Content props
  actionType: FundraiserActionType;
  onActionTypeChange: (actionType: FundraiserActionType) => void;

  // Avatar images
  avatarImages: {
    avatar1: string;
    avatar2: string;
    avatar3: string;
  };

  // Invite fundraisers section props
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  fundraisers?: Fundraiser[];
  selectedFundraisers?: Array<string | number>;
  onFundraiserSelect?: (id: string | number) => void;
  onInviteFundraisers?: () => void;

  // Manual add section props
  firstName: string;
  lastName: string;
  email: string;
  picture: File | null;
  firstNameError?: string;
  lastNameError?: string;
  emailError?: string;
  pictureError?: string;
  firstNameTouched?: boolean;
  lastNameTouched?: boolean;
  emailTouched?: boolean;
  pictureTouched?: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onFirstNameBlur: () => void;
  onLastNameBlur: () => void;
  onEmailBlur: () => void;
  onPictureUpload: (file: File) => void;
  onPictureRemove: () => void;
  onAddFundraiser: () => void;

  // File upload props
  allowedImageExtensions: string[];
  onInvalidFileType: (message: string) => void;
};

export const AddFundraisersPopup: React.FC<AddFundraisersPopupProps> = ({
  // Modal props
  show,
  onClose,

  // Content props
  actionType,
  onActionTypeChange,

  // Avatar images
  avatarImages,

  // Invite fundraisers section props
  searchValue = "",
  onSearchChange,
  fundraisers = [],
  selectedFundraisers = [],
  onFundraiserSelect,
  onInviteFundraisers,

  // Manual add section props
  firstName,
  lastName,
  email,
  picture,
  firstNameError,
  lastNameError,
  emailError,
  pictureError,
  firstNameTouched,
  lastNameTouched,
  emailTouched,
  pictureTouched,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onFirstNameBlur,
  onLastNameBlur,
  onEmailBlur,
  onPictureUpload,
  onPictureRemove,
  onAddFundraiser,

  // File upload props
  allowedImageExtensions,
  onInvalidFileType,
}) => {
  // Helper to check if a form field has an error
  const hasError = (error?: string, touched?: boolean) => !!(error && touched);

  return (
    <Modal show={show} size="md" onClose={onClose}>
      <div className="w-full space-y-4">
        <div className="w-full flex justify-end">
          {/* @ts-ignore */}
          <IoMdClose
            onClick={onClose}
            className="w-7 h-7 text-gray-500 cursor-pointer"
          />
        </div>

        <div className="w-full flex justify-center !mt-0">
          <div className="lg:w-4/5 flex flex-col items-center gap-2">
            {/* Avatar header */}
            <div className="flex items-end justify-center pb-3">
              <div className="z-[1] -mr-[0.75rem]">
                <Avatar size="md" src={avatarImages.avatar3} />
              </div>
              <div className="bg-white rounded-full z-[2] p-[0.1rem]">
                <Avatar size="lg" src={avatarImages.avatar1} />
              </div>
              <div className="z-[1] -ml-[0.75rem]">
                <Avatar size="md" src={avatarImages.avatar2} />
              </div>
            </div>

            {/* Title */}
            <div className="w-full text-lg font-bold text-center">
              {actionType === FundraiserActionType.CHOOSE_ACTION &&
                "How would you like to invite a fundraiser?"}
              {actionType === FundraiserActionType.INVITE_FUNDRAISERS &&
                "Invite Amanahfy Fundraisers"}
              {actionType === FundraiserActionType.MANUALLY_ADD &&
                "Manually Add a Fundraiser"}
            </div>

            {/* Subtitle */}
            <p className="text-sm text-gray-400 text-center">
              {actionType === FundraiserActionType.CHOOSE_ACTION &&
                "You can choose between inviting existing Amanahfy fundraisers or manually add your own."}
              {actionType === FundraiserActionType.INVITE_FUNDRAISERS &&
                "Invite fundraisers using Amanahfy to invite to your organisation."}
              {actionType === FundraiserActionType.MANUALLY_ADD &&
                "Add a fundraiser to your org using this simple form below."}
            </p>
          </div>
        </div>

        {/* Choose Action Content */}
        {actionType === FundraiserActionType.CHOOSE_ACTION && (
          <div className="w-full space-y-3">
            <Button
              size="lg"
              variant="outline-primary"
              className="w-full"
              onClick={() =>
                onActionTypeChange(FundraiserActionType.INVITE_FUNDRAISERS)
              }
            >
              Search by Username
            </Button>
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={() =>
                onActionTypeChange(FundraiserActionType.MANUALLY_ADD)
              }
            >
              Manually Add
            </Button>
          </div>
        )}

        {/* Invite Fundraisers Content */}
        {actionType === FundraiserActionType.INVITE_FUNDRAISERS && (
          <div className="w-full space-y-5">
            {/* Search bar */}
            <div className="w-full relative">
              <Input
                type="search"
                className="w-full pl-10"
                placeholder="Search"
                value={searchValue}
                onChange={(e) =>
                  onSearchChange && onSearchChange(e.target.value)
                }
              />
              <div className="absolute top-0 bottom-0 left-3 grid place-items-center">
                {/* @ts-ignore */}
                <IoSearch size={20} className="text-gray-400" />
              </div>
            </div>

            {/* Fundraisers list */}
            <div className="w-full space-y-3 max-h-[calc(100dvh-36rem)] overflow-y-auto">
              {fundraisers.map((fundraiser) => {
                const isSelected = selectedFundraisers.includes(fundraiser.id);
                return (
                  <div
                    key={fundraiser.id}
                    className="w-full flex items-center gap-4"
                  >
                    <input
                      id={`fundraiser-${fundraiser.id}`}
                      type="checkbox"
                      className="w-6 h-6 accent-primary cursor-pointer"
                      checked={isSelected}
                      onChange={() =>
                        onFundraiserSelect && onFundraiserSelect(fundraiser.id)
                      }
                    />
                    <label
                      htmlFor={`fundraiser-${fundraiser.id}`}
                      className="w-full flex items-center gap-4 cursor-pointer"
                    >
                      <div className="w-full flex items-center gap-2">
                        <Avatar
                          size="md"
                          loading="lazy"
                          src={fundraiser.avatar}
                        />
                        <div className="w-full space-y-0.5">
                          <div className="font-semibold">{fundraiser.name}</div>
                          <div className="text-sm text-gray-500">
                            @{fundraiser.username}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-semibold">
                        {fundraiser.role}
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>

            {/* Invite button */}
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={onInviteFundraisers}
            >
              Invite Fundraisers
            </Button>
          </div>
        )}

        {/* Manually Add Content */}
        {actionType === FundraiserActionType.MANUALLY_ADD && (
          <div className="w-full space-y-8">
            <div className="w-full space-y-5">
              {/* First Name field */}
              <div className="w-full space-y-1">
                <label
                  htmlFor="fundraiser_first_name"
                  className="block text-base text-gray-600 font-bold"
                >
                  First Name <span className="text-red-600">*</span>
                </label>
                <Input
                  id="fundraiser_first_name"
                  type="text"
                  placeholder="Enter first name"
                  className="w-full"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => onFirstNameChange(e.target.value)}
                  onBlur={onFirstNameBlur}
                  hasError={hasError(firstNameError, firstNameTouched)}
                />
                {hasError(firstNameError, firstNameTouched) && (
                  <div className="text-xs text-red-600">{firstNameError}</div>
                )}
              </div>

              {/* Last Name field */}
              <div className="w-full space-y-1">
                <label
                  htmlFor="fundraiser_last_name"
                  className="block text-base text-gray-600 font-bold"
                >
                  Last Name <span className="text-red-600">*</span>
                </label>
                <Input
                  id="fundraiser_last_name"
                  type="text"
                  placeholder="Enter last name"
                  className="w-full"
                  name="last_name"
                  value={lastName}
                  onChange={(e) => onLastNameChange(e.target.value)}
                  onBlur={onLastNameBlur}
                  hasError={hasError(lastNameError, lastNameTouched)}
                />
                {hasError(lastNameError, lastNameTouched) && (
                  <div className="text-xs text-red-600">{lastNameError}</div>
                )}
              </div>

              {/* Email field */}
              <div className="w-full space-y-1">
                <label
                  htmlFor="fundraiser_email"
                  className="block text-base text-gray-600 font-bold"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <Input
                  id="fundraiser_email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full"
                  name="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  onBlur={onEmailBlur}
                  hasError={hasError(emailError, emailTouched)}
                />
                {hasError(emailError, emailTouched) && (
                  <div className="text-xs text-red-600">{emailError}</div>
                )}
              </div>

              {/* Picture upload field */}
              <div className="w-full space-y-1">
                <label className="block text-base text-gray-600 font-bold">
                  Upload Profile Picture
                </label>
                {picture ? (
                  <div className="w-full relative rounded-xl overflow-hidden">
                    <img
                      alt=""
                      loading="lazy"
                      draggable="false"
                      className="w-full"
                      src={URL.createObjectURL(picture)}
                    />
                    <div
                      onClick={onPictureRemove}
                      className="cursor-pointer w-10 pt-0 text-4xl aspect-square rounded-full bg-red-500 transition-all hover:bg-red-600 text-white absolute top-4 right-4 grid place-items-center"
                    >
                      {/* @ts-ignore */}
                      <IoMdClose />
                    </div>
                  </div>
                ) : (
                  <Dropzone
                    multiple={false}
                    onDrop={async (files) => {
                      const file = files[0];

                      // Check file extension
                      const fileExtension = file.name
                        .toLowerCase()
                        .slice(file.name.lastIndexOf("."));
                      if (!allowedImageExtensions.includes(fileExtension)) {
                        onInvalidFileType(
                          `Invalid file extension. Please upload images with extensions ${allowedImageExtensions.join(
                            ", "
                          )}.`
                        );
                        return false;
                      }

                      onPictureUpload(file);
                    }}
                  >
                    {({ getRootProps, getInputProps, isDragAccept }) => (
                      <div
                        {...getRootProps()}
                        className={clsx(
                          "w-full border-2 border-gray-300 border-dashed py-8 flex flex-col justify-center items-center gap-1 cursor-pointer transition-all rounded-2xl",
                          pictureError && pictureTouched
                            ? "bg-red-50 border-red-500"
                            : isDragAccept
                            ? "bg-primary/20"
                            : "bg-white"
                        )}
                      >
                        <input {...getInputProps()} />
                        <div className="w-full flex flex-col items-center justify-center gap-1 text-gray-500">
                          <div className="py-2">
                            {/* @ts-ignore */}
                            <FiUploadCloud className="w-12 h-12 text-primary" />
                          </div>
                          <div className="text-xs">
                            <span className="text-primary font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </div>
                          <div className="text-sm">PNG or JPG</div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                )}
                {pictureError && pictureTouched && (
                  <div className="text-red-500">{pictureError}</div>
                )}
              </div>
            </div>

            {/* Add Fundraiser button */}
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={onAddFundraiser}
            >
              Add Fundraiser
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddFundraisersPopup;
