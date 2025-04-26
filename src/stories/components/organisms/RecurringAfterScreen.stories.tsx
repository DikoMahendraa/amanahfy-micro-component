import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RecurringAfterScreen } from "components";
import rewardAnimationSrc from "../../../assets/animations/rewards-lottie.json";

const meta: Meta<typeof RecurringAfterScreen> = {
  title: "Components/organisms/RecurringAfterScreen",
  component: RecurringAfterScreen,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    thankYouTitle: { control: "text" },
    thankYouMessage: { control: "text" },
    customText: { control: "text" },
    recurringAmount: { control: "number" },
    recurringCurrencySymbol: { control: "text" },
    recurringPeriodLabel: { control: "text" },
    nextPaymentDate: { control: "text" },
    availableCurrencies: { control: "object" },
    showCustomAmountInput: { control: "boolean" },
    customAmountValue: { control: "number" },
    customCurrencyValue: { control: "text" },
    isSubmitting: { control: "boolean" },
    onCancel: { action: "cancelled" },
    rewardAnimationSrc: { control: "file" },
    onShowCustomAmountInputToggle: { action: "toggled custom input" },
    onCustomAmountChange: { action: "custom amount changed" },
    onCustomCurrencyChange: { action: "custom currency changed" },
    onSubmit: { action: "submitted" },
  },
};

export default meta;

type Story = StoryObj<typeof RecurringAfterScreen>;

const BaseStory: Story = {
  render: (args) => {
    const [showCustom, setShowCustom] = useState(
      args.showCustomAmountInput || false
    );
    const [amount, setAmount] = useState(
      args.customAmountValue !== undefined
        ? args.customAmountValue
        : args.recurringAmount
    );
    const [currency, setCurrency] = useState(
      args.customCurrencyValue || args.availableCurrencies[0]
    );
    const [submitting, setSubmitting] = useState(args.isSubmitting || false);

    const handleToggle = () => {
      const newState = !showCustom;
      setShowCustom(newState);
      if (!newState) {
        setAmount(args.recurringAmount);
        setCurrency(args.availableCurrencies[0]);
      }
      args.onShowCustomAmountInputToggle();
    };

    const handleAmountChange = (value: number) => {
      setAmount(value);
      args.onCustomAmountChange(value);
    };

    const handleCurrencyChange = (value: string) => {
      setCurrency(value);
      args.onCustomCurrencyChange(value);
    };

    const handleSubmit = () => {
      args.onSubmit();
      setSubmitting(true);
      const submittedAmount = showCustom ? amount : args.recurringAmount;
      const submittedCurrency = showCustom
        ? currency
        : args.recurringCurrencySymbol;
      alert(`Submitting: ${submittedAmount} ${submittedCurrency}`);
      setTimeout(() => {
        setSubmitting(false);
        alert("Submitted successfully!");
      }, 1500);
    };

    const handleCancel = () => {
      args.onCancel();
      alert("Cancelled by user.");
    };

    return (
      <RecurringAfterScreen
        {...args}
        showCustomAmountInput={showCustom}
        onShowCustomAmountInputToggle={handleToggle}
        customAmountValue={amount}
        onCustomAmountChange={handleAmountChange}
        customCurrencyValue={currency}
        onCustomCurrencyChange={handleCurrencyChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={submitting}
      />
    );
  },
};

export const Default: Story = {
  ...BaseStory,
  args: {
    rewardAnimationSrc: rewardAnimationSrc,
    thankYouTitle: "Thank You!",
    thankYouMessage: "Your recurring donation is set up.",
    customText: "Would you like to make an additional one-time donation today?",
    recurringAmount: 15,
    recurringCurrencySymbol: "£",
    recurringPeriodLabel: "Month",
    nextPaymentDate: "May 15, 2024",
    availableCurrencies: ["GBP", "USD", "EUR"],
    showCustomAmountInput: false,
    customAmountValue: 15,
    customCurrencyValue: "GBP",
    isSubmitting: false,
  },
};

export const ShowingCustomInput: Story = {
  ...BaseStory,
  args: {
    ...Default.args,
    showCustomAmountInput: true,
    customAmountValue: 25,
    customCurrencyValue: "USD",
  },
};

export const Submitting: Story = {
  ...BaseStory,
  args: {
    ...Default.args,
    isSubmitting: true,
  },
};

export const SubmittingCustom: Story = {
  ...BaseStory,
  args: {
    ...ShowingCustomInput.args,
    isSubmitting: true,
  },
};
