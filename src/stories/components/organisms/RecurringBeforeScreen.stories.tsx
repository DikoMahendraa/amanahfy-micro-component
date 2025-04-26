import type { Meta, StoryObj } from "@storybook/react";
import { RecurringBeforeScreen } from "components";
import heartAnimationData from "../../../assets/animations/heart-lottie-ll.json";
import regularDonorAnimationData from "../../../assets/animations/checkout-regular-donor-image.json";

const meta: Meta<typeof RecurringBeforeScreen> = {
  title: "Components/organisms/RecurringBeforeScreen",
  component: RecurringBeforeScreen,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    organizationLogo: { control: "text" },
    selectedFrequency: { control: "text" },
    customText: { control: "text" },
    currencySymbol: { control: "text" },
    displayRecurringAmount: { control: "text" },
    displayOneTimeAmount: { control: "text" },
    regularDonorAnimationSrc: { control: "text" },
    heartAnimationSrc: { control: "text" },
    onDonateClick: { action: "donate clicked" },
    onOneTimeClick: { action: "one-time clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof RecurringBeforeScreen>;

const exampleOneTimeAmount = 120;
const exampleFrequency = "monthly";
const exampleCurrencySymbol = "$";
const exampleRecurringAmount = (exampleOneTimeAmount / 12).toFixed(2);

export const Default: Story = {
  args: {
    regularDonorAnimationSrc: regularDonorAnimationData as object,
    organizationLogo: "https://via.placeholder.com/70",
    selectedFrequency: exampleFrequency,
    heartAnimationSrc: heartAnimationData as object,
    customText: "Become a regular donor to help us thrive!",
    currencySymbol: exampleCurrencySymbol,
    displayRecurringAmount: exampleRecurringAmount,
    displayOneTimeAmount: exampleOneTimeAmount,
    onDonateClick: () =>
      alert(
        `Donate ${exampleCurrencySymbol}${exampleRecurringAmount}/${exampleFrequency} clicked`
      ),
    onOneTimeClick: () =>
      alert(`One-time ${exampleCurrencySymbol}${exampleOneTimeAmount} clicked`),
  },
};
