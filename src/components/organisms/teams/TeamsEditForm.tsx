import clsx from "clsx";
import Input from "components/common/Input";
import Textarea from "components/common/Textarea";
import Button from "components/common/Button";
import { memo } from "react";
import Dropzone from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

interface JoinOption {
  label: string;
  value: string;
}

interface TeamsEditFormPayload {
  team_name: string;
  team_code: string;
  team_default_fundraising_amount?: number;
  team_story: string;
  team_profile_image: File | null;
  team_join_permission: string | null;
}

interface TeamsEditFormProps {
  values: TeamsEditFormPayload;
  errors: Partial<Record<keyof TeamsEditFormPayload, string>>;
  touched: Partial<Record<keyof TeamsEditFormPayload, boolean>>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDropImage: (files: File[]) => void;
  onRadioChange: (value: string) => void;
  onSubmit: () => void;
  joinOptions: JoinOption[];
}

export const TeamsEditForm: React.FC<TeamsEditFormProps> = ({
  values,
  errors,
  touched,
  onChange,
  onBlur,
  onDropImage,
  onRadioChange,
  onSubmit,
  joinOptions,
}) => {
  return (
    <div className="w-full">
      <div className="w-full lg:w-3/4 space-y-5">
        {/* Team Name */}
        <div className="w-full space-y-1">
          <label
            htmlFor="team_name"
            className="block text-lg text-gray-600 font-bold"
          >
            Team Name
          </label>
          <p className="text-sm text-gray-400">
            Please provide a name for your team. This name will be displayed on
            the leaderboards.
          </p>
          <Input
            id="team_name"
            name="team_name"
            value={values.team_name}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Enter team name"
            className="w-full"
            hasError={!!(errors.team_name && touched.team_name)}
          />
          {!!(errors.team_name && touched.team_name) && (
            <div className="text-xs text-red-600">{errors.team_name}</div>
          )}
        </div>

        {/* Team Code */}
        <div className="w-full space-y-1">
          <label
            htmlFor="team_code"
            className="block text-lg text-gray-600 font-bold"
          >
            Team Code
          </label>
          <p className="text-sm text-gray-400">
            Enter a code that will make it easy for others to join.
          </p>
          <Input
            id="team_code"
            name="team_code"
            value={values.team_code}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Enter team code"
            className="w-full"
            hasError={!!(errors.team_code && touched.team_code)}
          />
          {!!(errors.team_code && touched.team_code) && (
            <div className="text-xs text-red-600">{errors.team_code}</div>
          )}
        </div>

        {/* Fundraising Amount */}
        <div className="w-full space-y-1">
          <label
            htmlFor="team_default_fundraising_amount"
            className="block text-lg text-gray-600 font-bold"
          >
            Team default fundraising amount
          </label>
          <Input
            id="team_default_fundraising_amount"
            name="team_default_fundraising_amount"
            type="number"
            value={values.team_default_fundraising_amount ?? ""}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Enter default amount"
            className="w-full"
            hasError={
              !!(
                errors.team_default_fundraising_amount &&
                touched.team_default_fundraising_amount
              )
            }
          />
          {!!(
            errors.team_default_fundraising_amount &&
            touched.team_default_fundraising_amount
          ) && (
            <div className="text-xs text-red-600">
              {errors.team_default_fundraising_amount}
            </div>
          )}
        </div>

        {/* Team Story */}
        <div className="w-full space-y-1">
          <label
            htmlFor="team_story"
            className="block text-lg text-gray-600 font-bold"
          >
            Team Story
          </label>
          <Textarea
            id="team_story"
            name="team_story"
            value={values.team_story}
            onChange={onChange}
            onBlur={onBlur}
            rows={4}
            placeholder="Enter a description..."
            className="w-full"
            hasError={!!(errors.team_story && touched.team_story)}
          />
          {!!(errors.team_story && touched.team_story) && (
            <div className="text-xs text-red-600">{errors.team_story}</div>
          )}
        </div>

        {/* Profile Image */}
        <div className="w-full space-y-1">
          <label
            htmlFor="team_profile_image"
            className="block text-lg text-gray-600 font-bold"
          >
            Team Profile Image
          </label>
          <p className="text-sm text-gray-400">
            Upload an image for your team. Accepted formats are PNG and JPG.
          </p>
          <Button
            variant="outline-primary"
            className="w-full block lg:hidden"
            onClick={() =>
              document.getElementById("team_profile_image")?.click()
            }
          >
            Upload image
          </Button>
          <Dropzone onDrop={onDropImage}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className={clsx(
                  "w-full hidden aspect-[6/2] border-2 border-dashed rounded-lg p-5 transition-all cursor-pointer lg:grid place-items-center",
                  errors.team_profile_image && touched.team_profile_image
                    ? "border-red-600 bg-red-50"
                    : "border-gray-400 hover:bg-primary/10"
                )}
              >
                <input id="team_profile_image" {...getInputProps()} />
                <div className="flex flex-col items-center gap-1">
                  {/* @ts-ignore */}
                  <FiUploadCloud className="w-12 h-12 text-primary pb-2" />
                  <div className="text-gray-400">
                    <span className="font-bold text-primary">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </div>
                  <div className="text-gray-400 text-sm">
                    PNG or JPG (max 1MB)
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
          {!!(errors.team_profile_image && touched.team_profile_image) && (
            <div className="text-xs text-red-600">
              {errors.team_profile_image}
            </div>
          )}
        </div>

        {/* Join Permission */}
        <div className="w-full space-y-1">
          <label
            htmlFor="team_join_permission"
            className="block text-lg text-gray-600 font-bold"
          >
            Allow others to join team
          </label>
          <p className="text-sm text-gray-400">
            Select whether you would like anyone to be able to join your team or
            have it as an invite-only team.
          </p>
          <div className="w-full flex flex-col gap-2 py-2">
            {joinOptions.map((option) => (
              <div
                key={option.value}
                className="inline-flex items-center gap-2"
              >
                <input
                  type="radio"
                  id={`join_option-${option.value}`}
                  value={option.value}
                  checked={values.team_join_permission === option.value}
                  onChange={() => onRadioChange(option.value)}
                  className="accent-primary w-4 h-4 cursor-pointer"
                />
                <label
                  htmlFor={`join_option-${option.value}`}
                  className={clsx(
                    "text-sm text-gray-600 cursor-pointer",
                    !!(
                      errors.team_join_permission &&
                      touched.team_join_permission
                    ) && "text-red-600"
                  )}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          {!!(errors.team_join_permission && touched.team_join_permission) && (
            <div className="text-xs text-red-600">
              {errors.team_join_permission}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <Button
            size="lg"
            className="w-full lg:w-fit"
            variant="primary"
            onClick={onSubmit}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(TeamsEditForm);
