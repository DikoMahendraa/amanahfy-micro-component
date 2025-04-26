import { Input, Select, Textarea, Button } from "components";
import { FiUploadCloud } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { getAvatar } from "utils/image";

// Define props interface for the component
interface OfflineDonationFormProps {
  // Form values
  amount: number | string;
  description: string;
  donorsNumber: number | string;
  recentDonorName: string;
  fundraiser: string;
  proofOfFunds: File | null;

  // Character count for description
  descriptionCharCount: string;

  // Error states
  errors: {
    amount?: string;
    description?: string;
    donorsNumber?: string;
    recentDonorName?: string;
    fundraiser?: string;
    proofOfFunds?: string;
  };

  // Touched states
  touched: {
    amount?: boolean;
    description?: boolean;
    donorsNumber?: boolean;
    recentDonorName?: boolean;
    fundraiser?: boolean;
    proofOfFunds?: boolean;
  };

  // Fundraiser options
  fundraiserOptions: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;

  // Event handlers
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onInputBlur: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onFileDrop: (acceptedFiles: File[]) => void;
  onFileRemove: () => void;
  onFileButtonClick: () => void;
  onSubmit: () => void;

  // UI state helpers
  isDragAccept?: boolean;
  getRootProps?: () => unknown;
  getInputProps?: () => unknown;
}

export const OfflineDonationForm: React.FC<OfflineDonationFormProps> = ({
  amount,
  description,
  donorsNumber,
  recentDonorName,
  fundraiser,
  proofOfFunds,
  descriptionCharCount,
  errors,
  touched,
  fundraiserOptions,
  onInputChange,
  onInputBlur,
  onFileRemove,
  onFileButtonClick,
  onSubmit,
  isDragAccept,
  getRootProps,
  getInputProps,
}) => {
  return (
    <div className="w-full space-y-5">
      <div className="w-full space-y-1">
        <label
          className="block font-semibold"
          htmlFor="offline_donation_amount"
        >
          Amount
        </label>
        <div className="w-full relative">
          <div className="absolute inset-0 w-10 grid place-items-center border-r-2 border-primary text-primary font-bold">
            $
          </div>
          <Input
            size="md"
            type="number"
            id="offline_donation_amount"
            className="w-full pl-14 border-2 !border-primary"
            placeholder="Enter amount"
            name="offline_donation_amount"
            value={amount}
            onChange={onInputChange}
            onBlur={onInputBlur}
            hasError={!!(errors.amount && touched.amount)}
          />
        </div>
        {!!(errors.amount && touched.amount) && (
          <div className="text-xs text-red-600">{errors.amount}</div>
        )}
      </div>

      <div className="w-full space-y-1">
        <label
          className="block font-semibold"
          htmlFor="offline_donation_description"
        >
          Description
        </label>
        <Textarea
          rows={4}
          id="offline_donation_description"
          placeholder="Enter a description..."
          name="offline_donation_description"
          value={description}
          onChange={onInputChange}
          onBlur={onInputBlur}
          hasError={!!(errors.description && touched.description)}
        />
        {!!(errors.description && touched.description) && (
          <div className="text-xs text-red-600">{errors.description}</div>
        )}
        <div className="text-gray-400 text-xs flex justify-end">
          {descriptionCharCount}
        </div>
      </div>

      <div className="w-full space-y-1">
        <label
          className="block font-semibold"
          htmlFor="offline_donation_donors_number"
        >
          Number of Donors
        </label>
        <Input
          size="md"
          type="number"
          id="offline_donation_donors_number"
          className="w-full"
          placeholder="Enter number"
          name="offline_donation_donors_number"
          value={donorsNumber}
          onChange={onInputChange}
          onBlur={onInputBlur}
          hasError={!!(errors.donorsNumber && touched.donorsNumber)}
        />
        {!!(errors.donorsNumber && touched.donorsNumber) && (
          <div className="text-xs text-red-600">{errors.donorsNumber}</div>
        )}
      </div>

      <div className="w-full space-y-1">
        <label
          className="block font-semibold"
          htmlFor="offline_donation_recent_donor_name"
        >
          Recent Donor Name
        </label>
        <Input
          size="md"
          id="offline_donation_recent_donor_name"
          className="w-full"
          placeholder="Enter a name to show on recent donor"
          name="offline_donation_recent_donor_name"
          value={recentDonorName}
          onChange={onInputChange}
          onBlur={onInputBlur}
          hasError={!!(errors.recentDonorName && touched.recentDonorName)}
        />
        {!!(errors.recentDonorName && touched.recentDonorName) && (
          <div className="text-xs text-red-600">{errors.recentDonorName}</div>
        )}
      </div>

      <div className="w-full space-y-1">
        <div className="inline-flex items-center gap-2">
          <label
            className="block font-semibold"
            htmlFor="offline_donation_fundraiser"
          >
            Fundraiser
          </label>
          <div className="text-xs text-gray-400">Optional</div>
        </div>
        <div className="w-full relative">
          <div className="absolute inset-0 w-10 grid place-items-center">
            <img
              alt=""
              draggable="false"
              className="w-6 aspect-square rounded-full object-cover object-center"
              src={getAvatar(null, "Adil Ali")}
            />
          </div>
          <Select
            id="offline_donation_fundraiser"
            className="pl-9"
            name="offline_donation_fundraiser"
            value={fundraiser}
            onChange={onInputChange}
            onBlur={onInputBlur}
            hasError={!!(errors.fundraiser && touched.fundraiser)}
            options={fundraiserOptions}
          />
        </div>
        {!!(errors.fundraiser && touched.fundraiser) && (
          <div className="text-xs text-red-600">{errors.fundraiser}</div>
        )}
      </div>

      <div className="w-full space-y-1">
        <label
          className="block font-semibold"
          htmlFor="offline_donation_proof_of_funds"
        >
          Proof of Funds
        </label>
        <Button
          variant="outline-primary"
          className="w-full block lg:hidden"
          onClick={onFileButtonClick}
        >
          Upload Proof of Funds
        </Button>
        {proofOfFunds ? (
          <div className="w-full relative">
            <img
              alt=""
              loading="lazy"
              draggable="false"
              className="w-full rounded-xl"
              src={URL.createObjectURL(proofOfFunds)}
            />
            <div
              onClick={onFileRemove}
              className="cursor-pointer w-10 pt-0 text-4xl aspect-square rounded-full bg-red-500 transition-all hover:bg-red-600 text-white absolute -top-3 -right-3 grid place-items-center"
            >
              {/* @ts-ignore */}
              <IoMdClose />
            </div>
          </div>
        ) : (
          <div
            // @ts-ignore
            {...(getRootProps ? getRootProps() : {})}
            className={`w-full hidden aspect-video border-2 border-gray-400 border-dashed rounded-lg p-5 transition-all hover:bg-primary/10 cursor-pointer lg:grid place-items-center ${
              errors?.proofOfFunds && touched?.proofOfFunds
                ? "bg-red-50 border-red-500"
                : isDragAccept
                ? "bg-primary/20"
                : "bg-white"
            }`}
          >
            <input
              id="offline_donation_proof_of_funds"
              // @ts-ignore
              {...(getInputProps ? getInputProps() : {})}
            />
            <div className="flex flex-col items-center gap-1">
              {/* @ts-ignore */}
              <FiUploadCloud className="w-12 h-12 text-primary pb-2" />
              <div className="text-gray-400">
                <span className="font-bold text-primary">Click to upload</span>{" "}
                or drag and drop
              </div>
              <div className="text-gray-400 text-sm">
                SVG, PNG, JPG or GIF (max 1MB)
              </div>
            </div>
          </div>
        )}
        {errors?.proofOfFunds && touched?.proofOfFunds && (
          <div className="text-red-500 text-xs">{errors.proofOfFunds}</div>
        )}
      </div>

      <div className="w-full flex justify-end">
        <Button
          variant="primary"
          className="w-full lg:w-fit"
          onClick={onSubmit}
        >
          Save Offline Donation
        </Button>
      </div>
    </div>
  );
};

export default OfflineDonationForm;
