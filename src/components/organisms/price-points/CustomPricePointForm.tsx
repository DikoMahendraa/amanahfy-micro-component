import { memo } from "react";
import { MdClose } from "react-icons/md";
import { getCurrencySymbol } from "utils/number";
import CustomPricePointCard from "./CustomPricePointCard";
import { Textarea, Input, Button, Modal } from "components";
import {
  CustomPricePointFormPayload,
  PricePointData,
} from "types/types-price-points";
import { FormikErrors, FormikTouched } from "formik";

export type ModeType = "ADD" | "EDIT";

export interface CustomPricePointFormProps {
  show?: boolean;
  mode?: ModeType;
  editPayload?: PricePointData | null;
  onClose?: () => void;
  onSubmit?: (payload: CustomPricePointFormPayload) => void;
  values?: CustomPricePointFormPayload;
  errors?: FormikErrors<CustomPricePointFormPayload>;
  touched?: FormikTouched<CustomPricePointFormPayload>;
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  handleBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleSubmit?: () => void | React.FormEventHandler<HTMLFormElement>;
}

export const CustomPricePointForm: React.FC<CustomPricePointFormProps> = ({
  show,
  mode,
  onClose,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
}) => {
  return (
    <Modal
      size="md"
      show={show ?? false}
      onClose={() => onClose?.()}
      dialogClassName="space-y-4"
    >
      <div className="w-full flex justify-between gap-3">
        <div />
        <div className="text-lg font-semibold">
          {mode === "ADD" && "Add New"}
          {mode === "EDIT" && "Edit Price Point"}
        </div>
        {/* @ts-ignore */}
        <MdClose className="w-6 h-6 cursor-pointer" onClick={onClose} />
      </div>

      <div className="w-full space-y-6">
        <div className="w-full space-y-3">
          <div className="font-semibold">Preview</div>
          <CustomPricePointCard
            data={{
              id: 0,
              name: values?.custom_price_point_name ?? "",
              description: values?.custom_price_point_description ?? "",
              amount: values?.custom_price_point_amount ?? 0,
              currency: values?.custom_price_point_currency ?? "",
            }}
            onEdit={() => ({})}
          />
        </div>
        <hr />

        <div className="w-full space-y-4">
          {/* Amount */}
          <div className="w-full space-y-1">
            <label
              className="block font-semibold"
              htmlFor="custom_price_point_amount"
            >
              Amount
            </label>
            <div className="w-full relative">
              <div className="absolute inset-0 w-[40px] grid place-items-center border-r-2 border-primary text-primary font-bold">
                {getCurrencySymbol(values?.custom_price_point_currency ?? "")}
              </div>
              <Input
                size="md"
                type="number"
                id="custom_price_point_amount"
                className="w-full pl-14 border-2 !border-primary"
                placeholder="Enter amount"
                name="custom_price_point_amount"
                value={values?.custom_price_point_amount}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={
                  !!(
                    errors?.custom_price_point_amount &&
                    touched?.custom_price_point_amount
                  )
                }
              />
            </div>
            {!!(
              errors?.custom_price_point_amount &&
              touched?.custom_price_point_amount
            ) && (
              <div className="text-xs text-red-600">
                {errors?.custom_price_point_amount}
              </div>
            )}
          </div>

          {/* Name */}
          <div className="w-full space-y-1">
            <label
              className="block font-semibold"
              htmlFor="custom_price_point_name"
            >
              Title
            </label>
            <Input
              size="md"
              id="custom_price_point_name"
              className="w-full"
              placeholder="Enter title"
              name="custom_price_point_name"
              value={values?.custom_price_point_name}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={
                !!(
                  errors?.custom_price_point_name &&
                  touched?.custom_price_point_name
                )
              }
            />
            {!!(
              errors?.custom_price_point_name &&
              touched?.custom_price_point_name
            ) && (
              <div className="text-xs text-red-600">
                {errors?.custom_price_point_name}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="w-full space-y-1">
            <label
              className="block font-semibold"
              htmlFor="custom_price_point_description"
            >
              Description
            </label>
            <Textarea
              rows={4}
              id="custom_price_point_description"
              placeholder="Type description..."
              name="custom_price_point_description"
              value={values?.custom_price_point_description}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={
                !!(
                  errors?.custom_price_point_description &&
                  touched?.custom_price_point_description
                )
              }
            />
            {!!(
              errors?.custom_price_point_description &&
              touched?.custom_price_point_description
            ) && (
              <div className="text-xs text-red-600">
                {errors?.custom_price_point_description}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        <Button variant="primary" className="w-full" onClick={handleSubmit}>
          {mode === "ADD" && "Add New Price Point"}
          {mode === "EDIT" && "Save Changes"}
        </Button>
      </div>
    </Modal>
  );
};

export default memo(CustomPricePointForm);
