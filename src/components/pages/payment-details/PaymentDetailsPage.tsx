import {
  Input,
  Select,
  Textarea,
  Badge,
  Button,
  Card,
  IconMasterCard,
  IconMasterCardSmall,
} from "components";

import { useFormik } from "formik";
import { PaymentDetailsPayload } from "types/types-payment-details";
import { memo } from "react";
import { BsPlus } from "react-icons/bs";
import * as yup from "yup";

const validationSchema: yup.Schema<PaymentDetailsPayload> = yup.object().shape({
  card_name: yup
    .string()
    .default("")
    .trim()
    .typeError("This field is required")
    .required("This field is required"),
  card_number: yup
    .number()
    .typeError("This field is required")
    .required("This field is required"),
  card_expiry: yup
    .string()
    .default("")
    .trim()
    .typeError("This field is required")
    .required("This field is required"),
  card_cvv: yup
    .number()
    .typeError("This field is required")
    .required("This field is required"),
  billing_email: yup
    .string()
    .default("")
    .trim()
    .email("Invalid email")
    .typeError("This field is required")
    .required("This field is required"),
  billing_phone: yup
    .number()
    .typeError("This field is required")
    .required("This field is required"),
  billing_country: yup
    .string()
    .default("")
    .trim()
    .typeError("This field is required")
    .required("This field is required"),
  billing_state: yup
    .string()
    .default("")
    .trim()
    .typeError("This field is required")
    .required("This field is required"),
  billing_city: yup
    .string()
    .default("")
    .trim()
    .typeError("This field is required")
    .required("This field is required"),
  billing_address: yup
    .string()
    .default("")
    .trim()
    .typeError("This field is required")
    .required("This field is required"),
});

const PaymentDetailsPage: React.FC = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik<PaymentDetailsPayload>({
    initialValues: {
      card_name: "",
      card_number: "" as unknown as number,
      card_expiry: "",
      card_cvv: "" as unknown as number,
      billing_email: "",
      billing_phone: "" as unknown as number,
      billing_country: "",
      billing_state: "",
      billing_city: "",
      billing_address: "",
    },
    validationSchema,
    onSubmit: console.log,
  });

  return (
    <>
      <Card className="space-y-6 !rounded-3xl !p-0 lg:!p-6 border-0 lg:border">
        <div className="w-full grid grid-cols-12 gap-4">
          <div className="order-1 lg:order-1 col-span-12 lg:col-span-8 self-center">
            <div className="text-xl font-bold">Payment Info</div>
          </div>
          <div className="order-3 lg:order-2 col-span-12 lg:col-span-4 flex justify-end">
            <Button
              size="lg"
              variant="primary"
              className="w-full lg:w-fit flex justify-center items-center gap-2"
            >
              {/* @ts-ignore */}
              <BsPlus className="w-8 h-8" />
              <div>Add New Card</div>
            </Button>
          </div>
          <div className="order-2 lg:order-3 col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[1].map((v) => {
              return (
                <Card key={v} className="w-full !rounded-2xl">
                  <div className="w-full flex gap-3">
                    <div className="w-full flex items-center gap-3">
                      <IconMasterCard size={60} />
                      <div className="text-lg font-semibold">
                        MasterCard - ****-****-****-232
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="credit_card"
                      className="accent-primary w-7 h-7 mt-2 mr-2"
                      defaultChecked
                    />
                  </div>
                  <div className="w-full flex justify-end">
                    <Badge size="sm" label="Connected" variant="success" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="w-full border-b border-gray-300" />
        <div className="w-full lg:w-3/4 grid grid-cols-12 gap-4">
          <div className="order-1 lg:order-1 col-span-12 text-lg font-bold">
            Card details
          </div>
          <div className="order-2 lg:order-2 col-span-12 lg:col-span-8 space-y-1">
            <label htmlFor="card_name" className="text-sm text-gray-600">
              Name on card
            </label>
            <Input
              size="md"
              id="card_name"
              type="text"
              placeholder="Enter name"
              className="w-full"
              name="card_name"
              value={values.card_name}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!(errors.card_name && touched.card_name)}
            />
            {!!(errors.card_name && touched.card_name) && (
              <div className="text-xs text-red-600">{errors.card_name}</div>
            )}
          </div>
          <div className="order-4 lg:order-3 col-span-6 lg:col-span-4 space-y-1">
            <label htmlFor="card_expiry" className="text-sm text-gray-600">
              Expired
            </label>
            <Input
              size="md"
              id="card_expiry"
              type="month"
              placeholder="MM / YYYY"
              className="w-full"
              name="card_expiry"
              value={values.card_expiry}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!(errors.card_expiry && touched.card_expiry)}
            />
            {!!(errors.card_expiry && touched.card_expiry) && (
              <div className="text-xs text-red-600">{errors.card_expiry}</div>
            )}
          </div>
          <div className="order-3 lg:order-4 col-span-12 lg:col-span-8 space-y-1">
            <label htmlFor="card_number" className="text-sm text-gray-600">
              Card number
            </label>
            <div className="w-full relative">
              <div className="absolute top-0 bottom-0 left-3 grid place-items-center">
                <IconMasterCardSmall size={20} />
              </div>
              <Input
                size="md"
                id="card_number"
                type="number"
                placeholder="Enter card number"
                className="w-full pl-10"
                name="card_number"
                value={values.card_number}
                onChange={(e) =>
                  setFieldValue("card_number", Number(e.target.value))
                }
                onBlur={handleBlur}
                hasError={!!(errors.card_number && touched.card_number)}
              />
            </div>
            {!!(errors.card_number && touched.card_number) && (
              <div className="text-xs text-red-600">{errors.card_number}</div>
            )}
          </div>
          <div className="order-5 lg:order-5 col-span-6 lg:col-span-4 space-y-1">
            <label htmlFor="card_cvv" className="text-sm text-gray-600">
              CVV
            </label>
            <Input
              size="md"
              id="card_cvv"
              type="number"
              placeholder="Enter CVV"
              className="w-full"
              name="card_cvv"
              value={values.card_cvv}
              onChange={(e) =>
                setFieldValue("card_cvv", Number(e.target.value))
              }
              onBlur={handleBlur}
              hasError={!!(errors.card_cvv && touched.card_cvv)}
            />
            {!!(errors.card_cvv && touched.card_cvv) && (
              <div className="text-xs text-red-600">{errors.card_cvv}</div>
            )}
          </div>
        </div>
        <div className="w-full grid grid-cols-12 gap-4">
          <div className="col-span-12 text-lg font-bold">Billing address</div>
          <div className="col-span-12 lg:col-span-6 space-y-1">
            <label htmlFor="billing_email" className="text-sm text-gray-600">
              Email address
            </label>
            <Input
              size="md"
              id="billing_email"
              type="email"
              placeholder="Enter email"
              className="w-full"
              name="billing_email"
              value={values.billing_email}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!(errors.billing_email && touched.billing_email)}
            />
            {!!(errors.billing_email && touched.billing_email) && (
              <div className="text-xs text-red-600">{errors.billing_email}</div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-6 space-y-1">
            <label htmlFor="billing_phone" className="text-sm text-gray-600">
              Phone number
            </label>
            <Input
              size="md"
              id="billing_phone"
              type="number"
              placeholder="Enter phone number"
              className="w-full"
              name="billing_phone"
              value={values.billing_phone}
              onChange={(e) =>
                setFieldValue("billing_phone", Number(e.target.value))
              }
              onBlur={handleBlur}
              hasError={!!(errors.billing_phone && touched.billing_phone)}
            />
            {!!(errors.billing_phone && touched.billing_phone) && (
              <div className="text-xs text-red-600">{errors.billing_phone}</div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-1">
            <label htmlFor="billing_country" className="text-sm text-gray-600">
              Country
            </label>
            <Select
              size="md"
              id="billing_country"
              className="w-full"
              options={[
                { value: "", label: "-- Select Country --", disabled: true },
                { value: "id", label: "Indonesia" },
              ]}
              value={values.billing_country}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!(errors.billing_country && touched.billing_country)}
            />
            {!!(errors.billing_country && touched.billing_country) && (
              <div className="text-xs text-red-600">
                {errors.billing_country}
              </div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-1">
            <label htmlFor="billing_state" className="text-sm text-gray-600">
              State / Province
            </label>
            <Select
              size="md"
              id="billing_state"
              className="w-full"
              options={[
                {
                  value: "",
                  label: "-- Select State / Province --",
                  disabled: true,
                },
                { value: "central-java", label: "Central Java" },
              ]}
              value={values.billing_state}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!(errors.billing_state && touched.billing_state)}
            />
            {!!(errors.billing_state && touched.billing_state) && (
              <div className="text-xs text-red-600">{errors.billing_state}</div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-1">
            <label htmlFor="billing_city" className="text-sm text-gray-600">
              State / Province
            </label>
            <Select
              size="md"
              id="billing_city"
              className="w-full"
              options={[
                { value: "", label: "-- Select City --", disabled: true },
                { value: "semarang", label: "Semarang" },
              ]}
              value={values.billing_city}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!(errors.billing_city && touched.billing_city)}
            />
            {!!(errors.billing_city && touched.billing_city) && (
              <div className="text-xs text-red-600">{errors.billing_city}</div>
            )}
          </div>
          <div className="col-span-12 space-y-1">
            <label htmlFor="billing_address" className="text-sm text-gray-600">
              Address
            </label>
            <Textarea
              size="md"
              rows={3}
              id="billing_address"
              placeholder="Type billing address..."
              className="w-full"
              name="billing_address"
              value={values.billing_address}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!(errors.billing_address && touched.billing_address)}
            />
            {!!(errors.billing_address && touched.billing_address) && (
              <div className="text-xs text-red-600">
                {errors.billing_address}
              </div>
            )}
          </div>
        </div>
        <div>
          <Button
            size="lg"
            variant="primary"
            onClick={handleSubmit}
            className="w-full lg:w-fit"
          >
            Save
          </Button>
        </div>
      </Card>
    </>
  );
};

export default memo(PaymentDetailsPage);
