import { memo } from "react";
import { Button, Avatar, Card, Input, Textarea } from "components";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export type MainInfoProps = {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  aboutMe?: string;
  errors?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    aboutMe?: string;
  };
  touched?: {
    firstName?: boolean;
    lastName?: boolean;
    phoneNumber?: boolean;
    email?: boolean;
    aboutMe?: boolean;
  };
  isEditingAvatar?: boolean;
  avatarPreviewUrl?: string | null;
  crop?: Crop | undefined;
  onCropChange?: (crop: Crop) => void;
  onAvatarInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateAvatarCancel?: () => void;
  onUpdateAvatar?: () => void;
  onFieldChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFieldBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit?: (e: React.FormEvent) => void;
  avatarRef?: React.RefObject<HTMLImageElement>;
};

export const MainInfo: React.FC<MainInfoProps> = (props) => {
  const {
    avatarUrl,
    firstName,
    lastName,
    phoneNumber,
    email,
    aboutMe,
    errors = {},
    touched = {},
    isEditingAvatar,
    avatarPreviewUrl,
    crop,
    onCropChange,
    onAvatarInputChange,
    onUpdateAvatarCancel,
    onUpdateAvatar,
    onFieldChange,
    onFieldBlur,
    onSubmit,
    avatarRef,
  } = props;

  return (
    <Card className="space-y-3">
      <div className="w-full flex flex-col items-center gap-3 py-3">
        {isEditingAvatar && avatarPreviewUrl ? (
          <>
            <div className="w-[65%] space-y-3">
              <div className="text-lg font-semibold text-center">
                Crop Image
              </div>
              <ReactCrop
                aspect={1 / 1}
                crop={crop}
                className="w-full"
                // @ts-expect-error
                onChange={onCropChange}
              >
                <img
                  ref={avatarRef}
                  src={avatarPreviewUrl}
                  className="w-full rounded-md"
                />
              </ReactCrop>
              <div className="w-full flex justify-center items-center gap-2">
                <Button
                  size="md"
                  variant="secondary"
                  className="w-full"
                  onClick={onUpdateAvatarCancel}
                >
                  Cancel
                </Button>
                <Button
                  size="md"
                  variant="primary"
                  className="w-full"
                  disabled={!crop}
                  onClick={onUpdateAvatar}
                >
                  Update Avatar
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Avatar size="3xl" src={avatarUrl || "https://placehold.co/400"} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="main_info_avatar_field"
              onChange={onAvatarInputChange}
            />
            <Button
              type="button"
              size="sm"
              onClick={() =>
                document.getElementById("main_info_avatar_field")?.click()
              }
            >
              Change Photo
            </Button>
          </>
        )}
      </div>
      <div className="text-lg font-bold">Main Info</div>
      <form
        onSubmit={onSubmit}
        className="w-full grid grid-cols-12 gap-y-2 gap-x-6"
      >
        <div className="col-span-12 lg:col-span-6 space-y-0.5">
          <label
            htmlFor="main_info_first_name"
            className="text-xs text-gray-600"
          >
            First Name
          </label>
          <Input
            size="sm"
            id="main_info_first_name"
            type="text"
            placeholder="Enter your first name"
            className="w-full"
            name="firstName"
            value={firstName}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            hasError={!!(errors.firstName && touched.firstName)}
          />
          {!!(errors.firstName && touched.firstName) && (
            <div className="text-xs text-red-600">{errors.firstName}</div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-6 space-y-0.5">
          <label
            htmlFor="main_info_last_name"
            className="text-xs text-gray-600"
          >
            Last Name
          </label>
          <Input
            size="sm"
            id="main_info_last_name"
            type="text"
            placeholder="Enter your last name"
            className="w-full"
            name="lastName"
            value={lastName}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            hasError={!!(errors.lastName && touched.lastName)}
          />
          {!!(errors.lastName && touched.lastName) && (
            <div className="text-xs text-red-600">{errors.lastName}</div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-6 space-y-0.5">
          <label
            htmlFor="main_info_phone_number"
            className="text-xs text-gray-600"
          >
            Phone Number
          </label>
          <Input
            size="sm"
            id="main_info_phone_number"
            type="number"
            min={0}
            placeholder="Enter your phone number"
            className="w-full"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            hasError={!!(errors.phoneNumber && touched.phoneNumber)}
          />
          {!!(errors.phoneNumber && touched.phoneNumber) && (
            <div className="text-xs text-red-600">{errors.phoneNumber}</div>
          )}
        </div>
        <div className="col-span-12 lg:col-span-6 space-y-0.5">
          <label htmlFor="main_info_email" className="text-xs text-gray-600">
            Email
          </label>
          <Input
            size="sm"
            id="main_info_email"
            type="email"
            placeholder="Enter your email"
            className="w-full"
            name="email"
            value={email}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            hasError={!!(errors.email && touched.email)}
          />
          {!!(errors.email && touched.email) && (
            <div className="text-xs text-red-600">{errors.email}</div>
          )}
        </div>
        <div className="col-span-12 space-y-0.5">
          <label htmlFor="main_info_about_me" className="text-xs text-gray-600">
            About Me
          </label>
          <Textarea
            size="sm"
            id="main_info_about_me"
            rows={3}
            placeholder="Type..."
            className="w-full"
            name="aboutMe"
            value={aboutMe}
            onChange={onFieldChange}
            onBlur={onFieldBlur}
            hasError={!!(errors.aboutMe && touched.aboutMe)}
          />
          {!!(errors.aboutMe && touched.aboutMe) && (
            <div className="text-xs text-red-600">{errors.aboutMe}</div>
          )}
        </div>
        <div className="col-span-12 flex justify-end">
          <Button type="submit" size="md">
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default memo(MainInfo);
