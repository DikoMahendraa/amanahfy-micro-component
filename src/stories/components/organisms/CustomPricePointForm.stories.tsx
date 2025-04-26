import type { Meta, StoryObj } from "@storybook/react";
import { CustomPricePointForm } from "components";
import { useFormik } from "formik";
import { CURRENCY } from "utils";
import * as Yup from "yup";

// 👇 Define form values structure
const defaultValues = {
  custom_price_point_name: "",
  custom_price_point_description: "",
  custom_price_point_amount: 0,
  custom_price_point_currency: CURRENCY.USD,
};

const validationSchema = Yup.object({
  custom_price_point_name: Yup.string().required("Name is required"),
  custom_price_point_description: Yup.string().required(
    "Description is required"
  ),
  custom_price_point_amount: Yup.number().required("Amount is required").min(0),
});

const meta: Meta<typeof CustomPricePointForm> = {
  title: "Components/organisms/CustomPricePointForm",
  component: CustomPricePointForm,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof CustomPricePointForm>;
// 👇 Shared formik wrapper to inject form props
// @ts-ignore
const withFormik = (args) => {
  const formik = useFormik({
    initialValues: args.initialValues || defaultValues,
    validationSchema,
    onSubmit: (values) => {
      alert("Form submitted:\n" + JSON.stringify(values, null, 2));
    },
  });

  return (
    <CustomPricePointForm
      {...args}
      values={formik.values}
      errors={formik.errors}
      touched={formik.touched}
      handleChange={formik.handleChange}
      handleBlur={formik.handleBlur}
      handleSubmit={formik.handleSubmit}
    />
  );
};

export const AddMode: Story = {
  render: (args) => withFormik(args),
  args: {
    show: true,
    mode: "ADD",
    onClose: () => alert("Modal closed"),
    onSubmit: (values) => alert("Submitted: " + JSON.stringify(values)),
  },
};

export const EditMode: Story = {
  render: (args) => withFormik(args),
  args: {
    show: true,
    mode: "EDIT",
    onClose: () => alert("Modal closed"),
    onSubmit: (values) => alert("Submitted: " + JSON.stringify(values)),
    // @ts-ignore
    initialValues: {
      custom_price_point_name: "Gold Plan",
      custom_price_point_description: "All premium features included",
      custom_price_point_amount: 250000,
      custom_price_point_currency: CURRENCY.USD,
    },
  },
};
